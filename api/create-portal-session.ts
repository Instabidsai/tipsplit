import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { rateLimit } from "./_rate-limit.js";
import { apiLogger } from "./_logger.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://tipsplit-neon.vercel.app",
  "https://tipsplit.vercel.app",
];

// Stripe Checkout Session ID format: cs_test_... or cs_live_...
const SESSION_ID_PATTERN = /^cs_(test|live)_[a-zA-Z0-9]{10,200}$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const ctx = "create-portal-session";

  if (req.method !== "POST") {
    apiLogger.warn("Method not allowed", ctx, { method: req.method });
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "unknown";
  const { allowed, remaining } = rateLimit(clientIp);
  res.setHeader("X-RateLimit-Remaining", remaining.toString());
  if (!allowed) {
    apiLogger.warn("Rate limit exceeded", ctx, { ip: clientIp });
    return res.status(429).json({ error: "Too many requests. Try again in a minute." });
  }

  // Origin validation
  const origin = req.headers.origin || "";
  if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
    apiLogger.warn("Forbidden origin", ctx, { origin });
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const { session_id } = req.body || {};

    // Input validation: session_id is required
    if (!session_id || typeof session_id !== "string") {
      apiLogger.warn("Missing session_id", ctx);
      return res.status(400).json({ error: "session_id is required and must be a string" });
    }

    // Input validation: session_id format
    if (!SESSION_ID_PATTERN.test(session_id)) {
      apiLogger.warn("Invalid session_id format", ctx);
      return res.status(400).json({ error: "Invalid session_id format" });
    }

    apiLogger.info("Creating portal session", ctx, { ip: clientIp });

    // Retrieve the checkout session to get the customer ID
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    if (!checkoutSession.customer) {
      apiLogger.warn("No customer for session", ctx, { sessionId: session_id });
      return res.status(400).json({ error: "No customer found for this session" });
    }

    const returnUrl = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: returnUrl,
    });

    apiLogger.info("Portal session created", ctx);
    return res.status(200).json({ url: portalSession.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    apiLogger.error("Portal session failed", ctx, { error: message });
    return res.status(500).json({ error: message });
  }
}
