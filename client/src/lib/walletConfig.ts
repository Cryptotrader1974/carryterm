import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrum } from "@reown/appkit/networks";

// Your WalletConnect / Reown Project ID
export const PROJECT_ID = "414ad20fb8d5e751456e8ac7cecb371b";

// CarryTerm builder config — fees accumulate here on every HL fill
export const BUILDER_ADDRESS = "0x12e07604360EF08FA8C40D93eD024CC6E69BeE68" as const;
// 40 = 4 bps in tenths-of-bps (HL's unit)
export const BUILDER_FEE_TENTHS_BPS = 40;

// Hyperliquid uses Arbitrum for wallet-side signatures (approvals, agent keys)
export const networks = [arbitrum] as [typeof arbitrum];

export const wagmiAdapter = new WagmiAdapter({
  projectId: PROJECT_ID,
  networks,
});

// Initialize AppKit modal (singleton — called once at app startup)
createAppKit({
  adapters: [wagmiAdapter],
  projectId: PROJECT_ID,
  networks,
  defaultNetwork: arbitrum,
  metadata: {
    name: "CarryTerm",
    description: "Hyperliquid funding rate carry scanner & execution",
    url: "http://159.203.182.234",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#22c55e",
    "--w3m-border-radius-master": "4px",
  },
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
