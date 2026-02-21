import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation as useWouterLocation } from "wouter";
import { Car, Bike, PersonStanding, MapPin, Navigation, Loader2, X, AlertTriangle, CloudRain, Construction } from "lucide-react";
import PageLayout from "./shared/PageLayout";
import { useCity } from "../hooks/useCityContext";

const ORIGIN_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DEST_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CITY_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RouteData {
  geometry: { type: string; coordinates: [number, number][] };
  distance: number;
  duration: number;
}

interface AutocompleteResult {
  name: string;
  fullName: string;
  lat: number;
  lon: number;
  type: string;
}

interface AllRoutes {
  car: RouteData | null;
  bike: RouteData | null;
  walk: RouteData | null;
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [map, center, zoom]);
  return null;
}

function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression | null }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [map, bounds]);
  return null;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} sec`;
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hrs} h ${rem} min` : `${hrs} h`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

const TRANSPORT_PROFILES = [
  { id: "car", name: "Car", icon: Car, profile: "driving" },
  { id: "bike", name: "Bike", icon: Bike, profile: "bike" },
  { id: "walk", name: "Walk", icon: PersonStanding, profile: "walk" },
] as const;

const ROUTE_COLORS: Record<string, string> = {
  car: "#3b82f6",
  bike: "#10b981",
  walk: "#f59e0b",
};

function AutocompleteInput({
  value,
  onChange,
  onSelect,
  onEnter,
  placeholder,
  label,
  city,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (result: AutocompleteResult) => void;
  onEnter: (query: string) => void;
  placeholder: string;
  label: string;
  city: string;
  icon: React.ReactNode;
}) {
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const resp = await fetch(`/api/autocomplete?q=${encodeURIComponent(value)}&city=${encodeURIComponent(city)}`);
        if (resp.ok) {
          const data = await resp.json();
          setSuggestions(data);
          setShowSuggestions(true);
        }
      } catch {} finally {
        setLoading(false);
      }
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [value, city]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowSuggestions(false);
      if (suggestions.length > 0) {
        onSelect(suggestions[0]);
        onChange(suggestions[0].name);
      } else if (value.trim()) {
        onEnter(value.trim());
      }
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <label className="text-xs text-[#99a1af] mb-1 block">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-[#2a2e3a] text-white placeholder-[#6b7280] pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all text-sm"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-[#99a1af]" />
          </div>
        )}
        {value && !loading && (
          <button
            onClick={() => { onChange(""); setSuggestions([]); setShowSuggestions(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[#3a3e4a] rounded transition-colors"
          >
            <X className="w-3.5 h-3.5 text-[#99a1af]" />
          </button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-[9999] left-0 right-0 mt-1 bg-[#23262f] border border-[#3a3e4a] rounded-lg shadow-xl max-h-48 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={`${s.lat}-${s.lon}-${i}`}
              onClick={() => {
                onSelect(s);
                onChange(s.name);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-[#2a2e3a] transition-colors border-b border-[#3a3e4a] last:border-b-0"
            >
              <p className="text-sm text-white truncate">{s.name}</p>
              <p className="text-xs text-[#99a1af] truncate">{s.fullName}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MapPage() {
  const { city } = useCity();
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [cityCenter, setCityCenter] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<{ name: string; lat: number; lon: number } | null>(null);
  const [origin, setOrigin] = useState<{ name: string; lat: number; lon: number } | null>(null);
  const [allRoutes, setAllRoutes] = useState<AllRoutes>({ car: null, bike: null, walk: null });
  const [selectedTransport, setSelectedTransport] = useState("car");
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const [mapBounds, setMapBounds] = useState<L.LatLngBoundsExpression | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const prevCity = useRef("");
  const [locationPath] = useWouterLocation();

  const params = new URLSearchParams(window.location.search);
  const destName = params.get("dest");
  const destLat = params.get("lat");
  const destLon = params.get("lon");

  useEffect(() => {
    if (prevCity.current === city) return;
    prevCity.current = city;
    setLoading(true);
    setDestination(null);
    setAllRoutes({ car: null, bike: null, walk: null });
    setMapBounds(null);
    fetch(`/api/geocode?q=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.lat && data.lon) {
          setCityCenter([data.lat, data.lon]);
          const o = { name: `${city} Center`, lat: data.lat, lon: data.lon };
          setOrigin(o);
          setFromQuery(`${city} Center`);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [city]);

  useEffect(() => {
    if (!destName) return;
    if (destLat && destLon) {
      const lat = parseFloat(destLat);
      const lon = parseFloat(destLon);
      if (!isNaN(lat) && !isNaN(lon)) {
        setDestination({ name: destName, lat, lon });
        setToQuery(destName);
        return;
      }
    }
    fetch(`/api/geocode?q=${encodeURIComponent(destName + " " + city)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.lat && data?.lon) {
          setDestination({ name: destName, lat: data.lat, lon: data.lon });
          setToQuery(destName);
        }
      })
      .catch(() => {});
  }, [destName, destLat, destLon, locationPath]);

  const fetchAllRoutes = useCallback(async (orig: { lat: number; lon: number }, dest: { lat: number; lon: number }) => {
    setRouteLoading(true);
    try {
      const resp = await fetch(
        `/api/route?olat=${orig.lat}&olon=${orig.lon}&dlat=${dest.lat}&dlon=${dest.lon}&profile=driving`
      );
      if (!resp.ok) throw new Error("Route fetch failed");
      const carRoute = await resp.json() as RouteData;
      const dist = carRoute.distance;
      const bikeRoute: RouteData = {
        geometry: carRoute.geometry,
        distance: dist,
        duration: dist / 4.17,
      };
      const walkRoute: RouteData = {
        geometry: carRoute.geometry,
        distance: dist,
        duration: dist / 1.39,
      };
      setAllRoutes({ car: carRoute, bike: bikeRoute, walk: walkRoute });
      if (carRoute.geometry?.coordinates) {
        const coords = carRoute.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
        setMapBounds(L.latLngBounds(coords));
      }
    } catch {
      setAllRoutes({ car: null, bike: null, walk: null });
    } finally {
      setRouteLoading(false);
    }
  }, []);

  useEffect(() => {
    if (origin && destination) {
      fetchAllRoutes(origin, destination);
    }
  }, [origin, destination, fetchAllRoutes]);

  useEffect(() => {
    const activeRoute = allRoutes[selectedTransport as keyof AllRoutes];
    if (activeRoute?.geometry?.coordinates) {
      const coords = activeRoute.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
      setMapBounds(L.latLngBounds(coords));
    }
  }, [selectedTransport, allRoutes]);

  const handleFromSelect = useCallback((result: AutocompleteResult) => {
    setSearchError(null);
    setOrigin({ name: result.name, lat: result.lat, lon: result.lon });
  }, []);

  const handleToSelect = useCallback((result: AutocompleteResult) => {
    setSearchError(null);
    setDestination({ name: result.name, lat: result.lat, lon: result.lon });
  }, []);

  const handleFromEnter = useCallback(async (query: string) => {
    setSearchError(null);
    try {
      const resp = await fetch(`/api/geocode?q=${encodeURIComponent(query + " " + city)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.lat && data.lon) {
          setOrigin({ name: query, lat: data.lat, lon: data.lon });
          return;
        }
      }
      setSearchError(`Could not find "${query}". Try a more specific name.`);
    } catch {
      setSearchError(`Could not find "${query}". Try a more specific name.`);
    }
  }, [city]);

  const handleToEnter = useCallback(async (query: string) => {
    setSearchError(null);
    try {
      const resp = await fetch(`/api/geocode?q=${encodeURIComponent(query + " " + city)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.lat && data.lon) {
          setDestination({ name: query, lat: data.lat, lon: data.lon });
          return;
        }
      }
      setSearchError(`Could not find "${query}". Try a more specific name.`);
    } catch {
      setSearchError(`Could not find "${query}". Try a more specific name.`);
    }
  }, [city]);

  const clearRoute = useCallback(() => {
    setDestination(null);
    setToQuery("");
    setAllRoutes({ car: null, bike: null, walk: null });
    setMapBounds(null);
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const activeRoute = allRoutes[selectedTransport as keyof AllRoutes];

  const routePolyline = useMemo(() => {
    if (!activeRoute?.geometry?.coordinates) return null;
    return activeRoute.geometry.coordinates.map((c) => [c[1], c[0]] as [number, number]);
  }, [activeRoute]);

  const mapCenter = cityCenter || [43.65, -79.38];
  const mapZoom = destination ? 13 : 12;

  return (
    <PageLayout>
      <h1 className="text-6xl font-normal mb-6">{city}</h1>

      <div className="bg-[#23262f] rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <AutocompleteInput
            value={fromQuery}
            onChange={setFromQuery}
            onSelect={handleFromSelect}
            onEnter={handleFromEnter}
            placeholder="Starting point..."
            label="From"
            city={city}
            icon={<div className="w-3 h-3 rounded-full bg-green-500" />}
          />
          <AutocompleteInput
            value={toQuery}
            onChange={setToQuery}
            onSelect={handleToSelect}
            onEnter={handleToEnter}
            placeholder="Where to?"
            label="To"
            city={city}
            icon={<div className="w-3 h-3 rounded-full bg-red-500" />}
          />
        </div>
      </div>

      {searchError && (
        <div className="flex items-center gap-2 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{searchError}</span>
          <button onClick={() => setSearchError(null)} className="ml-auto p-0.5 hover:bg-red-500/20 rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {destination && activeRoute && (
        <div className="flex flex-wrap items-center gap-3 mb-4 bg-[#23262f] rounded-xl px-4 py-3">
          <Navigation className="w-5 h-5 text-[#1152d4]" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#99a1af]">Directions to</p>
            <p className="font-semibold truncate">{destination.name}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold text-[#1152d4]">{formatDistance(activeRoute.distance)}</span>
            <span className="text-[#99a1af]">{formatDuration(activeRoute.duration)}</span>
          </div>
          {routeLoading && <Loader2 className="w-5 h-5 animate-spin text-[#1152d4]" />}
          <button onClick={clearRoute} className="p-1 hover:bg-[#3a3e4a] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#99a1af]" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-[#23262f] rounded-2xl overflow-hidden">
            <div className="relative h-[500px]">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-[#3a3e4a]">
                  <Loader2 className="w-10 h-10 animate-spin text-[#1152d4]" />
                </div>
              ) : (
                <MapContainer
                  center={mapCenter as [number, number]}
                  zoom={mapZoom}
                  className="w-full h-full"
                  style={{ background: "#1a1d26" }}
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />

                  {!destination && !mapBounds && (
                    <MapUpdater center={mapCenter as [number, number]} zoom={mapZoom} />
                  )}

                  {mapBounds && <FitBounds bounds={mapBounds} />}

                  {origin && (
                    <Marker position={[origin.lat, origin.lon]} icon={ORIGIN_ICON}>
                      <Popup>
                        <span className="text-sm font-semibold">{origin.name}</span>
                        <br />
                        <span className="text-xs text-gray-500">Origin</span>
                      </Popup>
                    </Marker>
                  )}

                  {destination && (
                    <Marker position={[destination.lat, destination.lon]} icon={DEST_ICON}>
                      <Popup>
                        <span className="text-sm font-semibold">{destination.name}</span>
                        <br />
                        <span className="text-xs text-gray-500">Destination</span>
                      </Popup>
                    </Marker>
                  )}

                  {!destination && cityCenter && (
                    <Marker position={cityCenter} icon={CITY_ICON}>
                      <Popup>
                        <span className="text-sm font-semibold">{city}</span>
                      </Popup>
                    </Marker>
                  )}

                  {routePolyline && (
                    <Polyline
                      positions={routePolyline}
                      pathOptions={{
                        color: ROUTE_COLORS[selectedTransport] || "#3b82f6",
                        weight: 5,
                        opacity: 0.8,
                      }}
                    />
                  )}
                </MapContainer>
              )}
            </div>

            {destination && (
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Choose Transportation</h3>
                <div className="grid grid-cols-3 gap-3">
                  {TRANSPORT_PROFILES.map((mode) => {
                    const Icon = mode.icon;
                    const isSelected = selectedTransport === mode.id;
                    const modeRoute = allRoutes[mode.id as keyof AllRoutes];
                    const duration = modeRoute ? formatDuration(modeRoute.duration) : "---";
                    const distance = modeRoute ? formatDistance(modeRoute.distance) : "---";
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedTransport(mode.id)}
                        className={`p-4 rounded-xl transition-all ${
                          isSelected
                            ? "bg-[#1152d4] text-white"
                            : "bg-[#2a2e3a] hover:bg-[#3a3e4a] text-white"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Icon className="w-8 h-8" />
                          <span className="text-xs font-medium">{mode.name}</span>
                          <span className="text-xs">{routeLoading ? "..." : duration}</span>
                          <span className="text-[10px] text-[#99a1af]">{routeLoading ? "" : distance}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {!destination && (
              <div className="p-6 text-center text-[#99a1af]">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Search for a location or click "Directions" on any listing to see routes here</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#23262f] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Alerts</h3>

            <div className="space-y-3">
              <div className="bg-[#2a2e3a] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 shrink-0 text-orange-400" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1 text-sm">Traffic Advisory</h4>
                    <p className="text-xs text-[#99a1af] line-clamp-2">
                      Heavy congestion on downtown routes during rush hours (7-9 AM, 4-7 PM)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#2a2e3a] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Construction className="w-6 h-6 shrink-0 text-yellow-400" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1 text-sm">Road Construction</h4>
                    <p className="text-xs text-[#99a1af] line-clamp-2">
                      Lane closures on main arterial roads. Expect delays of 10-15 minutes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#2a2e3a] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CloudRain className="w-6 h-6 shrink-0 text-blue-400" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1 text-sm">Weather Alert</h4>
                    <p className="text-xs text-[#99a1af] line-clamp-2">
                      Light rain expected this evening. Drive carefully on wet surfaces.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
