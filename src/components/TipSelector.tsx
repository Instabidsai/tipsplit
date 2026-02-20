const TIP_PRESETS = [15, 18, 20, 25] as const;

interface TipSelectorProps {
  selected: number;
  customValue: string;
  onSelect: (percent: number) => void;
  onCustomChange: (value: string) => void;
}

export default function TipSelector({
  selected,
  customValue,
  onSelect,
  onCustomChange,
}: TipSelectorProps) {
  const isCustomActive = !TIP_PRESETS.includes(selected as 15 | 18 | 20 | 25);

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === "" || /^\d{0,3}$/.test(raw)) {
      onCustomChange(raw);
      const num = parseInt(raw, 10);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        onSelect(num);
      }
    }
  }

  function handleCustomFocus() {
    if (!isCustomActive) {
      onCustomChange("");
      onSelect(-1); // Signal custom mode
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium uppercase tracking-wider text-surface-500">
        Tip Percentage
      </label>
      <div className="grid grid-cols-5 gap-2">
        {TIP_PRESETS.map((pct) => (
          <button
            key={pct}
            type="button"
            onClick={() => onSelect(pct)}
            className={`btn-tip ${selected === pct ? "btn-tip-selected" : ""}`}
          >
            {pct}%
          </button>
        ))}
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Custom"
            aria-label="Custom tip percentage"
            value={isCustomActive ? customValue : ""}
            onChange={handleCustomChange}
            onFocus={handleCustomFocus}
            className={`btn-tip w-full text-center ${
              isCustomActive ? "btn-tip-selected" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}
