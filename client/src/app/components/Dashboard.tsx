import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Bot, X, Utensils, Hotel, MapPin } from "lucide-react";
import PageLayout from "./shared/PageLayout";
import WeatherCard from "./dashboard/WeatherCard";
import EventsPreview from "./dashboard/EventsPreview";
import ListPreview from "./dashboard/ListPreview";
import QuickActions from "./dashboard/QuickActions";
import AIChatAssistant from "../../components/AIChatAssistant";
import { RestaurantDetailModal, HotelDetailModal, EventDetailModal, useDetailModal } from "./shared/DetailModal";
import { useCity } from "../hooks/useCityContext";
import type { DashboardConfig, WeatherData, Restaurant, HotelItem, EventItem } from "../types";

interface CitySuggestion {
  lat: number;
  lon: number;
  name: string;
  displayName: string;
  country: string;
  admin1: string;
}

interface ApiEvent {
  id: string;
  name: string;
  category: string;
  date: string;
  location: string;
  time: string;
  attendees: number;
  price: number | "Free";
  image?: string;
  badge?: string;
  lat?: number;
  lon?: number;
  featured?: boolean;
}

export default function Dashboard() {
  const { city, setCity } = useCity();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const restaurantModal = useDetailModal<Restaurant>();
  const hotelModal = useDetailModal<HotelItem>();
  const eventModal = useDetailModal<EventItem>();

  const [config] = useState<DashboardConfig>({
    showWeather: true,
    showEvents: true,
    showRestaurants: true,
    showHotels: true,
  });

  const fetchWeather = useCallback(async (cityName: string) => {
    setWeatherLoading(true);
    setWeatherError("");
    try {
      const resp = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || "Failed to fetch weather");
      }
      const data = await resp.json();
      setWeather(data);
      if (data.displayName) {
        setCity(data.displayName);
      } else if (data.city) {
        setCity(data.city);
      }
    } catch (err: any) {
      setWeatherError(err.message || "Could not load weather data");
    } finally {
      setWeatherLoading(false);
    }
  }, [setCity]);

  const fetchCityData = useCallback(async (cityName: string) => {
    setDataLoading(true);
    try {
      const [restRes, hotelRes, eventRes] = await Promise.allSettled([
        fetch(`/api/restaurants?city=${encodeURIComponent(cityName)}&limit=4`),
        fetch(`/api/hotels?city=${encodeURIComponent(cityName)}&limit=4`),
        fetch(`/api/events?city=${encodeURIComponent(cityName)}&limit=3`),
      ]);

      if (restRes.status === "fulfilled" && restRes.value.ok) {
        const data = await restRes.value.json();
        setRestaurants(data.restaurants || []);
      }
      if (hotelRes.status === "fulfilled" && hotelRes.value.ok) {
        const data = await hotelRes.value.json();
        setHotels(data.hotels || []);
      }
      if (eventRes.status === "fulfilled" && eventRes.value.ok) {
        const data = await eventRes.value.json();
        setEvents((data.events || []) as EventItem[]);
      }
    } catch {}
    setDataLoading(false);
  }, []);

  useEffect(() => {
    fetchWeather(city);
    fetchCityData(city);
  }, [city, fetchWeather, fetchCityData]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const resp = await fetch(`/api/city-suggestions?q=${encodeURIComponent(query)}`);
      if (resp.ok) {
        const data = await resp.json();
        setCitySuggestions(data);
        setShowSuggestions(data.length > 0);
      }
    } catch {}
  }, []);

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const selectCity = (cityQuery: string) => {
    setCity(cityQuery);
    fetchWeather(cityQuery);
    fetchCityData(cityQuery);
    setSearchQuery("");
    setCitySuggestions([]);
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion: CitySuggestion) => {
    selectCity(suggestion.displayName);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      selectCity(searchQuery.trim());
    }
  };

  const restaurantItems = restaurants.map((r) => ({
    id: r.id,
    name: r.name,
    rating: r.rating,
    subtitle: r.category,
    priceLevel: r.priceLevel,
    image: r.image,
  }));

  const hotelItems = hotels.map((h) => ({
    id: h.id,
    name: h.name,
    rating: h.rating,
    subtitle: `${h.stars}-Star`,
    priceLevel: Math.min(4, Math.ceil(h.pricePerNight / 100)),
    image: h.image,
  }));

  const dashboardEvents = events.map((e) => ({
    id: e.id,
    category: e.category,
    name: e.name,
    date: e.date.replace(/,\s*\d{4}$/, ""),
    location: e.location,
  }));

  const handleRestaurantClick = (id: string) => {
    const r = restaurants.find((x) => x.id === id);
    if (r) restaurantModal.open(r);
  };

  const handleHotelClick = (id: string) => {
    const h = hotels.find((x) => x.id === id);
    if (h) hotelModal.open(h);
  };

  const handleEventClick = (id: string) => {
    const ev = events.find((x) => x.id === id);
    if (ev) eventModal.open(ev);
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h2 className="text-6xl font-bold mb-2">{city.split(",")[0].trim()}</h2>
        {city.includes(",") && (
          <p className="text-lg text-[#9ca3af] mb-4">{city}</p>
        )}

        <div ref={suggestionsRef} className="relative max-w-2xl">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => { if (citySuggestions.length > 0) setShowSuggestions(true); }}
              placeholder="Enter city or area (e.g. London, Ontario)..."
              className="w-full bg-[#2a2e3a] text-white placeholder-[#6b7280] px-6 py-4 pr-14 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-[#3a3e4a] rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-[#9ca3af]" />
            </button>
          </form>

          {showSuggestions && citySuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#23262f] border border-[#3a3e4a] rounded-xl overflow-hidden z-50 shadow-lg">
              {citySuggestions.map((s, i) => (
                <button
                  key={`${s.lat}-${s.lon}-${i}`}
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-[#2a2e3a] transition-colors border-b border-[#3a3e4a] last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-[#1152d4] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-white font-medium">{s.name}</span>
                    {(s.admin1 || s.country) && (
                      <span className="text-[#9ca3af] text-sm ml-2">
                        {[s.admin1, s.country].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {config.showWeather && (
        weatherLoading ? (
          <div className="bg-[#23262f] rounded-2xl p-6 mb-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="h-4 bg-[#3a3e4a] rounded w-40 mb-3" />
                <div className="h-16 bg-[#3a3e4a] rounded w-32 mb-2" />
                <div className="h-4 bg-[#3a3e4a] rounded w-28" />
              </div>
              <div>
                <div className="h-4 bg-[#3a3e4a] rounded w-32 mb-3" />
                <div className="h-16 bg-[#3a3e4a] rounded w-24 mb-2" />
                <div className="h-4 bg-[#3a3e4a] rounded w-36" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-[#3a3e4a] rounded-full" />
                  <div className="h-3 bg-[#3a3e4a] rounded w-12 mt-2" />
                  <div className="h-5 bg-[#3a3e4a] rounded w-16 mt-1" />
                </div>
              ))}
            </div>
          </div>
        ) : weatherError ? (
          <div className="bg-[#23262f] rounded-2xl p-6 mb-6 text-center">
            <p className="text-red-400 mb-2">{weatherError}</p>
            <button
              onClick={() => fetchWeather(city)}
              className="text-[#51a2ff] hover:underline text-sm"
            >
              Try again
            </button>
          </div>
        ) : weather ? (
          <WeatherCard weather={weather} />
        ) : null
      )}

      <QuickActions />

      {config.showEvents && (
        dataLoading ? (
          <div className="bg-[#23262f] rounded-2xl p-6 mb-6 animate-pulse">
            <div className="h-6 bg-[#3a3e4a] rounded w-40 mb-4" />
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-16 bg-[#3a3e4a] rounded" />
              ))}
            </div>
          </div>
        ) : (
          <EventsPreview events={dashboardEvents} onEventClick={handleEventClick} />
        )
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {config.showRestaurants && (
          dataLoading ? (
            <div className="bg-[#23262f] rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-[#3a3e4a] rounded w-40 mb-4" />
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-[#3a3e4a] rounded" />
                ))}
              </div>
            </div>
          ) : (
            <ListPreview
              title="Top Restaurants"
              icon={Utensils}
              items={restaurantItems}
              navigateTo="/restaurants"
              onItemClick={handleRestaurantClick}
            />
          )
        )}

        {config.showHotels && (
          dataLoading ? (
            <div className="bg-[#23262f] rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-[#3a3e4a] rounded w-40 mb-4" />
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-[#3a3e4a] rounded" />
                ))}
              </div>
            </div>
          ) : (
            <ListPreview
              title="Recommended Hotels"
              icon={Hotel}
              items={hotelItems}
              navigateTo="/hotels"
              onItemClick={handleHotelClick}
            />
          )
        )}
      </div>

      <button
        onClick={() => setShowAI(!showAI)}
        className="fixed bottom-6 right-6 z-50 bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        aria-label="Toggle AI Assistant"
      >
        {showAI ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {showAI && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] shadow-2xl rounded-xl">
          <AIChatAssistant cityName={city} />
        </div>
      )}

      {restaurantModal.selectedItem && (
        <RestaurantDetailModal
          restaurant={restaurantModal.selectedItem}
          isOpen={restaurantModal.isOpen}
          onClose={restaurantModal.close}
          city={city}
        />
      )}
      {hotelModal.selectedItem && (
        <HotelDetailModal
          hotel={hotelModal.selectedItem}
          isOpen={hotelModal.isOpen}
          onClose={hotelModal.close}
          city={city}
        />
      )}
      {eventModal.selectedItem && (
        <EventDetailModal
          event={eventModal.selectedItem}
          isOpen={eventModal.isOpen}
          onClose={eventModal.close}
          city={city}
        />
      )}
    </PageLayout>
  );
}
