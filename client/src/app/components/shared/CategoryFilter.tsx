interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selected === category
              ? "bg-[#1152d4] text-white"
              : "bg-[#23262f] text-[#99a1af] hover:bg-[#2a2e3a]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
