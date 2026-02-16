import { Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LocationPinIcon, ClockIcon, UsersGroupIcon } from "../shared/Icons";
import type { EventItem } from "../../types";

interface FeaturedEventProps {
  event: EventItem;
}

export default function FeaturedEvent({ event }: FeaturedEventProps) {
  const navigate = useNavigate();
  const handleAction = () => navigate("/redirect");
  const handleDirections = () =>
    navigate("/map", { state: { destination: event.name, city: "Toronto" } });

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-500 text-xl">{"\u2B50"}</span>
        <h2 className="text-2xl font-semibold">Featured Event</h2>
      </div>

      <div className="bg-[#23262f] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/3 h-64 lg:h-auto relative">
          {event.image ? (
            <ImageWithFallback
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
          )}
          {event.badge && (
            <span className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-lg text-sm font-semibold">
              {event.badge}
            </span>
          )}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center gap-2">
            <UsersGroupIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {event.attendees} going
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <p className="text-[#99a1af] text-sm mb-2">{event.category}</p>
          <h3 className="text-3xl font-bold mb-3">{event.name}</h3>
          <p className="text-[#99a1af] mb-4 flex-1">
            Experience an unforgettable evening of live music featuring
            world-renowned artists. Dance, sing, and create memories under the
            stars.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-[#99a1af]">
              <Calendar className="w-5 h-5" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-[#99a1af]">
              <ClockIcon className="w-5 h-5" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-[#99a1af]">
              <LocationPinIcon className="w-5 h-5" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#3a3e4a] px-4 py-3 rounded-lg">
              <p className="text-2xl font-bold">
                {typeof event.price === "number"
                  ? `$${event.price}`
                  : event.price}
              </p>
              <p className="text-xs text-[#99a1af]">per ticket</p>
            </div>

            <button
              onClick={handleAction}
              className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-6 py-3 rounded-lg font-medium"
            >
              {"\uD83C\uDFAB"} Get Tickets
            </button>
            <button
              onClick={handleAction}
              className="bg-[#3a3e4a] hover:bg-[#4a4e5a] transition-colors text-white px-6 py-3 rounded-lg font-medium"
            >
              Learn More
            </button>
            <button
              onClick={handleDirections}
              className="bg-[#3a3e4a] hover:bg-[#4a4e5a] transition-colors text-white px-6 py-3 rounded-lg font-medium"
            >
              Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
