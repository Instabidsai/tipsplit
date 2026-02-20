# TipSplit - Business Specification
**Crew 0: Intake | Generated 2026-02-19**

---

## 1. Founder Brief - Parsed Fields

| Field | Value |
|---|---|
| **Business Name** | TipSplit |
| **Industry** | Consumer Utility / Fintech-adjacent |
| **Target Audience** | Restaurant diners splitting bills on mobile phones (ages 18-45, smartphone users) |
| **Revenue Model** | None (free utility app). Future options: ads, premium themes, or affiliate restaurant links |
| **Founder Skills** | Not specified. Assumption: non-technical founder delegating to AI build crews |
| **Time Budget** | Not specified. Assumption: minimal ongoing maintenance (<2 hrs/week) |
| **Budget Constraints** | Zero-cost stack (Vite + React + Tailwind = free). Vercel free tier for hosting. No backend, no DB, no auth costs |

## 2. Core Value Proposition

> **Instantly calculate tips and split bills with friends in 2 taps - right at the restaurant table.**

## 3. Minimum Features for v1 Launch (5 max)

| # | Feature | Description |
|---|---|---|
| 1 | **Bill Input** | Numeric input field for the total bill amount with currency formatting |
| 2 | **Tip Selector** | Preset buttons (15%, 18%, 20%, 25%) + custom percentage input |
| 3 | **Split Calculator** | Number-of-people selector (1-20+) with stepper controls |
| 4 | **Results Display** | Real-time display of: tip amount, total with tip, per-person amount |
| 5 | **Mobile-First UI** | Responsive design optimized for phone screens, large tap targets, clean typography |

## 4. Build Time Estimates

| Feature | Estimated Hours | Notes |
|---|---|---|
| Project scaffolding (Vite + React + Tailwind) | 0.5 hr | Standard boilerplate |
| Bill Input component | 0.5 hr | Input validation, formatting |
| Tip Selector component | 1.0 hr | Preset buttons + custom input logic |
| Split Calculator component | 0.5 hr | Stepper UI, min/max validation |
| Results Display component | 1.0 hr | Real-time calculation, formatting |
| Mobile-First UI / styling | 1.5 hr | Tailwind responsive, polish, dark/light |
| Testing & QA | 0.5 hr | Manual testing, edge cases |
| Vercel deployment | 0.5 hr | Config + first deploy |
| **TOTAL** | **6.0 hrs** | |

## 5. Technical Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | React 18+ with Vite | Fast dev server, optimized builds, founder specified |
| Styling | Tailwind CSS | Utility-first, mobile-responsive out of box, founder specified |
| State Management | React useState hooks | App is simple enough; no Redux/Zustand needed |
| Deployment | Vercel | Free tier, instant deploys, founder specified |
| Testing | Manual + browser dev tools | No test framework needed for v1 of a calculator |
| Backend | None | 100% client-side as specified |
| Auth/DB | None | Not needed as specified |

## 6. Assumptions Made

1. **Currency**: USD ($) as default. No multi-currency support in v1.
2. **Rounding**: Round per-person amounts to nearest cent. Display rounding note if split doesn't divide evenly.
3. **Max split**: Support 1-99 people (practical upper bound).
4. **Bill range**: $0.01 to $99,999.99.
5. **Custom tip**: Allow 0-100% custom tip range.
6. **No persistence**: No localStorage or history. Fresh calculation each time.
7. **No PWA**: Standard web app, not installable. Can add PWA in v2.

## 7. User Flow

```
[Open App]
    ↓
[Enter Bill Amount: $___]
    ↓
[Select Tip: 15% | 18% | 20% | 25% | Custom]
    ↓
[Number of People: - [2] +]
    ↓
[RESULTS - updates in real-time]
  Tip Amount:      $XX.XX
  Total:           $XX.XX
  Per Person:      $XX.XX
```

## 8. Success Criteria

- [ ] App loads in <2 seconds on mobile
- [ ] All calculations are mathematically correct
- [ ] Works on iOS Safari and Android Chrome
- [ ] Clean, professional appearance
- [ ] Deployed and accessible via public URL

## 9. Out of Scope (v1)

- Bill itemization / splitting by item
- Receipt scanning / OCR
- Group payment links
- Currency conversion
- Tip history / favorites
- User accounts / authentication
- Dark mode toggle (ship with one good theme)

---

## Architecture for Next Crew

```
repo/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css          (Tailwind directives)
    └── components/
        ├── BillInput.jsx
        ├── TipSelector.jsx
        ├── SplitSelector.jsx
        └── ResultsDisplay.jsx
```

State lives in `App.jsx`:
```js
const [billAmount, setBillAmount] = useState('')
const [tipPercent, setTipPercent] = useState(18)
const [customTip, setCustomTip] = useState('')
const [numPeople, setNumPeople] = useState(2)

// Derived (computed on render, no useEffect needed):
const tip = bill * (tipPercent / 100)
const total = bill + tip
const perPerson = total / numPeople
```
