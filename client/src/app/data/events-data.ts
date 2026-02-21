import type { EventItem } from "../types";

export const mockEvents: EventItem[] = [
  {
    id: "1",
    name: "Summer Music Festival",
    category: "Music",
    date: "July 15, 2026",
    time: "6:00 PM - 11:00 PM",
    location: "BMO Field",
    attendees: 2847,
    price: 75,
    featured: true,
    badge: "Selling Fast",
    image:
      "https://images.unsplash.com/photo-1763178466088-09e3678eb56b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "2",
    name: "Tech Innovation Summit",
    category: "Conference",
    date: "Dec 10, 2026",
    time: "9:00 AM - 4:00 PM",
    location: "Convention Center Hall A",
    attendees: 1323,
    price: 150,
    badge: "Featured",
    image:
      "https://images.unsplash.com/photo-1560523159-94c9d18bcf27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "3",
    name: "Street Food Festival",
    category: "Food",
    date: "Dec 18, 2026",
    time: "11:00 AM - 9:00 PM",
    location: "Harbor Square",
    attendees: 4283,
    price: "Free",
    badge: "Free Event",
    image:
      "https://images.unsplash.com/photo-1762597095453-06b07846a712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "4",
    name: "Modern Art Exhibition",
    category: "Art",
    date: "Jan 5, 2026",
    time: "10:00 AM - 8:00 PM",
    location: "City Art Gallery",
    attendees: 892,
    price: 25,
    image:
      "https://images.unsplash.com/photo-1545987796-b199d6abb1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "5",
    name: "Championship Finals",
    category: "Sports",
    date: "Dec 8, 2026",
    time: "7:30 PM - 10:00 PM",
    location: "National Stadium",
    attendees: 3244,
    price: 95,
    badge: "Few Tickets",
    image:
      "https://images.unsplash.com/photo-1763479177586-efdf53f9001b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: "6",
    name: "Broadway Musical Night",
    category: "Theater",
    date: "Jan 10, 2026",
    time: "8:00 PM - 10:30 PM",
    location: "Elm St Theater",
    attendees: 1847,
    price: 120,
    image:
      "https://images.unsplash.com/photo-1494436847178-27c6cc526ce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
];

export const eventCategories = [
  "All",
  "Music",
  "Conference",
  "Food",
  "Art",
  "Sports",
  "Theater",
];

export const quickFilters = [
  "Today",
  "Tomorrow",
  "This Week",
  "This Weekend",
  "Next Week",
  "This Month",
];
