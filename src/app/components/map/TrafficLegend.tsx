const legendItems = [
  { color: "bg-red-500", label: "Heavy Traffic" },
  { color: "bg-orange-500", label: "Moderate Traffic" },
  { color: "bg-green-500", label: "Clear" },
];

export default function TrafficLegend() {
  return (
    <div className="absolute bottom-4 left-4 bg-[#1f2533] px-4 py-3 rounded-lg">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2 mb-2 last:mb-0">
          <div className={`w-3 h-3 rounded-full ${item.color}`} />
          <span className="text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
