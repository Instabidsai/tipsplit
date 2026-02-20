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
  // F-01: Tip Amount
  const tipAmount = Math.round(billAmount * (tipPercent / 100) * 100) / 100;
  // F-02: Total With Tip
  const totalWithTip = Math.round((billAmount + tipAmount) * 100) / 100;
  // F-03 + F-04: Per Person Amount (rounded)
  const perPerson = Math.round((totalWithTip / numPeople) * 100) / 100;
  // F-05: Rounding Remainder
  const remainder =
    Math.round((totalWithTip - perPerson * numPeople) * 100) / 100;

  const hasValidBill = billAmount > 0;

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
            {hasValidBill ? formatCurrency(totalWithTip) : "$0.00"}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-200 pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-700">
          Per Person
        </p>
        <p className="font-mono text-amount-lg text-brand-700">
          {hasValidBill ? formatCurrency(perPerson) : "$0.00"}
        </p>
      </div>

      {hasValidBill && remainder > 0 && (
        <p className="text-xs text-surface-500 italic">
          One person pays an extra {formatCurrency(Math.abs(remainder))} to
          cover rounding.
        </p>
      )}
    </div>
  );
}
