import { useState } from "react";

interface ResultsDisplayProps {
  billAmount: number;
  tipPercent: number;
  numPeople: number;
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function ResultsDisplay({
  billAmount,
  tipPercent,
  numPeople,
}: ResultsDisplayProps) {
  const [roundUp, setRoundUp] = useState(false);
  const [copied, setCopied] = useState(false);

  // F-01: Tip Amount
  const tipAmount = Math.round(billAmount * (tipPercent / 100) * 100) / 100;
  // F-02: Total With Tip
  const totalWithTip = Math.round((billAmount + tipAmount) * 100) / 100;
  // F-03 + F-04: Per Person Amount (rounded)
  const perPerson = Math.round((totalWithTip / numPeople) * 100) / 100;
  // F-05: Rounding Remainder
  const remainder =
    Math.round((totalWithTip - perPerson * numPeople) * 100) / 100;

  // Round Up: ceil per-person to nearest dollar
  const perPersonRounded = roundUp ? Math.ceil(perPerson) : perPerson;
  const totalRounded = roundUp ? perPersonRounded * numPeople : totalWithTip;
  const extraFromRounding = roundUp
    ? Math.round((totalRounded - totalWithTip) * 100) / 100
    : 0;

  const hasValidBill = billAmount > 0;

  async function copyResults() {
    if (!hasValidBill) return;
    const lines = [
      `Bill: ${formatCurrency(billAmount)}`,
      `Tip (${tipPercent}%): ${formatCurrency(tipAmount)}`,
      `Total: ${formatCurrency(roundUp ? totalRounded : totalWithTip)}`,
      numPeople > 1
        ? `Each of ${numPeople} people pays: ${formatCurrency(perPersonRounded)}`
        : `You pay: ${formatCurrency(perPersonRounded)}`,
    ];
    if (roundUp && extraFromRounding > 0) {
      lines.push(`(Rounded up — extra ${formatCurrency(extraFromRounding)} as bonus tip)`);
    }
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <div className="card-result animate-fade-in space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-surface-500">
            Tip Amount
          </p>
          <p className="font-mono text-amount-sm text-surface-800">
            {hasValidBill ? formatCurrency(tipAmount) : "$0.00"}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-surface-500">
            Total
          </p>
          <p className="font-mono text-amount-sm text-surface-800">
            {hasValidBill
              ? formatCurrency(roundUp ? totalRounded : totalWithTip)
              : "$0.00"}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-200 pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Per Person
        </p>
        <p className="font-mono text-amount-lg text-brand-700">
          {hasValidBill ? formatCurrency(perPersonRounded) : "$0.00"}
        </p>
      </div>

      {hasValidBill && !roundUp && remainder > 0 && (
        <p className="text-xs text-surface-500 italic">
          One person pays an extra {formatCurrency(Math.abs(remainder))} to
          cover rounding.
        </p>
      )}

      {hasValidBill && roundUp && extraFromRounding > 0 && (
        <p className="text-xs text-brand-600 italic">
          Rounded up — extra {formatCurrency(extraFromRounding)} goes as bonus
          tip.
        </p>
      )}

      {/* Quick Actions */}
      {hasValidBill && (
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setRoundUp(!roundUp)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
              roundUp
                ? "bg-brand-100 text-brand-700 ring-1 ring-brand-300"
                : "bg-surface-100 text-surface-500 hover:bg-surface-200"
            }`}
            aria-pressed={roundUp}
            aria-label="Round up per-person amount to nearest dollar"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 16V4m0 0l-4 4m4-4l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Round Up
          </button>
          <button
            type="button"
            onClick={copyResults}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
              copied
                ? "bg-green-100 text-green-700"
                : "bg-surface-100 text-surface-500 hover:bg-surface-200"
            }`}
            aria-label="Copy results to clipboard"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 10l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <rect
                    x="7"
                    y="7"
                    width="9"
                    height="9"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
