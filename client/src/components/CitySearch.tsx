import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Star } from "lucide-react";

interface CitySuggestion {
  lat: number;
  lon: number;
  name: string;
  displayName: string;
  country: string;
  admin1: string;
}

interface CitySearchProps {
  onCitySelect: (city: string) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const popularCities = [
    "New York", "Tokyo", "London", "Paris", "Singapore", "Dubai", "Sydney", "Barcelona"
  ];

  const recentSearches = [
    "San Francisco", "Amsterdam", "Berlin"
  ];

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
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const resp = await fetch(`/api/city-suggestions?q=${encodeURIComponent(query)}`);
      if (resp.ok) {
        const data = await resp.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      }
    } catch {}
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const handleCitySelect = (city: string) => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    onCitySelect(city);
  };

  const handleSuggestionSelect = (suggestion: CitySuggestion) => {
    handleCitySelect(suggestion.displayName);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-search-title">
            Explore Any City
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="text-search-subtitle">
            Search for comprehensive information about cities worldwide
          </p>
        </div>

        <Card className="p-6">
          <div className="relative" ref={suggestionsRef}>
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a city (e.g. London, Ontario)..."
              className="pl-12 pr-4 py-4 text-lg"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              data-testid="input-city-search"
            />
            {searchTerm && (
              <Button
                className="absolute right-2 top-2"
                onClick={() => handleCitySelect(searchTerm)}
                data-testid="button-search-submit"
              >
                Search
              </Button>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-md overflow-hidden z-50 shadow-lg">
                {suggestions.map((s, index) => (
                  <button
                    key={`${s.lat}-${s.lon}-${index}`}
                    className="w-full text-left flex items-center gap-3 p-3 hover-elevate cursor-pointer border-b border-border last:border-b-0"
                    onClick={() => handleSuggestionSelect(s)}
                    data-testid={`button-suggestion-${index}`}
                  >
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <span className="text-foreground font-medium">{s.name}</span>
                      {(s.admin1 || s.country) && (
                        <span className="text-muted-foreground text-sm ml-2">
                          {[s.admin1, s.country].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>

        {recentSearches.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground" data-testid="text-recent-title">
                  Recent Searches
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((city, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                    data-testid={`badge-recent-${index}`}
                  >
                    {city}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground" data-testid="text-popular-title">
                Popular Destinations
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularCities.map((city, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start"
                  onClick={() => handleCitySelect(city)}
                  data-testid={`button-popular-${index}`}
                >
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {city}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
