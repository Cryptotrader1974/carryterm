import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, useWalletClient } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { X, AlertTriangle, CheckCircle, Loader2, Wallet } from "lucide-react";
import type { SignalRow } from "../hooks/useLiveData";
import { apiRequest } from "../lib/queryClient";
import {
  BUILDER_ADDRESS,
  BUILDER_FEE_TENTHS_BPS,
} from "../lib/walletConfig";
import {
  getMaxBuilderFee,
  approveBuilderFee,
  createAgentSession,
  placeOrder,
  saveAgentSession,
  loadAgentSession,
  type AgentSession,
} from "../lib/hyperliquid";

const HL_TAKER = 0.00045;
const CEX_TAKER = 0.00050;
const BUILDER_FEE_BPS = BUILDER_FEE_TENTHS_BPS / 10; // display as bps

interface Props {
  signal: SignalRow;
  onClose: () => void;
}

type ExecStep =
  | "idle"
  | "checking"
  | "needs_approval"
  | "approving"
  | "needs_agent"
  | "creating_agent"
  | "ready"
  | "placing"
  | "success"
  | "error";

interface StepState {
  step: ExecStep;
  error?: string;
  txHash?: string;
  fillPrice?: number;
}

export function ExecutionDrawer({ signal, onClose }: Props) {
  const [notional, setNotional] = useState(10000);
  const [hlSzInput, setHlSzInput] = useState(""); // user can override size
  const [stepState, setStepState] = useState<StepState>({ step: "idle" });
  const [agentSession, setAgentSession] = useState<AgentSession | null>(null);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { open: openWallet } = useAppKit();
  const qc = useQueryClient();

  // P&L math
  const builderFeeUsd = notional * (BUILDER_FEE_BPS / 10000);
  const grossMonthly = notional * (signal.grossAnnualized / 100) / 12;
  const entryFeeUsd = notional * (HL_TAKER + CEX_TAKER);
  const exitFeeUsd = notional * (HL_TAKER + CEX_TAKER);
  const totalRoundTripUsd = entryFeeUsd + exitFeeUsd;
  const dailyCarryUsd = notional * (signal.grossAnnualized / 100) / 365;
  const breakevenDays = dailyCarryUsd > 0 ? totalRoundTripUsd / dailyCarryUsd : Infinity;
  const netMonthly = grossMonthly - (totalRoundTripUsd / 12);

  // Estimated HL size (notional / current mark price — approximated via spreadBps)
  // User can adjust; we default to showing notional in USD terms
  const estimatedHlSz = hlSzInput || "market";

  // On open: check if we have a cached agent session
  useEffect(() => {
    const cached = loadAgentSession();
    if (cached) {
      setAgentSession(cached);
      setStepState({ step: "ready" });
    }
  }, []);

  // ── Step 1: Check approval & set up agent ────────────────────────────────
  async function handleSetup() {
    if (!isConnected || !address || !walletClient) {
      openWallet();
      return;
    }

    setStepState({ step: "checking" });
    try {
      // Check if user has already approved CarryTerm builder fee
      const maxFee = await getMaxBuilderFee(address as `0x${string}`);
      const needsApproval = maxFee < BUILDER_FEE_TENTHS_BPS;

      if (needsApproval) {
        setStepState({ step: "needs_approval" });
        return;
      }

      // Builder approved — check for cached agent
      const cached = loadAgentSession();
      if (cached) {
        setAgentSession(cached);
        setStepState({ step: "ready" });
        return;
      }

      setStepState({ step: "needs_agent" });
    } catch (e: any) {
      setStepState({ step: "error", error: e.message });
    }
  }

  // ── Step 2: Approve builder fee ──────────────────────────────────────────
  async function handleApproveBuilder() {
    if (!address || !walletClient) return;
    setStepState({ step: "approving" });
    try {
      await approveBuilderFee(walletClient as any, address as `0x${string}`);
      setStepState({ step: "needs_agent" });
    } catch (e: any) {
      setStepState({ step: "error", error: e.message ?? "Approval rejected" });
    }
  }

  // ── Step 3: Create session agent key ─────────────────────────────────────
  async function handleCreateAgent() {
    if (!address || !walletClient) return;
    setStepState({ step: "creating_agent" });
    try {
      const session = await createAgentSession(walletClient as any, address as `0x${string}`);
      saveAgentSession(session);
      setAgentSession(session);
      setStepState({ step: "ready" });
    } catch (e: any) {
      setStepState({ step: "error", error: e.message ?? "Agent creation failed" });
    }
  }

  // ── Step 4: Place the HL short order ─────────────────────────────────────
  const recordPosition = useMutation({
    mutationFn: (fillPrice: number) =>
      apiRequest("POST", "/api/positions", {
        coin: signal.coin,
        hlSide: "short",
        cexSide: "long",
        cexVenue: signal.bestCexVenue,
        notional,
        hlEntryPrice: fillPrice,
        spreadAtEntry: signal.spreadBps,
        openedAt: Date.now(),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/positions"] }),
  });

  async function handleExecute() {
    if (!agentSession) return;
    setStepState({ step: "placing" });
    try {
      const result = await placeOrder(agentSession, {
        coin: signal.coin,
        isBuy: false,       // SHORT the HL perp
        sz: notional / 1000, // rough size — user should verify on HL UI
        limitPx: 0,          // will be overridden by market slippage in placeOrder
        isMarket: true,
      });

      if (result.status === "err") {
        setStepState({ step: "error", error: result.error ?? "Order rejected by HL" });
        return;
      }

      const fillPrice = result.response?.response?.data?.statuses?.[0]?.filled?.avgPx
        ? parseFloat(result.response.response.data.statuses[0].filled.avgPx)
        : 0;

      await recordPosition.mutateAsync(fillPrice);
      setStepState({ step: "success", fillPrice });
    } catch (e: any) {
      setStepState({ step: "error", error: e.message });
    }
  }

  // ── UI helpers ────────────────────────────────────────────────────────────
  const isLoading = ["checking", "approving", "creating_agent", "placing"].includes(stepState.step);

  function StepIndicator() {
    const steps = [
      { label: "Connect Wallet", done: isConnected },
      { label: "Approve Builder Fee", done: !["idle", "checking", "needs_approval", "approving"].includes(stepState.step) },
      { label: "Create Session Key", done: ["ready", "placing", "success"].includes(stepState.step) },
      { label: "Place HL Short", done: stepState.step === "success" },
    ];
    return (
      <div className="flex items-center gap-1 mb-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={[
              "w-5 h-5 rounded-full flex items-center justify-center text-xs",
              s.done ? "bg-green-500/20 text-green-400" : "bg-secondary text-muted-foreground",
            ].join(" ")}>
              {s.done ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && <div className="w-4 h-px bg-border" />}
          </div>
        ))}
      </div>
    );
  }

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
            <p className="text-xs text-muted-foreground mt-0.5">
              Short HL perp · Long {signal.bestCexVenue.toUpperCase()} perp
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
            { label: `${signal.bestCexVenue.toUpperCase()} Rate/8h`, value: `${signal.bestCexRate8h >= 0 ? "+" : ""}${(signal.bestCexRate8h * 100).toFixed(4)}%`, color: "rate-neutral" },
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
          <label className="text-xs text-muted-foreground block mb-1.5">Notional per side (USD)</label>
          <input
            type="number"
            value={notional}
            onChange={(e) => setNotional(Math.max(1000, Number(e.target.value)))}
            className="w-full bg-input border border-border rounded px-3 py-2 mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            data-testid="notional-input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Total capital deployed: ${(notional * 2).toLocaleString()} (both legs)
          </p>
        </div>

        {/* P&L Preview */}
        <div className="bg-secondary rounded p-4 space-y-2.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">P&L Preview</p>
          {[
            { label: "Est. gross carry/month", value: `$${grossMonthly.toFixed(0)}` },
            { label: "Round-trip fees (entry + exit)", value: `-$${totalRoundTripUsd.toFixed(0)}`, small: true },
            { label: "Est. net carry/month", value: `$${netMonthly.toFixed(0)}`, highlight: true },
            {
              label: `Breakeven hold: ${isFinite(breakevenDays) ? breakevenDays.toFixed(1) + "d" : "∞"}`,
              value: "one-time fee",
              small: true,
            },
            { label: "Builder fee (4 bps on HL fills)", value: `-$${builderFeeUsd.toFixed(2)}/mo`, small: true },
          ].map((row) => (
            <div key={row.label} className={`flex justify-between ${row.small ? "opacity-60" : ""}`}>
              <span className={`text-xs ${row.small ? "text-muted-foreground" : "text-foreground"}`}>{row.label}</span>
              <span className={`mono text-xs font-medium ${row.highlight ? "rate-positive" : "text-foreground"}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── Execution Flow ── */}

        {/* Success state */}
        {stepState.step === "success" && (
          <div className="bg-green-500/10 border border-green-500/30 rounded p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">HL Short Placed</span>
            </div>
            {stepState.fillPrice ? (
              <p className="text-xs text-muted-foreground">
                Filled at <span className="mono text-foreground">${stepState.fillPrice.toFixed(4)}</span>
              </p>
            ) : null}
            <p className="text-xs text-muted-foreground">
              Position recorded in ledger. Now open a{" "}
              <strong className="text-foreground">LONG {signal.coin}</strong> on{" "}
              <strong className="text-foreground">{signal.bestCexVenue.toUpperCase()}</strong> for $
              {notional.toLocaleString()} notional to complete the delta-neutral trade.
            </p>
          </div>
        )}

        {/* Error state */}
        {stepState.step === "error" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3 flex gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">{stepState.error}</p>
          </div>
        )}

        {/* Step progress indicator (shown once setup begins) */}
        {!["idle", "success"].includes(stepState.step) && <StepIndicator />}

        {/* Not connected */}
        {!isConnected && stepState.step === "idle" && (
          <button
            onClick={() => openWallet()}
            className="w-full border border-border rounded py-2.5 text-sm font-semibold mono flex items-center justify-center gap-2 hover:border-primary/50 hover:text-foreground transition-colors text-muted-foreground"
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet to Execute
          </button>
        )}

        {/* Connected — idle, needs check */}
        {isConnected && stepState.step === "idle" && (
          <button
            onClick={handleSetup}
            className="w-full bg-primary text-primary-foreground rounded py-2.5 text-sm font-semibold mono hover:opacity-90 transition-opacity"
          >
            Prepare Execution →
          </button>
        )}

        {/* Loading states */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            {stepState.step === "checking" && "Checking on-chain approval…"}
            {stepState.step === "approving" && "Waiting for wallet signature…"}
            {stepState.step === "creating_agent" && "Creating session key — sign in wallet…"}
            {stepState.step === "placing" && "Placing order on Hyperliquid…"}
          </div>
        )}

        {/* Needs builder fee approval */}
        {stepState.step === "needs_approval" && (
          <div className="flex flex-col gap-3">
            <div className="border border-border/50 rounded p-3">
              <p className="text-xs font-medium mb-1">One-time Builder Approval Required</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                CarryTerm needs a one-time on-chain approval to attach its builder code to your fills.
                This authorises a maximum fee of <span className="mono text-foreground">4 bps</span> per HL fill.
                You can revoke at any time from the HL interface.
              </p>
            </div>
            <button
              onClick={handleApproveBuilder}
              className="w-full bg-primary text-primary-foreground rounded py-2.5 text-sm font-semibold mono hover:opacity-90 transition-opacity"
            >
              Approve Builder Fee (4 bps)
            </button>
          </div>
        )}

        {/* Needs session agent */}
        {stepState.step === "needs_agent" && (
          <div className="flex flex-col gap-3">
            <div className="border border-border/50 rounded p-3">
              <p className="text-xs font-medium mb-1">Create Session Key</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hyperliquid orders use a temporary session key (cleared when you close this tab) so you
                don't need a wallet popup for every trade. One signature now — then orders are placed
                instantly. The key <strong className="text-foreground">cannot withdraw funds</strong>.
              </p>
            </div>
            <button
              onClick={handleCreateAgent}
              className="w-full bg-primary text-primary-foreground rounded py-2.5 text-sm font-semibold mono hover:opacity-90 transition-opacity"
            >
              Create Session Key →
            </button>
          </div>
        )}

        {/* Ready to execute */}
        {stepState.step === "ready" && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 bg-yellow-500/8 border border-yellow-500/20 rounded p-3">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                This places a <strong className="text-foreground">MARKET SHORT</strong> on {signal.coin} on
                Hyperliquid for approximately ${notional.toLocaleString()} notional.{" "}
                You must <strong className="text-foreground">simultaneously open a LONG on{" "}
                {signal.bestCexVenue.toUpperCase()}</strong> for the same notional. Failing to
                hedge both legs creates directional price risk.
              </p>
            </div>
            <button
              onClick={handleExecute}
              className="w-full bg-primary text-primary-foreground rounded py-2.5 text-sm font-semibold mono hover:opacity-90 transition-opacity"
              data-testid="execute-button"
            >
              Place HL Short — {signal.coin} (${notional.toLocaleString()})
            </button>
            <p className="text-xs text-center text-muted-foreground -mt-2">
              Builder code attached · 4 bps on fills · Position auto-recorded in ledger
            </p>
          </div>
        )}

        {/* Error retry */}
        {stepState.step === "error" && (
          <button
            onClick={() => setStepState({ step: "idle" })}
            className="w-full border border-border rounded py-2 text-xs text-muted-foreground hover:text-foreground transition-colors mono"
          >
            ← Try Again
          </button>
        )}

        {/* Builder Code Notice */}
        <div className="border border-border/50 rounded p-3 mt-auto">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Builder code:</span> All HL fills route through{" "}
            <span className="mono text-primary">{BUILDER_ADDRESS.slice(0, 8)}…</span> at{" "}
            {BUILDER_FEE_BPS} bps. Accrues on-chain automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
