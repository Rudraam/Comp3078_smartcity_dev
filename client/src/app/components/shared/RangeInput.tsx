interface RangeInputProps {
  label: string;
  minValue: number | "";
  maxValue: number | "";
  onMinChange: (value: number | "") => void;
  onMaxChange: (value: number | "") => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  prefix?: string;
  step?: number;
  min?: number;
  max?: number;
}

export default function RangeInput({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
  prefix = "",
  step = 1,
  min,
  max,
}: RangeInputProps) {
  const handleChange = (
    setter: (v: number | "") => void,
    rawValue: string
  ) => {
    if (rawValue === "") {
      setter("");
    } else {
      let num = parseFloat(rawValue);
      if (isNaN(num)) return;
      if (min !== undefined && num < min) num = min;
      if (max !== undefined && num > max) num = max;
      setter(num);
    }
  };

  return (
    <div>
      <label className="block text-sm text-[var(--app-text-muted)] mb-2 font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-lg px-3 py-2 flex-1 focus-within:border-[#1152d4] transition-colors">
          {prefix && (
            <span className="text-[var(--app-text-muted)] text-sm mr-1">{prefix}</span>
          )}
          <input
            type="number"
            value={minValue}
            onChange={(e) => handleChange(onMinChange, e.target.value)}
            placeholder={minPlaceholder}
            step={step}
            min={min}
            max={max}
            className="bg-transparent text-[var(--app-text)] text-sm w-full outline-none placeholder-[#6b7280] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <span className="text-[#6b7280] text-sm">to</span>
        <div className="flex items-center bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-lg px-3 py-2 flex-1 focus-within:border-[#1152d4] transition-colors">
          {prefix && (
            <span className="text-[var(--app-text-muted)] text-sm mr-1">{prefix}</span>
          )}
          <input
            type="number"
            value={maxValue}
            onChange={(e) => handleChange(onMaxChange, e.target.value)}
            placeholder={maxPlaceholder}
            step={step}
            min={min}
            max={max}
            className="bg-transparent text-[var(--app-text)] text-sm w-full outline-none placeholder-[#6b7280] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}