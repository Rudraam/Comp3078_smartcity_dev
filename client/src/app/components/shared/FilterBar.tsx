interface FilterButton {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface FilterBarProps {
  buttons: FilterButton[];
  className?: string;
}

export default function FilterBar({ buttons, className = "mb-6" }: FilterBarProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={btn.onClick}
          className="bg-[#23262f] hover:bg-[#2a2e3a] transition-colors px-6 py-3 rounded-lg flex items-center gap-2"
        >
          {btn.icon}
          {btn.label}
        </button>
      ))}
    </div>
  );
}
