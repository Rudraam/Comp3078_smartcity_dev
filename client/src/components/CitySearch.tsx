import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Star } from "lucide-react";

interface CitySearchProps {
  onCitySelect: (city: string) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // TODO: remove mock functionality - replace with actual search API
  const popularCities = [
    "New York", "Tokyo", "London", "Paris", "Singapore", "Dubai", "Sydney", "Barcelona"
  ];

  const recentSearches = [
    "San Francisco", "Amsterdam", "Berlin"
  ];

  const allCities = [
    "New York", "Tokyo", "London", "Paris", "Singapore", "Dubai", "Sydney", "Barcelona",
    "San Francisco", "Amsterdam", "Berlin", "Toronto", "Seoul", "Mumbai", "Madrid", "Rome"
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = allCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (city: string) => {
    console.log('City selected:', city);
    onCitySelect(city);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground" data-testid="text-search-title">
            Explore Any City
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="text-search-subtitle">
            Search for comprehensive information about cities worldwide
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a city..."
              className="pl-12 pr-4 py-4 text-lg"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
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
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Suggestions</p>
              <div className="space-y-1">
                {suggestions.map((city, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-md hover-elevate cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                    data-testid={`button-suggestion-${index}`}
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Recent Searches */}
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
                    className="cursor-pointer hover-elevate"
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

        {/* Popular Cities */}
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