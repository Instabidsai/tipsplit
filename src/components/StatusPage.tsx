import { useState, useEffect } from "react";
import { logger } from "../lib/logger";
import type { LogEntry } from "../lib/logger";

interface HealthData {
  status: string;
  timestamp: string;
  uptime: { started: string; seconds: number };
  version: string;
  environment: string;
  region: string;
  checks: {
    api: string;
    runtime: string;
    memory: { status: string; rss_mb: number };
  };
}

function CheckBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        ok
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${ok ? "bg-green-500" : "bg-red-500"}`}
      />
      {ok ? "Operational" : "Down"}
    </span>
  );
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function LogRow({ entry }: { entry: LogEntry }) {
  const levelColors: Record<string, string> = {
    debug: "text-surface-400",
    info: "text-brand-600",
    warn: "text-amber-600",
    error: "text-red-600",
  };
  return (
    <div className="flex items-start gap-3 py-2 border-b border-surface-100 last:border-0 text-xs font-mono">
      <span className="text-surface-400 shrink-0 w-20">
        {new Date(entry.timestamp).toLocaleTimeString()}
      </span>
      <span
        className={`shrink-0 w-12 font-semibold uppercase ${levelColors[entry.level] ?? "text-surface-500"}`}
      >
        {entry.level}
      </span>
      <span className="text-surface-400 shrink-0 w-28 truncate">
        {entry.context ?? "-"}
      </span>
      <span className="text-surface-700 break-all">{entry.message}</span>
    </div>
  );
}

export default function StatusPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const [clientLogs, setClientLogs] = useState<readonly LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<string>("");

  async function checkHealth() {
    setLoading(true);
    try {
      const res = await fetch("/api/health");
      if (res.ok) {
        const data: HealthData = await res.json();
        setHealth(data);
        setApiOk(true);
        logger.info("Health check passed", "StatusPage");
      } else {
        setApiOk(false);
        logger.warn(`Health check returned ${res.status}`, "StatusPage");
      }
    } catch {
      setApiOk(false);
      logger.error("Health check failed - API unreachable", "StatusPage");
    }
    setClientLogs([...logger.getBuffer()]);
    setLastChecked(new Date().toLocaleTimeString());
    setLoading(false);
  }

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30_000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const appStartTime = performance.timing?.navigationStart
    ? new Date(performance.timing.navigationStart).toISOString()
    : new Date().toISOString();
  const clientUptime = Math.floor(performance.now() / 1000);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-100">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="#14B8A6" />
                <text
                  x="24"
                  y="32"
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  fontSize="22"
                  fontWeight="600"
                  fill="white"
                >
                  $
                </text>
              </svg>
              <span className="text-lg font-semibold text-surface-900">
                TipSplit
              </span>
            </a>
            <span className="text-xs text-surface-400 ml-2">/ Status</span>
          </div>
          <button
            onClick={checkHealth}
            disabled={loading}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Checking..." : "Refresh"}
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Overall Status */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-display-sm text-surface-900">System Status</h1>
            <CheckBadge ok={apiOk === true} />
          </div>
          <p className="text-sm text-surface-400">
            Last checked: {lastChecked || "checking..."}
            {health && ` | Environment: ${health.environment} | Region: ${health.region}`}
          </p>
        </div>

        {/* Service Checks */}
        <div className="card">
          <h2 className="text-lg font-semibold text-surface-900 mb-4">
            Service Checks
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-surface-100">
              <span className="text-surface-700 font-medium">
                Frontend (Client)
              </span>
              <CheckBadge ok={true} />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-surface-100">
              <span className="text-surface-700 font-medium">
                API Health Endpoint
              </span>
              <CheckBadge ok={apiOk === true} />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-surface-100">
              <span className="text-surface-700 font-medium">API Runtime</span>
              <CheckBadge ok={health?.checks.runtime === "ok"} />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-surface-700 font-medium">
                API Memory
              </span>
              <span className="text-sm text-surface-500">
                {health?.checks.memory.rss_mb
                  ? `${health.checks.memory.rss_mb} MB`
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <p className="text-xs text-surface-400 uppercase tracking-wider mb-1">
              Version
            </p>
            <p className="text-lg font-semibold text-surface-900 font-mono">
              {health?.version ?? "-"}
            </p>
          </div>
          <div className="card text-center">
            <p className="text-xs text-surface-400 uppercase tracking-wider mb-1">
              API Uptime
            </p>
            <p className="text-lg font-semibold text-surface-900 font-mono">
              {health ? formatUptime(health.uptime.seconds) : "-"}
            </p>
          </div>
          <div className="card text-center">
            <p className="text-xs text-surface-400 uppercase tracking-wider mb-1">
              Client Uptime
            </p>
            <p className="text-lg font-semibold text-surface-900 font-mono">
              {formatUptime(clientUptime)}
            </p>
          </div>
          <div className="card text-center">
            <p className="text-xs text-surface-400 uppercase tracking-wider mb-1">
              Errors (session)
            </p>
            <p
              className={`text-lg font-semibold font-mono ${
                logger.getErrorCount() > 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {logger.getErrorCount()}
            </p>
          </div>
        </div>

        {/* Client Info */}
        <div className="card">
          <h2 className="text-lg font-semibold text-surface-900 mb-4">
            Client Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between py-1.5 border-b border-surface-100">
              <span className="text-surface-400">User Agent</span>
              <span className="text-surface-700 text-right max-w-[60%] truncate">
                {navigator.userAgent.split(" ").slice(-2).join(" ")}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-100">
              <span className="text-surface-400">Page Loaded</span>
              <span className="text-surface-700 font-mono text-xs">
                {new Date(appStartTime).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-100">
              <span className="text-surface-400">Connection</span>
              <span className="text-surface-700">
                {navigator.onLine ? "Online" : "Offline"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-100">
              <span className="text-surface-400">Viewport</span>
              <span className="text-surface-700 font-mono text-xs">
                {window.innerWidth}x{window.innerHeight}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Logs */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-surface-900">
              Recent Logs ({clientLogs.length})
            </h2>
            <div className="flex items-center gap-2 text-xs text-surface-400">
              <span className="text-amber-600 font-semibold">
                {logger.getWarnCount()} warns
              </span>
              <span className="text-red-600 font-semibold">
                {logger.getErrorCount()} errors
              </span>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {clientLogs.length === 0 ? (
              <p className="text-sm text-surface-400 py-4 text-center">
                No log entries yet
              </p>
            ) : (
              [...clientLogs].reverse().map((entry, i) => (
                <LogRow key={i} entry={entry} />
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-surface-400 py-4">
          TipSplit Status Dashboard — Auto-refreshes every 30 seconds
        </p>
      </div>
    </div>
  );
}
