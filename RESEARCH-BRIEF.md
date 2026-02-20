# TipSplit - Research Brief
**Crew 1: Research | Generated 2026-02-19**

---

```
VERIFICATION OF CREW 0: PASS
Issues found: None. Business Spec is well-structured with specific, actionable data.
All 5 features clearly defined. Build estimates labeled (implicit ASSUMPTION — reasonable
for a senior dev). Tech decisions are sound. Component architecture is ready for scaffolding.
```

---

## 1. Market Overview

The tip calculator market sits at the intersection of two massive trends: the $1.1T U.S. restaurant industry and near-universal smartphone adoption among diners. While tip calculators are a commoditized category, most existing solutions suffer from ad overload, dated UI, or unnecessary complexity — leaving room for a clean, modern, zero-friction alternative.

### Key Market Statistics

| # | Statistic | Source | Label |
|---|-----------|--------|-------|
| 1 | The average tip at full-service restaurants is **19.4%** (Q1 2025), with 93% of U.S. consumers tipping regularly | [Toast POS](https://pos.toasttab.com/blog/on-the-line/what-is-the-average-tip-percentage) | VERIFIED |
| 2 | **62% of full-service diners** prefer contactless or mobile payment options; 58% prefer QR code payments | [Restroworks](https://www.restroworks.com/blog/restaurant-mobile-app-statistics/) | VERIFIED |
| 3 | Calculator.net receives **~57M monthly visits**, with its tip calculator among top tools — proving massive organic demand for simple calculator utilities | [Semrush](https://www.semrush.com/website/calculator.net/overview/) | VERIFIED (site-wide; tip calc share is ASSUMPTION) |

**Implication**: Millions of people Google "tip calculator" every month. They land on ad-heavy, ugly, desktop-first pages. A mobile-first, modern, ad-free alternative captures this intent with a better experience.

---

## 2. Competitor Analysis

### Direct Competitors (Web-Based Tip Calculators)

| # | Competitor | URL | Pricing | Key Features | Weaknesses |
|---|-----------|-----|---------|-------------|------------|
| 1 | **Calculator.net** | [calculator.net/tip-calculator](https://www.calculator.net/tip-calculator.html) | Free (ad-supported) | Tip calc + bill split, tipping customs guide, multi-calculator ecosystem | Ad-heavy, dated UI, requires "Calculate" button press (not real-time), desktop-first design |
| 2 | **CalculatorSoup** | [calculatorsoup.com](https://www.calculatorsoup.com/calculators/financial/tip-calculator.php) | Free (ad-supported) | Tip calc + split, +/- buttons, round-up option, tax exclusion toggle | Cluttered interface, ads in functional area, not mobile-optimized, slow to load |
| 3 | **NerdWallet Tip Calc** | [nerdwallet.com](https://www.nerdwallet.com/finance/learn/tip-calculator) | Free (content marketing) | Tip calc with educational content, trusted brand | Buried in article content, not standalone tool, heavy page weight, limited split features |
| 4 | **Tipsy (PWA)** | [github.com/wKovacs64/tipsy](https://github.com/wKovacs64/tipsy) | Free (open source) | PWA installable, bill split, clean UI, no ads | Hobbyist project, minimal features, no SEO presence, not actively maintained |
| 5 | **Tippy (iOS App)** | [App Store](https://apps.apple.com/us/app/tippy-tip-calculator/id6723876794) | $0.99 | No ads, customizable, modern design | Paid (friction), iOS only, requires download, no web version |

### Adjacent Competitors (Bill Splitting Apps)

| Competitor | Type | Why They're Different |
|-----------|------|----------------------|
| **Splitwise** | Expense tracker | Ongoing group expenses, not single-meal tip calc |
| **Splitty** | Receipt scanner | Photo-based itemized splitting — overkill for quick tip math |
| **Tab** | Receipt scanner | Same as Splitty — requires photo, complex flow |
| **Venmo** | Payment app | Split payments, but no tip calculation |

---

## 3. Positioning Gap Analysis

### What Competitors Do Poorly

1. **Ad overload**: Calculator.net and CalculatorSoup are plastered with display ads, degrading the experience on the exact device (phone) where people use tip calculators
2. **Desktop-first design**: The top SEO-ranked calculators were built for desktop and adapted (poorly) for mobile
3. **Button-press required**: Most web calculators require clicking "Calculate" instead of showing results in real-time
4. **Unnecessary complexity**: Receipt scanners (Splitty, Tab) solve a harder problem than most diners need — they just want quick math
5. **App Store friction**: Native apps like Tippy require download and payment — too much friction for a 10-second task

### TipSplit's Positioning

> **TipSplit: The tip calculator that doesn't suck.**
> No ads. No downloads. No "Calculate" button. Just type your bill, tap a tip, and see the split — instantly, on your phone, at the table.

### Competitive Advantages

| Advantage | vs. Calculator.net/CalculatorSoup | vs. Tipsy/Tippy | vs. Splitwise/Tab |
|-----------|----------------------------------|-----------------|-------------------|
| **Zero ads** | They're ad-heavy | Tipsy matches; Tippy is paid | N/A |
| **No download required** | They match (web) | Tippy requires App Store install | Require app download |
| **Real-time results** | They require button press | Tipsy matches | Overkill flow |
| **Mobile-first design** | They're desktop-first | Tipsy is dated; Tippy is modern | Modern but complex |
| **Instant load** | Heavy pages with ads/scripts | Tipsy matches | Heavy apps |
| **Modern UI (Tailwind)** | Early-2000s aesthetics | Tipsy is minimal; Tippy is polished | Over-designed for task |

---

## 4. Positioning Statement

**For** restaurant diners splitting a bill on their phone,
**who need** to quickly calculate tips without downloading an app or fighting through ads,
**TipSplit is** a free, instant, mobile-first web tool
**that** calculates tips and splits bills in real-time with zero friction.
**Unlike** Calculator.net or native tip apps,
**TipSplit** loads instantly, updates as you type, and looks like it was built in 2026 — not 2006.

---

## 5. SEO & Distribution Opportunity

- **Primary keyword**: "tip calculator" — extremely high volume, commodity query
- **Long-tail keywords**: "tip calculator split bill", "restaurant tip splitter", "how much to tip calculator"
- **Distribution strategy**: Vercel deploys with good Core Web Vitals scores. A fast, mobile-optimized PWA can rank well for these queries with minimal SEO effort.
- **Zero-cost distribution**: No app store listing fees, no ad spend needed. Organic search + word-of-mouth at restaurant tables.

---

## 6. Recommendations for Build Crew

1. **Prioritize load speed**: Sub-1-second first paint. This is the #1 competitive differentiator vs. ad-heavy incumbents.
2. **Real-time calculation**: No "Calculate" button. Results update on every keystroke/tap. This is table-stakes UX that incumbents still miss.
3. **Large tap targets**: Tip preset buttons should be at least 48x48px. Users are tapping with greasy restaurant fingers.
4. **Default to 18% tip**: Market data shows 19.4% average, but 18% is the most common preset across competitors and feels familiar.
5. **Default to 2 people**: Most bill splits are between 2 people (couples dining). Start at 2, not 1.
6. **Consider PWA in v2**: The Tipsy project proves there's appetite for installable tip calculators. Could be a v2 differentiator.

---

*Research conducted 2026-02-19 using web search, competitor site analysis, and industry data sources.*
