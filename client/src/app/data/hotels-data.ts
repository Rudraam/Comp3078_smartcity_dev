import type { HotelItem } from "../types";

export const mockHotels: HotelItem[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    type: "Luxury Hotel",
    rating: 4.8,
    reviews: 892,
    stars: 5,
    location: "Downtown + 0.5 km",
    distance: "Downtown + 0.5 km",
    pricePerNight: 245,
    amenities: ["Free WiFi", "Breakfast", "Parking", "Fitness", "AC"],
    featured: true,
    image:
      "https://images.unsplash.com/photo-1696766984569-a33d52748dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "2",
    name: "Skyline Suites",
    type: "Modern Hotel",
    rating: 4.7,
    reviews: 564,
    stars: 4,
    location: "Financial District + 1.2 km",
    distance: "Financial District + 1.2 km",
    pricePerNight: 189,
    amenities: ["Free WiFi", "Breakfast", "Rooftop Bar"],
    image:
      "https://images.unsplash.com/photo-1735320859376-b012ff9620a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "3",
    name: "Heritage Boutique",
    type: "Boutique Hotel",
    rating: 4.5,
    reviews: 321,
    stars: 4,
    location: "Old Town + 2.3 km",
    distance: "Old Town + 2.3 km",
    pricePerNight: 165,
    amenities: ["Free WiFi", "Breakfast", "AC"],
    image:
      "https://images.unsplash.com/photo-1718104717529-0059a1a860fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "4",
    name: "Coastal Resort & Spa",
    type: "Resort",
    rating: 4.9,
    reviews: 1247,
    stars: 5,
    location: "Waterfront + 7.8 km",
    distance: "Waterfront + 7.8 km",
    pricePerNight: 320,
    amenities: ["Free WiFi", "Breakfast", "Parking"],
    image:
      "https://images.unsplash.com/photo-1565610519595-ec34f88ccc1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "5",
    name: "Metro Business Tower",
    type: "Business Hotel",
    rating: 4.3,
    reviews: 428,
    stars: 3,
    location: "Business District + 0.8 km",
    distance: "Business District + 0.8 km",
    pricePerNight: 135,
    amenities: ["Free WiFi", "Breakfast", "Gym"],
    image:
      "https://images.unsplash.com/photo-1597171149529-7a8f69abe77b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "6",
    name: "Urban Heights Hotel",
    type: "Skyscraper",
    rating: 4.6,
    reviews: 892,
    stars: 4,
    location: "City Center + 0.9 km",
    distance: "City Center + 0.9 km",
    pricePerNight: 175,
    amenities: ["Free WiFi", "Breakfast", "Pool"],
    image:
      "https://images.unsplash.com/photo-1727224454563-4de2b28547b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
];

export const amenityOptions = [
  "Free WiFi",
  "Breakfast",
  "Parking",
  "Fitness Center",
  "Restaurant",
];
