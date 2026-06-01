import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ── Funding Rate Snapshots ──────────────────────────────────────────────────
export const fundingRates = sqliteTable("funding_rates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  coin: text("coin").notNull(),
  venue: text("venue").notNull(), // 'hyperliquid' | 'binance' | 'bybit' | 'okx' | 'bitmex'
  rate8h: real("rate_8h").notNull(),       // normalized to 8h equivalent
  rate1h: real("rate_1h").notNull(),       // normalized to 1h equivalent
  annualized: real("annualized").notNull(), // rate * 1095
  predictedRate8h: real("predicted_rate_8h"),
  timestamp: integer("timestamp").notNull(),
});

// ── Signal Scores ────────────────────────────────────────────────────────────
export const signals = sqliteTable("signals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  coin: text("coin").notNull(),
  hlRate8h: real("hl_rate_8h").notNull(),
  bestCexRate8h: real("best_cex_rate_8h").notNull(),
  bestCexVenue: text("best_cex_venue").notNull(),
  spreadBps: real("spread_bps").notNull(),
  grossAnnualized: real("gross_annualized").notNull(),
  netAnnualized: real("net_annualized").notNull(), // after estimated fees
  entryFeeEstimate: real("entry_fee_estimate").notNull(),
  score: real("score").notNull(), // rank score
  timestamp: integer("timestamp").notNull(),
});

// ── Positions ────────────────────────────────────────────────────────────────
export const positions = sqliteTable("positions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  coin: text("coin").notNull(),
  hlSide: text("hl_side").notNull(),         // 'short' | 'long'
  cexSide: text("cex_side").notNull(),
  cexVenue: text("cex_venue").notNull(),
  notional: real("notional").notNull(),
  hlEntryPrice: real("hl_entry_price").notNull(),
  cexEntryPrice: real("cex_entry_price"),     // manual entry
  spreadAtEntry: real("spread_at_entry").notNull(),
  fundingCollected: real("funding_collected").notNull().default(0),
  feePaid: real("fee_paid").notNull().default(0),
  netPnl: real("net_pnl").notNull().default(0),
  status: text("status").notNull().default("open"), // 'open' | 'closed'
  openedAt: integer("opened_at").notNull(),
  closedAt: integer("closed_at"),
  notes: text("notes"),
});

// ── Funding Receipts ─────────────────────────────────────────────────────────
export const fundingReceipts = sqliteTable("funding_receipts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  positionId: integer("position_id"),
  coin: text("coin").notNull(),
  amount: real("amount").notNull(),
  rate: real("rate").notNull(),
  timestamp: integer("timestamp").notNull(),
});

// ── Alerts ────────────────────────────────────────────────────────────────────
export const alerts = sqliteTable("alerts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(), // 'spread_threshold' | 'rate_flip' | 'position_pnl'
  coin: text("coin"),           // null = all coins
  thresholdValue: real("threshold_value"),
  direction: text("direction"), // 'above' | 'below'
  email: text("email"),
  active: integer("active").notNull().default(1),
  lastTriggered: integer("last_triggered"),
  createdAt: integer("created_at").notNull(),
});

// ── Insert Schemas ────────────────────────────────────────────────────────────
export const insertPositionSchema = createInsertSchema(positions).omit({
  id: true, fundingCollected: true, feePaid: true, netPnl: true,
  status: true, closedAt: true,
});
export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true, lastTriggered: true,
});
export const insertFundingReceiptSchema = createInsertSchema(fundingReceipts).omit({ id: true });

export type Position = typeof positions.$inferSelect;
export type InsertPosition = z.infer<typeof insertPositionSchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type FundingRate = typeof fundingRates.$inferSelect;
export type Signal = typeof signals.$inferSelect;
export type FundingReceipt = typeof fundingReceipts.$inferSelect;

// ── Waitlist ──────────────────────────────────────────────────────────────────
export const waitlist = sqliteTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  country: text("country").notNull(),
  tier: text("tier").notNull().default("pro"), // 'pro'
  pricePoint: text("price_point").notNull().default("$49/month"),
  signedUpAt: integer("signed_up_at").notNull(),
  notified: integer("notified").notNull().default(0),
});

export const insertWaitlistSchema = createInsertSchema(waitlist).omit({
  id: true, notified: true,
});
export type WaitlistEntry = typeof waitlist.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
