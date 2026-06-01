import { useState, useEffect } from "react";
import { AlertTriangle, Shield } from "lucide-react";

const STORAGE_KEY = "carryterm_disclaimer_v2";

export function DisclaimerModal() {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState({
    notUS: false,
    notAdvice: false,
    riskUnderstood: false,
    ownDecisions: false,
  });

  useEffect(() => {
    try {
      const agreed = localStorage.getItem(STORAGE_KEY);
      if (!agreed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const allChecked = Object.values(checked).every(Boolean);

  function handleAgree() {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-background border border-border rounded-lg w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
          <div className="w-8 h-8 rounded-full bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">Terms of Use &amp; Risk Disclosure</h2>
            <p className="text-xs text-muted-foreground mono">Please read carefully before using CarryTerm</p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">

          {/* Risk warning */}
          <div className="bg-yellow-500/8 border border-yellow-500/25 rounded-md px-4 py-3 space-y-1">
            <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wide">High Risk Activity</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Crypto derivatives trading involves substantial risk of loss. Funding rates can flip direction
              rapidly, positions can be liquidated, and you may lose all capital deployed.
              Only trade with capital you can afford to lose entirely.
            </p>
          </div>

          {/* Disclaimer text */}
          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Informational Tool Only.</strong>{" "}
              CarryTerm is a market data aggregation and analysis tool. All signals, spreads, and yield
              calculations displayed are for educational and research purposes only. Nothing on this
              platform constitutes financial, investment, or trading advice of any kind.
            </p>
            <p>
              <strong className="text-foreground">No Guarantee of Profit.</strong>{" "}
              Historical funding rate spreads do not predict future performance. Displayed rates may change
              significantly at any time. CarryTerm makes no representation that any strategy will be
              profitable. Past data is not indicative of future results.
            </p>
            <p>
              <strong className="text-foreground">Geographic Restrictions.</strong>{" "}
              Hyperliquid and certain other exchanges referenced on this platform are not available to
              persons located in the United States or other restricted jurisdictions. By using this
              platform, you confirm you are not a US person and are not accessing from a restricted
              jurisdiction. You are solely responsible for compliance with the laws of your jurisdiction.
            </p>
            <p>
              <strong className="text-foreground">Independent Decisions.</strong>{" "}
              All trades are placed directly by you on third-party exchanges entirely outside of this
              platform. CarryTerm does not execute trades, hold funds, custody assets, or act as an
              intermediary in any transaction. You make all trading decisions independently and bear
              full responsibility for all outcomes.
            </p>
            <p>
              <strong className="text-foreground">No Liability.</strong>{" "}
              CarryTerm and its operators shall not be liable for any trading losses, missed
              opportunities, liquidations, technical failures, data inaccuracies, or any other damages
              arising from your use of this platform. Use entirely at your own risk.
            </p>
          </div>

          {/* Checkboxes */}
          <div className="border border-border rounded-md divide-y divide-border">
            {[
              {
                key: "notUS" as const,
                label: "I confirm I am NOT a US person and am not accessing this platform from a restricted jurisdiction.",
              },
              {
                key: "notAdvice" as const,
                label: "I understand CarryTerm provides market data only — not financial advice — and I will not rely on it as such.",
              },
              {
                key: "riskUnderstood" as const,
                label: "I understand crypto derivatives trading involves substantial risk and I may lose all capital deployed.",
              },
              {
                key: "ownDecisions" as const,
                label: "I confirm all trading decisions are mine alone. CarryTerm does not execute trades or hold my funds.",
              },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
              >
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked[key]}
                    onChange={(e) => setChecked((prev) => ({ ...prev, [key]: e.target.checked }))}
                    data-testid={`checkbox-${key}`}
                  />
                  <div className={[
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                    checked[key] ? "bg-primary border-primary" : "border-border bg-background",
                  ].join(" ")}>
                    {checked[key] && (
                      <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs leading-relaxed text-muted-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>Acknowledgment stored locally only</span>
          </div>
          <button
            onClick={handleAgree}
            disabled={!allChecked}
            data-testid="button-agree-disclaimer"
            className={[
              "px-5 py-2 rounded text-xs font-semibold tracking-tight transition-all",
              allChecked
                ? "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50",
            ].join(" ")}
          >
            I Agree — Enter CarryTerm
          </button>
        </div>

      </div>
    </div>
  );
}
