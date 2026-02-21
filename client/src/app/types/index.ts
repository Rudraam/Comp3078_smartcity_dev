// Shared types for the Smart City Dashboard

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  airQuality: number;
  airQualityLabel: string;
  airQualityDescription: string;
  clouds: number;
  wind: number;
  humidity: number;
  pm25?: number;
  pm10?: number;
  weatherCode?: number;
}

export interface DashboardEvent {
  id: string;
  category: string;
  name: string;
  date: string;
  location: string;
}

export interface DashboardRestaurant {
  id: string;
  name: string;
  rating: number;
  cuisine: string;
  priceLevel: number;
  image?: string;
}

export interface DashboardHotel {
  id: string;
  name: string;
  rating: number;
  stars: number;
  priceLevel: number;
  image?: string;
}

export interface DashboardConfig {
  showWeather: boolean;
  showEvents: boolean;
  showRestaurants: boolean;
  showHotels: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  priceLevel: number;
  distance: string;
  hours: string;
  image?: string;
  featured?: boolean;
  openNow?: boolean;
  lat?: number;
  lon?: number;
}

export interface HotelItem {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  stars: number;
  location: string;
  distance: string;
  pricePerNight: number;
  amenities: string[];
  featured?: boolean;
  image?: string;
  lat?: number;
  lon?: number;
}

export interface EventItem {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  price: number | "Free";
  featured?: boolean;
  image?: string;
  badge?: string;
  lat?: number;
  lon?: number;
}

export interface TransportMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  duration: string;
  distance: string;
  available: boolean;
}

export interface Alert {
  id: string;
  type: "traffic" | "weather" | "construction" | "temperature";
  title: string;
  description: string;
  icon: string;
}

export interface ProfileEvent {
  id: string;
  name: string;
  date: string;
  status: "Registered" | "Interested";
}

export interface StatItem {
  value: string | number;
  label: string;
}
