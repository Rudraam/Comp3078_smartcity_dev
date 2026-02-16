import { ImageWithFallback } from "../figma/ImageWithFallback";
import { StarIcon, LocationPinIcon, ClockIcon } from "../shared/Icons";
import type { Restaurant } from "../../types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-[#23262f] rounded-2xl overflow-hidden hover:bg-[#2a2e3a] transition-colors cursor-pointer group">
      <div className="relative h-48">
        {restaurant.image ? (
          <ImageWithFallback
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#3a3e4a]" />
        )}
        {restaurant.openNow && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
            Open Now
          </span>
        )}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <StarIcon size="sm" />
          <span className="text-sm font-semibold">{restaurant.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[#99a1af] text-xs mb-1">{restaurant.category}</p>
        <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>

        <div className="flex items-center gap-2 text-xs text-[#99a1af] mb-3">
          <div className="flex items-center gap-1">
            <StarIcon size="sm" />
            <span>{restaurant.rating}</span>
          </div>
          <span>&bull;</span>
          <span>{restaurant.reviews} reviews</span>
          <span>&bull;</span>
          <span>{"$".repeat(restaurant.priceLevel)}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#99a1af] mb-1">
          <LocationPinIcon className="w-3 h-3" />
          <span>{restaurant.distance}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#99a1af]">
          <ClockIcon className="w-3 h-3" />
          <span>{restaurant.hours}</span>
        </div>
      </div>
    </div>
  );
}
