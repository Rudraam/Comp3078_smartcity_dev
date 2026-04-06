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
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-[#1152d4]/10 text-[#1152d4] hover:bg-[#1152d4]/20 transition-colors"
        >
          See All &rsaquo;
        </button>
      </div>

      {events.length === 0 && (
        <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl p-8 text-center text-[var(--app-text-muted)]">
          No upcoming events found for this city.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl p-5 hover:bg-[var(--app-card-inner)] transition-colors cursor-pointer"
            onClick={() => onEventClick?.(event.id)}
          >
            <p className="text-[var(--app-text-muted)] text-xs mb-2">{event.category}</p>
            <h4 className="text-lg font-semibold mb-3">{event.name}</h4>
            <div className="flex items-center gap-2 text-[var(--app-text-muted)] text-sm mb-2">
              <CalendarIcon />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--app-text-muted)] text-sm">
              <LocationIcon />
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
