# Smart City Explorer

## Overview

Smart City Explorer is a comprehensive web application that provides users with real-time city information including weather, air quality, events, transportation options, restaurants, and hotels. The application features an AI-powered chat assistant to help users explore cities and get personalized recommendations.

The app follows a multi-page routing flow: Landing Page → Auth (Login/Register) → Dashboard → Full detail pages for Restaurants, Hotels, Events, Map, and Profile. Design is flexible and modular for adding future sections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript
- Vite as the build tool with HMR
- Wouter for client-side routing (SPA)
- Framer Motion (`motion` package) for page animations

**Routing Structure:**
- `/` - Landing page with hero, features, stats, testimonials
- `/auth` - Login/Register page with backend API integration
- `/dashboard` - Main dashboard with weather, events, restaurants, hotels, AI assistant
- `/restaurants` - Full restaurants page with filtering, sorting, categories
- `/hotels` - Full hotels page with filtering, sorting, amenities
- `/events` - Full events page with filtering, sorting, date filters
- `/map` - Interactive map with transport modes and alerts
- `/profile` - User profile with stats and settings

**Component Organization:**
- `client/src/app/` - Main application components (imported from Figma design)
  - `components/` - Page components and sub-components
  - `components/shared/` - Header, Footer, PageLayout, AnimatedPage, SearchInput, etc.
  - `components/dashboard/` - WeatherCard, EventsPreview, ListPreview, QuickActions
  - `components/restaurants/`, `hotels/`, `events/`, `map/`, `profile/` - Page-specific components
  - `components/landing/` - StatsCounter, HowItWorks, TestimonialCard, LandingFooter
  - `data/` - Mock data files for all sections
  - `utils/` - Filter/sort helpers
  - `types/` - TypeScript type definitions
  - `hooks/router-compat.ts` - Router compatibility shim (wouter ↔ react-router API)
- `client/src/components/` - Shared shadcn/ui components + AIChatAssistant
- `client/src/assets/` - Static image assets (Figma exports)

**UI Design System:**
- Dark theme: #1a1d26 (background), #23262f (cards), #1152d4 (primary blue)
- Inter font family
- Custom components matching Figma design specifications
- Responsive design with mobile-first approach

**State Management:**
- TanStack Query for server state
- Local React state for UI interactions
- Router-based navigation via wouter

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- RESTful API endpoints under `/api`

**Key Endpoints:**
- `POST /api/auth/register` - User registration (first user auto-becomes Admin)
- `POST /api/auth/login` - User login (returns role in response)
- `GET /api/auth/me` - Get current session user (with role)
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout
- `POST /api/ai/chat` - AI chat assistant (OpenAI GPT-4o)
- `GET /api/weather?city=X` - Weather + air quality (Open-Meteo API)
- `GET /api/restaurants?city=X&limit=N` - Real restaurants with lat/lon (Overpass + Nominatim fallback)
- `GET /api/hotels?city=X&limit=N` - Real hotels with lat/lon (Overpass + Nominatim fallback)
- `GET /api/events?city=X&limit=N` - Real venues/events with lat/lon (Overpass + Nominatim fallback)
- `GET /api/geocode?q=X` - Geocode city/place names to coordinates
- `GET /api/route?olat=X&olon=X&dlat=X&dlon=X&profile=X` - Route between two points (OSRM)
- `GET /api/admin/stats` - Admin: dashboard stats (Admin only)
- `GET /api/admin/users` - Admin: list all users (Admin only)
- `PUT /api/admin/users/:id/role` - Admin: change user role (Admin only)
- `GET /api/admin/submissions` - Admin: all listing submissions (Admin only)
- `PUT /api/admin/submissions/:id` - Admin: approve/reject submission (Admin only)
- `POST /api/commercial/submissions` - Commercial: submit a listing request
- `GET /api/commercial/submissions` - Commercial: view own submissions

### Data Layer

**Database:**
- Drizzle ORM with PostgreSQL (Neon serverless)
- DatabaseStorage class with full PostgreSQL persistence
- Schema: `users` table (id, username, email, password bcrypt-hashed, phone, location, bio, preferredCity, notificationsEnabled, darkMode, role)
- Schema: `submissions` table (id, userId, type, name, description, address, city, website, phone, additionalInfo, status, adminNote, reviewedBy, createdAt, reviewedAt)
- Password security: bcrypt with 12 salt rounds
- Session management: express-session; session stores userId and role
- Role system: regular | commercial | admin (first registered user auto-becomes admin)

### External Dependencies

**OpenAI Integration:**
- GPT-4o model for AI city assistant
- Conversational context management
- City-specific prompts for weather, events, transport, restaurants, hotels

**Real Data APIs:**
- Open-Meteo (free) - Weather and air quality data
- OpenStreetMap Overpass API - Restaurants, hotels, venues/attractions
- Nominatim - Geocoding and hotel fallback search
- Curated Unsplash images by category for visual polish
- Seeded random functions for consistent ratings/reviews per place name

**City Context:**
- CityProvider (React Context) in `client/src/app/hooks/useCityContext.tsx`
- SessionStorage persistence for city selection across pages
- All data pages (Dashboard, Restaurants, Hotels, Events) share same city

**UI Libraries:**
- shadcn/ui (Radix UI primitives)
- Tailwind CSS
- Lucide React icons
- Framer Motion (motion package)
- Leaflet + react-leaflet v4 (interactive maps)

## Theme System

**Light/Dark mode** is toggled from the Profile page → Preferences → Dark Mode toggle.
- Default: light mode
- Persistence: `localStorage("city-explorer-theme")`
- CSS variables in `index.css`: `--app-bg`, `--app-card`, `--app-card-inner`, `--app-icon-bg`, `--app-card-hover`, `--app-text`, `--app-text-muted`, `--app-border`
- Landing page (`/`) and Auth page (`/auth`) are **always dark** — they use hardcoded dark colors and are not affected by the theme toggle
- All app pages (Dashboard, Restaurants, Hotels, Events, Map, Profile) fully respond to the theme toggle
- Blue header (`#1152d4`) and blue buttons always use `text-white` regardless of theme
- `ThemeProvider` wraps the app in `App.tsx`; use `useTheme()` for `isDark`/`setDark`/`toggleTheme`

## Recent Changes

- Integrated Django backend API logic into Express server (PostgreSQL, bcrypt, email)
- Switched from in-memory storage to DatabaseStorage with Drizzle ORM + PostgreSQL
- Added bcrypt password hashing (12 salt rounds) for secure credential storage
- Added email field to user registration (schema + frontend + backend)
- Integrated complete Figma-designed frontend with multi-page routing
- Converted react-router imports to wouter via compatibility shim
- Wired auth page to backend API (register/login)
- Added AI chat assistant as floating panel on dashboard
- Fixed figma:asset imports to use local asset paths
- Replaced static map with interactive Leaflet map centered on searched city
- Added /api/geocode and /api/route endpoints for geocoding and OSRM routing
- Added lat/lon coordinates to restaurant, hotel, event API responses
- All "Directions" buttons now navigate to /map with dest/lat/lon query params
- Map shows route polyline from city center origin to destination with transport mode selector (Car/Bike/Walk)
- Added Nominatim fallback for events API (Overpass timeout resilience)
- Map page now has From/To input fields with autocomplete suggestions (Nominatim)
- All three transport modes (Car/Bike/Walk) show different travel times simultaneously
- Added /api/autocomplete endpoint for place search suggestions
- Error feedback when geocoding fails for typed queries
- Added express-session for persistent auth (login/register set session)
- Profile page now displays real user data from database
- Added edit profile functionality with inline form (username, email, phone, location, bio, preferred city)
- Added toggle preferences (notifications, dark mode) saved to database
- Added logout functionality that clears session and redirects to auth
- Added /api/auth/me, /api/auth/profile, /api/auth/logout endpoints
- Added detail modal overlays for restaurant, hotel, and event cards (click card to see full details)
- All action buttons (Reserve Table, View Menu, Book Now, View Rooms, Get Tickets, Learn More) now link to Google Maps search for the venue
- Dashboard ListPreview and EventsPreview items also open detail modals
- Featured cards (restaurant/hotel/event) also support click-to-open modals and have real external links
- City disambiguation: geocodeCity now parses qualifiers (country, state/province) from search queries
- Searches like "London, Ontario" or "Paris, Texas" now resolve to the correct city
- Added /api/city-suggestions endpoint returning cities with displayName (city, region, country)
- Dashboard search input has live autocomplete dropdown showing disambiguated city suggestions
- CitySearch component uses real API instead of hardcoded city list
- All API responses include displayName field for full city identification
- Collections feature: useCollections.ts hook (localStorage key city-explorer-saved) persists saved places
- Save/Bookmark toggle buttons added to all three modal types (restaurant, hotel, event) in DetailModal.tsx
- Past Reviews: placeName column in reviews DB; GET /api/reviews/mine route returns user's reviews
- ProfilePage: 5-tab activity dashboard — Events Attended, Active Alerts, Check-ins, Saved, My Reviews
- ProfilePage Saved tab: shows bookmarked restaurants/hotels/events with thumbnail, type, city, saved date
- ProfilePage My Reviews tab: shows user's submitted reviews with star ratings and timestamps
- Profile picture upload: click the avatar in ProfilePage to upload a photo; compressed client-side (Canvas API, max 400KB/512px); saved as base64 in DB `users.avatar` column; camera icon overlay on hover; red × button appears to remove photo
- Header profile button: shows the user's avatar thumbnail when set (falls back to User icon)
- Avatar is cached in localStorage (`city-explorer-avatar`) via `useAuth` and synced on every `/api/auth/me` call
- Express body size limit raised to 3MB to support base64 avatar uploads
- Geolocation on first visit: CityProvider uses `navigator.geolocation` to detect the user's city on first open (no sessionStorage city stored); coordinates are sent to `/api/reverse-geocode` (Nominatim) to resolve city name; defaults to "Toronto, Ontario, Canada" if denied or timed out; Dashboard shows a spinner while resolving and delays all queries until city is known
- Approved submissions appear in listings: `/api/restaurants`, `/api/hotels`, `/api/events` merge city-matched approved commercial submissions from the DB into their responses; cards show a purple "Community Listing" badge
