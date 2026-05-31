import { useState } from "react";
import { Logo } from "../components/Logo";
import { StatusBar } from "../components/StatusBar";
import { SignalScanner } from "../components/SignalScanner";
import { PositionLedger } from "../components/PositionLedger";
import { AlertsPanel } from "../components/AlertsPanel";
import { useLiveData } from "../hooks/useLiveData";
import { BarChart2, Briefcase, Bell, Info } from "lucide-react";

const TABS = [
  { id: "scanner", label: "Signal Scanner", icon: BarChart2 },
  { id: "positions", label: "Position Ledger", icon: Briefcase },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "info", label: "About", icon: Info },
] as const;

type Tab = (typeof TABS)[number]["id"];

export function Dashboard() {
  const [tab, setTab] = useState<Tab>("scanner");
  const liveData = useLiveData();

  const topSignal = liveData.signals[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={26} />
          <div>
            <span className="font-bold text-sm tracking-tight">CarryTerm</span>
            <span className="text-muted-foreground text-xs ml-2">Hyperliquid Funding Intelligence</span>
          </div>
        </div>
        <StatusBar
          connected={liveData.connected}
          lastUpdate={liveData.lastUpdate}
          signalCount={liveData.signals.length}
        />
      </header>

      {/* Top signal banner */}
      {topSignal && topSignal.grossAnnualized > 5 && (
        <div className="bg-green-500/8 border-b border-green-500/20 px-6 py-2 flex items-center gap-4">
          <span className="text-xs text-green-400 font-medium mono">LIVE OPPORTUNITY</span>
          <span className="text-xs mono">
            <strong className="text-foreground">{topSignal.coin}</strong>
            {" "}HL vs {topSignal.bestCexVenue.toUpperCase()} ·{" "}
            <span className="text-green-400">+{topSignal.grossAnnualized.toFixed(1)}% gross ann.</span>
            {" "}· {topSignal.spreadBps.toFixed(2)} bps spread
          </span>
        </div>
      )}

      {/* Tab Nav */}
      <nav className="border-b border-border px-6 flex gap-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs mono transition-colors border-b-2 -mb-px ${
              tab === id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-testid={`tab-${id}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 px-6 py-5 overflow-auto">
        {tab === "scanner" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-sm font-semibold">Signal Scanner</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Net annualized carry after fees · Short HL perp / Long CEX perp · Sorted by gross yield
                </p>
              </div>
              <div className="flex gap-2 text-xs mono text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm score-high inline-block" /> &gt;15% ann.</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm score-medium inline-block" /> 5–15%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm score-low inline-block" /> &lt;5%</span>
              </div>
            </div>
            <SignalScanner signals={liveData.signals} />
          </div>
        )}

        {tab === "positions" && (
          <div>
            <div className="mb-4">
              <h1 className="text-sm font-semibold">Position Ledger</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Track open delta-neutral positions, funding collected, and net P&L</p>
            </div>
            <PositionLedger />
          </div>
        )}

        {tab === "alerts" && (
          <div>
            <div className="mb-4">
              <h1 className="text-sm font-semibold">Alert Rules</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Server-side alerts fire even when the browser is closed · 15-minute cooldown per rule</p>
            </div>
            <AlertsPanel />
          </div>
        )}

        {tab === "info" && (
          <div className="max-w-2xl space-y-5">
            <div>
              <h1 className="text-sm font-semibold mb-3">About CarryTerm</h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                CarryTerm monitors funding rate differentials between Hyperliquid perpetuals and CEX venues (Binance, Bybit, OKX) in real time. It surfaces delta-neutral carry opportunities ranked by net annualized yield after fees, and lets you record and track positions against a live ledger.
              </p>
            </div>

            <div className="bg-card border border-border rounded p-4 space-y-3">
              <p className="text-xs font-medium">Builder Code</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="text-muted-foreground">Builder Address</span>
                <span className="mono text-primary break-all">0x12e07604360EF08FA8C40D93eD024CC6E69BeE68</span>
                <span className="text-muted-foreground">Fee Rate</span>
                <span className="mono">4 bps (0.04%) on all HL fills</span>
                <span className="text-muted-foreground">Collection</span>
                <span className="mono">On-chain, automatic</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded p-4 space-y-2">
              <p className="text-xs font-medium">Data Sources</p>
              <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                <span>Hyperliquid</span><span className="mono">metaAndAssetCtxs · predictedFundings</span>
                <span>Binance</span><span className="mono">fapi/v1/premiumIndex</span>
                <span>Bybit</span><span className="mono">v5/market/tickers</span>
                <span>OKX</span><span className="mono">api/v5/public/funding-rate</span>
              </div>
              <p className="text-xs text-muted-foreground pt-1">All rates normalized to 8h equivalent. Refresh interval: 30 seconds.</p>
            </div>

            <div className="bg-card border border-border rounded p-4">
              <p className="text-xs font-medium mb-2">Risk Disclosure</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Funding rate arbitrage involves real financial risk. Rates can invert, slippage may exceed estimates, and liquidation is possible at elevated leverage. This tool is for monitoring and record-keeping only. Nothing here constitutes financial advice. US persons: Hyperliquid's official interface geo-blocks US residents — consult legal counsel before trading.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
