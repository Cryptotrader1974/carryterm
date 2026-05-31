/**
 * Alert Engine — evaluates rules against live signal data every 60s
 */
import { storage } from "./storage.js";
import { getLatestData } from "./ingestion.js";

export function evaluateAlerts() {
  const alerts = storage.getAlerts().filter((a) => a.active === 1);
  const data = getLatestData();
  const now = Date.now();
  const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes

  for (const alert of alerts) {
    // Cooldown check
    if (alert.lastTriggered && now - alert.lastTriggered < COOLDOWN_MS) continue;

    let triggered = false;
    let triggerMsg = "";

    if (alert.type === "spread_threshold") {
      const coinsToCheck = alert.coin
        ? [alert.coin]
        : data.signals.map((s) => s?.coin).filter(Boolean) as string[];

      for (const coin of coinsToCheck) {
        const sig = data.signals.find((s) => s?.coin === coin);
        if (!sig) continue;
        const val = sig.grossAnnualized;
        if (alert.direction === "above" && alert.thresholdValue && val > alert.thresholdValue) {
          triggered = true;
          triggerMsg = `${coin} spread crossed ABOVE ${alert.thresholdValue}% annualized (current: ${val.toFixed(1)}%)`;
        }
        if (alert.direction === "below" && alert.thresholdValue && val < alert.thresholdValue) {
          triggered = true;
          triggerMsg = `${coin} spread fell BELOW ${alert.thresholdValue}% annualized (current: ${val.toFixed(1)}%)`;
        }
      }
    }

    if (alert.type === "rate_flip") {
      const coinToCheck = alert.coin;
      if (coinToCheck) {
        const coinData = data.rates.get(coinToCheck);
        if (coinData) {
          const hlRate = coinData.hl.rate;
          if (alert.direction === "negative" && hlRate < 0) {
            triggered = true;
            triggerMsg = `${coinToCheck} HL funding flipped NEGATIVE (${(hlRate * 100).toFixed(4)}%/1h)`;
          }
          if (alert.direction === "positive" && hlRate > 0) {
            triggered = true;
            triggerMsg = `${coinToCheck} HL funding flipped POSITIVE (${(hlRate * 100).toFixed(4)}%/1h)`;
          }
        }
      }
    }

    if (triggered) {
      storage.updateAlertTriggered(alert.id);
      console.log(`[Alert TRIGGERED] ${triggerMsg}`);
      // Email delivery would go here when SMTP is configured
    }
  }
}

export function startAlertEngine() {
  setInterval(evaluateAlerts, 60_000);
  console.log("[Alerts] Engine started — evaluating every 60s");
}
