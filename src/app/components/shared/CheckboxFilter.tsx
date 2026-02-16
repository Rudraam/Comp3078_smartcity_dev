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
      <label className="block text-sm text-[#99a1af] mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggle(option)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                isSelected
                  ? "bg-[#1152d4] text-white"
                  : "bg-[#23262f] text-[#99a1af] hover:bg-[#2a2e3a]"
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
