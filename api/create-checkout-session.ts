import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { rateLimit } from "./_rate-limit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

const PRICE_ID = process.env.STRIPE_PRICE_ID!;

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://tipsplit-neon.vercel.app",
  "https://tipsplit.vercel.app",
];

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
    const successOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${successOrigin}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${successOrigin}?canceled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
