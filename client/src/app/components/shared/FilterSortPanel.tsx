import { X } from "lucide-react";

interface FilterSortPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function FilterSortPanel({
  isOpen,
  onClose,
  onClear,
  title = "Filters & Sorting",
  children,
}: FilterSortPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
            className="text-sm text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
