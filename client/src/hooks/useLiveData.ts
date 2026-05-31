import { useState, useEffect, useRef } from "react";
import { API_BASE } from "@/lib/queryClient";

export interface SignalRow {
  coin: string;
  hlRate8h: number;
  bestCexRate8h: number;
  bestCexVenue: string;
  spreadBps: number;
  grossAnnualized: number;
  netAnnualized: number;
  entryFeeEstimate: number;
  score: number;
  timestamp: number;
}

export interface RateRow {
  coin: string;
  hl: { rate1h: number; rate8h: number; annualized: number; predicted8h: number };
  cex: { venue: string; rate8h: number }[];
}

export interface LiveData {
  signals: SignalRow[];
  rates: { rates: RateRow[]; timestamp: number };
  connected: boolean;
  lastUpdate: number;
}

export function useLiveData(): LiveData {
  const [signals, setSignals] = useState<SignalRow[]>([]);
  const [rates, setRates] = useState<{ rates: RateRow[]; timestamp: number }>({ rates: [], timestamp: 0 });
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    function connect() {
      const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
      // API_BASE is '' locally or the port proxy path when deployed
      let wsUrl: string;
      if (API_BASE) {
        // Deployed: convert https://... prefix to wss://...
        wsUrl = API_BASE.replace(/^https/, "wss").replace(/^http/, "ws").replace(/\/+$/, "") + "/ws";
      } else {
        wsUrl = `${proto}//${window.location.host}/ws`;
      }
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);
      ws.onclose = () => {
        setConnected(false);
        setTimeout(connect, 3000); // reconnect
      };
      ws.onerror = () => ws.close();

      ws.onmessage = (evt) => {
        try {
          const msg = JSON.parse(evt.data);
          if (msg.type === "snapshot" || msg.type === "update") {
            const d = msg.data;
            if (d.signals) setSignals(d.signals.filter(Boolean));
            setLastUpdate(d.timestamp ?? Date.now());
          }
        } catch {}
      };
    }

    connect();

    // Also poll REST as fallback
    const pollRates = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/rates`);
        if (res.ok) {
          const data = await res.json();
          setRates(data);
        }
        const sigRes = await fetch(`${API_BASE}/api/signals`);
        if (sigRes.ok) {
          const sigData = await sigRes.json();
          setSignals(sigData.signals?.filter(Boolean) ?? []);
          setLastUpdate(sigData.timestamp ?? Date.now());
        }
      } catch {}
    };

    pollRates();
    const interval = setInterval(pollRates, 30_000);

    return () => {
      clearInterval(interval);
      wsRef.current?.close();
    };
  }, []);

  return { signals, rates, connected, lastUpdate };
}
