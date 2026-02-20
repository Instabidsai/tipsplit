# TipSplit - Business Model + Formula Registry
**Crew 2: Strategy | Generated 2026-02-19**

---

```
VERIFICATION OF CREW 1: PASS
Issues found: None. Research Brief contains 3 verified market statistics with real source URLs,
5 direct competitors with detailed comparison tables, and 6 actionable build recommendations.
All numbers labeled VERIFIED or ASSUMPTION. Content aligns with founder brief. No gaps found.
```

---

## 1. Revenue Model

### v1 Reality: Zero Revenue (By Design)

The founder brief explicitly states: **"No authentication, no database, no payments."** TipSplit v1 is a free, client-side utility app. There are no pricing tiers, no fee structure, and no payment frequency because there is nothing to charge for.

**v1 Revenue: $0/month. This is intentional.** The goal is user acquisition and organic search positioning, not monetization.

### v1 Operating Costs

| Cost Item | Monthly Cost | Source | Label |
|-----------|-------------|--------|-------|
| Vercel hosting (free tier) | $0 | [Vercel Pricing](https://vercel.com/pricing) - free for hobby projects, 100GB bandwidth | VERIFIED |
| Domain name (optional) | $1/month ($12/year) | [Namecheap](https://www.namecheap.com/) - .com average | VERIFIED |
| SSL certificate | $0 | Included with Vercel | VERIFIED |
| CDN / performance | $0 | Included with Vercel Edge Network | VERIFIED |
| Backend / database | $0 | Not needed - 100% client-side | VERIFIED |
| **Total Monthly Cost** | **$0 - $1** | | |

**Break-even for v1: Immediate.** With zero revenue and near-zero costs, TipSplit breaks even on day 1.

### v2+ Monetization Paths (Future — Not for v1 Build)

| Path | Model | Estimated Revenue | Feasibility | Conflicts with Positioning? |
|------|-------|-------------------|-------------|-----------------------------|
| **A. Google AdSense** | CPM display ads | $2-5 per 1,000 visits (ASSUMPTION) | High — easy to implement | **YES** — "zero ads" is core differentiator |
| **B. Affiliate Links** | Restaurant delivery referrals (DoorDash, Uber Eats) | $0.50-2.00 per click-through (ASSUMPTION) | Medium — requires affiliate partnerships | Low — contextually relevant |
| **C. Premium PWA (v2)** | One-time $0.99-1.99 or tip jar | $0.99-1.99 per conversion | Low — free alternatives abundant | No — opt-in |
| **D. Sponsorship** | Restaurant brand placement | $100-500/month (ASSUMPTION) | Low — requires traffic volume first | Medium — depends on execution |
| **E. Tip Jar / Donations** | Voluntary "tip the tip calculator" | $0.01-0.10 per 1,000 users (ASSUMPTION) | Low — donation models rarely work | No — opt-in and on-brand |

**Strategic Decision**: Path B (Affiliate Links) is the only monetization path that doesn't conflict with TipSplit's "zero ads" positioning. All other paths are documented but NOT recommended for v2.

---

## 2. Formula Registry (Single Source of Truth)

### 2A. Core App Formulas (What the App Calculates)

These are the formulas the app MUST implement. They are the product.

| # | Formula Name | Calculation | Example | Source | Label |
|---|-------------|-------------|---------|--------|-------|
| F-01 | **Tip Amount** | `tipAmount = billAmount * (tipPercent / 100)` | $85.50 * 0.18 = $15.39 | Standard math | VERIFIED |
| F-02 | **Total With Tip** | `totalWithTip = billAmount + tipAmount` | $85.50 + $15.39 = $100.89 | Standard math | VERIFIED |
| F-03 | **Per Person Amount** | `perPerson = totalWithTip / numPeople` | $100.89 / 3 = $33.63 | Standard math | VERIFIED |
| F-04 | **Rounding Rule** | `roundedAmount = Math.round(amount * 100) / 100` | $33.6333... -> $33.63 | IEEE 754 / JS standard | VERIFIED |
| F-05 | **Rounding Remainder** | `remainder = totalWithTip - (perPerson * numPeople)` | $100.89 - ($33.63 * 3) = $0.00 | Derived | VERIFIED |

**Rounding Policy**: All displayed amounts round to the nearest cent (2 decimal places). If the split doesn't divide evenly, one person pays the remainder (1-2 cents). The app should display this note when `remainder !== 0`.

### 2B. Business/Operational Formulas (For Tracking & Future Monetization)

| # | Formula Name | Calculation | Variables | Source | Label |
|---|-------------|-------------|-----------|--------|-------|
| F-06 | **Monthly Active Users (MAU)** | `mau = uniqueVisitors * returnRate` | returnRate = 0.15 (ASSUMPTION: 15% of first-time users return within 30 days) | Industry average for utility apps | ASSUMPTION |
| F-07 | **Organic Traffic Growth** | `monthlyVisitors = baseVisitors * (1 + growthRate)^month` | baseVisitors = 100 (launch month), growthRate = 0.30 (30% month-over-month via SEO) | SEO growth for new utility sites | ASSUMPTION |
| F-08 | **Vercel Bandwidth Usage** | `monthlyBandwidth_GB = avgPageSize_MB * monthlyPageviews / 1000` | avgPageSize = 0.15 MB (React + Tailwind bundle), free tier = 100 GB | Vite production build typical size | ASSUMPTION |
| F-09 | **Vercel Free Tier Capacity** | `maxMonthlyPageviews = (100 * 1000) / avgPageSize_MB` | = 100,000 / 0.15 = ~666,666 pageviews | [Vercel Pricing](https://vercel.com/pricing) | VERIFIED (formula), ASSUMPTION (page size) |

### 2C. Future Monetization Formulas (Not Active in v1)

| # | Formula Name | Calculation | Variables | Source | Label |
|---|-------------|-------------|-----------|--------|-------|
| F-10 | **Ad Revenue (if enabled)** | `monthlyAdRevenue = (monthlyPageviews / 1000) * cpm` | cpm = $3.00 (display ads for finance/utility niche) | [Google AdSense benchmarks](https://www.monetizemore.com/blog/what-is-a-good-adsense-cpm/) | ASSUMPTION |
| F-11 | **Affiliate Revenue (Path B)** | `monthlyAffiliateRev = monthlyVisitors * clickRate * conversionRate * commission` | clickRate = 0.02 (2%), conversionRate = 0.05 (5%), commission = $1.50 per conversion | Industry averages for food delivery affiliates | ASSUMPTION |
| F-12 | **Premium Conversion Revenue** | `monthlyPremiumRev = mau * conversionRate * price` | conversionRate = 0.005 (0.5%), price = $1.99 | Typical freemium conversion for utilities | ASSUMPTION |

---

## 3. Unit Economics

### v1 Unit Economics (Free Product)

| Metric | Value | Calculation | Label |
|--------|-------|-------------|-------|
| **Customer Acquisition Cost (CAC)** | $0 | No ad spend. 100% organic SEO + word-of-mouth | VERIFIED |
| **Lifetime Value (LTV)** | $0 | No revenue model in v1 | VERIFIED |
| **Cost Per User** | ~$0.00 | Vercel free tier covers up to ~666K pageviews/month | VERIFIED |
| **Break-even Point** | Day 1 | $0 revenue - $0 cost = $0 profit | VERIFIED |
| **Gross Margin** | N/A | No revenue to calculate margin on | VERIFIED |

### Projected v2 Unit Economics (If Affiliate Model Activated at 10K MAU)

| Metric | Value | Calculation | Label |
|--------|-------|-------------|-------|
| **CAC** | $0 | Still organic — no paid acquisition | ASSUMPTION |
| **LTV (Affiliate Path B)** | $0.018 per user/month | F-11: 10,000 * 0.02 * 0.05 * $1.50 / 10,000 = $0.0015/user/visit. At 12 visits/year = $0.018/user/year | ASSUMPTION |
| **Annual Revenue at 10K MAU** | $180 | 10,000 users * $0.018 LTV | ASSUMPTION |
| **Annual Revenue at 100K MAU** | $1,800 | 100,000 users * $0.018 LTV | ASSUMPTION |
| **Vercel Pro Upgrade Trigger** | ~666K pageviews/month | When free tier bandwidth exhausted. Pro = $20/month | VERIFIED (threshold), ASSUMPTION (timing) |

**Honest Assessment**: TipSplit is not a venture-scale business. It's a utility tool. At realistic traffic levels (1K-100K MAU), affiliate revenue ranges from $18 to $1,800/year. The real value of TipSplit is as a portfolio piece, SEO asset, or lead-in to a larger product (e.g., restaurant discovery, group payment platform).

---

## 4. 90-Day Revenue Target + Milestones

### Revenue Target: $0 (v1 is free)

This is not a cop-out. The founder brief says no payments, no backend. The 90-day plan focuses on **user acquisition milestones** that position TipSplit for optional future monetization.

| Day | Milestone | Target | Success Metric | Formula |
|-----|-----------|--------|----------------|---------|
| **Day 1** | Ship v1 to Vercel | Live URL | App accessible, all calculations correct | N/A |
| **Day 7** | Core Web Vitals pass | LCP < 1.0s, FID < 100ms, CLS < 0.1 | [PageSpeed Insights](https://pagespeed.web.google.com/) score > 95 | N/A |
| **Day 14** | SEO foundation | Indexed by Google | `site:tipsplit.app` returns result (ASSUMPTION: domain TBD) | N/A |
| **Day 30** | First organic traffic | 100 monthly visitors | Google Search Console data | F-07: base = 100 |
| **Day 45** | User retention signal | 15% return rate | Analytics (if added) | F-06: mau = 100 * 0.15 = 15 |
| **Day 60** | Traffic growth | 300 monthly visitors | F-07: 100 * 1.30^2 = 169 (conservative) to 300 (optimistic) | F-07 |
| **Day 90** | Monetization decision point | 500+ monthly visitors | Enough data to evaluate Path B (affiliate) viability | F-11: 500 * 0.02 * 0.05 * $1.50 = $0.75/month |

### 90-Day Revenue Projection

| Scenario | Monthly Visitors (Day 90) | Monthly Revenue | Source |
|----------|--------------------------|-----------------|--------|
| **Pessimistic** | 50 | $0 | Slow SEO, no social sharing |
| **Base Case** | 300 | $0 | Organic SEO growth per F-07 |
| **Optimistic** | 1,000 | $0 (or $1.50 if affiliate enabled) | Viral sharing + SEO + F-11 |

**Decision at Day 90**: If traffic exceeds 500/month, evaluate adding a non-intrusive affiliate link (e.g., "Ordering delivery? Try DoorDash" at the bottom). If traffic is below 100/month, the tool serves as a portfolio piece and SEO experiment — still valuable at $0 cost.

---

## 5. Formula Registry (Structured JSON)

```json
{
  "formulaRegistry": {
    "version": "1.0.0",
    "generatedBy": "Crew 2 - Strategy",
    "generatedDate": "2026-02-19",
    "categories": {
      "coreApp": {
        "description": "Formulas the app must implement — these ARE the product",
        "formulas": {
          "F-01": {
            "name": "Tip Amount",
            "formula": "tipAmount = billAmount * (tipPercent / 100)",
            "inputs": ["billAmount (number, USD)", "tipPercent (number, 0-100)"],
            "output": "tipAmount (number, USD, 2 decimal places)",
            "example": { "billAmount": 85.50, "tipPercent": 18, "result": 15.39 },
            "source": "Standard arithmetic",
            "label": "VERIFIED"
          },
          "F-02": {
            "name": "Total With Tip",
            "formula": "totalWithTip = billAmount + tipAmount",
            "inputs": ["billAmount (number, USD)", "tipAmount (number, USD)"],
            "output": "totalWithTip (number, USD, 2 decimal places)",
            "example": { "billAmount": 85.50, "tipAmount": 15.39, "result": 100.89 },
            "source": "Standard arithmetic",
            "label": "VERIFIED"
          },
          "F-03": {
            "name": "Per Person Amount",
            "formula": "perPerson = totalWithTip / numPeople",
            "inputs": ["totalWithTip (number, USD)", "numPeople (integer, 1-99)"],
            "output": "perPerson (number, USD, 2 decimal places)",
            "example": { "totalWithTip": 100.89, "numPeople": 3, "result": 33.63 },
            "source": "Standard arithmetic",
            "label": "VERIFIED"
          },
          "F-04": {
            "name": "Rounding Rule",
            "formula": "roundedAmount = Math.round(amount * 100) / 100",
            "inputs": ["amount (number)"],
            "output": "roundedAmount (number, 2 decimal places)",
            "example": { "amount": 33.6333, "result": 33.63 },
            "source": "IEEE 754 / JavaScript standard rounding",
            "label": "VERIFIED"
          },
          "F-05": {
            "name": "Rounding Remainder",
            "formula": "remainder = totalWithTip - (perPerson * numPeople)",
            "inputs": ["totalWithTip (number, USD)", "perPerson (number, USD)", "numPeople (integer)"],
            "output": "remainder (number, USD, typically $0.00-$0.02)",
            "example": { "totalWithTip": 100.00, "perPerson": 33.33, "numPeople": 3, "result": 0.01 },
            "source": "Derived from F-03 and F-04",
            "label": "VERIFIED",
            "note": "If remainder > 0, display note: 'One person pays an extra $X.XX to cover rounding'"
          }
        }
      },
      "businessOperational": {
        "description": "Formulas for tracking growth and operational thresholds",
        "formulas": {
          "F-06": {
            "name": "Monthly Active Users (MAU)",
            "formula": "mau = uniqueVisitors * returnRate",
            "inputs": ["uniqueVisitors (integer)", "returnRate (decimal, 0-1)"],
            "output": "mau (integer)",
            "defaults": { "returnRate": 0.15 },
            "source": "Industry average for utility web apps",
            "label": "ASSUMPTION"
          },
          "F-07": {
            "name": "Organic Traffic Growth",
            "formula": "monthlyVisitors = baseVisitors * (1 + growthRate) ^ month",
            "inputs": ["baseVisitors (integer)", "growthRate (decimal)", "month (integer, months since launch)"],
            "output": "monthlyVisitors (integer)",
            "defaults": { "baseVisitors": 100, "growthRate": 0.30 },
            "source": "SEO growth benchmarks for new utility sites",
            "label": "ASSUMPTION"
          },
          "F-08": {
            "name": "Vercel Bandwidth Usage",
            "formula": "monthlyBandwidth_GB = avgPageSize_MB * monthlyPageviews / 1000",
            "inputs": ["avgPageSize_MB (number)", "monthlyPageviews (integer)"],
            "output": "monthlyBandwidth_GB (number)",
            "defaults": { "avgPageSize_MB": 0.15 },
            "source": "Typical Vite + React + Tailwind production bundle size",
            "label": "ASSUMPTION"
          },
          "F-09": {
            "name": "Vercel Free Tier Capacity",
            "formula": "maxMonthlyPageviews = (freetierBandwidth_GB * 1000) / avgPageSize_MB",
            "inputs": ["freetierBandwidth_GB (number)", "avgPageSize_MB (number)"],
            "output": "maxMonthlyPageviews (integer)",
            "defaults": { "freetierBandwidth_GB": 100, "avgPageSize_MB": 0.15 },
            "result": 666666,
            "source": "Vercel Pricing page — free tier includes 100 GB bandwidth",
            "label": "VERIFIED (formula), ASSUMPTION (page size)"
          }
        }
      },
      "futureMonetization": {
        "description": "Formulas for potential v2+ monetization — NOT active in v1",
        "formulas": {
          "F-10": {
            "name": "Ad Revenue (if enabled)",
            "formula": "monthlyAdRevenue = (monthlyPageviews / 1000) * cpm",
            "inputs": ["monthlyPageviews (integer)", "cpm (number, USD)"],
            "output": "monthlyAdRevenue (number, USD)",
            "defaults": { "cpm": 3.00 },
            "source": "Google AdSense CPM benchmarks for finance/utility niche",
            "label": "ASSUMPTION",
            "warning": "Conflicts with 'zero ads' positioning — NOT recommended"
          },
          "F-11": {
            "name": "Affiliate Revenue",
            "formula": "monthlyAffiliateRev = monthlyVisitors * clickRate * conversionRate * commission",
            "inputs": ["monthlyVisitors (integer)", "clickRate (decimal)", "conversionRate (decimal)", "commission (number, USD)"],
            "output": "monthlyAffiliateRev (number, USD)",
            "defaults": { "clickRate": 0.02, "conversionRate": 0.05, "commission": 1.50 },
            "source": "Industry averages for food delivery affiliate programs",
            "label": "ASSUMPTION"
          },
          "F-12": {
            "name": "Premium Conversion Revenue",
            "formula": "monthlyPremiumRev = mau * conversionRate * price",
            "inputs": ["mau (integer)", "conversionRate (decimal)", "price (number, USD)"],
            "output": "monthlyPremiumRev (number, USD)",
            "defaults": { "conversionRate": 0.005, "price": 1.99 },
            "source": "Typical freemium conversion rates for utility apps",
            "label": "ASSUMPTION"
          }
        }
      }
    },
    "constants": {
      "DEFAULT_TIP_PERCENT": 18,
      "DEFAULT_NUM_PEOPLE": 2,
      "TIP_PRESETS": [15, 18, 20, 25],
      "MIN_BILL": 0.01,
      "MAX_BILL": 99999.99,
      "MIN_PEOPLE": 1,
      "MAX_PEOPLE": 99,
      "MIN_TIP_PERCENT": 0,
      "MAX_TIP_PERCENT": 100,
      "CURRENCY": "USD",
      "DECIMAL_PLACES": 2
    }
  }
}
```

---

## 6. Strategic Summary

### What TipSplit IS
- A free, zero-cost utility web app
- A portfolio piece demonstrating modern React + Tailwind skills
- An SEO experiment targeting high-volume "tip calculator" queries
- A potential top-of-funnel for a future restaurant/payment product

### What TipSplit IS NOT
- A revenue-generating business (in v1)
- A venture-fundable startup
- A subscription product

### Key Decision for Founder
At Day 90, if organic traffic exceeds 500 monthly visitors, consider:
1. Adding a single, non-intrusive affiliate link (Path B) — estimated $0.75-$3.00/month
2. Building v2 features (PWA, dark mode, receipt scanning) to increase retention
3. Using TipSplit traffic to validate a larger product idea (group payments, restaurant discovery)

If traffic is below 100/month, TipSplit still delivers value at $0 cost as a portfolio project and technical demonstration.

---

*Strategy document generated 2026-02-19. All ASSUMPTION-labeled numbers should be validated against real data once the app is live and generating traffic.*
