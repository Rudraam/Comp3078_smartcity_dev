import { Calendar } from "lucide-react";
import { useNavigate } from "../../hooks/router-compat";
import type { ProfileEvent } from "../../types";

interface RecentActivityProps {
  events: ProfileEvent[];
}

export default function RecentActivity({ events }: RecentActivityProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--app-card)] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5" />
        <h3 className="text-xl font-semibold">Recent Activity</h3>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[var(--app-card-inner)] rounded-xl p-4 flex items-center justify-between hover:bg-[var(--app-card-hover)] transition-colors cursor-pointer"
            onClick={() => navigate("/events")}
          >
            <div>
              <h4 className="font-semibold mb-1">{event.name}</h4>
              <p className="text-sm text-[var(--app-text-muted)]">{event.date}</p>
            </div>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                event.status === "Registered"
                  ? "bg-[#1152d4]/20 text-[#1152d4]"
                  : "bg-[#99a1af]/20 text-[var(--app-text-muted)]"
              }`}
            >
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
