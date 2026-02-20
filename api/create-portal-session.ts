import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { session_id } = req.body || {};

    if (!session_id) {
      return res.status(400).json({ error: "session_id is required" });
    }

    // Retrieve the checkout session to get the customer ID
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    if (!checkoutSession.customer) {
      return res.status(400).json({ error: "No customer found for this session" });
    }

    const origin = req.headers.origin || "https://tipsplit-neon.vercel.app";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: origin,
    });

    return res.status(200).json({ url: portalSession.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
