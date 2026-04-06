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
      <label className="block text-sm text-[var(--app-text-muted)] mb-2 font-medium">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[var(--app-card-inner)] border border-[var(--app-border)] text-[var(--app-text)] text-sm px-4 py-2.5 rounded-lg outline-none appearance-none cursor-pointer hover:bg-[var(--app-card-inner)] focus:border-[#1152d4] transition-colors"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--app-text-muted)] pointer-events-none" />
      </div>
    </div>
  );
}
