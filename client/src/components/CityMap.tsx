import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bus, Train, Utensils } from "lucide-react";

interface MapMarker {
  id: string;
  name: string;
  type: "restaurant" | "transport" | "hotel";
  lat: number;
  lng: number;
}

interface CityMapProps {
  cityName: string;
}

export default function CityMap({ cityName }: CityMapProps) {
  // TODO: replace with actual map data from API
  const markers: MapMarker[] = [
    { id: "1", name: "Urban Bistro", type: "restaurant", lat: 40.7580, lng: -73.9855 },
    { id: "2", name: "Sakura Sushi", type: "restaurant", lat: 40.7614, lng: -73.9776 },
    { id: "3", name: "The Garden Cafe", type: "restaurant", lat: 40.7489, lng: -73.9680 },
    { id: "4", name: "Central Station", type: "transport", lat: 40.7527, lng: -73.9772 },
    { id: "5", name: "Metro Hub", type: "transport", lat: 40.7549, lng: -73.9840 },
  ];

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "restaurant":
        return <Utensils className="h-4 w-4 text-orange-500" />;
      case "transport":
        return <Bus className="h-4 w-4 text-blue-500" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "restaurant":
        return "bg-orange-100 border-orange-300 dark:bg-orange-950 dark:border-orange-800";
      case "transport":
        return "bg-blue-100 border-blue-300 dark:bg-blue-950 dark:border-blue-800";
      default:
        return "bg-gray-100 border-gray-300 dark:bg-gray-950 dark:border-gray-800";
    }
  };

  return (
    <Card className="hover-elevate">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-map-title">
          <MapPin className="h-5 w-5" />
          City Map - {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map Container - simplified visual representation */}
        <div className="relative bg-muted rounded-lg overflow-hidden" style={{ height: "400px" }}>
          {/* Grid pattern to simulate map */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px"
            }}
          />
          
          {/* Map Markers */}
          {markers.map((marker, index) => {
            // Convert lat/lng to percentage position for visual display
            const top = ((marker.lat - 40.74) * 1000) % 100;
            const left = ((marker.lng + 73.98) * 1000) % 100;
            
            return (
              <div
                key={marker.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover-elevate`}
                style={{ 
                  top: `${Math.abs(top)}%`, 
                  left: `${Math.abs(left)}%` 
                }}
                data-testid={`marker-${marker.type}-${index}`}
              >
                <div className={`p-2 rounded-full border-2 ${getMarkerColor(marker.type)}`}>
                  {getMarkerIcon(marker.type)}
                </div>
              </div>
            );
          })}
          
          {/* Map Center Indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3" data-testid="map-legend">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-300 dark:bg-orange-950 dark:border-orange-800 flex items-center justify-center">
              <Utensils className="h-4 w-4 text-orange-500" />
            </div>
            <span className="text-sm text-foreground">Restaurants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-300 dark:bg-blue-950 dark:border-blue-800 flex items-center justify-center">
              <Bus className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-sm text-foreground">Public Transport</span>
          </div>
        </div>

        {/* Locations List */}
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Key Locations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {markers.map((marker) => (
              <div
                key={marker.id}
                className="flex items-center gap-2 p-2 rounded-md border hover-elevate cursor-pointer"
                data-testid={`location-${marker.id}`}
              >
                {getMarkerIcon(marker.type)}
                <span className="text-sm text-foreground">{marker.name}</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {marker.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
