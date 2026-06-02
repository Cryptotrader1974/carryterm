import { useState, useEffect } from "react";
import { X, Zap, Check, Loader2 } from "lucide-react";

const STORAGE_KEY = "carryterm_waitlist_v1";

const COUNTRIES = [
  "Select country...",
  "United Kingdom", "Germany", "France", "Netherlands", "Switzerland",
  "Singapore", "Hong Kong", "Japan", "South Korea", "Australia",
  "Canada", "Brazil", "UAE", "Turkey", "Nigeria", "South Africa",
  "Other (non-US)",
];

const PRO_FEATURES = [
  "Real-time alerts when spreads exceed your threshold",
  "Historical spread charts — see how signals evolved",
  "API access for programmatic signal retrieval",
  "Priority data refresh (10s vs 30s)",
  "Export signals to CSV",
];

export function WaitlistModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Select country...");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    // Show waitlist modal 8 seconds after disclaimer is agreed
    const disclaimerAgreed = localStorage.getItem("carryterm_disclaimer_v2");
    const waitlistDismissed = localStorage.getItem(STORAGE_KEY);
    if (disclaimerAgreed && !waitlistDismissed) {
      const t = setTimeout(() => setVisible(true), 8000);
      return () => clearTimeout(t);
    }
  }, []);

  function handleDismiss() {
    try { localStorage.setItem(STORAGE_KEY, "dismissed"); } catch {}
    setVisible(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setErrorMsg("Enter a valid email address."); return; }
    if (country === "Select country...") { setErrorMsg("Please select your country."); return; }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, country }),
      });
      const data = await res.json();
      if (res.ok) {
        setPosition(data.position);
        setStatus("success");
        try { localStorage.setItem(STORAGE_KEY, "joined"); } catch {}
      } else {
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">CarryTerm Pro</span>
            </div>
            <h2 className="text-base font-semibold tracking-tight">Join the waitlist</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              $49/month · Launching soon · Non-US users only
            </p>
          </div>
          <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground mt-1" data-testid="waitlist-dismiss">
            <X className="w-4 h-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 pb-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-sm font-semibold">You're on the list</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You're #{position} on the waitlist. We'll email you when CarryTerm Pro launches.
              Early subscribers get a 30% discount for the first 3 months.
            </p>
            <button onClick={() => setVisible(false)} className="text-xs text-primary hover:underline">
              Continue to app →
            </button>
          </div>
        ) : (
          <>
            <div className="px-6 pb-4">
              <ul className="space-y-1.5">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-input border border-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                data-testid="waitlist-email"
                required
              />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-input border border-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                data-testid="waitlist-country"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                data-testid="waitlist-submit"
                className="w-full py-2 rounded bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Join Waitlist — $49/month at Launch
              </button>

              <p className="text-xs text-center text-muted-foreground">
                No payment now. Early subscribers get 30% off first 3 months.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
