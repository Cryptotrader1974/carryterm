/**
 * Hyperliquid on-chain execution helpers
 *
 * Flow:
 * 1. approveBuilderFee   — one-time EIP-712 signature on Arbitrum
 * 2. approveAgent        — one-time EIP-712, creates a session key for order signing
 * 3. placeOrder          — session key signs every order locally (no wallet popup per trade)
 *
 * All orders include the CarryTerm builder code so fees accrue automatically.
 */

import { type WalletClient, createWalletClient, http, type Hex, encodePacked, keccak256, toHex } from "viem";
import { arbitrum } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { BUILDER_ADDRESS, BUILDER_FEE_TENTHS_BPS } from "./walletConfig";

const HL_API = "https://api.hyperliquid.xyz";

// ── Types ────────────────────────────────────────────────────────────────────

export interface AgentSession {
  privateKey: Hex;
  address: Hex;
}

export interface OrderParams {
  coin: string;
  isBuy: boolean;
  sz: number;         // size in base asset units
  limitPx: number;   // 0 for market (use slippage)
  isMarket: boolean;
}

export interface OrderResult {
  status: "ok" | "err";
  response?: any;
  error?: string;
}

// ── Nonce (timestamp-based, HL accepts ms timestamps) ────────────────────────

function nonce() {
  return Date.now();
}

// ── Action hash helpers ──────────────────────────────────────────────────────

function actionHash(action: object, vaultAddress: Hex | null, ts: number): Hex {
  const actionBytes = new TextEncoder().encode(JSON.stringify(action));
  const tsBytes = new Uint8Array(8);
  const dv = new DataView(tsBytes.buffer);
  dv.setBigUint64(0, BigInt(ts), false);
  const vaultByte = vaultAddress ? new Uint8Array([1, ...hexToBytes(vaultAddress)]) : new Uint8Array([0]);
  const combined = new Uint8Array(actionBytes.length + 8 + vaultByte.length);
  combined.set(actionBytes, 0);
  combined.set(tsBytes, actionBytes.length);
  combined.set(vaultByte, actionBytes.length + 8);
  return keccak256(combined);
}

function hexToBytes(hex: Hex): Uint8Array {
  const h = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = new Uint8Array(h.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

// ── EIP-712 domain for HL action signing ─────────────────────────────────────
// HL uses chainId 1337 for L1 action signing — handled via agent key locally

const HL_ACTION_DOMAIN = {
  name: "Exchange",
  version: "1",
  chainId: 1337,
  verifyingContract: "0x0000000000000000000000000000000000000000" as Hex,
} as const;

const AGENT_DOMAIN = {
  name: "Exchange",
  version: "1",
  chainId: 42161, // Arbitrum — wallet signs this one
  verifyingContract: "0x0000000000000000000000000000000000000000" as Hex,
} as const;

// ── 1. Check current builder fee approval ────────────────────────────────────

export async function getMaxBuilderFee(userAddress: Hex): Promise<number> {
  const res = await fetch(`${HL_API}/info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "maxBuilderFee", user: userAddress, builder: BUILDER_ADDRESS }),
  });
  const data = await res.json();
  return typeof data === "number" ? data : 0;
}

// ── 2. Approve builder fee (one-time, wallet signs on Arbitrum) ──────────────

export async function approveBuilderFee(walletClient: WalletClient, userAddress: Hex): Promise<void> {
  const ts = nonce();
  const action = {
    type: "approveBuilderFee",
    maxFeeRate: `${BUILDER_FEE_TENTHS_BPS}`,
    builder: BUILDER_ADDRESS,
    nonce: ts,
  };

  const sig = await walletClient.signTypedData({
    account: userAddress,
    domain: AGENT_DOMAIN,
    types: {
      "HyperliquidTransaction:ApproveBuilderFee": [
        { name: "hyperliquidChainName", type: "string" },
        { name: "maxFeeRate", type: "string" },
        { name: "builder", type: "address" },
        { name: "nonce", type: "uint64" },
      ],
    },
    primaryType: "HyperliquidTransaction:ApproveBuilderFee",
    message: {
      hyperliquidChainName: "Mainnet",
      maxFeeRate: `${BUILDER_FEE_TENTHS_BPS}`,
      builder: BUILDER_ADDRESS,
      nonce: BigInt(ts),
    },
  });

  const r = `0x${sig.slice(2, 66)}` as Hex;
  const s = `0x${sig.slice(66, 130)}` as Hex;
  const vHex = sig.slice(130, 132);
  const v = parseInt(vHex, 16);

  await fetch(`${HL_API}/exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action,
      nonce: ts,
      signature: { r, s, v },
    }),
  });
}

// ── 3. Approve agent / create session key ────────────────────────────────────

export async function createAgentSession(walletClient: WalletClient, userAddress: Hex): Promise<AgentSession> {
  const pk = generatePrivateKey();
  const agentAccount = privateKeyToAccount(pk);
  const ts = nonce();

  const sig = await walletClient.signTypedData({
    account: userAddress,
    domain: AGENT_DOMAIN,
    types: {
      "HyperliquidTransaction:ApproveAgent": [
        { name: "hyperliquidChainName", type: "string" },
        { name: "agentAddress", type: "address" },
        { name: "agentName", type: "string" },
        { name: "nonce", type: "uint64" },
      ],
    },
    primaryType: "HyperliquidTransaction:ApproveAgent",
    message: {
      hyperliquidChainName: "Mainnet",
      agentAddress: agentAccount.address,
      agentName: "CarryTerm",
      nonce: BigInt(ts),
    },
  });

  const r = `0x${sig.slice(2, 66)}` as Hex;
  const s = `0x${sig.slice(66, 130)}` as Hex;
  const v = parseInt(sig.slice(130, 132), 16);

  const resp = await fetch(`${HL_API}/exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: {
        type: "approveAgent",
        hyperliquidChainName: "Mainnet",
        agentAddress: agentAccount.address,
        agentName: "CarryTerm",
        nonce: ts,
      },
      nonce: ts,
      signature: { r, s, v },
    }),
  });

  const data = await resp.json();
  if (data?.status === "err") throw new Error(data.response ?? "Agent approval failed");

  return { privateKey: pk, address: agentAccount.address };
}

// ── 4. Place order via agent session key ─────────────────────────────────────

export async function placeOrder(agent: AgentSession, params: OrderParams): Promise<OrderResult> {
  const agentAccount = privateKeyToAccount(agent.privateKey);
  const agentWalletClient = createWalletClient({
    account: agentAccount,
    chain: { id: 1337, name: "HyperliquidL1", nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 }, rpcUrls: { default: { http: [HL_API] } } },
    transport: http(HL_API),
  });

  const ts = nonce();

  // For market orders: use slippage-based limit price
  const slippage = 0.001; // 0.1% slippage tolerance
  const limitPx = params.isMarket
    ? params.isBuy
      ? parseFloat((params.limitPx * (1 + slippage)).toFixed(6))
      : parseFloat((params.limitPx * (1 - slippage)).toFixed(6))
    : params.limitPx;

  const orderAction = {
    type: "order",
    orders: [
      {
        a: await getCoinIndex(params.coin),
        b: params.isBuy,
        p: limitPx.toString(),
        s: params.sz.toString(),
        r: false,
        t: { limit: { tif: params.isMarket ? "Ioc" : "Gtc" } },
      },
    ],
    grouping: "na",
    builder: {
      b: BUILDER_ADDRESS,
      f: BUILDER_FEE_TENTHS_BPS,
    },
  };

  const sig = await agentWalletClient.signTypedData({
    account: agentAccount,
    domain: HL_ACTION_DOMAIN,
    types: {
      Agent: [
        { name: "source", type: "string" },
        { name: "connectionId", type: "bytes32" },
      ],
    },
    primaryType: "Agent",
    message: {
      source: "a",
      connectionId: actionHash(orderAction, null, ts),
    },
  });

  const r = `0x${sig.slice(2, 66)}` as Hex;
  const s = `0x${sig.slice(66, 130)}` as Hex;
  const v = parseInt(sig.slice(130, 132), 16);

  const res = await fetch(`${HL_API}/exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: orderAction, nonce: ts, signature: { r, s, v } }),
  });

  const data = await res.json();
  if (data?.status === "err") return { status: "err", error: data.response };
  return { status: "ok", response: data };
}

// ── Coin index lookup (HL uses integer asset index) ──────────────────────────

let _metaCache: any = null;
async function getCoinIndex(coin: string): Promise<number> {
  if (!_metaCache) {
    const res = await fetch(`${HL_API}/info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "meta" }),
    });
    _metaCache = await res.json();
  }
  const idx = _metaCache.universe.findIndex((u: any) => u.name === coin);
  if (idx === -1) throw new Error(`Unknown coin: ${coin}`);
  return idx;
}

// ── Session storage helpers ───────────────────────────────────────────────────

const SESSION_KEY = "ct_agent_session";

export function saveAgentSession(session: AgentSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadAgentSession(): AgentSession | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as AgentSession; }
  catch { return null; }
}

export function clearAgentSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
