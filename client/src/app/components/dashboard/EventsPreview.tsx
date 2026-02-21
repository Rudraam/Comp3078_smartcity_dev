import { useNavigate } from "../../hooks/router-compat";
import type { DashboardEvent } from "../../types";
import { CalendarIcon, LocationIcon } from "./DashboardIcons";

interface EventsPreviewProps {
  events: DashboardEvent[];
  onEventClick?: (id: string) => void;
}

export default function EventsPreview({ events, onEventClick }: EventsPreviewProps) {
  const navigate = useNavigate();

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          {"\uD83D\uDCC5"} Upcoming Events
        </h3>
        <button
          onClick={() => navigate("/events")}
          className="text-[#99a1af] hover:text-white transition-colors flex items-center gap-1 text-sm"
        >
          {"\u2630"} See All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[#23262f] rounded-2xl p-5 hover:bg-[#2a2e3a] transition-colors cursor-pointer"
            onClick={() => onEventClick?.(event.id)}
          >
            <p className="text-[#99a1af] text-xs mb-2">{event.category}</p>
            <h4 className="text-lg font-semibold mb-3">{event.name}</h4>
            <div className="flex items-center gap-2 text-[#99a1af] text-sm mb-2">
              <CalendarIcon />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-[#99a1af] text-sm">
              <LocationIcon />
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
