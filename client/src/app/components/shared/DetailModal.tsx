import { useState } from "react";
import { X, MapPin, Clock, Calendar, Star, Users, Navigation, ExternalLink, DollarSign, Wifi, Dumbbell, UtensilsCrossed, Car, Waves, Sparkles, Coffee, Wind, CheckCircle2, Send, Bookmark, BookmarkCheck } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate } from "../../hooks/router-compat";
import type { Restaurant, HotelItem, EventItem } from "../../types";
import { isEventAttended, markEventAttended, unmarkEventAttended, addCheckIn } from "../../hooks/useUserActivity";
import { ReviewSection } from "./ReviewSection";
import { useCollections } from "../../hooks/useCollections";

function buildSearchUrl(name: string, city?: string): string {
  const query = city ? `${name} ${city}` : name;
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

const amenityIcons: Record<string, typeof Wifi> = {
  "Free WiFi": Wifi,
  "Breakfast": Coffee,
  "Parking": Car,
  "Fitness": Dumbbell,
  "AC": Wind,
  "Pool": Waves,
  "Spa": Sparkles,
};

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalWrapper({ isOpen, onClose, children }: ModalWrapperProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[var(--app-bg)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-[var(--app-text)] w-9 h-9 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

interface RestaurantDetailProps {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
  city?: string;
}

export function RestaurantDetailModal({ restaurant, isOpen, onClose, city }: RestaurantDetailProps) {
  const navigate = useNavigate();
  const searchUrl = buildSearchUrl(restaurant.name, city);
  const [checkedIn, setCheckedIn] = useState(false);
  const { isSaved, toggle: toggleSave } = useCollections();
  const savedId = restaurant.id ?? restaurant.name;
  const saved = isSaved(savedId);

  const handleCheckIn = () => {
    addCheckIn({ id: restaurant.id ?? restaurant.name, name: restaurant.name, type: "restaurant", location: restaurant.distance || "Unknown", city: city || "Unknown" });
    setCheckedIn(true);
  };

  const handleDirections = () => {
    onClose();
    const params = new URLSearchParams({ dest: restaurant.name });
    if (restaurant.lat && restaurant.lon) {
      params.set("lat", String(restaurant.lat));
      params.set("lon", String(restaurant.lon));
    }
    navigate(`/map?${params.toString()}`);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="relative h-64">
        {restaurant.image ? (
          <ImageWithFallback src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[var(--app-card-hover)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        {restaurant.openNow && (
          <span className="absolute top-4 left-4 bg-green-500 text-[var(--app-text)] px-3 py-1 rounded-lg text-xs font-semibold">
            Open Now
          </span>
        )}
      </div>

      <div className="p-6 -mt-12 relative">
        <p className="text-[#1152d4] text-sm font-medium mb-1">{restaurant.category}</p>
        <h2 className="text-3xl font-bold mb-3">{restaurant.name}</h2>

        <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
          <div className="flex flex-col gap-0.5 bg-[var(--app-card)] px-3 py-2 rounded-lg">
            <span className="text-[10px] uppercase tracking-wider text-[var(--app-text-muted)] font-medium leading-none">Platform Rating</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-[var(--app-text-muted)] text-xs">({restaurant.reviews.toLocaleString()})</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[var(--app-card)] px-3 py-2 rounded-lg">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="font-medium">{"$".repeat(restaurant.priceLevel)}</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{restaurant.distance}</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{restaurant.hours}</span>
          </div>
        </div>

        <p className="text-[var(--app-text-muted)] text-sm mb-6 leading-relaxed">
          Discover authentic {restaurant.category.toLowerCase()} cuisine at {restaurant.name}. Enjoy a delightful dining experience with carefully crafted dishes and a welcoming atmosphere.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            <UtensilsCrossed className="w-4 h-4" />
            Reserve Table
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] transition-colors text-[var(--app-text)] px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            View Menu
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={handleDirections}
            className="bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] transition-colors text-[var(--app-text)] px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </button>
          <button
            onClick={handleCheckIn}
            disabled={checkedIn}
            className={`transition-colors px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm ${checkedIn ? "bg-green-500/20 text-green-400" : "bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] text-[var(--app-text)]"}`}
          >
            <Send className="w-4 h-4" />
            {checkedIn ? "Checked In!" : "Check In"}
          </button>
          <button
            onClick={() => toggleSave({ id: savedId, name: restaurant.name, type: "restaurant", image: restaurant.image, subtitle: restaurant.category, city })}
            className={`transition-colors px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm ${saved ? "bg-[#1152d4]/15 text-[#1152d4]" : "bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] text-[var(--app-text)]"}`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {saved ? "Saved" : "Save"}
          </button>
        </div>

        <ReviewSection
          placeId={restaurant.id ?? restaurant.name}
          placeName={restaurant.name}
          placeType="restaurant"
        />
      </div>
    </ModalWrapper>
  );
}

interface HotelDetailProps {
  hotel: HotelItem;
  isOpen: boolean;
  onClose: () => void;
  city?: string;
}

export function HotelDetailModal({ hotel, isOpen, onClose, city }: HotelDetailProps) {
  const navigate = useNavigate();
  const searchUrl = buildSearchUrl(hotel.name, city);
  const [checkedIn, setCheckedIn] = useState(false);
  const { isSaved, toggle: toggleSave } = useCollections();
  const savedId = hotel.id ?? hotel.name;
  const saved = isSaved(savedId);

  const handleCheckIn = () => {
    addCheckIn({ id: hotel.id ?? hotel.name, name: hotel.name, type: "hotel", location: hotel.location || "Unknown", city: city || "Unknown" });
    setCheckedIn(true);
  };

  const handleDirections = () => {
    onClose();
    const params = new URLSearchParams({ dest: hotel.name });
    if (hotel.lat && hotel.lon) {
      params.set("lat", String(hotel.lat));
      params.set("lon", String(hotel.lon));
    }
    navigate(`/map?${params.toString()}`);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="relative h-64">
        {hotel.image ? (
          <ImageWithFallback src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[var(--app-card-hover)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold">{hotel.stars}-Star</span>
        </div>
      </div>

      <div className="p-6 -mt-12 relative">
        <p className="text-[#1152d4] text-sm font-medium mb-1">{hotel.type}</p>
        <h2 className="text-3xl font-bold mb-3">{hotel.name}</h2>

        <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
          <div className="flex flex-col gap-0.5 bg-[var(--app-card)] px-3 py-2 rounded-lg">
            <span className="text-[10px] uppercase tracking-wider text-[var(--app-text-muted)] font-medium leading-none">Platform Rating</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{hotel.rating}</span>
              <span className="text-[var(--app-text-muted)] text-xs">({hotel.reviews.toLocaleString()})</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 bg-[var(--app-card)] px-3 py-2 rounded-lg">
            <span className="text-[10px] uppercase tracking-wider text-[var(--app-text-muted)] font-medium leading-none">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">${hotel.pricePerNight}</span>
              <span className="text-[var(--app-text-muted)] text-xs">/night</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{hotel.location}</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
            <Navigation className="w-4 h-4 shrink-0" />
            <span>{hotel.distance}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[var(--app-text-muted)] uppercase tracking-wider mb-3">Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {hotel.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity] || Sparkles;
              return (
                <div key={amenity} className="flex items-center gap-2 bg-[var(--app-card)] px-3 py-2.5 rounded-lg">
                  <Icon className="w-4 h-4 text-[#1152d4]" />
                  <span className="text-sm">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[var(--app-text-muted)] text-sm mb-6 leading-relaxed">
          Experience comfort and luxury at {hotel.name}. This {hotel.type.toLowerCase()} offers exceptional service, modern amenities, and a prime location for your stay.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            Book Now
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] transition-colors text-[var(--app-text)] px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            View Rooms
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={handleDirections}
            className="bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] transition-colors text-[var(--app-text)] px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </button>
          <button
            onClick={handleCheckIn}
            disabled={checkedIn}
            className={`transition-colors px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm ${checkedIn ? "bg-green-500/20 text-green-400" : "bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] text-[var(--app-text)]"}`}
          >
            <Send className="w-4 h-4" />
            {checkedIn ? "Checked In!" : "Check In"}
          </button>
          <button
            onClick={() => toggleSave({ id: savedId, name: hotel.name, type: "hotel", image: hotel.image, subtitle: `${hotel.stars}-Star Hotel`, city })}
            className={`transition-colors px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm ${saved ? "bg-[#1152d4]/15 text-[#1152d4]" : "bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] text-[var(--app-text)]"}`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {saved ? "Saved" : "Save"}
          </button>
        </div>

        <ReviewSection
          placeId={hotel.id ?? hotel.name}
          placeName={hotel.name}
          placeType="hotel"
        />
      </div>
    </ModalWrapper>
  );
}

interface EventDetailProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
  city?: string;
}

export function EventDetailModal({ event, isOpen, onClose, city }: EventDetailProps) {
  const navigate = useNavigate();
  const searchUrl = buildSearchUrl(event.name, city);
  const [attended, setAttended] = useState(() => isEventAttended(event.id));
  const { isSaved, toggle: toggleSave } = useCollections();
  const saved = isSaved(event.id);

  const handleToggleAttended = () => {
    if (attended) {
      unmarkEventAttended(event.id);
    } else {
      markEventAttended({ id: event.id, name: event.name, date: event.date, category: event.category, location: event.location, image: event.image, url: event.url });
    }
    setAttended(!attended);
  };

  const handleDirections = () => {
    onClose();
    const params = new URLSearchParams({ dest: event.name });
    if (event.lat && event.lon) {
      params.set("lat", String(event.lat));
      params.set("lon", String(event.lon));
    }
    navigate(`/map?${params.toString()}`);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="relative h-64">
        {event.image ? (
          <ImageWithFallback src={event.image} alt={event.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        {event.badge && (
          <span className="absolute top-4 left-4 bg-green-500 text-[var(--app-text)] px-3 py-1 rounded-lg text-xs font-semibold">
            {event.badge}
          </span>
        )}
      </div>

      <div className="p-6 -mt-12 relative">
        <p className="text-[#1152d4] text-sm font-medium mb-1">{event.category}</p>
        <h2 className="text-3xl font-bold mb-3">{event.name}</h2>

        <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
          <div className="flex items-center gap-1.5 bg-[var(--app-card)] px-3 py-1.5 rounded-lg">
            <Users className="w-4 h-4 text-[#1152d4]" />
            <span className="font-semibold">{event.attendees} going</span>
          </div>
          <div className="bg-[var(--app-card)] px-3 py-1.5 rounded-lg">
            <span className="text-xl font-bold">
              {event.price === null
                ? "See site"
                : typeof event.price === "number"
                ? `From $${event.price}`
                : event.price}
            </span>
            {typeof event.price === "number" && <span className="text-[var(--app-text-muted)] text-xs ml-1">/ticket</span>}
            {event.price === null && <span className="text-[var(--app-text-muted)] text-xs ml-1">for pricing</span>}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-[var(--app-text-muted)] text-sm mb-6 leading-relaxed">
          Join {event.attendees.toLocaleString()} others at {event.name}. This {event.category.toLowerCase()} event promises an unforgettable experience with something for everyone.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={event.url || searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            Get Tickets
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={event.url || searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] transition-colors text-[var(--app-text)] px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            Learn More
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={handleDirections}
            className="bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] transition-colors text-[var(--app-text)] px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </button>
          <button
            onClick={handleToggleAttended}
            className={`transition-colors px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm ${attended ? "bg-green-500/20 text-green-400" : "bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] text-[var(--app-text)]"}`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {attended ? "Attended!" : "Mark as Attended"}
          </button>
          <button
            onClick={() => toggleSave({ id: event.id, name: event.name, type: "event", image: event.image, subtitle: event.date, city })}
            className={`transition-colors px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm ${saved ? "bg-[#1152d4]/15 text-[#1152d4]" : "bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] text-[var(--app-text)]"}`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export function useDetailModal<T>() {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  return {
    selectedItem,
    isOpen: selectedItem !== null,
    open: (item: T) => setSelectedItem(item),
    close: () => setSelectedItem(null),
  };
}
