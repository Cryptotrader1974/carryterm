import { useState } from "react";
import { X, AlertTriangle, ExternalLink, Copy, CheckCircle, BookOpen } from "lucide-react";
import type { SignalRow } from "../hooks/useLiveData";

const HL_TAKER = 0.00045;
const CEX_TAKER = 0.00050;

interface Props {
  signal: SignalRow;
  onClose: () => void;
}

const CEX_URLS: Record<string, string> = {
  okx: "https://www.okx.com/trade-swap",
  binance: "https://www.binance.com/en/futures",
  bybit: "https://www.bybit.com/trade/usdt",
  gate: "https://www.gate.io/futures",
  kucoin: "https://www.kucoin.com/futures",
};

export function ExecutionDrawer({ signal, onClose }: Props) {
  const [notional, setNotional] = useState(10000);
  const [copied, setCopied] = useState<string | null>(null);

  // P&L math
  const grossMonthly = notional * (signal.grossAnnualized / 100) / 12;
  const entryFeeUsd = notional * (HL_TAKER + CEX_TAKER);
  const exitFeeUsd = notional * (HL_TAKER + CEX_TAKER);
  const totalRoundTripUsd = entryFeeUsd + exitFeeUsd;
  const dailyCarryUsd = notional * (signal.grossAnnualized / 100) / 365;
  const breakevenDays = dailyCarryUsd > 0 ? totalRoundTripUsd / dailyCarryUsd : Infinity;
  const netMonthly = grossMonthly - (totalRoundTripUsd / 12);

  const cexName = signal.bestCexVenue.toUpperCase();
  const cexUrl = CEX_URLS[signal.bestCexVenue] ?? `https://www.${signal.bestCexVenue}.com`;

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const steps = [
    {
      num: 1,
      title: `Open a SHORT on Hyperliquid`,
      exchange: "Hyperliquid",
      url: `https://app.hyperliquid.xyz/trade/${signal.coin}`,
      urlLabel: `Trade ${signal.coin} on HL →`,
      detail: `Go to the ${signal.coin}-PERP market on Hyperliquid. Place a SHORT (sell) position for approximately $${notional.toLocaleString()} notional. Use a market order for immediate fill, or a limit order near the current mark price.`,
      badge: "SHORT",
      badgeColor: "text-red-400 bg-red-500/10 border-red-500/20",
      copyValue: `SHORT ${signal.coin}-PERP $${notional.toLocaleString()} notional on Hyperliquid`,
      copyKey: "hl",
    },
    {
      num: 2,
      title: `Open a LONG on ${cexName}`,
      exchange: cexName,
      url: cexUrl,
      urlLabel: `Trade ${signal.coin} on ${cexName} →`,
      detail: `Simultaneously go to ${cexName} and open a LONG (buy) position on ${signal.coin} perpetual futures for the same $${notional.toLocaleString()} notional. Both legs must be the same size to remain delta-neutral.`,
      badge: "LONG",
      badgeColor: "text-green-400 bg-green-500/10 border-green-500/20",
      copyValue: `LONG ${signal.coin}-PERP $${notional.toLocaleString()} notional on ${cexName}`,
      copyKey: "cex",
    },
    {
      num: 3,
      title: "Collect funding payments",
      exchange: null,
      url: null,
      urlLabel: null,
      detail: `Funding payments settle every 8 hours on Hyperliquid (at 00:00, 08:00, 16:00 UTC). You receive funding on the HL short leg. Monitor the spread daily — close both legs simultaneously when the spread compresses toward zero or inverts.`,
      badge: null,
      badgeColor: "",
      copyValue: null,
      copyKey: null,
    },
    {
      num: 4,
      title: "Close both legs simultaneously",
      exchange: null,
      url: null,
      urlLabel: null,
      detail: `To exit: close the HL SHORT (buy to close) and the ${cexName} LONG (sell to close) at the same time. Closing legs at different times exposes you to directional price risk. Target a hold period of at least ${isFinite(breakevenDays) ? Math.ceil(breakevenDays) : 30} days to cover round-trip fees.`,
      badge: null,
      badgeColor: "",
      copyValue: null,
      copyKey: null,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md bg-card border-l border-border h-full overflow-y-auto p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
        data-testid="trade-guide-drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold mono">{signal.coin} — Delta-Neutral Carry</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Short HL perp · Long {cexName} perp
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" data-testid="drawer-close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Spread Summary */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "HL Rate/8h", value: `+${(signal.hlRate8h * 100).toFixed(4)}%`, color: "rate-positive" },
            { label: `${cexName} Rate/8h`, value: `${signal.bestCexRate8h >= 0 ? "+" : ""}${(signal.bestCexRate8h * 100).toFixed(4)}%`, color: "rate-neutral" },
            { label: "Gross Ann.", value: `+${signal.grossAnnualized.toFixed(1)}%`, color: "rate-positive" },
            { label: "Net Ann. (30d)", value: `${signal.netAnnualized > 0 ? "+" : ""}${signal.netAnnualized.toFixed(1)}%`, color: signal.netAnnualized > 0 ? "rate-positive" : "rate-negative" },
          ].map((item) => (
            <div key={item.label} className="bg-secondary rounded p-3">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className={`mono font-semibold text-sm ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Notional Input */}
        <div>
          <label className="text-xs text-muted-foreground block mb-1.5">Position size per side (USD)</label>
          <input
            type="number"
            value={notional}
            onChange={(e) => setNotional(Math.max(1000, Number(e.target.value)))}
            className="w-full bg-input border border-border rounded px-3 py-2 mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            data-testid="notional-input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Total capital deployed: ${(notional * 2).toLocaleString()} (both legs combined)
          </p>
        </div>

        {/* P&L Preview */}
        <div className="bg-secondary rounded p-4 space-y-2.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">P&L Estimate</p>
          {[
            { label: "Est. gross carry/month", value: `$${grossMonthly.toFixed(0)}` },
            { label: "Round-trip fees (entry + exit)", value: `-$${totalRoundTripUsd.toFixed(0)}`, small: true },
            { label: "Est. net carry/month", value: `$${netMonthly.toFixed(0)}`, highlight: true },
            {
              label: `Breakeven hold: ${isFinite(breakevenDays) ? breakevenDays.toFixed(1) + "d" : "∞"}`,
              value: "one-time fee",
              small: true,
            },
          ].map((row) => (
            <div key={row.label} className={`flex justify-between ${row.small ? "opacity-60" : ""}`}>
              <span className={`text-xs ${row.small ? "text-muted-foreground" : "text-foreground"}`}>{row.label}</span>
              <span className={`mono text-xs font-medium ${row.highlight ? "rate-positive" : "text-foreground"}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Risk Warning */}
        <div className="flex gap-2 bg-yellow-500/8 border border-yellow-500/20 rounded p-3">
          <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Not financial advice.</strong> Funding rates can reverse
            at any time. Both legs must be opened and closed simultaneously to maintain delta-neutrality.
            Only trade capital you can afford to lose. You are solely responsible for all trading decisions.
          </p>
        </div>

        {/* Step-by-step Instructions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">How to Place This Trade</p>
          </div>

          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.num} className="border border-border rounded p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                      {step.num}
                    </div>
                    <p className="text-xs font-semibold text-foreground">{step.title}</p>
                  </div>
                  {step.badge && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border mono ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed pl-7">{step.detail}</p>

                <div className="flex items-center gap-2 pl-7">
                  {step.url && (
                    <a
                      href={step.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      data-testid={`link-exchange-${step.num}`}
                    >
                      {step.urlLabel}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {step.copyValue && (
                    <button
                      onClick={() => copyText(step.copyValue!, step.copyKey!)}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`copy-step-${step.num}`}
                    >
                      {copied === step.copyKey ? (
                        <><CheckCircle className="w-3 h-3 text-green-400" /> Copied</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy details</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer footer */}
        <div className="border border-border/50 rounded p-3 mt-auto">
          <p className="text-xs text-muted-foreground leading-relaxed">
            CarryTerm provides information and analysis only. It does not execute trades, hold funds, custody assets,
            or provide investment advice. All trades are placed directly by you on third-party exchanges.
            Past funding rates do not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
}
