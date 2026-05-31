import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { Trash2, Bell } from "lucide-react";
import type { Alert } from "@shared/schema";

export function AlertsPanel() {
  const qc = useQueryClient();
  const { data: alerts = [] } = useQuery<Alert[]>({ queryKey: ["/api/alerts"] });

  const [form, setForm] = useState({
    type: "spread_threshold",
    coin: "",
    direction: "above",
    thresholdValue: 15,
    email: "",
  });

  const createAlert = useMutation({
    mutationFn: () => apiRequest("POST", "/api/alerts", {
      ...form,
      coin: form.coin || null,
      thresholdValue: form.thresholdValue,
      active: 1,
      createdAt: Date.now(),
    }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/alerts"] }),
  });

  const deleteAlert = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/alerts/${id}`, {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/alerts"] }),
  });

  return (
    <div className="space-y-6">
      {/* Create Alert */}
      <div className="bg-card border border-border rounded p-4 space-y-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Bell className="w-3.5 h-3.5" /> New Alert Rule
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Type</label>
            <select
              className="w-full bg-input border border-border rounded px-3 py-1.5 text-sm mono focus:outline-none focus:ring-1 focus:ring-primary"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              data-testid="alert-type"
            >
              <option value="spread_threshold">Spread Threshold</option>
              <option value="rate_flip">Rate Flip</option>
              <option value="position_pnl">Position P&L Stop</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">Coin (blank = all)</label>
            <input
              placeholder="e.g. HYPE"
              className="w-full bg-input border border-border rounded px-3 py-1.5 text-sm mono focus:outline-none focus:ring-1 focus:ring-primary"
              value={form.coin}
              onChange={(e) => setForm((f) => ({ ...f, coin: e.target.value.toUpperCase() }))}
              data-testid="alert-coin"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">Direction</label>
            <select
              className="w-full bg-input border border-border rounded px-3 py-1.5 text-sm mono focus:outline-none focus:ring-1 focus:ring-primary"
              value={form.direction}
              onChange={(e) => setForm((f) => ({ ...f, direction: e.target.value }))}
              data-testid="alert-direction"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
              <option value="negative">Flips Negative</option>
              <option value="positive">Flips Positive</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground block mb-1">Threshold (% annualized)</label>
            <input
              type="number"
              className="w-full bg-input border border-border rounded px-3 py-1.5 text-sm mono focus:outline-none focus:ring-1 focus:ring-primary"
              value={form.thresholdValue}
              onChange={(e) => setForm((f) => ({ ...f, thresholdValue: Number(e.target.value) }))}
              data-testid="alert-threshold"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-input border border-border rounded px-3 py-1.5 text-sm mono focus:outline-none focus:ring-1 focus:ring-primary"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            data-testid="alert-email"
          />
        </div>

        <button
          className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm font-medium mono hover:opacity-90 transition-opacity disabled:opacity-50"
          onClick={() => createAlert.mutate()}
          disabled={createAlert.isPending || !form.email}
          data-testid="create-alert-button"
        >
          {createAlert.isPending ? "Creating…" : "Create Alert"}
        </button>
      </div>

      {/* Active Alerts */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Active Rules</h3>
        {alerts.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">No alerts configured.</p>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between bg-card border border-border rounded px-3 py-2.5" data-testid={`alert-row-${alert.id}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${alert.active ? "bg-green-500" : "bg-muted-foreground"}`} />
                  <div>
                    <p className="text-xs mono font-medium">
                      {alert.coin ?? "ALL"} · {alert.type.replace(/_/g, " ")} · {alert.direction} {alert.thresholdValue ? `${alert.thresholdValue}%` : ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteAlert.mutate(alert.id)}
                  className="text-muted-foreground hover:text-red-400 transition-colors ml-4"
                  data-testid={`delete-alert-${alert.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
