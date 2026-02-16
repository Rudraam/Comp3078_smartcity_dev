import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { StarIcon, LocationPinIcon } from "../shared/Icons";
import type { HotelItem } from "../../types";

interface HotelCardProps {
  hotel: HotelItem;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#23262f] rounded-2xl overflow-hidden hover:bg-[#2a2e3a] transition-colors cursor-pointer group">
      <div className="relative h-48">
        {hotel.image ? (
          <ImageWithFallback
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#3a3e4a]" />
        )}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <StarIcon size="sm" />
          <span className="text-sm font-semibold">{hotel.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[#99a1af] text-xs mb-1">{hotel.type}</p>
        <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>

        <div className="flex items-center gap-2 text-xs text-[#99a1af] mb-3">
          <div className="flex items-center gap-1">
            <StarIcon size="sm" />
            <span>{hotel.rating}</span>
          </div>
          <span>&bull;</span>
          <span>{hotel.reviews} reviews</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#99a1af] mb-4">
          <LocationPinIcon className="w-3 h-3" />
          <span>{hotel.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="bg-[#3a3e4a] text-[#99a1af] px-2 py-1 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">${hotel.pricePerNight}</p>
            <p className="text-xs text-[#99a1af]">/night</p>
          </div>
          <button
            onClick={() => navigate("/redirect")}
            className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            View Rooms
          </button>
        </div>
      </div>
    </div>
  );
}
