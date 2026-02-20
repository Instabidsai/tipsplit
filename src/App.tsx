import { useState, useRef } from "react";
import BillInput from "./components/BillInput";
import TipSelector from "./components/TipSelector";
import SplitSelector from "./components/SplitSelector";
import ResultsDisplay from "./components/ResultsDisplay";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Comparison from "./components/Comparison";
import FAQ from "./components/FAQ";

export default function App() {
  const [billRaw, setBillRaw] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [numPeople, setNumPeople] = useState(2);
  const calcRef = useRef<HTMLDivElement>(null);

  const billAmount = parseFloat(billRaw) || 0;
  const effectiveTip = tipPercent >= 0 ? tipPercent : 0;

  function handleTipSelect(pct: number) {
    if (pct === -1) {
      setTipPercent(-1);
    } else {
      setTipPercent(pct);
    }
  }

  function handleCustomTipChange(value: string) {
    setCustomTip(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setTipPercent(num);
    } else if (value === "") {
      setTipPercent(0);
    }
  }

  function scrollToCalc() {
    calcRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* ─── Navigation ─────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 48 48"
              fill="none"
              className="shrink-0"
            >
              <rect width="48" height="48" rx="12" fill="#14B8A6" />
              <text
                x="24"
                y="32"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                fontSize="22"
                fontWeight="600"
                fill="white"
              >
                $
              </text>
            </svg>
            <span className="text-lg font-semibold text-surface-900">
              TipSplit
            </span>
          </div>
          <button
            onClick={scrollToCalc}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Calculate Now
          </button>
        </div>
      </nav>

      {/* ─── Hero / Above the Fold ──────────────────────────── */}
      <section className="pt-16 pb-12 px-4 text-center bg-gradient-to-b from-brand-50 to-surface-50">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-100 rounded-full">
            100% Free — No Ads, Ever
          </span>
          <h1 className="text-display-lg text-surface-900 mb-4">
            Tip and split your bill in seconds.
          </h1>
          <p className="text-lg text-surface-500 leading-relaxed mb-8 max-w-xl mx-auto">
            The modern tip calculator. Type your bill, pick a tip, set the split
            — see what everyone owes instantly. No app to download. No ads to
            close. Works on any phone.
          </p>
          <button
            onClick={scrollToCalc}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 text-white font-semibold rounded-2xl shadow-md hover:bg-brand-600 active:scale-95 transition-all duration-150 text-base min-h-touch"
          >
            Start Calculating
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 4v12m0 0l-4-4m4 4l4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* ─── Calculator ─────────────────────────────────────── */}
      <section
        ref={calcRef}
        id="calculator"
        className="py-12 px-4 bg-surface-50"
      >
        <div className="max-w-md mx-auto">
          <div className="card w-full space-y-6 animate-slide-up">
            <BillInput value={billRaw} onChange={setBillRaw} />
            <TipSelector
              selected={tipPercent}
              customValue={customTip}
              onSelect={handleTipSelect}
              onCustomChange={handleCustomTipChange}
            />
            <SplitSelector value={numPeople} onChange={setNumPeople} />
            <ResultsDisplay
              billAmount={billAmount}
              tipPercent={effectiveTip}
              numPeople={numPeople}
            />
          </div>
        </div>
      </section>

      {/* ─── How It Works ───────────────────────────────────── */}
      <HowItWorks />

      {/* ─── Features ───────────────────────────────────────── */}
      <Features />

      {/* ─── Comparison ─────────────────────────────────────── */}
      <Comparison />

      {/* ─── Pricing ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-display-md text-surface-900 mb-4">
            Free. Forever. Seriously.
          </h2>
          <p className="text-surface-500 leading-relaxed mb-6">
            TipSplit is a free tool. No premium tier. No "Pro" version. No
            credit card required. No catch.
          </p>
          <p className="text-surface-500 leading-relaxed mb-8">
            We built this because every existing tip calculator is buried in ads
            or locked behind an app download. You deserve better math at dinner.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-50 text-brand-700 rounded-2xl text-sm font-medium">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M16.667 5L7.5 14.167 3.333 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-mono">$0</span> — always
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────── */}
      <FAQ />

      {/* ─── CTA Banner ─────────────────────────────────────── */}
      <section className="py-16 px-4 bg-brand-500">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-display-sm text-white mb-4">
            Ready to split the bill?
          </h2>
          <p className="text-brand-100 mb-8">
            No sign-up required. Just scroll up and start calculating.
          </p>
          <button
            onClick={scrollToCalc}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 font-semibold rounded-2xl shadow-md hover:bg-brand-50 active:scale-95 transition-all duration-150 text-base min-h-touch"
          >
            Start Calculating
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 16V4m0 0l4 4m-4-4l-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <footer className="py-12 px-4 bg-surface-900 text-surface-400">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="shrink-0"
                >
                  <rect width="48" height="48" rx="12" fill="#14B8A6" />
                  <text
                    x="24"
                    y="32"
                    textAnchor="middle"
                    fontFamily="system-ui, sans-serif"
                    fontSize="22"
                    fontWeight="600"
                    fill="white"
                  >
                    $
                  </text>
                </svg>
                <span className="text-base font-semibold text-white">
                  TipSplit
                </span>
              </div>
              <p className="text-sm text-surface-400 max-w-xs">
                Split smart. Tip right. A free, open-source tip calculator built
                with React and Tailwind CSS.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <h4 className="font-semibold text-surface-200 mb-3 uppercase tracking-wider text-xs">
                  Product
                </h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={scrollToCalc}
                      className="hover:text-white transition-colors"
                    >
                      Calculator
                    </button>
                  </li>
                  <li>
                    <a href="#features" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-surface-200 mb-3 uppercase tracking-wider text-xs">
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li>
                    <span className="text-surface-500">
                      No data collected
                    </span>
                  </li>
                  <li>
                    <span className="text-surface-500">No cookies used</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-800 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-surface-500">
            <p>&copy; 2026 TipSplit. Made with coffee and math.</p>
            <p>No ads. No tracking. No data collected.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
