import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { format } from "date-fns";
import { XCircle } from "lucide-react";
import type { Position } from "@shared/schema";

export function PositionLedger() {
  const qc = useQueryClient();
  const { data: positions = [], isLoading } = useQuery<Position[]>({
    queryKey: ["/api/positions"],
  });

  const closePosition = useMutation({
    mutationFn: (id: number) => apiRequest("PATCH", `/api/positions/${id}/close`, {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/positions"] }),
  });

  const open = positions.filter((p) => p.status === "open");
  const closed = positions.filter((p) => p.status === "closed");

  const totalFunding = open.reduce((s, p) => s + p.fundingCollected, 0);
  const totalFees = open.reduce((s, p) => s + p.feePaid, 0);
  const totalNet = open.reduce((s, p) => s + p.netPnl, 0);

  if (isLoading) return <div className="py-8 text-center text-xs text-muted-foreground">Loading positions…</div>;

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      {open.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Funding Collected", value: `$${totalFunding.toFixed(2)}`, color: "rate-positive" },
            { label: "Fees Paid", value: `-$${totalFees.toFixed(2)}`, color: "rate-negative" },
            { label: "Net P&L", value: `$${totalNet.toFixed(2)}`, color: totalNet >= 0 ? "rate-positive" : "rate-negative" },
          ].map((k) => (
            <div key={k.label} className="bg-card border border-border rounded p-3">
              <p className="text-xs text-muted-foreground mb-1">{k.label}</p>
              <p className={`mono font-semibold text-sm ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Open Positions */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Open Positions</h3>
        {open.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">No open positions. Execute a trade from the Signal Scanner.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["COIN", "NOTIONAL", "HL SIDE", "CEX", "SPREAD@ENTRY", "FUNDING", "NET P&L", "OPENED", ""].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs text-muted-foreground mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {open.map((pos) => (
                <tr key={pos.id} className="data-row border-b border-border/50" data-testid={`position-row-${pos.id}`}>
                  <td className="py-2 px-3 mono font-semibold">{pos.coin}</td>
                  <td className="py-2 px-3 mono text-xs">${pos.notional.toLocaleString()}</td>
                  <td className="py-2 px-3 mono text-xs uppercase">{pos.hlSide}</td>
                  <td className="py-2 px-3 mono text-xs uppercase">{pos.cexVenue}</td>
                  <td className="py-2 px-3 mono text-xs rate-positive">+{pos.spreadAtEntry.toFixed(2)} bps</td>
                  <td className="py-2 px-3 mono text-xs rate-positive">+${pos.fundingCollected.toFixed(2)}</td>
                  <td className={`py-2 px-3 mono text-xs font-medium ${pos.netPnl >= 0 ? "rate-positive" : "rate-negative"}`}>
                    {pos.netPnl >= 0 ? "+" : ""}${pos.netPnl.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-xs text-muted-foreground">{format(pos.openedAt, "MM/dd HH:mm")}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => closePosition.mutate(pos.id)}
                      className="text-muted-foreground hover:text-red-400 transition-colors"
                      data-testid={`close-position-${pos.id}`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Closed Positions */}
      {closed.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Closed Positions</h3>
          <table className="w-full text-sm opacity-60">
            <thead>
              <tr className="border-b border-border">
                {["COIN", "NOTIONAL", "FUNDING", "NET P&L", "OPENED", "CLOSED"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs text-muted-foreground mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {closed.map((pos) => (
                <tr key={pos.id} className="border-b border-border/30" data-testid={`closed-position-${pos.id}`}>
                  <td className="py-2 px-3 mono text-xs">{pos.coin}</td>
                  <td className="py-2 px-3 mono text-xs">${pos.notional.toLocaleString()}</td>
                  <td className="py-2 px-3 mono text-xs">+${pos.fundingCollected.toFixed(2)}</td>
                  <td className={`py-2 px-3 mono text-xs ${pos.netPnl >= 0 ? "rate-positive" : "rate-negative"}`}>
                    {pos.netPnl >= 0 ? "+" : ""}${pos.netPnl.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-xs text-muted-foreground">{format(pos.openedAt, "MM/dd")}</td>
                  <td className="py-2 px-3 text-xs text-muted-foreground">{pos.closedAt ? format(pos.closedAt, "MM/dd") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
