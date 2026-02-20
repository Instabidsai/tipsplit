import { useState, useEffect } from "react";

interface WebVital {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

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

const NORTH_STAR_METRIC = {
  name: "Unique Monthly Visitors",
  current: "Launch Day",
  target: 500,
  targetDate: "March 22, 2026",
  unit: "visitors/month",
  rationale:
    "Per BUSINESS-MODEL.md: 500 monthly visitors by Day 90 is the monetization decision point. At 2% affiliate click rate and 5% conversion, this yields ~$0.75/month — enough signal to validate the affiliate path.",
};

const SKIPPED_METRICS = [
  {
    name: "Signup Rate",
    reason: 'Founder brief: "No authentication." No signup exists.',
  },
  {
    name: "Checkout Rate",
    reason: 'Founder brief: "No payments." No checkout flow exists.',
  },
  {
    name: "Revenue",
    reason:
      'Founder brief: "No payments." v1 is $0 revenue by design (BUSINESS-MODEL.md).',
  },
];

function ratingColor(rating: string) {
  if (rating === "good") return "text-green-600 bg-green-50";
  if (rating === "needs-improvement") return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}

function ratingLabel(rating: string) {
  if (rating === "good") return "Good";
  if (rating === "needs-improvement") return "Needs Work";
  return "Poor";
}

function getWebVitalThresholds(
  name: string,
  value: number
): "good" | "needs-improvement" | "poor" {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
    INP: [200, 500],
  };
  const [good, poor] = thresholds[name] || [1000, 3000];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

function formatVitalValue(name: string, value: number): string {
  if (name === "CLS") return value.toFixed(3);
  return `${Math.round(value)}ms`;
}

function MetricCard({
  label,
  value,
  sublabel,
  color = "text-surface-900",
}: {
  label: string;
  value: string;
  sublabel?: string;
  color?: string;
}) {
  return (
    <div className="card text-center">
      <p className="text-xs text-surface-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
      {sublabel && (
        <p className="text-xs text-surface-400 mt-1">{sublabel}</p>
      )}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [vitals, setVitals] = useState<WebVital[]>([]);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [apiLatency, setApiLatency] = useState<number | null>(null);
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);

  useEffect(() => {
    // Measure Web Vitals using Performance API
    const measured: WebVital[] = [];

    // FCP
    const paintEntries = performance.getEntriesByType(
      "paint"
    ) as PerformanceEntry[];
    const fcp = paintEntries.find((e) => e.name === "first-contentful-paint");
    if (fcp) {
      measured.push({
        name: "FCP",
        value: fcp.startTime,
        rating: getWebVitalThresholds("FCP", fcp.startTime),
      });
    }

    // TTFB from navigation timing
    const nav = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (nav) {
      const ttfb = nav.responseStart - nav.requestStart;
      measured.push({
        name: "TTFB",
        value: ttfb,
        rating: getWebVitalThresholds("TTFB", ttfb),
      });

      const loadTime = nav.loadEventEnd - nav.startTime;
      if (loadTime > 0) setPageLoadTime(loadTime);
    }

    // CLS from PerformanceObserver (snapshot)
    let clsValue = 0;
    const clsEntries = performance.getEntriesByType(
      "layout-shift"
    ) as (PerformanceEntry & { hadRecentInput?: boolean; value?: number })[];
    for (const entry of clsEntries) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value ?? 0;
      }
    }
    measured.push({
      name: "CLS",
      value: clsValue,
      rating: getWebVitalThresholds("CLS", clsValue),
    });

    // LCP from PerformanceObserver
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setVitals((prev) => {
            const existing = prev.filter((v) => v.name !== "LCP");
            return [
              ...existing,
              {
                name: "LCP",
                value: lastEntry.startTime,
                rating: getWebVitalThresholds("LCP", lastEntry.startTime),
              },
            ];
          });
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // LCP observer not supported
    }

    // INP from PerformanceObserver
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let maxDuration = 0;
        for (const entry of entries) {
          if (entry.duration > maxDuration) maxDuration = entry.duration;
        }
        if (maxDuration > 0) {
          setVitals((prev) => {
            const existing = prev.filter((v) => v.name !== "INP");
            return [
              ...existing,
              {
                name: "INP",
                value: maxDuration,
                rating: getWebVitalThresholds("INP", maxDuration),
              },
            ];
          });
        }
      });
      inpObserver.observe({ type: "event", buffered: true });
    } catch {
      // INP observer not supported
    }

    setVitals(measured);

    // Fetch health API and measure latency
    const start = performance.now();
    fetch("/api/health")
      .then((res) => {
        setApiLatency(Math.round(performance.now() - start));
        return res.json();
      })
      .then((data: HealthData) => setHealth(data))
      .catch(() => setApiLatency(-1));
  }, []);

  const vercelDashboardUrl =
    "https://vercel.com/justins-projects-e2daa9e4/tipsplit/analytics";
  const vercelSpeedUrl =
    "https://vercel.com/justins-projects-e2daa9e4/tipsplit/speed-insights";

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
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
            <span className="text-xs text-surface-400 ml-2">/ Analytics</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/status"
              className="text-sm font-medium text-surface-500 hover:text-surface-700 transition-colors"
            >
              Status
            </a>
            <a
              href="/"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* North Star Metric */}
        <div className="card border-2 border-brand-200 bg-brand-50/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-brand-600 uppercase tracking-wider font-semibold mb-1">
                #1 Metric — North Star
              </p>
              <h1 className="text-display-sm text-surface-900">
                {NORTH_STAR_METRIC.name}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-brand-700 font-mono">
                {NORTH_STAR_METRIC.target}
              </p>
              <p className="text-xs text-surface-400">30-day target</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-surface-500">Progress</span>
              <span className="text-sm font-mono text-surface-700">
                {NORTH_STAR_METRIC.current} → {NORTH_STAR_METRIC.target}{" "}
                {NORTH_STAR_METRIC.unit}
              </span>
            </div>
            <div className="w-full bg-surface-100 rounded-full h-3">
              <div
                className="bg-brand-500 h-3 rounded-full transition-all duration-500"
                style={{ width: "2%" }}
              />
            </div>
            <p className="text-xs text-surface-400 mt-2">
              Target date: {NORTH_STAR_METRIC.targetDate}
            </p>
          </div>
          <p className="text-sm text-surface-500 leading-relaxed">
            {NORTH_STAR_METRIC.rationale}
          </p>
        </div>

        {/* Analytics Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href={vercelDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 76 65"
                  fill="white"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-surface-900 group-hover:text-brand-700 transition-colors">
                  Vercel Web Analytics
                </h3>
                <p className="text-xs text-surface-400">
                  Page views, visitors, top pages, referrers
                </p>
              </div>
            </div>
            <p className="text-sm text-surface-500">
              Privacy-first analytics — no cookies, GDPR compliant. Tracks page
              views, unique visitors, and referral sources.
            </p>
            <p className="text-xs text-brand-600 font-semibold mt-3 group-hover:underline">
              Open Dashboard →
            </p>
          </a>

          <a
            href={vercelSpeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-surface-900 group-hover:text-brand-700 transition-colors">
                  Vercel Speed Insights
                </h3>
                <p className="text-xs text-surface-400">
                  Real User Monitoring (RUM) data
                </p>
              </div>
            </div>
            <p className="text-sm text-surface-500">
              Real-world Core Web Vitals from actual visitors. LCP, CLS, FID,
              INP, FCP, TTFB measured in the field.
            </p>
            <p className="text-xs text-brand-600 font-semibold mt-3 group-hover:underline">
              Open Speed Insights →
            </p>
          </a>
        </div>

        {/* Live Web Vitals */}
        <div className="card">
          <h2 className="text-lg font-semibold text-surface-900 mb-1">
            Live Web Vitals
          </h2>
          <p className="text-sm text-surface-400 mb-4">
            Measured in this browser session via the Performance API
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {vitals.length === 0 ? (
              <p className="text-sm text-surface-400 col-span-full py-4 text-center">
                Measuring...
              </p>
            ) : (
              vitals.map((v) => (
                <div
                  key={v.name}
                  className={`rounded-xl p-4 text-center ${ratingColor(v.rating)}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
                    {v.name}
                  </p>
                  <p className="text-xl font-bold font-mono">
                    {formatVitalValue(v.name, v.value)}
                  </p>
                  <p className="text-xs font-medium mt-1">
                    {ratingLabel(v.rating)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Page Load"
            value={pageLoadTime ? `${Math.round(pageLoadTime)}ms` : "..."}
            sublabel="Full page load time"
          />
          <MetricCard
            label="API Latency"
            value={
              apiLatency === null
                ? "..."
                : apiLatency === -1
                  ? "Error"
                  : `${apiLatency}ms`
            }
            sublabel="/api/health round-trip"
            color={
              apiLatency !== null && apiLatency > 0 && apiLatency < 500
                ? "text-green-600"
                : "text-surface-900"
            }
          />
          <MetricCard
            label="API Memory"
            value={health ? `${health.checks.memory.rss_mb}MB` : "..."}
            sublabel="Server RSS"
          />
          <MetricCard
            label="Region"
            value={health?.region ?? "..."}
            sublabel={health?.environment ?? "loading"}
          />
        </div>

        {/* Tracked vs. Skipped Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What We Track */}
          <div className="card">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              Tracked Metrics
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "Page Views",
                  source: "Vercel Web Analytics",
                  status: "Active",
                },
                {
                  name: "Unique Visitors",
                  source: "Vercel Web Analytics",
                  status: "Active",
                },
                {
                  name: "Top Pages",
                  source: "Vercel Web Analytics",
                  status: "Active",
                },
                {
                  name: "Referral Sources",
                  source: "Vercel Web Analytics",
                  status: "Active",
                },
                {
                  name: "Core Web Vitals",
                  source: "Vercel Speed Insights",
                  status: "Active",
                },
                {
                  name: "API Health",
                  source: "/api/health endpoint",
                  status: "Active",
                },
              ].map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-surface-700">
                      {m.name}
                    </p>
                    <p className="text-xs text-surface-400">{m.source}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skipped Metrics */}
          <div className="card">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              N/A Metrics
            </h2>
            <p className="text-sm text-surface-400 mb-4">
              These metrics are not applicable per the founder brief.
            </p>
            <div className="space-y-3">
              {SKIPPED_METRICS.map((m) => (
                <div
                  key={m.name}
                  className="py-3 border-b border-surface-100 last:border-0"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-surface-500 line-through">
                      {m.name}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-100 text-surface-400">
                      Skipped
                    </span>
                  </div>
                  <p className="text-xs text-surface-400">{m.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 30-Day Target Plan */}
        <div className="card">
          <h2 className="text-lg font-semibold text-surface-900 mb-4">
            30-Day Growth Target
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left py-2 px-3 text-surface-400 font-medium">
                    Week
                  </th>
                  <th className="text-left py-2 px-3 text-surface-400 font-medium">
                    Target Visitors
                  </th>
                  <th className="text-left py-2 px-3 text-surface-400 font-medium">
                    Growth Actions
                  </th>
                  <th className="text-left py-2 px-3 text-surface-400 font-medium">
                    Channel
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-surface-100">
                  <td className="py-2 px-3 font-mono text-surface-700">
                    Week 1
                  </td>
                  <td className="py-2 px-3 font-mono text-brand-700">50</td>
                  <td className="py-2 px-3 text-surface-600">
                    Submit to Google Search Console, Reddit r/webdev post
                  </td>
                  <td className="py-2 px-3 text-surface-400">SEO + Social</td>
                </tr>
                <tr className="border-b border-surface-100">
                  <td className="py-2 px-3 font-mono text-surface-700">
                    Week 2
                  </td>
                  <td className="py-2 px-3 font-mono text-brand-700">125</td>
                  <td className="py-2 px-3 text-surface-600">
                    Product Hunt launch, Hacker News Show HN
                  </td>
                  <td className="py-2 px-3 text-surface-400">
                    Launch platforms
                  </td>
                </tr>
                <tr className="border-b border-surface-100">
                  <td className="py-2 px-3 font-mono text-surface-700">
                    Week 3
                  </td>
                  <td className="py-2 px-3 font-mono text-brand-700">300</td>
                  <td className="py-2 px-3 text-surface-600">
                    Blog post: "How Much to Tip in 2026", backlink outreach
                  </td>
                  <td className="py-2 px-3 text-surface-400">
                    Content + SEO
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-surface-700">
                    Week 4
                  </td>
                  <td className="py-2 px-3 font-mono text-brand-700 font-bold">
                    500
                  </td>
                  <td className="py-2 px-3 text-surface-600">
                    Social sharing, forum participation, organic growth
                  </td>
                  <td className="py-2 px-3 text-surface-400">
                    Organic + community
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Stack Info */}
        <div className="card bg-surface-900 text-white">
          <h2 className="text-lg font-semibold mb-4">Analytics Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-surface-400 text-xs uppercase tracking-wider mb-1">
                Page Analytics
              </p>
              <p className="font-semibold">Vercel Web Analytics</p>
              <p className="text-surface-400 text-xs mt-1">
                @vercel/analytics v1.6.1
              </p>
            </div>
            <div>
              <p className="text-surface-400 text-xs uppercase tracking-wider mb-1">
                Performance
              </p>
              <p className="font-semibold">Vercel Speed Insights</p>
              <p className="text-surface-400 text-xs mt-1">
                @vercel/speed-insights v1.3.1
              </p>
            </div>
            <div>
              <p className="text-surface-400 text-xs uppercase tracking-wider mb-1">
                Uptime
              </p>
              <p className="font-semibold">/api/health + /status</p>
              <p className="text-surface-400 text-xs mt-1">
                Custom health checks, auto-refresh 30s
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-surface-700">
            <p className="text-xs text-surface-400">
              Privacy-first: No cookies, no personal data collection, GDPR
              compliant. All analytics are aggregated and anonymous.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-surface-400 py-4">
          TipSplit Analytics Dashboard — Data from Vercel Web Analytics + Speed
          Insights
        </p>
      </div>
    </div>
  );
}
