interface BillInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BillInput({ value, onChange }: BillInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    // Allow empty, digits, and one decimal with up to 2 places
    if (raw === "" || /^\d*\.?\d{0,2}$/.test(raw)) {
      onChange(raw);
    }
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="bill"
        className="block text-sm font-medium uppercase tracking-wider text-surface-500"
      >
        Bill Amount
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-surface-400">
          $
        </span>
        <input
          id="bill"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={value}
          onChange={handleChange}
          className="input-field pl-9 font-mono text-xl"
          autoFocus
        />
      </div>
    </div>
  );
}
