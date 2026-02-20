# TipSplit — Free Tip Calculator & Bill Splitter

**[Try it now: tipsplit-neon.vercel.app](https://tipsplit-neon.vercel.app)**

Calculate tips and split bills instantly. No ads, no downloads, no sign-up.

![TipSplit Preview](https://tipsplit-neon.vercel.app/og-image.png)

## What It Does

- Enter your bill total
- Pick a tip percentage (15%, 18%, 20%, 25%, or custom)
- Choose how many people are splitting
- Instantly see: tip amount, total with tip, and per-person amount

Built for restaurants — works great on your phone.

## Why TipSplit?

| Feature | TipSplit | Calculator.net | CalculatorSoup |
|---------|----------|---------------|----------------|
| No ads | Yes | No | No |
| Mobile-first | Yes | No | No |
| Real-time calc | Yes | No | No |
| No sign-up | Yes | Yes | Yes |
| Free forever | Yes | Yes | Yes |

## Tech Stack

- **React 18** + TypeScript
- **Vite** — sub-second builds
- **Tailwind CSS** — custom brand system
- **Vercel** — edge deployment, zero cold starts

Bundle size: ~58 KB gzipped. Loads in under 1 second.

## Features

- Real-time calculations (no "Calculate" button)
- Smart rounding with remainder notices
- 48px+ touch targets for mobile
- Dark mode-ready design system
- Accessibility: ARIA labels, keyboard navigation, color contrast 4.5:1+
- SEO optimized: JSON-LD schema, OG tags, meta descriptions
- Security hardened: CSP, HSTS, rate limiting
- Operations monitoring: health endpoint, status dashboard, error boundaries

## Lighthouse Scores

| Performance | Accessibility | Best Practices | SEO |
|:-----------:|:------------:|:--------------:|:---:|
| 94 | 100 | 100 | 100 |

## Quick Start

```bash
git clone https://github.com/Instabidsai/tipsplit.git
cd tipsplit
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
  App.tsx              # Main app with calculator + landing page
  components/
    BillInput.tsx      # Dollar amount input
    TipSelector.tsx    # Tip percentage buttons + custom
    SplitSelector.tsx  # People stepper
    ResultsDisplay.tsx # Tip, total, per-person results
    HowItWorks.tsx     # 3-step explainer
    Features.tsx       # 6 feature cards
    Comparison.tsx     # Competitor comparison table
    FAQ.tsx            # 5-item accordion
    Pricing.tsx        # Free forever section
    StatusPage.tsx     # Operations dashboard
    ErrorBoundary.tsx  # React error boundary
  brand/
    tokens.ts          # Design system tokens
  lib/
    logger.ts          # Structured logging
    error-handler.ts   # Global error handling
api/
  health.ts            # Health check endpoint
  _logger.ts           # Server-side logging
  _rate-limit.ts       # Rate limiting
```

## License

MIT

---

Built with care. No ads. No tracking. Just math.
