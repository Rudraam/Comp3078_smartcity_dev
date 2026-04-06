import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  buttonLabel,
  className = "",
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[var(--app-card)] text-[var(--app-text)] placeholder-[#6b7280] px-6 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
        />
        {!buttonLabel && (
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--app-card-hover)] rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-[#9ca3af]" />
          </button>
        )}
      </div>
      {buttonLabel && (
        <button
          type="submit"
          className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-8 py-3 rounded-lg font-medium"
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
}
