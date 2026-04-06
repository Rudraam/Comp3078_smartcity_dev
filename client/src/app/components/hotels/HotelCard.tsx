import { ExternalLink } from "lucide-react";
import { useNavigate } from "../../hooks/router-compat";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { StarIcon, LocationPinIcon } from "../shared/Icons";
import type { HotelItem } from "../../types";

function buildSearchUrl(name: string): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(name)}`;
}

interface HotelCardProps {
  hotel: HotelItem;
  onClick?: () => void;
}

export default function HotelCard({ hotel, onClick }: HotelCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[var(--app-card)] rounded-2xl overflow-hidden hover:bg-[var(--app-card-inner)] transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48">
        {hotel.image ? (
          <ImageWithFallback
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[var(--app-card-hover)]" />
        )}
        {hotel.isUserSubmission && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
            Community Listing
          </span>
        )}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <StarIcon size="sm" />
          <span className="text-sm font-semibold">{hotel.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[var(--app-text-muted)] text-xs mb-1">{hotel.type}</p>
        <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>

        <div className="flex items-center gap-2 text-xs text-[var(--app-text-muted)] mb-3">
          <div className="flex items-center gap-1">
            <StarIcon size="sm" />
            <span>{hotel.rating}</span>
          </div>
          <span>&bull;</span>
          <span>{hotel.reviews} reviews</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--app-text-muted)] mb-4">
          <LocationPinIcon className="w-3 h-3" />
          <span>{hotel.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="bg-[var(--app-card-hover)] text-[var(--app-text-muted)] px-2 py-1 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xl font-bold">${hotel.pricePerNight}</p>
            <p className="text-xs text-[var(--app-text-muted)]">/night</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const params = new URLSearchParams({ dest: hotel.name });
                if (hotel.lat && hotel.lon) {
                  params.set("lat", String(hotel.lat));
                  params.set("lon", String(hotel.lon));
                }
                navigate(`/map?${params.toString()}`);
              }}
              className="text-[#1152d4] hover:text-[#3b82f6] transition-colors text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Directions
            </button>
            <a
              href={buildSearchUrl(hotel.name)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
            >
              View Rooms
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
