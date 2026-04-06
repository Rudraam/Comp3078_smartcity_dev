import type { TransportMode } from "../../types";

interface TransportSelectorProps {
  modes: TransportMode[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function TransportSelector({
  modes,
  selected,
  onSelect,
}: TransportSelectorProps) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Choose Transportation</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => mode.available && onSelect(mode.id)}
            disabled={!mode.available}
            className={`p-4 rounded-xl transition-all ${
              selected === mode.id
                ? "bg-[#1152d4] text-white"
                : mode.available
                ? "bg-[var(--app-card-inner)] hover:bg-[var(--app-card-hover)] text-[var(--app-text)]"
                : "bg-[var(--app-card-inner)] text-[#6b7280] cursor-not-allowed opacity-50"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              {mode.icon}
              <span className="text-xs font-medium">{mode.name}</span>
              <span className="text-xs">{mode.duration}</span>
              <span className="text-[10px] text-[var(--app-text-muted)]">
                {mode.distance}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}