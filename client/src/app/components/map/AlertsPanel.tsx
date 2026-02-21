import type { Alert } from "../../types";

interface AlertsPanelProps {
  alerts: Alert[];
  activeFilter: "all" | "traffic" | "weather";
  onFilterChange: (filter: "all" | "traffic" | "weather") => void;
}

const filterOptions: { value: "all" | "traffic" | "weather"; label: string }[] =
  [
    { value: "all", label: "All" },
    { value: "traffic", label: "\u{1F6A8} Traffic" },
    { value: "weather", label: "\u{1F324}\uFE0F Weather" },
  ];

export default function AlertsPanel({
  alerts,
  activeFilter,
  onFilterChange,
}: AlertsPanelProps) {
  return (
    <div className="bg-[#23262f] rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Alerts</h3>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeFilter === option.value
                ? "bg-[#1152d4] text-white"
                : "bg-[#2a2e3a] text-[#99a1af] hover:bg-[#3a3e4a]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-[#2a2e3a] rounded-xl p-4 hover:bg-[#3a3e4a] transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl shrink-0">{alert.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold mb-1 text-sm">{alert.title}</h4>
                <p className="text-xs text-[#99a1af] line-clamp-2">
                  {alert.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
