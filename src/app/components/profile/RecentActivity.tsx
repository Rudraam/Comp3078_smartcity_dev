import { Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import type { ProfileEvent } from "../../types";

interface RecentActivityProps {
  events: ProfileEvent[];
}

export default function RecentActivity({ events }: RecentActivityProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#23262f] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5" />
        <h3 className="text-xl font-semibold">Recent Activity</h3>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[#2a2e3a] rounded-xl p-4 flex items-center justify-between hover:bg-[#3a3e4a] transition-colors cursor-pointer"
            onClick={() => navigate("/events")}
          >
            <div>
              <h4 className="font-semibold mb-1">{event.name}</h4>
              <p className="text-sm text-[#99a1af]">{event.date}</p>
            </div>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                event.status === "Registered"
                  ? "bg-[#1152d4]/20 text-[#1152d4]"
                  : "bg-[#99a1af]/20 text-[#99a1af]"
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
