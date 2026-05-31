import { formatDistanceToNow } from "date-fns";

interface Props {
  connected: boolean;
  lastUpdate: number;
  signalCount: number;
}

export function StatusBar({ connected, lastUpdate, signalCount }: Props) {
  const age = lastUpdate ? formatDistanceToNow(new Date(lastUpdate), { addSuffix: true }) : "—";
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground mono">
      <span className="flex items-center gap-1.5">
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
        {connected ? "LIVE" : "RECONNECTING"}
      </span>
      <span>Updated {age}</span>
      <span>{signalCount} signals</span>
    </div>
  );
}
