import { useState } from "react";

// Stripe Payment Link — created via Stripe API
// Product: TipSplit Pro (prod_U0mAbMAusXKoxO)
// Price: $1.99/month (price_1T2kcaGddWenMvG0JSjgAxtq) — per Formula Registry F-12
const PAYMENT_LINK = "https://buy.stripe.com/6oU8wP2Kjdmw91JgxwenS00";

interface PricingProps {
  onScrollToCalc: () => void;
}

export default function Pricing({ onScrollToCalc }: PricingProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      // Try the serverless checkout session first (supports success redirect)
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // Serverless function not available — fall back to Payment Link
    }
    // Fallback: direct Stripe Payment Link (always works, no backend needed)
    window.location.href = PAYMENT_LINK;
  }

  return (
    <section id="pricing" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-display-md text-surface-900 mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-surface-500 leading-relaxed max-w-xl mx-auto">
            TipSplit is free — and always will be. Want extra features? Go Pro for
            less than a cup of coffee.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free Tier */}
          <div className="card border-2 border-surface-200 relative">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-surface-900 mb-1">Free</h3>
              <p className="text-surface-500 text-sm">Everything you need at dinner</p>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold font-mono text-surface-900">$0</span>
              <span className="text-surface-400 text-sm">/forever</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-surface-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Tip calculation & bill splitting
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                15%, 18%, 20%, 25% presets + custom
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Split up to 99 people
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Mobile-first, works on any device
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                No ads, no tracking, no sign-up
              </li>
            </ul>
            <button
              onClick={onScrollToCalc}
              className="w-full py-3 px-4 border-2 border-surface-200 text-surface-700 font-semibold rounded-xl hover:bg-surface-50 transition-colors min-h-touch"
            >
              Start Calculating
            </button>
          </div>

          {/* Pro Tier */}
          <div className="card border-2 border-brand-500 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 bg-brand-500 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                Pro
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-surface-900 mb-1">TipSplit Pro</h3>
              <p className="text-surface-500 text-sm">For the power splitter</p>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold font-mono text-surface-900">$1.99</span>
              <span className="text-surface-400 text-sm">/month</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-surface-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Everything in Free
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Split by individual items
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Save custom tip presets
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Receipt history & export
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Dark mode
              </li>
            </ul>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 active:scale-[0.98] transition-all duration-150 min-h-touch disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Redirecting...
                </span>
              ) : (
                "Upgrade to Pro"
              )}
            </button>
            <p className="text-center text-xs text-surface-400 mt-3">
              Cancel anytime. Powered by Stripe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
