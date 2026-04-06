import type { StatItem } from "../../types";

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-4xl font-bold">{stat.value}</p>
          <p className="text-[var(--app-text-muted)] text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
