import type { Express } from "express";
import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage.js";
import { getLatestData, pollAll } from "./ingestion.js";
import { insertPositionSchema, insertAlertSchema } from "@shared/schema";
import { z } from "zod";

// Builder address — all fees accumulate here on-chain
const BUILDER_ADDRESS = "0x12e07604360EF08FA8C40D93eD024CC6E69BeE68";
const BUILDER_FEE_BPS = 4; // 4 basis points

export function registerRoutes(httpServer: Server, app: Express) {
  // ── WebSocket — real-time push ──────────────────────────────────────────────
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });
  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    clients.add(ws);
    // Send current data immediately on connect
    const data = getLatestData();
    ws.send(JSON.stringify({ type: "snapshot", data }));
    ws.on("close", () => clients.delete(ws));
    ws.on("error", () => clients.delete(ws));
  });

  // Broadcast to all connected clients every 30s
  setInterval(() => {
    const data = getLatestData();
    const msg = JSON.stringify({ type: "update", data });
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  }, 30_000);

  // ── REST: Rates ─────────────────────────────────────────────────────────────
  app.get("/api/rates", (_req, res) => {
    const data = getLatestData();
    const rates: any[] = [];
    data.rates.forEach((val, coin) => {
      rates.push({
        coin,
        hl: {
          rate1h: val.hl.rate,
          rate8h: val.hl.rate * 8,
          annualized: val.hl.rate * 8 * 3 * 365 * 100,
          predicted8h: val.hl.predicted * 8,
        },
        cex: val.cex,
      });
    });
    res.json({ rates, timestamp: data.timestamp });
  });

  app.get("/api/rates/:coin", (req, res) => {
    const coin = req.params.coin.toUpperCase();
    const data = getLatestData();
    const coinData = data.rates.get(coin);
    if (!coinData) return res.status(404).json({ error: "Coin not found" });
    res.json({ coin, ...coinData });
  });

  // ── REST: Signals ───────────────────────────────────────────────────────────
  app.get("/api/signals", (_req, res) => {
    const data = getLatestData();
    res.json({ signals: data.signals, timestamp: data.timestamp });
  });

  // ── REST: Positions ─────────────────────────────────────────────────────────
  app.get("/api/positions", (req, res) => {
    const status = req.query.status as string | undefined;
    res.json(storage.getPositions(status));
  });

  app.post("/api/positions", (req, res) => {
    try {
      const data = insertPositionSchema.parse(req.body);
      const position = storage.createPosition(data);
      res.status(201).json(position);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.patch("/api/positions/:id/close", (req, res) => {
    const id = parseInt(req.params.id);
    storage.closePosition(id);
    res.json({ success: true });
  });

  app.get("/api/positions/:id/receipts", (req, res) => {
    const id = parseInt(req.params.id);
    res.json(storage.getReceiptsForPosition(id));
  });

  // ── REST: Alerts ────────────────────────────────────────────────────────────
  app.get("/api/alerts", (_req, res) => {
    res.json(storage.getAlerts());
  });

  app.post("/api/alerts", (req, res) => {
    try {
      const data = insertAlertSchema.parse(req.body);
      const alert = storage.createAlert(data);
      res.status(201).json(alert);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/alerts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    storage.deleteAlert(id);
    res.json({ success: true });
  });

  // ── REST: Builder Info ──────────────────────────────────────────────────────
  app.get("/api/builder", (_req, res) => {
    res.json({
      address: BUILDER_ADDRESS,
      feeBps: BUILDER_FEE_BPS,
      note: "All Hyperliquid fills routed through this platform attach this builder code. Fees accumulate on-chain at the builder address.",
    });
  });

  // ── REST: Force refresh ─────────────────────────────────────────────────────
  app.post("/api/refresh", async (_req, res) => {
    await pollAll();
    res.json({ success: true, timestamp: Date.now() });
  });
}
