import type {
  WeatherData,
  DashboardEvent,
  DashboardRestaurant,
  DashboardHotel,
} from "../types";

export const mockWeather: WeatherData = {
  temperature: 24,
  feelsLike: 26,
  airQuality: 85,
  airQualityLabel: "Moderate",
  airQualityDescription: "Air quality is acceptable",
  clouds: 40,
  wind: 12,
  humidity: 65,
};

export const mockDashboardEvents: DashboardEvent[] = [
  {
    id: "1",
    category: "Conference",
    name: "Google Devs 2025",
    date: "Dec 15",
    location: "Cecil Community Centre",
  },
  {
    id: "2",
    category: "Music",
    name: "Jazz Festival",
    date: "Dec 18",
    location: "Sankofa Square",
  },
  {
    id: "3",
    category: "Food",
    name: "Food Market",
    date: "Dec 20",
    location: "Nathan Phillips Square",
  },
];

export const mockDashboardRestaurants: DashboardRestaurant[] = [
  {
    id: "1",
    name: "Italian Bistro",
    rating: 4.5,
    cuisine: "Italian",
    priceLevel: 2,
    image:
      "https://images.unsplash.com/photo-1751563820356-a62570b187ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
  },
  {
    id: "2",
    name: "Sushi Master",
    rating: 4.8,
    cuisine: "Japanese",
    priceLevel: 3,
    image:
      "https://images.unsplash.com/photo-1548285181-3103ce5d3db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
  },
  {
    id: "3",
    name: "The Garden Cafe",
    rating: 4.3,
    cuisine: "International",
    priceLevel: 2,
    image:
      "https://images.unsplash.com/photo-1638882267964-0d9764607947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
  },
];

export const mockDashboardHotels: DashboardHotel[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    rating: 4.7,
    stars: 5,
    priceLevel: 3,
    image:
      "https://images.unsplash.com/photo-1696766984569-a33d52748dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
  },
  {
    id: "2",
    name: "Downtown Inn",
    rating: 4.2,
    stars: 3,
    priceLevel: 2,
    image:
      "https://images.unsplash.com/photo-1735320859376-b012ff9620a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
  },
  {
    id: "3",
    name: "City Center Lodge",
    rating: 4.4,
    stars: 4,
    priceLevel: 3,
    image:
      "https://images.unsplash.com/photo-1718104717529-0059a1a860fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
  },
];
