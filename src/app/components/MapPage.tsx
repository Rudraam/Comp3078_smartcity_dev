import { useState } from "react";
import { Car, Bike, PersonStanding, Plane, MapPin } from "lucide-react";
import { useLocation } from "react-router";
import PageLayout from "./shared/PageLayout";
import SearchInput from "./shared/SearchInput";
import AlertsPanel from "./map/AlertsPanel";
import TransportSelector from "./map/TransportSelector";
import TrafficLegend from "./map/TrafficLegend";
import MapControls from "./map/MapControls";
import { mockAlerts } from "../data/map-data";
import type { TransportMode } from "../types";
import imgImageTorontoMap from "figma:asset/7bfefac454b84ebf5eb46c3499c7b62cee521f43.png";

function useTransportModes(): TransportMode[] {
  return [
    {
      id: "car",
      name: "Car",
      icon: <Car className="w-8 h-8" />,
      duration: "27 min",
      distance: "14.8 km",
      available: true,
    },
    {
      id: "bike",
      name: "Bike",
      icon: <Bike className="w-8 h-8" />,
      duration: "1 h 2 min",
      distance: "16.8 km",
      available: true,
    },
    {
      id: "walk",
      name: "Walk",
      icon: <PersonStanding className="w-8 h-8" />,
      duration: "3 h 32 min",
      distance: "14.6 km",
      available: true,
    },
    {
      id: "transit",
      name: "Transit",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="4" y="6" width="16" height="14" rx="2" strokeWidth="2" />
          <path d="M4 10h16M9 18v2m6-2v2" strokeWidth="2" />
        </svg>
      ),
      duration: "58 min",
      distance: "- km",
      available: true,
    },
    {
      id: "flying",
      name: "Flying",
      icon: <Plane className="w-8 h-8" />,
      duration: "- min",
      distance: "- km",
      available: false,
    },
  ];
}

export default function MapPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "traffic" | "weather">("all");
  const [selectedTransport, setSelectedTransport] = useState("walk");

  const destination = (location.state as any)?.destination || null;
  const city = (location.state as any)?.city || "Toronto";
  const currentView = destination || "Eglinton Ave E & Manville Rd";

  const transportModes = useTransportModes();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const filteredAlerts =
    activeFilter === "all"
      ? mockAlerts
      : mockAlerts.filter((alert) => {
          if (activeFilter === "traffic")
            return alert.type === "traffic" || alert.type === "construction";
          if (activeFilter === "weather")
            return alert.type === "weather" || alert.type === "temperature";
          return true;
        });

  return (
    <PageLayout>
      {/* City Title */}
      <h1 className="text-6xl font-normal mb-6">{city}</h1>

      {/* Search Bar */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearch}
        placeholder="Search location..."
        buttonLabel="Search"
        className="max-w-lg mb-6"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="bg-[#23262f] rounded-2xl overflow-hidden">
            {/* Map Display */}
            <div className="relative h-[500px] bg-[#3a3e4a]">
              <img
                src={imgImageTorontoMap}
                alt="Map"
                className="w-full h-full object-cover"
              />

              {/* Red Pin Marker for destination */}
              {destination && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="w-12 h-12 text-red-500 fill-red-500" />
                </div>
              )}

              {/* Current View Overlay */}
              <div className="absolute top-4 left-4 bg-[#1f2533] px-4 py-3 rounded-lg max-w-[300px]">
                <p className="text-xs text-[#99a1af] mb-1">Current View</p>
                <p className="text-sm font-medium">{currentView}</p>
              </div>

              <TrafficLegend />
              <MapControls />
            </div>

            <TransportSelector
              modes={transportModes}
              selected={selectedTransport}
              onSelect={setSelectedTransport}
            />
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="lg:col-span-1">
          <AlertsPanel
            alerts={filteredAlerts}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </div>
    </PageLayout>
  );
}
