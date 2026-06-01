import { useState } from "react";
import type { SignalRow } from "../hooks/useLiveData";
import { ExecutionDrawer } from "./ExecutionDrawer";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Props {
  signals: SignalRow[];
}

type SortKey = "grossAnnualized" | "netAnnualized" | "spreadBps" | "coin";

function ScoreBadge({ value }: { value: number }) {
  const cls = value > 15 ? "score-high" : value > 5 ? "score-medium" : "score-low";
  return (
    <span className={`px-1.5 py-0.5 rounded text-xs mono font-medium ${cls}`}>
      {value > 0 ? "+" : ""}{value.toFixed(1)}%
    </span>
  );
}

function VenueBadge({ venue }: { venue: string }) {
  const colors: Record<string, string> = {
    binance: "text-yellow-400",
    bybit: "text-orange-400",
    okx: "text-blue-400",
    bitmex: "text-purple-400",
  };
  return <span className={`mono text-xs font-medium ${colors[venue] ?? "text-muted-foreground"}`}>{venue.toUpperCase()}</span>;
}

export function SignalScanner({ signals }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("grossAnnualized");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [selected, setSelected] = useState<SignalRow | null>(null);

  const sorted = [...signals].sort((a, b) => {
    const av = a[sortKey] as number | string;
    const bv = b[sortKey] as number | string;
    const diff = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
    return sortDir === "desc" ? -diff : diff;
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setDir(sortDir === "desc" ? "asc" : "desc");
    else { setSortKey(key); setDir("desc"); }
  };
  const setDir = setSortDir;

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (sortDir === "desc" ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />) : null;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {[
                { key: "coin" as SortKey, label: "COIN" },
                { key: "grossAnnualized" as SortKey, label: "GROSS ANN." },
                { key: "netAnnualized" as SortKey, label: "NET ANN." },
                { key: "spreadBps" as SortKey, label: "SPREAD (BPS)" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="text-left py-2 px-3 text-xs text-muted-foreground mono cursor-pointer hover:text-foreground select-none"
                  onClick={() => handleSort(key)}
                >
                  <span className="flex items-center gap-1">{label}<SortIcon k={key} /></span>
                </th>
              ))}
              <th className="text-left py-2 px-3 text-xs text-muted-foreground mono">HL RATE/8H</th>
              <th className="text-left py-2 px-3 text-xs text-muted-foreground mono">BEST CEX</th>
              <th className="text-left py-2 px-3 text-xs text-muted-foreground mono">VENUE</th>
              <th className="py-2 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted-foreground text-xs">
                  Loading signals…
                </td>
              </tr>
            )}
            {sorted.map((sig) => {
              const hlPct = sig.hlRate8h * 100;
              const cexPct = sig.bestCexRate8h * 100;
              const spreadBps = sig.spreadBps;
              const spreadColor = spreadBps > 20 ? "rate-positive" : spreadBps > 5 ? "rate-warning" : "rate-neutral";

              return (
                <tr
                  key={sig.coin}
                  className="data-row border-b border-border/50"
                  data-testid={`signal-row-${sig.coin}`}
                >
                  <td className="py-2 px-3 font-semibold mono">{sig.coin}</td>
                  <td className="py-2 px-3"><ScoreBadge value={sig.grossAnnualized} /></td>
                  <td className="py-2 px-3"><ScoreBadge value={sig.netAnnualized} /></td>
                  <td className={`py-2 px-3 mono text-xs font-medium ${spreadColor}`}>
                    {spreadBps > 0 ? "+" : ""}{spreadBps.toFixed(2)}
                  </td>
                  <td className={`py-2 px-3 mono text-xs ${hlPct > 0 ? "rate-positive" : "rate-negative"}`}>
                    {hlPct > 0 ? "+" : ""}{hlPct.toFixed(4)}%
                  </td>
                  <td className={`py-2 px-3 mono text-xs ${cexPct > 0 ? "rate-positive" : "rate-neutral"}`}>
                    {cexPct > 0 ? "+" : ""}{cexPct.toFixed(4)}%
                  </td>
                  <td className="py-2 px-3"><VenueBadge venue={sig.bestCexVenue} /></td>
                  <td className="py-2 px-3">
                    <button
                      className="text-xs text-primary hover:underline mono"
                      onClick={() => setSelected(sig)}
                      data-testid={`tradeguide-${sig.coin}`}
                    >
                      Trade Guide →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <ExecutionDrawer signal={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
