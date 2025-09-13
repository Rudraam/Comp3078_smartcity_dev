import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Cloud, Thermometer, Droplets, Wind, AlertCircle, Calendar, 
  MapPin, Bus, Train, Car, Utensils, Hotel, Star, ExternalLink 
} from "lucide-react";
import dashboardImage from "@assets/generated_images/City_data_dashboard_interface_b50eb8a1.png";
import restaurantImage from "@assets/generated_images/Modern_restaurant_interior_aa20e583.png";
import hotelImage from "@assets/generated_images/Luxury_hotel_room_cityview_f1e718e3.png";

interface CityDashboardProps {
  cityName: string;
  onBackToSearch: () => void;
}

export default function CityDashboard({ cityName, onBackToSearch }: CityDashboardProps) {
  // TODO: remove mock functionality - replace with actual API data
  const weatherData = {
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    uvIndex: 6
  };

  const pollutionData = {
    aqi: 85,
    level: "Moderate",
    pm25: 35,
    pm10: 45,
    color: "yellow"
  };

  const events = [
    { name: "Tech Conference 2024", date: "Dec 15", location: "Convention Center", type: "Conference" },
    { name: "Jazz Festival", date: "Dec 18", location: "Central Park", type: "Music" },
    { name: "Food Market", date: "Dec 20", location: "Downtown Square", type: "Food" }
  ];

  const restaurants = [
    { name: "Urban Bistro", rating: 4.8, cuisine: "Modern European", price: "$$$" },
    { name: "Sakura Sushi", rating: 4.6, cuisine: "Japanese", price: "$$" },
    { name: "The Garden Cafe", rating: 4.7, cuisine: "Vegetarian", price: "$$" }
  ];

  const hotels = [
    { name: "Grand Plaza Hotel", rating: 4.9, price: "$280/night", amenities: ["Spa", "Pool", "WiFi"] },
    { name: "Boutique Inn", rating: 4.5, price: "$150/night", amenities: ["WiFi", "Breakfast"] },
    { name: "City Center Lodge", rating: 4.3, price: "$90/night", amenities: ["WiFi", "Parking"] }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline" 
              onClick={onBackToSearch}
              className="mb-4"
              data-testid="button-back-to-search"
            >
              ← Back to Search
            </Button>
            <h1 className="text-4xl font-bold text-foreground" data-testid="text-city-name">
              {cityName}
            </h1>
            <p className="text-xl text-muted-foreground" data-testid="text-city-subtitle">
              Comprehensive city information and insights
            </p>
          </div>
        </div>

        {/* Weather & Pollution Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-weather-title">
                <Cloud className="h-5 w-5" />
                Weather Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Thermometer className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="text-3xl font-bold" data-testid="text-temperature">{weatherData.temperature}°C</p>
                    <p className="text-muted-foreground" data-testid="text-weather-condition">{weatherData.condition}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                  <p className="text-sm font-medium" data-testid="text-humidity">{weatherData.humidity}%</p>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                </div>
                <div className="text-center">
                  <Wind className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium" data-testid="text-wind-speed">{weatherData.windSpeed} km/h</p>
                  <p className="text-xs text-muted-foreground">Wind</p>
                </div>
                <div className="text-center">
                  <AlertCircle className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
                  <p className="text-sm font-medium" data-testid="text-uv-index">UV {weatherData.uvIndex}</p>
                  <p className="text-xs text-muted-foreground">UV Index</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-pollution-title">
                <AlertCircle className="h-5 w-5" />
                Air Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="text-aqi">{pollutionData.aqi}</p>
                  <Badge variant="secondary" data-testid="badge-aqi-level">{pollutionData.level}</Badge>
                </div>
                <div className="w-20 h-20 rounded-full border-8 border-muted flex items-center justify-center relative">
                  <div 
                    className={`absolute inset-2 rounded-full ${getAQIColor(pollutionData.aqi)}`}
                    style={{ 
                      background: `conic-gradient(hsl(var(--primary)) ${pollutionData.aqi * 3.6}deg, hsl(var(--muted)) 0deg)` 
                    }}
                  />
                  <span className="text-sm font-bold text-foreground relative z-10">AQI</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">PM2.5</span>
                  <span className="text-sm font-medium" data-testid="text-pm25">{pollutionData.pm25} μg/m³</span>
                </div>
                <Progress value={pollutionData.pm25} className="h-2" />
                
                <div className="flex justify-between">
                  <span className="text-sm">PM10</span>
                  <span className="text-sm font-medium" data-testid="text-pm10">{pollutionData.pm10} μg/m³</span>
                </div>
                <Progress value={pollutionData.pm10} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" data-testid="text-events-title">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {events.map((event, index) => (
                <div key={index} className="p-4 border rounded-lg hover-elevate" data-testid={`card-event-${index}`}>
                  <Badge variant="outline" className="mb-2">{event.type}</Badge>
                  <h4 className="font-semibold text-foreground" data-testid={`text-event-name-${index}`}>{event.name}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {event.date}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transportation */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" data-testid="text-transport-title">
              <Bus className="h-5 w-5" />
              Public Transportation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" data-testid="button-bus-info">
                <Bus className="h-8 w-8 text-blue-600" />
                <span className="font-semibold">Bus Network</span>
                <span className="text-sm text-muted-foreground">Real-time schedules</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" data-testid="button-train-info">
                <Train className="h-8 w-8 text-green-600" />
                <span className="font-semibold">Metro System</span>
                <span className="text-sm text-muted-foreground">Route maps & times</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" data-testid="button-taxi-info">
                <Car className="h-8 w-8 text-yellow-600" />
                <span className="font-semibold">Ride Services</span>
                <span className="text-sm text-muted-foreground">Taxi & ride-sharing</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Restaurants & Hotels */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-restaurants-title">
                <Utensils className="h-5 w-5" />
                Top Restaurants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {restaurants.map((restaurant, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg hover-elevate" data-testid={`card-restaurant-${index}`}>
                  <img 
                    src={restaurantImage} 
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground" data-testid={`text-restaurant-name-${index}`}>{restaurant.name}</h4>
                    <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium" data-testid={`text-restaurant-rating-${index}`}>{restaurant.rating}</span>
                      </div>
                      <Badge variant="outline" data-testid={`badge-restaurant-price-${index}`}>{restaurant.price}</Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" data-testid={`button-restaurant-view-${index}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-hotels-title">
                <Hotel className="h-5 w-5" />
                Recommended Hotels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hotels.map((hotel, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg hover-elevate" data-testid={`card-hotel-${index}`}>
                  <img 
                    src={hotelImage} 
                    alt={hotel.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground" data-testid={`text-hotel-name-${index}`}>{hotel.name}</h4>
                    <p className="text-sm font-medium text-primary" data-testid={`text-hotel-price-${index}`}>{hotel.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium" data-testid={`text-hotel-rating-${index}`}>{hotel.rating}</span>
                      </div>
                      <div className="flex gap-1">
                        {hotel.amenities.slice(0, 2).map((amenity, amenityIndex) => (
                          <Badge key={amenityIndex} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" data-testid={`button-hotel-view-${index}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}