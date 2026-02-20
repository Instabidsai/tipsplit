import type { VercelRequest, VercelResponse } from "@vercel/node";
import { apiLogger } from "./_logger.js";

const startedAt = new Date().toISOString();

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const now = new Date();

  const health = {
    status: "healthy",
    timestamp: now.toISOString(),
    uptime: {
      started: startedAt,
      seconds: Math.floor((now.getTime() - new Date(startedAt).getTime()) / 1000),
    },
    version: "1.0.0",
    environment: process.env.VERCEL_ENV || "development",
    region: process.env.VERCEL_REGION || "unknown",
    checks: {
      api: "ok",
      runtime: "ok",
      memory: {
        status: "ok",
        rss_mb: Math.round(process.memoryUsage().rss / 1024 / 1024),
      },
    },
  };

  apiLogger.info("Health check", "health", { status: "healthy", rss_mb: health.checks.memory.rss_mb });
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  return res.status(200).json(health);
}
