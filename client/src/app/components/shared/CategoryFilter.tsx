interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  label?: string;
  className?: string;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  label = "Category",
  className = "",
}: CategoryFilterProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm text-[var(--app-text-muted)] mb-2 font-medium">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selected === category
                ? "bg-[#1152d4] text-white border border-[#1152d4] shadow-sm"
                : "bg-[var(--app-bg)] text-[var(--app-text)] border border-[var(--app-border)] hover:border-[#1152d4]/60 hover:text-[#1152d4]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
