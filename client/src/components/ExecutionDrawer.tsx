import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, AlertTriangle } from "lucide-react";
import type { SignalRow } from "../hooks/useLiveData";
import { apiRequest } from "../lib/queryClient";

const BUILDER_ADDRESS = "0x12e07604360EF08FA8C40D93eD024CC6E69BeE68";
const BUILDER_FEE_BPS = 4;
const HL_TAKER = 0.00045;
const CEX_TAKER = 0.00050;

interface Props {
  signal: SignalRow;
  onClose: () => void;
}

export function ExecutionDrawer({ signal, onClose }: Props) {
  const [notional, setNotional] = useState(10000);
  const qc = useQueryClient();

  const roundTrip = (HL_TAKER + CEX_TAKER) * 2 * 100;
  const builderFee = notional * (BUILDER_FEE_BPS / 10000);
  const grossMonthly = notional * (signal.grossAnnualized / 100) / 12;
  const feeOnEntry = notional * (HL_TAKER + CEX_TAKER);
  const netMonthly = grossMonthly - feeOnEntry;

  const createPosition = useMutation({
    mutationFn: () => apiRequest("POST", "/api/positions", {
      coin: signal.coin,
      hlSide: "short",
      cexSide: "long",
      cexVenue: signal.bestCexVenue,
      notional,
      hlEntryPrice: 0, // would be live price in production
      spreadAtEntry: signal.spreadBps,
      openedAt: Date.now(),
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/positions"] });
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md bg-card border-l border-border h-full overflow-y-auto p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
        data-testid="execution-drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold mono">{signal.coin} — Delta-Neutral Carry</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Short HL perp · Long {signal.bestCexVenue.toUpperCase()} perp</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" data-testid="drawer-close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Spread Summary */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "HL Rate/8h", value: `+${(signal.hlRate8h * 100).toFixed(4)}%`, color: "rate-positive" },
            { label: `${signal.bestCexVenue.toUpperCase()} Rate/8h`, value: `+${(signal.bestCexRate8h * 100).toFixed(4)}%`, color: "rate-neutral" },
            { label: "Gross Ann.", value: `+${signal.grossAnnualized.toFixed(1)}%`, color: "rate-positive" },
            { label: "Net Ann.", value: `+${signal.netAnnualized.toFixed(1)}%`, color: "rate-positive" },
          ].map((item) => (
            <div key={item.label} className="bg-secondary rounded p-3">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className={`mono font-semibold text-sm ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Notional Input */}
        <div>
          <label className="text-xs text-muted-foreground block mb-1.5">Notional per side (USD)</label>
          <input
            type="number"
            value={notional}
            onChange={(e) => setNotional(Math.max(1000, Number(e.target.value)))}
            className="w-full bg-input border border-border rounded px-3 py-2 mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            data-testid="notional-input"
          />
          <p className="text-xs text-muted-foreground mt-1">Total capital deployed: ${(notional * 2).toLocaleString()} (both legs)</p>
        </div>

        {/* P&L Preview */}
        <div className="bg-secondary rounded p-4 space-y-2.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">P&L Preview</p>
          {[
            { label: "Est. gross carry/month", value: `$${grossMonthly.toFixed(0)}` },
            { label: "Entry fees (round-trip)", value: `-$${feeOnEntry.toFixed(0)}` },
            { label: "Est. net carry/month", value: `$${netMonthly.toFixed(0)}`, highlight: true },
            { label: "Builder fee (4 bps on HL leg)", value: `-$${builderFee.toFixed(2)}`, small: true },
          ].map((row) => (
            <div key={row.label} className={`flex justify-between ${row.small ? "opacity-60" : ""}`}>
              <span className={`text-xs ${row.small ? "text-muted-foreground" : "text-foreground"}`}>{row.label}</span>
              <span className={`mono text-xs font-medium ${row.highlight ? "rate-positive" : "text-foreground"}`}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Builder Code Notice */}
        <div className="border border-border/50 rounded p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Builder code attached:</span> All Hyperliquid fills route through builder address{" "}
            <span className="mono text-primary">{BUILDER_ADDRESS.slice(0, 8)}…</span> at {BUILDER_FEE_BPS} bps.
            Fee accumulates on-chain automatically.
          </p>
        </div>

        {/* CEX Leg Warning */}
        <div className="flex gap-2 bg-yellow-500/8 border border-yellow-500/20 rounded p-3">
          <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            The {signal.bestCexVenue.toUpperCase()} leg must be executed manually. Open a matching LONG {signal.coin} perp on {signal.bestCexVenue.toUpperCase()} for ${notional.toLocaleString()} notional simultaneously.
          </p>
        </div>

        {/* Execute Button */}
        <button
          className="w-full bg-primary text-primary-foreground rounded py-2.5 text-sm font-semibold mono hover:opacity-90 transition-opacity disabled:opacity-50"
          onClick={() => createPosition.mutate()}
          disabled={createPosition.isPending}
          data-testid="execute-button"
        >
          {createPosition.isPending ? "Recording position…" : `Record Position — ${signal.coin} Short HL`}
        </button>
        <p className="text-xs text-center text-muted-foreground -mt-2">
          Records this trade in your position ledger. Ensure both legs are live before confirming.
        </p>
      </div>
    </div>
  );
}
