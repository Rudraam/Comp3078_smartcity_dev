import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { StarIcon, LocationPinIcon } from "../shared/Icons";
import type { HotelItem } from "../../types";

interface FeaturedHotelProps {
  hotel: HotelItem;
}

export default function FeaturedHotel({ hotel }: FeaturedHotelProps) {
  const navigate = useNavigate();
  const handleAction = () => navigate("/redirect");

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-500 text-xl">{"\u2B50"}</span>
        <h2 className="text-2xl font-semibold">Featured Hotel</h2>
      </div>

      <div className="bg-[#23262f] rounded-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/3 h-64 lg:h-auto relative">
          {hotel.image ? (
            <ImageWithFallback
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#3a3e4a]" />
          )}
          <span className="absolute top-4 left-4 bg-[#1152d4] text-white px-4 py-1 rounded-lg text-sm font-semibold">
            Featured
          </span>
          <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-semibold">
            3 rooms left
          </span>
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <p className="text-[#99a1af] text-sm mb-2">{hotel.type}</p>
          <h3 className="text-3xl font-bold mb-3">{hotel.name}</h3>
          <p className="text-[#99a1af] mb-4 flex-1">
            Experience exceptional luxury in the heart of downtown. Featuring
            modern amenities, stunning city views, and world-class service.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-1">
              <StarIcon size="md" />
              <span className="font-semibold">{hotel.rating}</span>
              <span className="text-[#99a1af]">
                ({hotel.reviews} reviews)
              </span>
            </div>
            <span className="text-[#99a1af]">&bull;</span>
            <div className="flex items-center gap-2 text-[#99a1af]">
              <LocationPinIcon className="w-4 h-4" />
              {hotel.location}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {hotel.amenities.map((amenity) => (
              <span
                key={amenity}
                className="bg-[#3a3e4a] text-[#99a1af] px-3 py-1 rounded-lg text-xs"
              >
                {amenity}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#3a3e4a] px-4 py-3 rounded-lg">
              <p className="text-2xl font-bold">${hotel.pricePerNight}</p>
              <p className="text-xs text-[#99a1af]">per night</p>
            </div>

            <button
              onClick={handleAction}
              className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-6 py-3 rounded-lg font-medium"
            >
              Book Now
            </button>
            <button
              onClick={handleAction}
              className="bg-[#3a3e4a] hover:bg-[#4a4e5a] transition-colors text-white px-6 py-3 rounded-lg font-medium"
            >
              Review
            </button>
            <button
              onClick={handleAction}
              className="bg-[#3a3e4a] hover:bg-[#4a4e5a] transition-colors text-white px-6 py-3 rounded-lg font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
