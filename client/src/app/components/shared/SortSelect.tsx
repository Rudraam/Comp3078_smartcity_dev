import { ChevronDown } from "lucide-react";

export interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  label?: string;
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({
  label = "Sort By",
  options,
  value,
  onChange,
}: SortSelectProps) {
  return (
    <div>
      <label className="block text-sm text-[#99a1af] mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#23262f] text-white text-sm px-4 py-2.5 rounded-lg outline-none appearance-none cursor-pointer hover:bg-[#2a2e3a] transition-colors focus:ring-2 focus:ring-[#1152d4]"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99a1af] pointer-events-none" />
      </div>
    </div>
  );
}
