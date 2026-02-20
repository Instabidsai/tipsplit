import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { rateLimit } from "./_rate-limit";

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
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "unknown";
  const { allowed, remaining } = rateLimit(clientIp);
  res.setHeader("X-RateLimit-Remaining", remaining.toString());
  if (!allowed) {
    return res.status(429).json({ error: "Too many requests. Try again in a minute." });
  }

  // Origin validation
  const origin = req.headers.origin || "";
  if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const { session_id } = req.body || {};

    // Input validation: session_id is required
    if (!session_id || typeof session_id !== "string") {
      return res.status(400).json({ error: "session_id is required and must be a string" });
    }

    // Input validation: session_id format
    if (!SESSION_ID_PATTERN.test(session_id)) {
      return res.status(400).json({ error: "Invalid session_id format" });
    }

    // Retrieve the checkout session to get the customer ID
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    if (!checkoutSession.customer) {
      return res.status(400).json({ error: "No customer found for this session" });
    }

    const returnUrl = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: returnUrl,
    });

    return res.status(200).json({ url: portalSession.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
