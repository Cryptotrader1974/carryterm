import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, desc, and, gte } from "drizzle-orm";
import {
  fundingRates, signals, positions, fundingReceipts, alerts,
  type Position, type InsertPosition, type Alert, type InsertAlert,
  type FundingRate, type Signal, type FundingReceipt, type InsertFundingReceiptSchema,
} from "@shared/schema";

const sqlite = new Database("data.db");
const db = drizzle(sqlite);

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS funding_rates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coin TEXT NOT NULL, venue TEXT NOT NULL,
    rate_8h REAL NOT NULL, rate_1h REAL NOT NULL, annualized REAL NOT NULL,
    predicted_rate_8h REAL, timestamp INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS signals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coin TEXT NOT NULL, hl_rate_8h REAL NOT NULL,
    best_cex_rate_8h REAL NOT NULL, best_cex_venue TEXT NOT NULL,
    spread_bps REAL NOT NULL, gross_annualized REAL NOT NULL,
    net_annualized REAL NOT NULL, entry_fee_estimate REAL NOT NULL,
    score REAL NOT NULL, timestamp INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coin TEXT NOT NULL, hl_side TEXT NOT NULL, cex_side TEXT NOT NULL,
    cex_venue TEXT NOT NULL, notional REAL NOT NULL,
    hl_entry_price REAL NOT NULL, cex_entry_price REAL,
    spread_at_entry REAL NOT NULL, funding_collected REAL NOT NULL DEFAULT 0,
    fee_paid REAL NOT NULL DEFAULT 0, net_pnl REAL NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'open', opened_at INTEGER NOT NULL,
    closed_at INTEGER, notes TEXT
  );
  CREATE TABLE IF NOT EXISTS funding_receipts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position_id INTEGER, coin TEXT NOT NULL,
    amount REAL NOT NULL, rate REAL NOT NULL, timestamp INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, coin TEXT, threshold_value REAL,
    direction TEXT, email TEXT, active INTEGER NOT NULL DEFAULT 1,
    last_triggered INTEGER, created_at INTEGER NOT NULL
  );
`);

export interface IStorage {
  // Funding Rates
  upsertFundingRate(data: Omit<FundingRate, "id">): void;
  getLatestRates(): FundingRate[];
  getLatestRatesByCoin(coin: string): FundingRate[];

  // Signals
  upsertSignal(data: Omit<Signal, "id">): void;
  getLatestSignals(): Signal[];

  // Positions
  createPosition(data: InsertPosition): Position;
  getPositions(status?: string): Position[];
  getPosition(id: number): Position | undefined;
  updatePositionPnl(id: number, funding: number, fees: number): void;
  closePosition(id: number): void;

  // Funding Receipts
  addFundingReceipt(data: Omit<FundingReceipt, "id">): void;
  getReceiptsForPosition(positionId: number): FundingReceipt[];

  // Alerts
  createAlert(data: InsertAlert): Alert;
  getAlerts(): Alert[];
  updateAlertTriggered(id: number): void;
  deleteAlert(id: number): void;
}

class SQLiteStorage implements IStorage {
  upsertFundingRate(data: Omit<FundingRate, "id">) {
    sqlite.prepare(`
      INSERT INTO funding_rates (coin, venue, rate_8h, rate_1h, annualized, predicted_rate_8h, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(data.coin, data.venue, data.rate8h, data.rate1h, data.annualized, data.predictedRate8h ?? null, data.timestamp);
  }

  getLatestRates(): FundingRate[] {
    return sqlite.prepare(`
      SELECT fr.* FROM funding_rates fr
      INNER JOIN (
        SELECT coin, venue, MAX(timestamp) as max_ts
        FROM funding_rates GROUP BY coin, venue
      ) latest ON fr.coin = latest.coin AND fr.venue = latest.venue AND fr.timestamp = latest.max_ts
      ORDER BY fr.coin, fr.venue
    `).all() as FundingRate[];
  }

  getLatestRatesByCoin(coin: string): FundingRate[] {
    return sqlite.prepare(`
      SELECT * FROM funding_rates WHERE coin = ?
      ORDER BY timestamp DESC LIMIT 10
    `).all(coin) as FundingRate[];
  }

  upsertSignal(data: Omit<Signal, "id">) {
    sqlite.prepare(`
      INSERT INTO signals (coin, hl_rate_8h, best_cex_rate_8h, best_cex_venue,
        spread_bps, gross_annualized, net_annualized, entry_fee_estimate, score, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(data.coin, data.hlRate8h, data.bestCexRate8h, data.bestCexVenue,
      data.spreadBps, data.grossAnnualized, data.netAnnualized,
      data.entryFeeEstimate, data.score, data.timestamp);
  }

  getLatestSignals(): Signal[] {
    return sqlite.prepare(`
      SELECT s.* FROM signals s
      INNER JOIN (SELECT coin, MAX(timestamp) as max_ts FROM signals GROUP BY coin) latest
      ON s.coin = latest.coin AND s.timestamp = latest.max_ts
      ORDER BY s.score DESC
    `).all() as Signal[];
  }

  createPosition(data: InsertPosition): Position {
    const result = sqlite.prepare(`
      INSERT INTO positions (coin, hl_side, cex_side, cex_venue, notional,
        hl_entry_price, cex_entry_price, spread_at_entry, opened_at, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(data.coin, data.hlSide, data.cexSide, data.cexVenue, data.notional,
      data.hlEntryPrice, data.cexEntryPrice ?? null, data.spreadAtEntry,
      data.openedAt, data.notes ?? null);
    return this.getPosition(result.lastInsertRowid as number)!;
  }

  getPositions(status?: string): Position[] {
    if (status) {
      return sqlite.prepare(`SELECT * FROM positions WHERE status = ? ORDER BY opened_at DESC`).all(status) as Position[];
    }
    return sqlite.prepare(`SELECT * FROM positions ORDER BY opened_at DESC`).all() as Position[];
  }

  getPosition(id: number): Position | undefined {
    return sqlite.prepare(`SELECT * FROM positions WHERE id = ?`).get(id) as Position | undefined;
  }

  updatePositionPnl(id: number, funding: number, fees: number) {
    sqlite.prepare(`
      UPDATE positions SET
        funding_collected = funding_collected + ?,
        fee_paid = fee_paid + ?,
        net_pnl = funding_collected + ? - (fee_paid + ?)
      WHERE id = ?
    `).run(funding, fees, funding, fees, id);
  }

  closePosition(id: number) {
    sqlite.prepare(`UPDATE positions SET status = 'closed', closed_at = ? WHERE id = ?`)
      .run(Date.now(), id);
  }

  addFundingReceipt(data: Omit<FundingReceipt, "id">) {
    sqlite.prepare(`
      INSERT INTO funding_receipts (position_id, coin, amount, rate, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `).run(data.positionId ?? null, data.coin, data.amount, data.rate, data.timestamp);
  }

  getReceiptsForPosition(positionId: number): FundingReceipt[] {
    return sqlite.prepare(`SELECT * FROM funding_receipts WHERE position_id = ? ORDER BY timestamp DESC`).all(positionId) as FundingReceipt[];
  }

  createAlert(data: InsertAlert): Alert {
    const result = sqlite.prepare(`
      INSERT INTO alerts (type, coin, threshold_value, direction, email, active, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(data.type, data.coin ?? null, data.thresholdValue ?? null,
      data.direction ?? null, data.email ?? null, data.active ?? 1, data.createdAt);
    return sqlite.prepare(`SELECT * FROM alerts WHERE id = ?`).get(result.lastInsertRowid) as Alert;
  }

  getAlerts(): Alert[] {
    return sqlite.prepare(`SELECT * FROM alerts ORDER BY created_at DESC`).all() as Alert[];
  }

  updateAlertTriggered(id: number) {
    sqlite.prepare(`UPDATE alerts SET last_triggered = ? WHERE id = ?`).run(Date.now(), id);
  }

  deleteAlert(id: number) {
    sqlite.prepare(`DELETE FROM alerts WHERE id = ?`).run(id);
  }
}

export const storage = new SQLiteStorage();

// ── Waitlist ──────────────────────────────────────────────────────────────────
export function addWaitlistEntry(email: string, country: string): boolean {
  try {
    db.prepare(
      `INSERT OR IGNORE INTO waitlist (email, country, tier, price_point, signed_up_at, notified)
       VALUES (?, ?, 'pro', '$49/month', ?, 0)`
    ).run(email.toLowerCase().trim(), country.trim(), Date.now());
    return true;
  } catch {
    return false;
  }
}

export function getWaitlistEntries(): any[] {
  return db.prepare(`SELECT * FROM waitlist ORDER BY signed_up_at DESC`).all();
}

export function getWaitlistCount(): number {
  const row = db.prepare(`SELECT COUNT(*) as count FROM waitlist`).get() as any;
  return row?.count ?? 0;
}
