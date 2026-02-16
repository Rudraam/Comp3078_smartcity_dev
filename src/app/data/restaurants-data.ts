import type { Restaurant } from "../types";

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Prime Steakhouse",
    category: "American",
    rating: 4.8,
    reviews: 835,
    priceLevel: 4,
    distance: "1.8 km away",
    hours: "5:00 PM - 11:00 PM",
    featured: true,
    openNow: false,
    image:
      "https://images.unsplash.com/photo-1538114147362-73afdeb1edea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "2",
    name: "Italian Bistro",
    category: "Italian",
    rating: 4.5,
    reviews: 342,
    priceLevel: 2,
    distance: "0.8 km away",
    hours: "11:00 AM - 10:00 PM",
    openNow: true,
    image:
      "https://images.unsplash.com/photo-1751563820356-a62570b187ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "3",
    name: "Sakura Sushi",
    category: "Japanese",
    rating: 4.7,
    reviews: 512,
    priceLevel: 3,
    distance: "1.2 km away",
    hours: "12:00 PM - 11:00 PM",
    openNow: false,
    image:
      "https://images.unsplash.com/photo-1548285181-3103ce5d3db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "4",
    name: "La Cantina",
    category: "Mexican",
    rating: 4.3,
    reviews: 287,
    priceLevel: 2,
    distance: "2.1 km away",
    hours: "10:00 AM - 6:00 PM",
    openNow: false,
    image:
      "https://images.unsplash.com/photo-1759265231461-75abc2f1edc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "5",
    name: "Urban Brew Cafe",
    category: "Cafe",
    rating: 4.6,
    reviews: 428,
    priceLevel: 1,
    distance: "0.5 km away",
    hours: "7:00 AM - 6:00 PM",
    openNow: true,
    image:
      "https://images.unsplash.com/photo-1638882267964-0d9764607947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "6",
    name: "Bangkok Spice",
    category: "Thai",
    rating: 4.4,
    reviews: 301,
    priceLevel: 2,
    distance: "1.5 km away",
    hours: "11:30 AM - 10:00 PM",
    openNow: false,
    image:
      "https://images.unsplash.com/photo-1665917152889-b170c7b8b5fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
];

export const restaurantCategories = [
  "All",
  "Italian",
  "Japanese",
  "Mexican",
  "Thai",
  "American",
  "Cafe",
];
