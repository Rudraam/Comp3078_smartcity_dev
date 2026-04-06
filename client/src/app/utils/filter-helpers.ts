import type { Restaurant, HotelItem, EventItem } from "../types";

// --- Restaurants ---

export interface RestaurantFilters {
  minPrice: number | "";
  maxPrice: number | "";
  minRating: number | "";
  maxRating: number | "";
  openNow: boolean;
}

export const defaultRestaurantFilters: RestaurantFilters = {
  minPrice: "",
  maxPrice: "",
  minRating: "",
  maxRating: "",
  openNow: false,
};

export type RestaurantSortKey =
  | "default"
  | "name-asc"
  | "name-desc"
  | "rating-desc"
  | "rating-asc"
  | "price-asc"
  | "price-desc"
  | "reviews-desc";

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: RestaurantFilters
): Restaurant[] {
  return restaurants.filter((r) => {
    if (filters.minPrice !== "" && r.priceLevel < filters.minPrice) return false;
    if (filters.maxPrice !== "" && r.priceLevel > filters.maxPrice) return false;
    if (filters.minRating !== "" && r.rating < filters.minRating) return false;
    if (filters.maxRating !== "" && r.rating > filters.maxRating) return false;
    if (filters.openNow && !r.openNow) return false;
    return true;
  });
}

export function sortRestaurants(
  restaurants: Restaurant[],
  sortKey: RestaurantSortKey
): Restaurant[] {
  const sorted = [...restaurants];
  switch (sortKey) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "price-asc":
      return sorted.sort((a, b) => a.priceLevel - b.priceLevel);
    case "price-desc":
      return sorted.sort((a, b) => b.priceLevel - a.priceLevel);
    case "reviews-desc":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
}

// --- Hotels ---

export interface HotelFilters {
  minPrice: number | "";
  maxPrice: number | "";
  minStars: number;
  minRating: number | "";
  maxRating: number | "";
  amenities: string[];
}

export const defaultHotelFilters: HotelFilters = {
  minPrice: "",
  maxPrice: "",
  minStars: 0,
  minRating: "",
  maxRating: "",
  amenities: [],
};

export type HotelSortKey =
  | "default"
  | "name-asc"
  | "name-desc"
  | "rating-desc"
  | "rating-asc"
  | "price-asc"
  | "price-desc"
  | "stars-desc"
  | "stars-asc"
  | "reviews-desc";

export function filterHotels(
  hotels: HotelItem[],
  filters: HotelFilters
): HotelItem[] {
  return hotels.filter((h) => {
    if (filters.minPrice !== "" && h.pricePerNight < filters.minPrice)
      return false;
    if (filters.maxPrice !== "" && h.pricePerNight > filters.maxPrice)
      return false;
    if (filters.minStars > 0 && h.stars < filters.minStars) return false;
    if (filters.minRating !== "" && h.rating < filters.minRating) return false;
    if (filters.maxRating !== "" && h.rating > filters.maxRating) return false;
    if (
      filters.amenities.length > 0 &&
      !filters.amenities.every((a) => h.amenities.includes(a))
    )
      return false;
    return true;
  });
}

export function sortHotels(
  hotels: HotelItem[],
  sortKey: HotelSortKey
): HotelItem[] {
  const sorted = [...hotels];
  switch (sortKey) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "price-asc":
      return sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case "price-desc":
      return sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    case "stars-desc":
      return sorted.sort((a, b) => b.stars - a.stars);
    case "stars-asc":
      return sorted.sort((a, b) => a.stars - b.stars);
    case "reviews-desc":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
}

// --- Events ---

export interface EventFilters {
  minPrice: number | "";
  maxPrice: number | "";
  freeOnly: boolean;
  minAttendees: number | "";
}

export const defaultEventFilters: EventFilters = {
  minPrice: "",
  maxPrice: "",
  freeOnly: false,
  minAttendees: "",
};

export type EventSortKey =
  | "default"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "date-asc"
  | "date-desc"
  | "attendees-desc";

function getEventPrice(e: EventItem): number {
  if (e.price === null) return Infinity;
  return e.price === "Free" ? 0 : e.price;
}

export function filterEvents(
  events: EventItem[],
  filters: EventFilters
): EventItem[] {
  return events.filter((e) => {
    const price = getEventPrice(e);
    if (filters.freeOnly && e.price !== "Free") return false;
    if (filters.minPrice !== "" && price !== Infinity && price < filters.minPrice) return false;
    if (filters.maxPrice !== "" && price !== Infinity && price > filters.maxPrice) return false;
    if (filters.minAttendees !== "" && e.attendees < filters.minAttendees)
      return false;
    return true;
  });
}

export function sortEvents(
  events: EventItem[],
  sortKey: EventSortKey
): EventItem[] {
  const sorted = [...events];
  switch (sortKey) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return sorted.sort((a, b) => getEventPrice(a) - getEventPrice(b));
    case "price-desc":
      return sorted.sort((a, b) => getEventPrice(b) - getEventPrice(a));
    case "date-asc":
      return sorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    case "date-desc":
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "attendees-desc":
      return sorted.sort((a, b) => b.attendees - a.attendees);
    default:
      return sorted;
  }
}

// --- Shared Utility ---

export function countActiveFilters(
  filters: RestaurantFilters | HotelFilters | EventFilters
): number {
  let count = 0;
  for (const value of Object.values(filters)) {
    if (typeof value === "boolean" && value) count++;
    else if (typeof value === "number" && value > 0) count++;
    else if (typeof value === "string" && value !== "") count++;
    else if (Array.isArray(value) && value.length > 0) count++;
  }
  return count;
}
