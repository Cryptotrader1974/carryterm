# CarryTerm

**Live Hyperliquid funding rate carry scanner.**

Ranks every Hyperliquid perpetual by net annualized yield from a delta-neutral carry trade — short HL, long the best CEX venue — updated every 30 seconds.

🔗 **[Live app → http://159.203.182.234](http://159.203.182.234)**

---

## What it does

Funding rate carry is one of the oldest trades in crypto: when a perpetual contract's funding rate on one venue is meaningfully higher than another, you can capture the spread by going short on the high-rate venue and long on the low-rate venue simultaneously. Because both legs offset each other's price exposure, the trade is delta-neutral — you don't care if the asset goes up or down. Your only profit is the rate differential, paid every hour.

CarryTerm monitors all 230+ Hyperliquid perps against Binance, Bybit, and OKX in real time, ranks them by net carry after fees, and surfaces the opportunities worth acting on.

---

## Live signals (auto-updated daily)

| Coin | Gross Ann. | Net Ann. | Spread | HL Rate/8h | Best CEX | Venue |
|------|-----------|----------|--------|-----------|----------|-------|
| ADA  | +11.3% | +10.5% | +1.03 bps | +0.0100%/8h | -0.0003%/8h | OKX |
| BTC  | +7.0%  | +6.2%  | +0.64 bps | +0.0100%/8h | +0.0036%/8h | OKX |
| XRP  | +4.0%  | +3.2%  | +0.37 bps | -0.0004%/8h | -0.0041%/8h | OKX |
| ETH  | +3.9%  | +3.2%  | +0.36 bps | +0.0100%/8h | +0.0064%/8h | OKX |
| SOL  | +3.7%  | +2.9%  | +0.34 bps | +0.0100%/8h | +0.0066%/8h | OKX |

*Data from [CarryTerm live app](http://159.203.182.234) · Updated daily · Rates change constantly — check the app for current values*

---

## How the trade works

**Short HL + Long CEX = delta-neutral carry**

```
You SHORT $10,000 of SOL on Hyperliquid   → receive HL funding rate every hour
You LONG  $10,000 of SOL on OKX           → pay OKX funding rate every 8 hours

Net carry per 8h = HL rate - CEX rate
Annualized       = net carry × 3 periods/day × 365 days
```

If HL pays +0.01%/8h and OKX charges +0.006%/8h, your net is +0.004%/8h = **+4.4% annualized** on $10,000 notional per side (~$37/month) with no directional price risk.

When the CEX rate is **negative**, longs receive funding there too — both legs pay you simultaneously, widening the spread further.

---

## Features

- **230+ coins** monitored across Hyperliquid, Binance, Bybit, and OKX
- **Real-time WebSocket** push — rates update every 30 seconds
- **Signal scanner** — sortable table ranked by net annualized yield
- **Execution drawer** — P&L preview, breakeven days, one-click HL order placement
- **On-chain execution** — WalletConnect integration, EIP-712 agent key signing, builder code attached to every fill
- **Position ledger** — track open trades, estimated funding collected, net P&L
- **Server-side alerts** — fire even when the browser is closed
- **How It Works** — full beginner guide: wallets, USDC, Arbitrum, CEX setup, 9-step trade walkthrough, FAQs

---

## Builder code

All Hyperliquid fills routed through CarryTerm attach builder code:

```
Builder address: 0x12e07604360EF08FA8C40D93eD024CC6E69BeE68
Fee rate:        4 bps (0.04%) on all HL fills
Collection:      On-chain, automatic
```

Users approve a one-time maximum fee on first use. The builder fee accumulates on-chain and is claimable via the standard Hyperliquid referral reward mechanism.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Tailwind CSS, Radix UI, wagmi v3, Reown AppKit |
| Backend | Node.js, Express, SQLite (better-sqlite3), Drizzle ORM |
| Data | Hyperliquid REST API, OKX REST API, Binance FAPI, Bybit v5 |
| Wallet | WalletConnect / Reown AppKit, viem, EIP-712 agent signing |
| Infra | DigitalOcean droplet (Ubuntu), systemd, iptables port forward |

---

## Self-hosting

```bash
git clone https://github.com/Cryptotrader1974/carryterm.git
cd carryterm
npm install
cp .env.example .env   # add your WalletConnect Project ID
npm run build
npm start              # runs on port 5000
```

Requires Node.js 20+. The app polls Hyperliquid every 30 seconds automatically on startup. No API keys required for read-only data.

---

## Disclaimer

This tool is for informational purposes only and is not financial advice. Funding rates can invert at any time. Always verify rates on the source exchanges before executing. Never trade more than you can afford to lose.
