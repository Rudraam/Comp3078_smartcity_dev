import { Navigation } from "lucide-react";
import { useNavigate } from "../../hooks/router-compat";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { StarIcon, LocationPinIcon, ClockIcon } from "../shared/Icons";
import type { Restaurant } from "../../types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const navigate = useNavigate();

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams({ dest: restaurant.name });
    if (restaurant.lat && restaurant.lon) {
      params.set("lat", String(restaurant.lat));
      params.set("lon", String(restaurant.lon));
    }
    navigate(`/map?${params.toString()}`);
  };

  return (
    <div
      className="bg-[var(--app-card)] rounded-2xl overflow-hidden hover:bg-[var(--app-card-inner)] transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48">
        {restaurant.image ? (
          <ImageWithFallback
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[var(--app-card-hover)]" />
        )}
        {restaurant.isUserSubmission ? (
          <span className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
            Community Listing
          </span>
        ) : restaurant.openNow ? (
          <span className="absolute top-3 left-3 bg-green-500 text-[var(--app-text)] px-3 py-1 rounded-lg text-xs font-semibold">
            Open Now
          </span>
        ) : null}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <StarIcon size="sm" />
          <span className="text-sm font-semibold">{restaurant.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[var(--app-text-muted)] text-xs mb-1">{restaurant.category}</p>
        <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>

        <div className="flex items-center gap-2 text-xs text-[var(--app-text-muted)] mb-3">
          <div className="flex items-center gap-1">
            <StarIcon size="sm" />
            <span>{restaurant.rating}</span>
          </div>
          <span>&bull;</span>
          <span>{restaurant.reviews} reviews</span>
          <span>&bull;</span>
          <span>{"$".repeat(restaurant.priceLevel)}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--app-text-muted)] mb-1">
          <LocationPinIcon className="w-3 h-3" />
          <span>{restaurant.distance}</span>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs text-[var(--app-text-muted)]">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-3 h-3" />
            <span>{restaurant.hours}</span>
          </div>
          <button
            onClick={handleDirections}
            className="flex items-center gap-1 text-[#1152d4] hover:text-[#3b82f6] transition-colors"
          >
            <Navigation className="w-3 h-3" />
            <span>Directions</span>
          </button>
        </div>
      </div>
    </div>
  );
}
