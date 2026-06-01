import { useState } from "react";
import { Logo } from "../components/Logo";
import { StatusBar } from "../components/StatusBar";
import { SignalScanner } from "../components/SignalScanner";
import { PositionLedger } from "../components/PositionLedger";
import { AlertsPanel } from "../components/AlertsPanel";
import { useLiveData } from "../hooks/useLiveData";
import { BarChart2, Briefcase, Bell, Info, BookOpen } from "lucide-react";

const TABS = [
  { id: "scanner", label: "Signal Scanner", icon: BarChart2 },
  { id: "positions", label: "Position Ledger", icon: Briefcase },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "howto", label: "How It Works", icon: BookOpen },
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
        <div className="flex items-center gap-3">
          <StatusBar
            connected={liveData.connected}
            lastUpdate={liveData.lastUpdate}
            signalCount={liveData.signals.length}
          />
        </div>
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

        {tab === "howto" && (
          <div className="max-w-2xl space-y-8">

            {/* ── Beginner Concepts ── */}
            <div>
              <h1 className="text-sm font-semibold mb-0.5">New to crypto? Start here.</h1>
              <p className="text-xs text-muted-foreground mb-4">Plain-English answers to the questions everyone has before their first trade.</p>

              {[
                {
                  q: "What is a wallet?",
                  a: "A crypto wallet is like a bank account you control completely — no institution holds your funds. It's a free browser extension (Rabby or MetaMask) that lets you send, receive, and sign transactions. You create it in 2 minutes and it gives you a unique address (like 0x1234…) that identifies you on-chain. No name, email, or ID required.",
                  link: { label: "Get Rabby Wallet (recommended)", url: "https://rabby.io" },
                },
                {
                  q: "What is USDC?",
                  a: "USDC is a digital dollar — 1 USDC always equals $1 USD, guaranteed by Circle (a regulated US financial company). It's the currency used on Hyperliquid for all deposits and profits. You buy it the same way you'd buy any currency: on an exchange like Coinbase, then transfer it to your wallet.",
                },
                {
                  q: "What is Arbitrum?",
                  a: "Arbitrum is a faster, cheaper version of the Ethereum blockchain. Fees are about $0.10 per transaction instead of $20+ on mainnet. When you withdraw USDC from Coinbase to your wallet, you must select 'Arbitrum One' as the network — otherwise the funds land on the wrong chain and are harder to recover.",
                },
                {
                  q: "What is Hyperliquid?",
                  a: "Hyperliquid (HL) is a decentralized crypto exchange for trading perpetual contracts. It's not a company — it's a protocol running on its own blockchain. There's no KYC, no account creation, and no intermediary holding your funds. You connect your wallet and trade directly. It is currently geo-restricted for US residents.",
                },
                {
                  q: "What is a perpetual contract (perp)?",
                  a: "A perpetual contract lets you bet on whether a crypto asset goes up or down in price — without actually owning the asset. Unlike futures, perps never expire. To keep the perp price anchored to the real spot price, a periodic payment called a 'funding rate' flows between traders who are long (betting up) and short (betting down).",
                },
                {
                  q: "What is a funding rate?",
                  a: "Every hour on Hyperliquid, a small payment moves between long and short traders. When the funding rate is positive, longs pay shorts. When it's negative, shorts pay longs. The rate reflects how much demand there is to be long vs short. CarryTerm finds coins where HL's funding rate is meaningfully higher than the same rate on a CEX (Binance, Bybit, OKX), creating an opportunity to collect the difference.",
                },
                {
                  q: "What does 'delta-neutral' mean?",
                  a: "Delta-neutral means you have zero net exposure to the price of the asset. If you SHORT $10,000 of SOL on Hyperliquid and simultaneously LONG $10,000 of SOL on OKX, you don't care if SOL goes up or down — gains on one leg offset losses on the other. Your only profit comes from the funding rate spread between the two venues.",
                },
                {
                  q: "What is a CEX?",
                  a: "CEX stands for Centralized Exchange — platforms like Binance, Bybit, and OKX that are run by companies and require account creation. CarryTerm uses CEX funding rates as the hedge leg. You'll need an account on whichever CEX is shown as the best venue for a given signal.",
                  link: { label: "Open an OKX account", url: "https://www.okx.com/join/carryterm" },
                },
              ].map(({ q, a, link }) => (
                <div key={q} className="border border-border/60 rounded p-4 mb-3">
                  <p className="text-xs font-semibold mb-1.5">{q}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a}</p>
                  {link && (
                    <a href={link.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline mt-2 inline-block">
                      {link.label} →
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* ── Step by Step ── */}
            <div>
              <h2 className="text-sm font-semibold mb-0.5">Step-by-step setup</h2>
              <p className="text-xs text-muted-foreground mb-4">Follow these steps in order. Budget about 30 minutes for the first time.</p>

              {[
                {
                  step: "1",
                  title: "Install a wallet",
                  body: "Download Rabby Wallet as a Chrome/Brave browser extension from rabby.io. Click 'Create New Wallet', write down your 12-word seed phrase on paper and store it somewhere safe — this is the only way to recover your wallet if you lose access. Never share it with anyone or enter it into any website.",
                  link: { label: "rabby.io", url: "https://rabby.io" },
                },
                {
                  step: "2",
                  title: "Buy USDC on Coinbase",
                  body: "Create an account on Coinbase (US-friendly, regulated). Buy USDC — the dollar amount you want to trade with. Then go to Send → paste your Rabby wallet address → select 'Arbitrum One' as the network. Do not select 'Ethereum' or 'Base'. USDC will arrive in your wallet within a few minutes.",
                  link: { label: "coinbase.com", url: "https://www.coinbase.com" },
                },
                {
                  step: "3",
                  title: "Deposit to Hyperliquid",
                  body: "Go to app.hyperliquid.xyz (note: currently geo-restricted for US IP addresses). Click 'Connect Wallet' → connect Rabby → click 'Deposit' → enter your USDC amount → confirm the transaction in Rabby. Your USDC moves from Arbitrum to Hyperliquid's native chain in about 1 minute. No deposit fee.",
                  link: { label: "app.hyperliquid.xyz", url: "https://app.hyperliquid.xyz" },
                },
                {
                  step: "4",
                  title: "Open a CEX account for the hedge leg",
                  body: "You also need an account on the CEX shown in CarryTerm's signal — usually OKX, Binance, or Bybit. Create an account, complete KYC (ID verification), and deposit enough USDC or USDT to match your Hyperliquid position size. The two positions must be equal in notional size for the trade to be delta-neutral.",
                  link: { label: "okx.com", url: "https://www.okx.com" },
                },
                {
                  step: "5",
                  title: "Read a signal in CarryTerm",
                  body: "Back on CarryTerm, the Signal Scanner shows all HL perps ranked by net annualized yield. The top row is the highest-yield opportunity right now. Gross Ann. is the total spread before fees. Net Ann. (30d) accounts for entry and exit fees assuming a 30-day hold. Breakeven Hold tells you how many days until fees are recovered — after that, everything is profit.",
                },
                {
                  step: "6",
                  title: "Open the HL short leg",
                  body: "Go to app.hyperliquid.xyz, find the coin shown in the CarryTerm signal, and open a SHORT (sell) perpetual position for your chosen notional amount. Use a market order for immediate fill. Note the exact fill price and size.",
                  link: { label: "app.hyperliquid.xyz", url: "https://app.hyperliquid.xyz" },
                },
                {
                  step: "7",
                  title: "Immediately open the CEX long",
                  body: "Within seconds of your HL short filling, log into your CEX account and open a LONG position on the same coin for the same dollar amount. Speed matters — every minute you're unhedged you have full price exposure. On OKX: go to Derivatives → USDT Perpetuals → search the coin → set to 'Cross' margin → buy/long at market.",
                },
                {
                  step: "8",
                  title: "Collect funding and monitor",
                  body: "Hyperliquid pays funding every hour directly to your margin balance. You can verify this in your HL account under 'Funding History'. CarryTerm's Position Ledger tracks your estimated accumulated carry. Set an alert in the Alerts tab to notify you if the spread compresses below a threshold — that's your signal to consider closing.",
                },
                {
                  step: "9",
                  title: "Close both legs simultaneously",
                  body: "To exit: close the HL short (buy to close on HL) and the CEX long (sell to close on your CEX) as close to simultaneously as possible. Any gap between closures leaves you directionally exposed to price. Record your final P&L in the Position Ledger for tracking.",
                },
              ].map(({ step, title, body, link }) => (
                <div key={step} className="bg-card border border-border rounded p-4 flex gap-4 mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold mono flex-shrink-0 mt-0.5">{step}</div>
                  <div>
                    <p className="text-xs font-semibold mb-1">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                    {link && (
                      <a href={link.url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1.5 inline-block">
                        {link.label} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Common Questions ── */}
            <div>
              <h2 className="text-sm font-semibold mb-0.5">Common questions</h2>
              <p className="text-xs text-muted-foreground mb-4">Things people ask after their first trade.</p>

              {[
                {
                  q: "What happens if I only open one leg?",
                  a: "You are no longer delta-neutral. If you only short HL and don't open the CEX long, you have a naked short — you profit if the price falls and lose if it rises. This defeats the purpose of a carry trade and dramatically increases risk. Always open both legs before the price moves.",
                },
                {
                  q: "Can the funding rate flip and cost me money?",
                  a: "Yes. Funding rates change constantly. If HL's rate drops below the CEX rate, the spread inverts and you start losing carry instead of earning it. This is the primary risk of the trade. The Alerts tab lets you set a threshold so you're notified when the spread compresses — giving you time to exit before it turns negative.",
                },
                {
                  q: "How much money do I need to get started?",
                  a: "The minimum HL order size is $10, but practically speaking, fees make very small positions uneconomical. At $1,000 notional per side ($2,000 total), a 13% gross yield earns about $11/month — against a $19 round-trip fee. Breakeven is around 50 days. $5,000–$10,000 per side is a more realistic starting point where the math works comfortably.",
                },
                {
                  q: "How do I know the trade is working?",
                  a: "After each hourly funding settlement on HL, your margin balance should increase slightly (you can check under Funding History on the HL app). On the CEX side, your funding is also accruing in your position PnL. CarryTerm's Position Ledger estimates this for you based on the rate at entry, but checking the actual HL funding history is the ground truth.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border border-border/60 rounded p-4 mb-3">
                  <p className="text-xs font-semibold mb-1.5">{q}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            {/* ── Risk Warning ── */}
            <div className="bg-yellow-500/8 border border-yellow-500/20 rounded p-4">
              <p className="text-xs font-semibold text-yellow-400 mb-1">Risk Warning</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Funding rates can invert at any time, making the trade unprofitable. Slippage on entry and exit may exceed estimates, particularly in volatile markets. Smart contract and exchange counterparty risk exist on both legs. This tool is for informational purposes only and is not financial advice. Never trade more than you can afford to lose entirely.
              </p>
            </div>

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
              <p className="text-xs font-medium">Signal Methodology</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="text-muted-foreground">Spread calculation</span>
                <span className="mono">HL rate − best CEX rate (8h equiv.)</span>
                <span className="text-muted-foreground">Fee model</span>
                <span className="mono">HL taker 4.5bps + CEX taker 5bps × 2</span>
                <span className="text-muted-foreground">Annualization</span>
                <span className="mono">8h rate × 3 × 365 × 100</span>
                <span className="text-muted-foreground">Net yield basis</span>
                <span className="mono">30-day hold assumption</span>
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
