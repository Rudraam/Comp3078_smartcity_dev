import { Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LocationPinIcon, ClockIcon, UsersGroupIcon } from "../shared/Icons";
import type { EventItem } from "../../types";

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  const handleAction = () => navigate("/redirect");

  return (
    <div className="bg-[#23262f] rounded-2xl overflow-hidden hover:bg-[#2a2e3a] transition-colors cursor-pointer group">
      <div className="relative h-48">
        {event.image ? (
          <ImageWithFallback
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600" />
        )}
        {event.badge && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
            {event.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <UsersGroupIcon className="w-3 h-3" />
          <span className="text-xs font-semibold">
            {event.attendees} going
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[#99a1af] text-xs mb-1">{event.category}</p>
        <h3 className="text-lg font-semibold mb-3">{event.name}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-[#99a1af]">
            <Calendar className="w-3 h-3" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#99a1af]">
            <ClockIcon className="w-3 h-3" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#99a1af]">
            <LocationPinIcon className="w-3 h-3" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">
              {typeof event.price === "number"
                ? `$${event.price}`
                : event.price}
            </p>
            <p className="text-xs text-[#99a1af]">
              {typeof event.price === "number" && "per ticket"}
            </p>
          </div>
          <button
            onClick={handleAction}
            className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
