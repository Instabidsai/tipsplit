import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { apiLogger } from "./_logger.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Disable body parsing so we get the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    req.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const ctx = "webhook";

  if (req.method !== "POST") {
    apiLogger.warn("Method not allowed", ctx, { method: req.method });
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  if (!sig) {
    apiLogger.warn("Missing stripe-signature header", ctx);
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    apiLogger.error("Webhook signature verification failed", ctx, { error: message });
    return res.status(400).json({ error: `Webhook Error: ${message}` });
  }

  apiLogger.info("Webhook event received", ctx, { type: event.type, id: event.id });

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      apiLogger.info("Checkout completed", ctx, {
        sessionId: session.id,
        customer: session.customer as string,
        subscription: session.subscription as string,
      });
      // Future: INSERT INTO subscriptions (customer_id, subscription_id, status) VALUES (...)
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      apiLogger.info("Subscription updated", ctx, {
        subscriptionId: subscription.id,
        status: subscription.status,
      });
      // Future: UPDATE subscriptions SET status = $1 WHERE subscription_id = $2
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      apiLogger.info("Subscription canceled", ctx, { subscriptionId: subscription.id });
      // Future: UPDATE subscriptions SET status = 'canceled' WHERE subscription_id = $1
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      apiLogger.info("Payment succeeded", ctx, { invoiceId: invoice.id });
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      apiLogger.error("Payment failed", ctx, { invoiceId: invoice.id });
      // Future: Send email notification, update UI state
      break;
    }

    default:
      apiLogger.info("Unhandled event type", ctx, { type: event.type });
  }

  return res.status(200).json({ received: true });
}
