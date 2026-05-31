interface Props {
  value: number; // 8h rate as decimal
  showAnnualized?: boolean;
}

export function RateCell({ value, showAnnualized }: Props) {
  const pct = value * 100;
  const ann = pct * 3 * 365;
  const cls = pct > 0.02 ? "rate-positive" : pct < -0.01 ? "rate-negative" : "rate-neutral";

  if (showAnnualized) {
    return (
      <span className={`mono text-xs ${cls}`}>
        {ann > 0 ? "+" : ""}{ann.toFixed(1)}%
      </span>
    );
  }

  return (
    <span className={`mono text-xs ${cls}`}>
      {pct > 0 ? "+" : ""}{pct.toFixed(4)}%
    </span>
  );
}
