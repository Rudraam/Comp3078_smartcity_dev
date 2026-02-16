import { useState } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
import PageLayout from "./shared/PageLayout";
import WeatherCard from "./dashboard/WeatherCard";
import EventsPreview from "./dashboard/EventsPreview";
import ListPreview from "./dashboard/ListPreview";
import QuickActions from "./dashboard/QuickActions";
import {
  mockWeather,
  mockDashboardEvents,
  mockDashboardRestaurants,
  mockDashboardHotels,
} from "../data/dashboard-data";
import type { DashboardConfig } from "../types";

export default function Dashboard() {
  const [city, setCity] = useState("Toronto");
  const [searchQuery, setSearchQuery] = useState("");
  const [config] = useState<DashboardConfig>({
    showWeather: true,
    showEvents: true,
    showRestaurants: true,
    showHotels: true,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery.trim());
      console.log("Searching for:", searchQuery);
    }
  };

  const restaurantItems = mockDashboardRestaurants.map((r) => ({
    id: r.id,
    name: r.name,
    rating: r.rating,
    subtitle: r.cuisine,
    priceLevel: r.priceLevel,
    image: r.image,
  }));

  const hotelItems = mockDashboardHotels.map((h) => ({
    id: h.id,
    name: h.name,
    rating: h.rating,
    subtitle: `${h.stars}-Star`,
    priceLevel: h.priceLevel,
    image: h.image,
  }));

  return (
    <PageLayout>
      {/* City and Search */}
      <div className="mb-8">
        <h2 className="text-6xl font-bold mb-6">{city}</h2>

        <form onSubmit={handleSearch} className="relative max-w-2xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city or area..."
            className="w-full bg-[#2a2e3a] text-white placeholder-[#6b7280] px-6 py-4 pr-14 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-[#3a3e4a] rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </form>
      </div>

      {config.showWeather && <WeatherCard weather={mockWeather} />}

      {/* Quick Actions */}
      <QuickActions />

      {config.showEvents && <EventsPreview events={mockDashboardEvents} />}

      {/* Two Column Layout for Restaurants and Hotels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {config.showRestaurants && (
          <ListPreview
            title="Top Restaurants"
            emoji={"\uD83C\uDF7D\uFE0F"}
            items={restaurantItems}
            navigateTo="/restaurants"
          />
        )}

        {config.showHotels && (
          <ListPreview
            title="Recommended Hotels"
            emoji={"\uD83C\uDFE8"}
            items={hotelItems}
            navigateTo="/hotels"
          />
        )}
      </div>
    </PageLayout>
  );
}