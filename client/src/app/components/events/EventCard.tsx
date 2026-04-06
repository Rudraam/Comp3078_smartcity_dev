import { useState } from "react";
import { Calendar, ExternalLink, CheckCircle2 } from "lucide-react";
import { useNavigate } from "../../hooks/router-compat";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LocationPinIcon, ClockIcon, UsersGroupIcon } from "../shared/Icons";
import type { EventItem } from "../../types";
import { isEventAttended, markEventAttended, unmarkEventAttended } from "../../hooks/useUserActivity";

function buildSearchUrl(name: string): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(name)}`;
}

interface EventCardProps {
  event: EventItem;
  onClick?: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const navigate = useNavigate();
  const [attended, setAttended] = useState(() => isEventAttended(event.id));

  const handleToggleAttended = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (attended) {
      unmarkEventAttended(event.id);
    } else {
      markEventAttended({
        id: event.id,
        name: event.name,
        date: event.date,
        category: event.category,
        location: event.location,
        image: event.image,
        url: event.url,
      });
    }
    setAttended(!attended);
  };

  return (
    <div
      className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl overflow-hidden hover:bg-[var(--app-card-inner)] transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48">
        {event.image ? (
          <ImageWithFallback src={event.image} alt={event.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600" />
        )}
        {event.isUserSubmission ? (
          <span className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
            Community Listing
          </span>
        ) : event.badge ? (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
            {event.badge}
          </span>
        ) : null}
        <button
          onClick={handleToggleAttended}
          title={attended ? "Unmark as attended" : "Mark as attended"}
          className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
            attended
              ? "bg-green-500/90 text-white"
              : "bg-black/50 backdrop-blur-sm text-white hover:bg-green-500/80"
          }`}
        >
          <CheckCircle2 className="w-3 h-3" />
          {attended ? "Attended" : "Mark Attended"}
        </button>
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <UsersGroupIcon className="w-3 h-3" />
          <span className="text-xs font-semibold text-white">{event.attendees} going</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[var(--app-text-muted)] text-xs mb-1">{event.category}</p>
        <h3 className="text-lg font-semibold mb-3 text-[var(--app-text)]">{event.name}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-[var(--app-text-muted)]">
            <Calendar className="w-3 h-3" /><span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--app-text-muted)]">
            <ClockIcon className="w-3 h-3" /><span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--app-text-muted)]">
            <LocationPinIcon className="w-3 h-3" /><span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xl font-bold text-[var(--app-text)]">
              {event.price === null ? "See site" : typeof event.price === "number" ? `From $${event.price}` : event.price}
            </p>
            <p className="text-xs text-[var(--app-text-muted)]">{typeof event.price === "number" && "per ticket"}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const params = new URLSearchParams({ dest: event.name });
                if (event.lat && event.lon) { params.set("lat", String(event.lat)); params.set("lon", String(event.lon)); }
                navigate(`/map?${params.toString()}`);
              }}
              className="text-[#1152d4] hover:text-[#3b82f6] transition-colors text-sm font-medium"
            >
              Directions
            </button>
            <a
              href={event.url || buildSearchUrl(event.name)}
              target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
            >
              Get Tickets <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
