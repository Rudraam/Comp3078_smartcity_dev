interface CheckboxFilterProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function CheckboxFilter({
  label,
  options,
  selected,
  onChange,
}: CheckboxFilterProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div>
      <label className="block text-sm text-[var(--app-text-muted)] mb-2 font-medium">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggle(option)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? "bg-[#1152d4] text-white border border-[#1152d4] shadow-sm"
                  : "bg-[var(--app-bg)] text-[var(--app-text)] border border-[var(--app-border)] hover:border-[#1152d4]/60 hover:text-[#1152d4]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
