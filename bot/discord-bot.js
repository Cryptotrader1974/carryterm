/**
 * CarryTerm Discord Bot
 *
 * Posts daily top carry signals to one or more Discord channels.
 * Runs as a standalone Node.js process on the same droplet as the app.
 *
 * Environment variables (set in /opt/carryterm/bot/.env):
 *   DISCORD_TOKEN        — bot token from Discord Developer Portal
 *   DISCORD_CHANNEL_IDS  — comma-separated channel IDs to post to
 *   POST_HOUR_UTC        — hour (0-23 UTC) to post daily (default: 13 = 9am ET)
 *   APP_URL              — public URL of the app (default: http://159.203.182.234)
 *   API_URL              — internal API URL (default: http://localhost:5000)
 */

import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// ── Config ────────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env manually (no dotenv dependency needed)
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8").split("\n").forEach((line) => {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) process.env[key.trim()] = vals.join("=").trim();
  });
}

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_IDS = (process.env.DISCORD_CHANNEL_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);
const POST_HOUR_UTC = parseInt(process.env.POST_HOUR_UTC || "13", 10); // 9am ET = 13:00 UTC
const APP_URL = process.env.APP_URL || "http://159.203.182.234";
const API_URL = process.env.API_URL || "http://localhost:5000";

if (!TOKEN) {
  console.error("[Bot] ERROR: DISCORD_TOKEN is not set in bot/.env");
  process.exit(1);
}
if (CHANNEL_IDS.length === 0) {
  console.error("[Bot] ERROR: DISCORD_CHANNEL_IDS is not set in bot/.env");
  process.exit(1);
}

// ── Fetch signals from local API ─────────────────────────────────────────────

async function fetchSignals() {
  const res = await fetch(`${API_URL}/api/signals`);
  const data = await res.json();
  return data.signals || [];
}

// ── Format the Discord embed ──────────────────────────────────────────────────

function buildEmbed(signals) {
  const top = signals.slice(0, 7);
  const now = new Date();
  const dateStr = now.toUTCString().replace(" GMT", " UTC");

  // Table rows
  const rows = top.map((s, i) => {
    const gross = s.grossAnnualized.toFixed(1);
    const net = s.netAnnualized.toFixed(1);
    const spread = s.spreadBps.toFixed(2);
    const venue = s.bestCexVenue.toUpperCase();
    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
    return `${medal} **${s.coin}** · ${gross}% gross · ${net}% net · ${spread} bps · vs ${venue}`;
  }).join("\n");

  const best = top[0];
  const description = [
    `Top funding rate carry opportunities on Hyperliquid right now.`,
    `Strategy: **Short HL perp + Long CEX perp** = delta-neutral yield with no price exposure.`,
    ``,
    rows,
    ``,
    `**Breakeven:** ~${best ? (best.roundTripPct / best.dailyCarry).toFixed(1) : "?"} days to recover entry fees on the top signal.`,
    ``,
    `[→ View all signals live](${APP_URL})`,
  ].join("\n");

  return new EmbedBuilder()
    .setTitle("📊 CarryTerm — Daily Carry Signals")
    .setDescription(description)
    .setColor(0x22c55e)
    .setFooter({ text: `CarryTerm · ${dateStr} · Rates update every 30s · Not financial advice` })
    .setURL(APP_URL);
}

// ── Post to all configured channels ──────────────────────────────────────────

async function postSignals(client) {
  console.log(`[Bot] Fetching signals at ${new Date().toISOString()}`);

  let signals;
  try {
    signals = await fetchSignals();
  } catch (e) {
    console.error("[Bot] Failed to fetch signals:", e.message);
    return;
  }

  if (!signals || signals.length === 0) {
    console.warn("[Bot] No signals returned — skipping post");
    return;
  }

  const embed = buildEmbed(signals);

  for (const channelId of CHANNEL_IDS) {
    try {
      const channel = await client.channels.fetch(channelId);
      if (!channel || !channel.isTextBased()) {
        console.warn(`[Bot] Channel ${channelId} not found or not text-based`);
        continue;
      }
      await channel.send({ embeds: [embed] });
      console.log(`[Bot] Posted to channel ${channelId} (${channel.name})`);
    } catch (e) {
      console.error(`[Bot] Failed to post to channel ${channelId}:`, e.message);
    }
  }
}

// ── Scheduler — fires once per day at POST_HOUR_UTC ──────────────────────────

function msUntilNextPost() {
  const now = new Date();
  const next = new Date(now);
  next.setUTCHours(POST_HOUR_UTC, 0, 0, 0);
  if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
  return next - now;
}

function scheduleDaily(client) {
  const ms = msUntilNextPost();
  const nextTime = new Date(Date.now() + ms).toUTCString();
  console.log(`[Bot] Next post scheduled for ${nextTime} (in ${Math.round(ms / 60000)} minutes)`);

  setTimeout(async () => {
    await postSignals(client);
    // Schedule next day
    scheduleDaily(client);
  }, ms);
}

// ── Discord client ────────────────────────────────────────────────────────────

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  console.log(`[Bot] Logged in as ${client.user.tag}`);
  console.log(`[Bot] Posting to ${CHANNEL_IDS.length} channel(s) daily at ${POST_HOUR_UTC}:00 UTC`);

  // Post immediately on startup so you can verify it works
  await postSignals(client);

  // Then schedule daily
  scheduleDaily(client);
});

client.on("error", (e) => console.error("[Bot] Client error:", e.message));

client.login(TOKEN).catch((e) => {
  console.error("[Bot] Login failed:", e.message);
  process.exit(1);
});
