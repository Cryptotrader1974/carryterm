/**
 * Data Ingestion Layer
 * - Hyperliquid: REST polling for metaAndAssetCtxs + predictedFundings (no WS needed for dashboard)
 * - CEX: CCXT REST polling for Binance, Bybit, OKX, BitMEX
 * All rates normalized to 8h equivalent for comparison
 */

import axios from "axios";
import { storage } from "./storage.js";

const HL_API = "https://api.hyperliquid.xyz/info";

// Funding intervals in hours per venue
const VENUE_INTERVALS: Record<string, number> = {
  hyperliquid: 1,
  binance: 8,
  bybit: 8,
  okx: 8,
  bitmex: 8,
};

// Normalize any interval to 8h equivalent
function normalizeTo8h(rate: number, intervalHours: number): number {
  return rate * (8 / intervalHours);
}

// ── Hyperliquid Ingestion ─────────────────────────────────────────────────────
async function fetchHyperliquidRates(): Promise<Map<string, { rate: number; predicted: number }>> {
  const results = new Map<string, { rate: number; predicted: number }>();
  try {
    const [metaRes, predRes] = await Promise.all([
      axios.post(HL_API, { type: "metaAndAssetCtxs" }, { timeout: 8000 }),
      axios.post(HL_API, { type: "predictedFundings" }, { timeout: 8000 }),
    ]);

    const meta = metaRes.data[0]?.universe ?? [];
    const ctxs = metaRes.data[1] ?? [];
    const predicted: Record<string, number> = {};

    // predictedFundings returns [[coin, [{venue, sampleFunding}]]]
    if (Array.isArray(predRes.data)) {
      for (const [coin, venueData] of predRes.data) {
        if (Array.isArray(venueData) && venueData.length > 0) {
          predicted[coin] = parseFloat(venueData[0]?.sampleFunding ?? "0");
        }
      }
    }

    meta.forEach((asset: any, i: number) => {
      const ctx = ctxs[i];
      if (!ctx) return;
      const rawRate = parseFloat(ctx.funding ?? "0");
      results.set(asset.name, {
        rate: rawRate,
        predicted: predicted[asset.name] ?? rawRate,
      });
    });
  } catch (e: any) {
    console.error("[HL] Fetch error:", e.message);
  }
  return results;
}

// ── CEX Ingestion via direct REST ─────────────────────────────────────────────
async function fetchBinanceRates(): Promise<Map<string, number>> {
  const rates = new Map<string, number>();
  try {
    const res = await axios.get(
      "https://fapi.binance.com/fapi/v1/premiumIndex",
      { timeout: 8000 }
    );
    for (const item of res.data) {
      const symbol: string = item.symbol;
      if (symbol.endsWith("USDT")) {
        const coin = symbol.replace("USDT", "");
        rates.set(coin, parseFloat(item.lastFundingRate ?? "0"));
      }
    }
  } catch (e: any) {
    console.error("[Binance] Fetch error:", e.message);
  }
  return rates;
}

async function fetchBybitRates(): Promise<Map<string, number>> {
  const rates = new Map<string, number>();
  try {
    const res = await axios.get(
      "https://api.bybit.com/v5/market/tickers?category=linear",
      { timeout: 8000 }
    );
    const list = res.data?.result?.list ?? [];
    for (const item of list) {
      const symbol: string = item.symbol;
      if (symbol.endsWith("USDT")) {
        const coin = symbol.replace("USDT", "");
        rates.set(coin, parseFloat(item.fundingRate ?? "0"));
      }
    }
  } catch (e: any) {
    console.error("[Bybit] Fetch error:", e.message);
  }
  return rates;
}

async function fetchOkxRates(): Promise<Map<string, number>> {
  const rates = new Map<string, number>();
  try {
    const res = await axios.get(
      "https://www.okx.com/api/v5/public/funding-rate?instId=BTC-USDT-SWAP",
      { timeout: 8000 }
    );
    // OKX requires per-instrument calls — fetch top coins
    const topCoins = ["BTC", "ETH", "SOL", "HYPE", "AVAX", "MATIC", "DOGE", "XRP", "ADA", "DOT"];
    await Promise.all(topCoins.map(async (coin) => {
      try {
        const r = await axios.get(
          `https://www.okx.com/api/v5/public/funding-rate?instId=${coin}-USDT-SWAP`,
          { timeout: 5000 }
        );
        const data = r.data?.data?.[0];
        if (data) rates.set(coin, parseFloat(data.fundingRate ?? "0"));
      } catch {}
    }));
  } catch (e: any) {
    console.error("[OKX] Fetch error:", e.message);
  }
  return rates;
}

// ── Signal Computation ────────────────────────────────────────────────────────
const HL_TAKER_FEE = 0.00045;
const CEX_TAKER_FEE = 0.00050;
const ROUNDTRIP_FEE = 2 * (HL_TAKER_FEE + CEX_TAKER_FEE); // conservative

function computeSignal(
  coin: string,
  hlRate1h: number,
  cexRates: { venue: string; rate8h: number }[]
) {
  if (cexRates.length === 0) return null;

  const hlRate8h = normalizeTo8h(hlRate1h, 1);
  const best = cexRates.reduce((a, b) => (Math.abs(a.rate8h) > Math.abs(b.rate8h) ? a : b));

  // We want HL funding significantly higher than CEX (short HL, long CEX)
  const spread8h = hlRate8h - best.rate8h;
  const spreadBps = spread8h * 10000;
  const grossAnnualized = spread8h * 3 * 365 * 100; // 3 periods/day * 365

  // Net after round-trip fees (amortized over 30-day hold = 90 funding periods)
  const feesAmortized = (ROUNDTRIP_FEE / 90) * 100;
  const netAnnualized = grossAnnualized - feesAmortized * 365;

  const score = netAnnualized; // rank by net carry

  return {
    coin,
    hlRate8h,
    bestCexRate8h: best.rate8h,
    bestCexVenue: best.venue,
    spreadBps,
    grossAnnualized,
    netAnnualized,
    entryFeeEstimate: ROUNDTRIP_FEE * 100,
    score,
    timestamp: Date.now(),
  };
}

// ── Main Poll Loop ────────────────────────────────────────────────────────────
let lastData: {
  rates: Map<string, { hl: { rate: number; predicted: number }; cex: { venue: string; rate8h: number }[] }>;
  signals: ReturnType<typeof computeSignal>[];
  timestamp: number;
} = { rates: new Map(), signals: [], timestamp: 0 };

export function getLatestData() {
  return lastData;
}

export async function pollAll() {
  try {
    const [hlRates, binanceRates, bybitRates, okxRates] = await Promise.all([
      fetchHyperliquidRates(),
      fetchBinanceRates(),
      fetchBybitRates(),
      fetchOkxRates(),
    ]);

    const now = Date.now();
    const signalList: ReturnType<typeof computeSignal>[] = [];
    const ratesMap = new Map<string, { hl: { rate: number; predicted: number }; cex: { venue: string; rate8h: number }[] }>();

    for (const [coin, hlData] of hlRates) {
      const cexRates: { venue: string; rate8h: number }[] = [];

      const binRate = binanceRates.get(coin);
      if (binRate !== undefined) {
        cexRates.push({ venue: "binance", rate8h: normalizeTo8h(binRate, 8) });
        storage.upsertFundingRate({
          coin, venue: "binance",
          rate8h: normalizeTo8h(binRate, 8),
          rate1h: normalizeTo8h(binRate, 8) / 8,
          annualized: normalizeTo8h(binRate, 8) * 3 * 365 * 100,
          predictedRate8h: null,
          timestamp: now,
        });
      }

      const bybitRate = bybitRates.get(coin);
      if (bybitRate !== undefined) {
        cexRates.push({ venue: "bybit", rate8h: normalizeTo8h(bybitRate, 8) });
        storage.upsertFundingRate({
          coin, venue: "bybit",
          rate8h: normalizeTo8h(bybitRate, 8),
          rate1h: normalizeTo8h(bybitRate, 8) / 8,
          annualized: normalizeTo8h(bybitRate, 8) * 3 * 365 * 100,
          predictedRate8h: null,
          timestamp: now,
        });
      }

      const okxRate = okxRates.get(coin);
      if (okxRate !== undefined) {
        cexRates.push({ venue: "okx", rate8h: normalizeTo8h(okxRate, 8) });
        storage.upsertFundingRate({
          coin, venue: "okx",
          rate8h: normalizeTo8h(okxRate, 8),
          rate1h: normalizeTo8h(okxRate, 8) / 8,
          annualized: normalizeTo8h(okxRate, 8) * 3 * 365 * 100,
          predictedRate8h: null,
          timestamp: now,
        });
      }

      const hlRate8h = normalizeTo8h(hlData.rate, 1);
      storage.upsertFundingRate({
        coin, venue: "hyperliquid",
        rate8h: hlRate8h,
        rate1h: hlData.rate,
        annualized: hlRate8h * 3 * 365 * 100,
        predictedRate8h: normalizeTo8h(hlData.predicted, 1),
        timestamp: now,
      });

      ratesMap.set(coin, { hl: hlData, cex: cexRates });

      const sig = computeSignal(coin, hlData.rate, cexRates);
      if (sig) {
        signalList.push(sig);
        storage.upsertSignal(sig);
      }
    }

    lastData = {
      rates: ratesMap,
      signals: signalList.sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0)).slice(0, 50),
      timestamp: now,
    };

    console.log(`[Poll] Updated ${hlRates.size} HL coins, ${signalList.length} signals at ${new Date().toISOString()}`);
  } catch (e: any) {
    console.error("[Poll] Error:", e.message);
  }
}

// Poll every 30 seconds
export function startIngestion() {
  pollAll(); // immediate first run
  setInterval(pollAll, 30_000);
  console.log("[Ingestion] Started — polling every 30s");
}
