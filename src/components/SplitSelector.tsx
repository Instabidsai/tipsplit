interface SplitSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SplitSelector({ value, onChange }: SplitSelectorProps) {
  function decrement() {
    if (value > 1) onChange(value - 1);
  }

  function increment() {
    if (value < 99) onChange(value + 1);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium uppercase tracking-wider text-surface-500">
        Number of People
      </label>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= 1}
          className="btn-tip !rounded-full !min-w-[48px] !px-0 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Decrease people"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="text-2xl font-semibold text-surface-900 tabular-nums min-w-[3ch] text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={value >= 99}
          className="btn-tip !rounded-full !min-w-[48px] !px-0 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Increase people"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 5v10M5 10h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
