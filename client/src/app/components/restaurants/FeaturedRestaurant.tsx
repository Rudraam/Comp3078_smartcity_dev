import { ExternalLink } from "lucide-react";
import { useNavigate } from "../../hooks/router-compat";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { StarIcon, LocationPinIcon, ClockIcon } from "../shared/Icons";
import type { Restaurant } from "../../types";

function buildSearchUrl(name: string): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(name)}`;
}

interface FeaturedRestaurantProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export default function FeaturedRestaurant({
  restaurant,
  onClick,
}: FeaturedRestaurantProps) {
  const navigate = useNavigate();
  const searchUrl = buildSearchUrl(restaurant.name);

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
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-500 text-xl">{"\u2B50"}</span>
        <h2 className="text-2xl font-semibold">Featured Restaurant</h2>
      </div>

      <div
        className="bg-[#23262f] rounded-2xl overflow-hidden flex flex-col lg:flex-row cursor-pointer hover:bg-[#2a2e3a] transition-colors"
        onClick={onClick}
      >
        <div className="lg:w-1/3 h-64 lg:h-auto relative">
          {restaurant.image ? (
            <ImageWithFallback
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#3a3e4a]" />
          )}
          <span className="absolute top-4 left-4 bg-[#1152d4] text-white px-4 py-1 rounded-lg text-sm font-semibold">
            Featured
          </span>
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <p className="text-[#99a1af] text-sm mb-2">{restaurant.category}</p>
          <h3 className="text-3xl font-bold mb-3">{restaurant.name}</h3>
          <p className="text-[#99a1af] mb-4 flex-1">
            Experience authentic cuisine in the heart of downtown. Perfect for
            special occasions and business dinners.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <div className="flex items-center gap-1">
              <StarIcon size="md" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-[#99a1af]">
                ({restaurant.reviews} reviews)
              </span>
            </div>
            <span className="text-[#99a1af]">&bull;</span>
            <span className="text-white font-semibold">
              {"$".repeat(restaurant.priceLevel)}
            </span>
            <span className="text-[#99a1af]">&bull;</span>
            <div className="flex items-center gap-2 text-[#99a1af]">
              <LocationPinIcon className="w-4 h-4" />
              {restaurant.distance}
            </div>
            <span className="text-[#99a1af]">&bull;</span>
            <div className="flex items-center gap-2 text-[#99a1af]">
              <ClockIcon className="w-4 h-4" />
              {restaurant.hours}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              Reserve Table
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#3a3e4a] hover:bg-[#4a4e5a] transition-colors text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              View Menu
              <ExternalLink className="w-3 h-3" />
            </a>
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
