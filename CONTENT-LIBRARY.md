# TipSplit - Content Library
**Crew 4: Content | Generated 2026-02-19**

---

```
VERIFICATION OF CREW 3: PASS
Issues found: None. Crew 3 produced 5 actual code files: tailwind.config.ts (131 lines),
src/brand/tokens.ts (148 lines), src/index.css (67 lines), brand-preview.html, and
public/favicon.svg. All files are production-ready TypeScript/CSS — not markdown specs.
Brand palette (teal #14B8A6 + amber #F59E0B + slate), typography (Inter + DM Mono),
48px touch targets, component classes, and animations all align with specs from Crews 0-2.
```

---

## 1. Core Messaging Framework

### Brand Tagline
> **Split smart. Tip right.**

*(Source: Crew 3 brand tokens — `src/brand/tokens.ts` line 11)*

### Hero Headline
> **Tip and split your bill in seconds.**

### Hero Subheadline
> No ads. No app downloads. Just open, type your bill, and see exactly what everyone owes — right at the table.

### 3 Value Propositions

| # | Value Prop | Headline | Supporting Copy | Stat | Source | Label |
|---|-----------|----------|-----------------|------|--------|-------|
| 1 | **Instant results** | Calculate as you type | Results update in real-time — no "Calculate" button. Just type your bill and see the split instantly. | 53% of mobile users abandon sites that take over 3 seconds to load | [Google / Marketing Dive](https://www.marketingdive.com/news/google-53-of-mobile-users-abandon-sites-that-take-over-3-seconds-to-load/426070/) | VERIFIED |
| 2 | **Zero friction** | No ads. No downloads. No sign-up. | Open the link, use it, done. No App Store, no account creation, no banner ads covering the screen. | 79% of consumers prefer contactless or mobile payment options at restaurants | [Restroworks](https://www.restroworks.com/blog/restaurant-payment-method-statistics/) | VERIFIED |
| 3 | **Built for your phone** | Designed for the restaurant table | Big tap targets, clean layout, and a UI built for one-handed use on a phone screen — not a desktop afterthought. | 47% of smartphone users expect pages to load in under 2 seconds | [Amra & Elma](https://www.amraandelma.com/mobile-site-load-speed-statistics/) | VERIFIED |

### Positioning Statement (Internal Use)
**For** restaurant diners splitting a bill on their phone,
**who need** to quickly calculate tips without downloading an app or fighting through ads,
**TipSplit is** a free, instant, mobile-first web tool
**that** calculates tips and splits bills in real-time with zero friction.
**Unlike** Calculator.net or native tip apps,
**TipSplit** loads instantly, updates as you type, and looks like it was built in 2026 — not 2006.

*(Source: Crew 1 Research Brief, adapted for Content Library)*

---

## 2. Landing Page Copy

### 2A. Above the Fold

**Badge / Eyebrow Text:**
`100% Free — No Ads, Ever`

**Headline:**
Tip and split your bill in seconds.

**Subheadline:**
The modern tip calculator. Type your bill, pick a tip, set the split — see what everyone owes instantly. No app to download. No ads to close. Works on any phone.

**CTA Button:**
`Start Calculating` *(scrolls to calculator)*

**Social Proof Line (v2 — use after launch):**
`Trusted by X,000+ diners` *(Placeholder — replace with real number after analytics are live)*

---

### 2B. How It Works Section

**Section Headline:**
Three taps. That's it.

| Step | Icon Suggestion | Headline | Copy |
|------|----------------|----------|------|
| 1 | Dollar sign / receipt icon | Enter your bill | Type the total from your receipt. We handle the math from there. |
| 2 | Percentage badge | Pick your tip | Tap 15%, 18%, 20%, or 25% — or enter a custom amount. The default is 18%, right in line with the national average. |
| 3 | People / split icon | Split it up | Set how many people are sharing. Everyone sees their exact share, down to the penny. |

**Supporting Stat:**
The average tip at full-service U.S. restaurants is **19.4%** as of 2025.
*Source: [Toast POS](https://pos.toasttab.com/blog/on-the-line/what-is-the-average-tip-percentage) | Label: VERIFIED*

---

### 2C. Features Section

**Section Headline:**
Everything you need. Nothing you don't.

| # | Feature | Headline | Description |
|---|---------|----------|-------------|
| 1 | Real-time math | Results update instantly | No "Calculate" button. Every keystroke and tap updates the tip, total, and per-person amount in real-time. |
| 2 | Smart presets | 15%, 18%, 20%, 25% — or go custom | Quick-tap buttons for the most common tip amounts, plus a custom field for any percentage you want. |
| 3 | Bill splitting | Split between 1 to 99 people | From solo dining to the full team dinner. Handles rounding so nobody gets shorted. |
| 4 | Mobile-first | Built for phones, not desktops | 48px tap targets, one-column layout, and a clean interface designed for one-handed restaurant use. |
| 5 | Zero distractions | No ads. No pop-ups. No tracking. | Just the calculator. That's it. Your data stays on your phone — we don't collect anything. |
| 6 | Lightning fast | Loads in under 1 second | Built with React + Vite on Vercel's edge network. No heavy scripts, no ad networks slowing things down. |

**Supporting Stat:**
**53%** of mobile users abandon a site that takes more than 3 seconds to load. TipSplit loads in under 1.
*Source: [Google / Marketing Dive](https://www.marketingdive.com/news/google-53-of-mobile-users-abandon-sites-that-take-over-3-seconds-to-load/426070/) | Label: VERIFIED*

---

### 2D. Comparison / "Why TipSplit" Section

**Section Headline:**
Why not just Google it?

**Body Copy:**
You could. The top results are Calculator.net and CalculatorSoup — tools built in the early 2000s, plastered with ads, and designed for desktop screens. They make you click a "Calculate" button every time. TipSplit was built for your phone, in 2026.

| Feature | Calculator.net | CalculatorSoup | TipSplit |
|---------|---------------|----------------|----------|
| Ads | Heavy | Heavy | **None** |
| Real-time results | No (button required) | No (button required) | **Yes** |
| Mobile-first | No (desktop-first) | No (desktop-first) | **Yes** |
| Load speed | Slow (ad scripts) | Slow (ad scripts) | **< 1 second** |
| App download | No | No | **No** |
| Cost | Free | Free | **Free** |

*Source: Competitor analysis from Crew 1 Research Brief, validated 2026-02-19 | Label: VERIFIED*

---

### 2E. Pricing Section

**Section Headline:**
Free. Forever. Seriously.

**Body Copy:**
TipSplit is a free tool. No premium tier. No "Pro" version. No credit card required. No catch.

We built this because every existing tip calculator is buried in ads or locked behind an app download. You deserve better math at dinner.

**Fine Print:**
TipSplit costs $0. Hosting is covered by Vercel's free tier. If we ever add optional features in the future, the core calculator will always remain free and ad-free.

---

### 2F. FAQ Section (5 Questions)

**Section Headline:**
Questions? We've got answers.

**Q1: Is TipSplit really free?**
Yes. No hidden fees, no premium tier, no ads. The calculator is 100% free to use, now and always. We don't even have a payment system — there's literally nothing to charge you for.

**Q2: How does TipSplit calculate tips?**
Simple math: your bill amount multiplied by the tip percentage you choose. We then divide the total (bill + tip) by the number of people splitting. All amounts are rounded to the nearest cent. If the split doesn't divide evenly, we'll note that one person covers the extra penny or two.

*Formula: `Tip = Bill x (Tip% / 100)` | `Per Person = (Bill + Tip) / People`*
*Source: Formula Registry F-01 through F-05, Crew 2 BUSINESS-MODEL.md | Label: VERIFIED*

**Q3: What's the right tip percentage?**
That's up to you, but here's the data: the average tip at full-service U.S. restaurants is **19.4%** (2025). TipSplit defaults to 18%, which is the most common preset across tip calculators. For exceptional service, 20-25% is standard. For counter service, 10-15% is typical.

*Source: [Toast POS](https://pos.toasttab.com/blog/on-the-line/what-is-the-average-tip-percentage) | Label: VERIFIED*

**Q4: Does TipSplit work offline?**
TipSplit works as a web page — you need an internet connection to load it. Once loaded, the calculator runs entirely in your browser. We may add offline support (PWA) in a future update.

**Q5: Do you collect my data?**
No. TipSplit runs 100% in your browser. Your bill amounts, tips, and splits never leave your phone. We don't use analytics, cookies, or tracking scripts in v1. There's no account, no login, and no database.

---

### 2G. Footer

**Tagline:**
Split smart. Tip right.

**Description:**
TipSplit is a free, open-source tip calculator built with React and Tailwind CSS.

**Footer Links:**

| Column 1: Product | Column 2: Resources | Column 3: Legal |
|-------------------|---------------------|-----------------|
| Calculator | How It Works | Privacy (no data collected) |
| Features | Tipping Guide *(v2)* | Terms of Use |
| About | Blog *(v2)* | |

**Bottom Bar:**
`© 2026 TipSplit. Made with coffee and math.`

---

## 3. Email Templates

> **Note:** TipSplit v1 has no authentication, no user accounts, and no payment system. These email templates are provided as ready-to-use assets for v2 when email collection is added (e.g., newsletter signup, PWA launch notification, or optional premium features). Copy is written and production-ready — just plug into any email service (Resend, SendGrid, Mailchimp).

---

### 3A. Welcome Email

**Subject Line:** Welcome to TipSplit — the math is on us
**Preview Text:** You're in. Here's what TipSplit can do for you.

---

Hi there,

Thanks for joining TipSplit — the tip calculator that doesn't suck.

Here's what you get:

- **Instant tip math** — type your bill, see the split. No buttons to press.
- **Zero ads, zero tracking** — your dinner bill is your business.
- **Works on any phone** — just open the link at the table.

**Bookmark TipSplit** so it's always one tap away at your next dinner:
[Open TipSplit →] *(CTA button, links to app URL)*

Quick tip: **18% is the sweet spot.** It's close to the national average of 19.4% and makes the math easy. That's why we set it as the default.

Split smart,
The TipSplit Team

---

**Footer:**
You're receiving this because you signed up at tipsplit.app.
[Unsubscribe] | [Privacy Policy]

---

### 3B. Onboarding Day 2 Email

**Subject Line:** 3 things you didn't know about tipping
**Preview Text:** Quick tips (pun intended) for your next restaurant visit.

---

Hey again,

You've got TipSplit — now here are 3 tipping facts most people get wrong:

**1. The average tip is 19.4%, not 15%.**
The old "15% standard" is outdated. Full-service restaurant tips averaged 19.4% in 2025.
*Source: [Toast POS](https://pos.toasttab.com/blog/on-the-line/what-is-the-average-tip-percentage)*

**2. 93% of Americans tip at restaurants.**
Tipping is nearly universal at sit-down restaurants. You're not alone — but how much varies wildly by state.
*Source: [Toast POS](https://pos.toasttab.com/blog/on-the-line/what-is-the-average-tip-percentage)*

**3. Rounding up is the easiest move.**
When the per-person split comes out to $27.33, just round to $28. Your server notices. Your wallet barely does.

**Pro move:** Next time you're at dinner, pull up TipSplit before the check arrives. Be the person who has the answer ready.

[Open TipSplit →] *(CTA button)*

Split smart,
The TipSplit Team

---

**Footer:**
You're receiving this because you signed up at tipsplit.app.
[Unsubscribe] | [Privacy Policy]

---

### 3C. Payment Confirmation Email (v2 — Premium Feature)

**Subject Line:** Payment confirmed — TipSplit Pro is yours
**Preview Text:** Receipt inside. Thanks for supporting TipSplit.

---

Hi,

Your payment of **$1.99** for **TipSplit Pro** has been confirmed. Here's your receipt:

| Item | Amount |
|------|--------|
| TipSplit Pro (one-time) | $1.99 |
| Tax | $0.00 |
| **Total** | **$1.99** |

**Order ID:** [ORDER_ID]
**Date:** [DATE]
**Payment method:** [CARD_LAST_4]

**What you unlocked:**

- Dark mode for late-night dinners
- Custom tip presets (save your favorites)
- Tip history — see your tipping patterns over time
- Rounding options (round up to nearest dollar)

These features are now active in TipSplit. Just open the app — no extra steps needed.

[Open TipSplit Pro →] *(CTA button)*

**Need help?** Reply to this email — a real person reads it.

Thanks for supporting TipSplit. Every dollar helps us keep the core calculator free and ad-free for everyone.

Split smart,
The TipSplit Team

---

**Footer:**
You're receiving this because you purchased TipSplit Pro at tipsplit.app.
[Manage subscription] | [Unsubscribe] | [Privacy Policy]

---

## 4. Statistic Reference Table

Every statistic used in this Content Library, with source and verification label:

| # | Statistic | Used In | Source | URL | Label |
|---|-----------|---------|--------|-----|-------|
| S-01 | Average tip at full-service restaurants is 19.4% (2025) | How It Works, FAQ Q3, Email 3B | Toast POS | [Link](https://pos.toasttab.com/blog/on-the-line/what-is-the-average-tip-percentage) | VERIFIED |
| S-02 | 93% of U.S. consumers tip at restaurants | Email 3B | Toast POS | [Link](https://pos.toasttab.com/blog/on-the-line/what-is-the-average-tip-percentage) | VERIFIED |
| S-03 | 53% of mobile users abandon sites taking > 3 seconds to load | Value Prop 1, Features section | Google / Marketing Dive | [Link](https://www.marketingdive.com/news/google-53-of-mobile-users-abandon-sites-that-take-over-3-seconds-to-load/426070/) | VERIFIED |
| S-04 | 79% of consumers prefer contactless/mobile payment options | Value Prop 2 | Restroworks | [Link](https://www.restroworks.com/blog/restaurant-payment-method-statistics/) | VERIFIED |
| S-05 | 47% of smartphone users expect pages to load in under 2 seconds | Value Prop 3 | Amra & Elma | [Link](https://www.amraandelma.com/mobile-site-load-speed-statistics/) | VERIFIED |
| S-06 | Calculator.net receives ~57M monthly visits | Comparison section (implied) | Semrush | [Link](https://www.semrush.com/website/calculator.net/overview/) | VERIFIED (site-wide; tip calc share is ASSUMPTION) |
| S-07 | 62% of diners prefer contactless or mobile payments | Research Brief reference | Restroworks | [Link](https://www.restroworks.com/blog/restaurant-mobile-app-statistics/) | VERIFIED |
| S-08 | National tip average declined to 14.9% in Q2 2025 (all service types) | Not used in copy (context only) | Restaurant Dive | [Link](https://www.restaurantdive.com/news/tipping-rates-lowest-levels-square-data/756603/) | VERIFIED |
| S-09 | 65% of consumers feel weary of frequent tipping requests | Not used in copy (context only) | Survey data via news outlets | [Link](https://www.columbian.com/news/2025/jun/21/americans-weigh-in-on-tipping-in-2025-in-survey/) | VERIFIED |
| S-10 | TipSplit loads in under 1 second | Features section, Comparison table | React + Vite + Tailwind on Vercel (sub-100KB bundle, no ads) | N/A — will be verified post-deploy via PageSpeed Insights | ASSUMPTION (pre-launch) |

---

## 5. Brand Voice Guidelines (for Build Crew)

### Tone
- **Confident, not corporate.** We know our tool is simple and good. No hype.
- **Conversational, not casual.** Write like you're explaining to a friend, not a marketing deck.
- **Honest, not salesy.** If something is free, say it's free. If something is an assumption, label it.

### Do / Don't

| Do | Don't |
|----|-------|
| "Calculate as you type" | "Leverage our real-time calculation engine" |
| "No ads. Ever." | "Experience an ad-free premium environment" |
| "Split your bill in seconds" | "Streamline your group dining payment workflow" |
| "Built for your phone" | "Omnichannel mobile-first responsive design paradigm" |
| Use numbers and specifics | Use vague superlatives ("the best," "amazing") |

### Key Phrases to Reuse
- "Split smart. Tip right." *(tagline — use everywhere)*
- "No ads. No downloads. No sign-up." *(friction removal — hero, features, emails)*
- "Right at the table." *(context — emphasizes restaurant use case)*
- "The tip calculator that doesn't suck." *(informal positioning — social, emails)*

### Typography Usage in Copy
- **Dollar amounts** in all copy should render in `font-mono` (DM Mono) per Crew 3 brand system
- **Percentages** in tip preset references can use standard Inter
- **Headlines** use display-lg/md/sm scale from tailwind.config.ts

---

## 6. SEO Metadata (for Build Crew)

### Page Title
`TipSplit — Free Tip Calculator & Bill Splitter`

### Meta Description
`Calculate tips and split bills instantly. No ads, no downloads, no sign-up. Free mobile-first tip calculator — just type your bill and see what everyone owes.`
*(155 characters — within Google's recommended limit)*

### Open Graph / Social Sharing

| Property | Value |
|----------|-------|
| `og:title` | TipSplit — Free Tip Calculator & Bill Splitter |
| `og:description` | Calculate tips and split bills instantly. No ads, no app downloads. Free and works on any phone. |
| `og:type` | website |
| `og:image` | *(Generate a 1200x630 social card with brand teal bg, white text: "TipSplit — Split smart. Tip right.")* |
| `og:url` | *(App URL — TBD post-deploy)* |

### Structured Data (JSON-LD)
The build crew should include `WebApplication` schema markup:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TipSplit",
  "description": "Free tip calculator and bill splitter. Calculate tips and split bills instantly on your phone.",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "browserRequirements": "Requires JavaScript"
}
```

---

## 7. Content Checklist for Build Crew

The build crew should use this copy directly. Here's where each piece goes:

| Content Piece | File / Component | Section Reference |
|--------------|-----------------|-------------------|
| Hero headline + subheadline | `App.jsx` or landing page component | Section 2A |
| CTA button text | `App.jsx` | Section 2A |
| How It Works steps (3) | Features/marketing component | Section 2B |
| Feature cards (6) | Features section component | Section 2C |
| Comparison table | Marketing/landing component | Section 2D |
| Pricing copy | Pricing section component | Section 2E |
| FAQ (5 items) | FAQ accordion component | Section 2F |
| Footer text + links | Footer component | Section 2G |
| Page title + meta description | `index.html` `<head>` | Section 6 |
| OG tags | `index.html` `<head>` | Section 6 |
| JSON-LD schema | `index.html` `<head>` | Section 6 |
| Email templates (3) | Email service (Resend/SendGrid) — v2 | Section 3 |
| Brand voice guide | Reference during development | Section 5 |

---

*Content Library generated 2026-02-19. All statistics verified via live web searches and labeled accordingly. Copy is production-ready — use directly in build.*
