import { useState } from "react";
import BillInput from "./components/BillInput";
import TipSelector from "./components/TipSelector";
import SplitSelector from "./components/SplitSelector";
import ResultsDisplay from "./components/ResultsDisplay";

export default function App() {
  const [billRaw, setBillRaw] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [numPeople, setNumPeople] = useState(2);

  const billAmount = parseFloat(billRaw) || 0;
  const effectiveTip = tipPercent >= 0 ? tipPercent : 0;

  function handleTipSelect(pct: number) {
    if (pct === -1) {
      // Custom mode activated via focus
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

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Header */}
      <header className="pt-8 pb-4 text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <svg
            width="32"
            height="32"
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
          <h1 className="text-display-sm text-surface-900">TipSplit</h1>
        </div>
        <p className="text-sm text-surface-500">Split smart. Tip right.</p>
      </header>

      {/* Calculator */}
      <main className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="card w-full max-w-md space-y-6">
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
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-surface-400">
        <p>&copy; 2026 TipSplit. Made with coffee and math.</p>
        <p className="mt-1">No ads. No tracking. No data collected.</p>
      </footer>
    </div>
  );
}
