import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Bot, X, Utensils, Hotel, MapPin, Loader2 } from "lucide-react";
import PageLayout from "./shared/PageLayout";
import WeatherCard from "./dashboard/WeatherCard";
import EventsPreview from "./dashboard/EventsPreview";
import ListPreview from "./dashboard/ListPreview";
import AIChatAssistant from "../../components/AIChatAssistant";
import NotificationPrompt from "./shared/NotificationPrompt";
import { RestaurantDetailModal, HotelDetailModal, EventDetailModal, useDetailModal } from "./shared/DetailModal";
import { useCity } from "../hooks/useCityContext";
import { useNotifications } from "../hooks/useNotifications";
import type { DashboardConfig, WeatherData, Restaurant, HotelItem, EventItem } from "../types";

interface CitySuggestion {
  lat: number;
  lon: number;
  name: string;
  displayName: string;
  country: string;
  admin1: string;
}

export default function Dashboard() {
  const { city, setCity, cityLoading } = useCity();
  const queryClient = useQueryClient();
  const { sendNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const notifiedCityRef = useRef<string>("");

  const restaurantModal = useDetailModal<Restaurant>();
  const hotelModal = useDetailModal<HotelItem>();
  const eventModal = useDetailModal<EventItem>();

  const [config] = useState<DashboardConfig>({
    showWeather: true,
    showEvents: true,
    showRestaurants: true,
    showHotels: true,
  });

  const { data: weatherData, isLoading: weatherLoading, error: weatherQueryError } = useQuery<WeatherData>({
    queryKey: [`/api/weather?city=${encodeURIComponent(city)}`],
    enabled: !cityLoading,
    queryFn: async () => {
      const resp = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.error || "Failed to fetch weather");
      }
      return resp.json();
    },
  });

  const weather = weatherData ?? null;
  const weatherError = weatherQueryError ? (weatherQueryError as Error).message : "";

  useEffect(() => {
    if (weatherData?.displayName) {
      setCity(weatherData.displayName);
    } else if ((weatherData as any)?.city) {
      setCity((weatherData as any).city);
    }
  }, [weatherData, setCity]);

  // Send a notification when switching to a new city — once per city
  useEffect(() => {
    if (!weatherData || notifiedCityRef.current === city) return;
    notifiedCityRef.current = city;
    const shortCity = city.split(",")[0].trim();
    sendNotification(
      `Now exploring ${shortCity}`,
      `Weather, events, restaurants and hotels loaded for ${shortCity}.`,
      { tag: `city-${city}` }
    );
  }, [city, weatherData, sendNotification]);

  // Send weather alert notifications when data loads
  useEffect(() => {
    if (!weatherData) return;
    const { temperature, airQuality, wind } = weatherData as any;
    if ((airQuality ?? 0) >= 150) {
      sendNotification(
        "Poor Air Quality Alert",
        `AQI is ${airQuality} in ${city.split(",")[0]}. Sensitive groups should avoid outdoor activity.`,
        { tag: "aqi-alert" }
      );
    } else if ((temperature ?? 0) >= 35) {
      sendNotification(
        "Heat Advisory",
        `It's ${temperature}°C in ${city.split(",")[0]}. Stay hydrated and avoid prolonged sun exposure.`,
        { tag: "heat-alert" }
      );
    } else if ((wind ?? 0) >= 50) {
      sendNotification(
        "Strong Wind Advisory",
        `Wind speeds are ${wind} km/h in ${city.split(",")[0]}. Secure loose outdoor items.`,
        { tag: "wind-alert" }
      );
    }
  }, [weatherData, city, sendNotification]);

  const { data: restData, isLoading: restLoading } = useQuery<{ restaurants: Restaurant[] }>({
    queryKey: [`/api/restaurants?city=${encodeURIComponent(city)}&limit=4`],
    enabled: !cityLoading,
    queryFn: async () => {
      const res = await fetch(`/api/restaurants?city=${encodeURIComponent(city)}&limit=4`);
      if (!res.ok) return { restaurants: [] };
      return res.json();
    },
  });

  const { data: hotelData, isLoading: hotelLoading } = useQuery<{ hotels: HotelItem[] }>({
    queryKey: [`/api/hotels?city=${encodeURIComponent(city)}&limit=4`],
    enabled: !cityLoading,
    queryFn: async () => {
      const res = await fetch(`/api/hotels?city=${encodeURIComponent(city)}&limit=4`);
      if (!res.ok) return { hotels: [] };
      return res.json();
    },
  });

  const { data: eventData, isLoading: eventLoading } = useQuery<{ events: EventItem[] }>({
    queryKey: [`/api/events?city=${encodeURIComponent(city)}&limit=3`],
    enabled: !cityLoading,
    queryFn: async () => {
      const res = await fetch(`/api/events?city=${encodeURIComponent(city)}&limit=3`);
      if (!res.ok) return { events: [] };
      return res.json();
    },
  });

  const restaurants = restData?.restaurants ?? [];
  const hotels = hotelData?.hotels ?? [];
  const events = (eventData?.events ?? []) as EventItem[];
  const dataLoading = restLoading || hotelLoading || eventLoading;

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
        {cityLoading ? (
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="w-7 h-7 animate-spin text-[#1152d4]" />
            <div>
              <h2 className="text-3xl font-bold">Detecting your location…</h2>
              <p className="text-sm text-[#9ca3af] mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Allow location access to load your city automatically
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-6xl font-bold mb-2">{city.split(",")[0].trim()}</h2>
            {city.includes(",") && (
              <p className="text-lg text-[#9ca3af] mb-4">{city}</p>
            )}
          </>
        )}

        <div ref={suggestionsRef} className="relative max-w-2xl">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => { if (citySuggestions.length > 0) setShowSuggestions(true); }}
              placeholder="Enter city or area (e.g. London, Ontario)..."
              className="w-full bg-[var(--app-card-inner)] text-[var(--app-text)] placeholder-[#6b7280] px-6 py-4 pr-14 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-[var(--app-card-hover)] rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-[#9ca3af]" />
            </button>
          </form>

          {showSuggestions && citySuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl overflow-hidden z-50 shadow-lg">
              {citySuggestions.map((s, i) => (
                <button
                  key={`${s.lat}-${s.lon}-${i}`}
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-[var(--app-card-inner)] transition-colors border-b border-[var(--app-border)] last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-[#1152d4] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[var(--app-text)] font-medium">{s.name}</span>
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
          <div className="bg-[var(--app-card)] rounded-2xl p-6 mb-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="h-4 bg-[var(--app-card-hover)] rounded w-40 mb-3" />
                <div className="h-16 bg-[var(--app-card-hover)] rounded w-32 mb-2" />
                <div className="h-4 bg-[var(--app-card-hover)] rounded w-28" />
              </div>
              <div>
                <div className="h-4 bg-[var(--app-card-hover)] rounded w-32 mb-3" />
                <div className="h-16 bg-[var(--app-card-hover)] rounded w-24 mb-2" />
                <div className="h-4 bg-[var(--app-card-hover)] rounded w-36" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-[var(--app-card-hover)] rounded-full" />
                  <div className="h-3 bg-[var(--app-card-hover)] rounded w-12 mt-2" />
                  <div className="h-5 bg-[var(--app-card-hover)] rounded w-16 mt-1" />
                </div>
              ))}
            </div>
          </div>
        ) : weatherError ? (
          <div className="bg-[var(--app-card)] rounded-2xl p-6 mb-6 text-center">
            <p className="text-red-400 mb-2">{weatherError}</p>
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: [`/api/weather?city=${encodeURIComponent(city)}`] })}
              className="text-[#51a2ff] hover:underline text-sm"
            >
              Try again
            </button>
          </div>
        ) : weather ? (
          <WeatherCard weather={weather} />
        ) : null
      )}

      {config.showEvents && (
        dataLoading ? (
          <div className="bg-[var(--app-card)] rounded-2xl p-6 mb-6 animate-pulse">
            <div className="h-6 bg-[var(--app-card-hover)] rounded w-40 mb-4" />
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-16 bg-[var(--app-card-hover)] rounded" />
              ))}
            </div>
          </div>
        ) : (
          <EventsPreview events={dashboardEvents} onEventClick={handleEventClick} />
        )
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {config.showRestaurants && (
          dataLoading ? (
            <div className="bg-[var(--app-card)] rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-[var(--app-card-hover)] rounded w-40 mb-4" />
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-[var(--app-card-hover)] rounded" />
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
            <div className="bg-[var(--app-card)] rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-[var(--app-card-hover)] rounded w-40 mb-4" />
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-[var(--app-card-hover)] rounded" />
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

      <NotificationPrompt />
    </PageLayout>
  );
}
