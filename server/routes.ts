import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { getCityAssistantResponse } from "./openai";
import { updateProfileSchema } from "@shared/schema";
import bcrypt from "bcrypt";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

const SALT_ROUNDS = 12;

const OVERPASS_MIRRORS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass-api.de/api/interpreter",
];

interface OsmElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRating(name: string): number {
  const h = hashCode(name);
  return Math.round((3.8 + (h % 13) / 10) * 10) / 10;
}

function seededPrice(name: string, max = 4): number {
  return (hashCode(name) % max) + 1;
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const RESTAURANT_IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=400&h=300&fit=crop",
];

const HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1618773928121-c32f3bcff8ad?w=400&h=300&fit=crop",
];

const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1545128485-c400e7702796?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&h=300&fit=crop",
];

async function queryOverpass(query: string): Promise<OsmElement[]> {
  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const resp = await fetch(mirror, {
        method: "POST",
        body: `data=${encodeURIComponent(query)}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!resp.ok) continue;
      const text = await resp.text();
      try {
        const data = JSON.parse(text);
        const elements = (data.elements || []).filter((e: OsmElement) => e.tags?.name);
        if (elements.length > 0) return elements;
      } catch { continue; }
    } catch { continue; }
  }
  return [];
}

interface GeoResult {
  lat: number;
  lon: number;
  name: string;
  displayName: string;
  country: string;
  admin1: string;
}

function parseCityQuery(query: string): { cityName: string; qualifier: string } {
  const parts = query.split(",").map(p => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { cityName: parts[0], qualifier: parts.slice(1).join(" ").toLowerCase() };
  }
  const words = query.trim().split(/\s+/);
  if (words.length >= 2) {
    const lastWord = words[words.length - 1].toLowerCase();
    const countryOrRegionKeywords = [
      "uk", "usa", "us", "canada", "france", "germany", "australia", "japan",
      "china", "india", "brazil", "mexico", "spain", "italy",
      "texas", "ohio", "kentucky", "california", "ontario", "quebec",
      "alberta", "england", "scotland", "wales",
    ];
    if (countryOrRegionKeywords.includes(lastWord)) {
      return { cityName: words.slice(0, -1).join(" "), qualifier: lastWord };
    }
  }
  return { cityName: query.trim(), qualifier: "" };
}

function matchesQualifier(result: any, qualifier: string): boolean {
  if (!qualifier) return true;
  const q = qualifier.toLowerCase();
  const fields = [
    result.country?.toLowerCase() || "",
    result.admin1?.toLowerCase() || "",
    result.admin2?.toLowerCase() || "",
    result.country_code?.toLowerCase() || "",
  ];
  return fields.some(f => f.includes(q) || q.includes(f));
}

async function geocodeCity(cityName: string): Promise<GeoResult | null> {
  const { cityName: parsedCity, qualifier } = parseCityQuery(cityName);

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(parsedCity)}&count=10&language=en&format=json`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (!data.results || data.results.length === 0) return null;

  let best = data.results[0];
  if (qualifier) {
    const matched = data.results.find((r: any) => matchesQualifier(r, qualifier));
    if (matched) best = matched;
  }

  const nameParts = [best.name];
  if (best.admin1) nameParts.push(best.admin1);
  if (best.country) nameParts.push(best.country);

  return {
    lat: best.latitude,
    lon: best.longitude,
    name: best.name,
    displayName: nameParts.join(", "),
    country: best.country || "",
    admin1: best.admin1 || "",
  };
}

async function geocodeCitySuggestions(query: string): Promise<GeoResult[]> {
  const { cityName: parsedCity } = parseCityQuery(query);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(parsedCity)}&count=8&language=en&format=json`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (!data.results || data.results.length === 0) return [];

  return data.results.map((r: any) => {
    const nameParts = [r.name];
    if (r.admin1) nameParts.push(r.admin1);
    if (r.country) nameParts.push(r.country);
    return {
      lat: r.latitude,
      lon: r.longitude,
      name: r.name,
      displayName: nameParts.join(", "),
      country: r.country || "",
      admin1: r.admin1 || "",
    };
  });
}

async function fetchWeatherData(lat: number, lon: number) {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,cloud_cover,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh`;
  const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm2_5,pm10,us_aqi`;

  const [weatherResp, airResp] = await Promise.all([
    fetch(weatherUrl),
    fetch(airUrl),
  ]);

  const weather = await weatherResp.json();
  const air = await airResp.json();

  const aqi = air.current?.us_aqi ?? 0;
  let airQualityLabel = "Good";
  let airQualityDescription = "Air quality is considered satisfactory with little to no risk";
  if (aqi > 300) { airQualityLabel = "Hazardous"; airQualityDescription = "Health warning of emergency conditions for everyone"; }
  else if (aqi > 200) { airQualityLabel = "Very Unhealthy"; airQualityDescription = "Serious health effects likely for the entire population"; }
  else if (aqi > 150) { airQualityLabel = "Unhealthy"; airQualityDescription = "Everyone may begin to experience health effects"; }
  else if (aqi > 100) { airQualityLabel = "Unhealthy for Sensitive Groups"; airQualityDescription = "Sensitive groups such as children and elderly may be affected"; }
  else if (aqi > 50) { airQualityLabel = "Moderate"; airQualityDescription = "Acceptable, but sensitive individuals may experience minor issues"; }

  return {
    temperature: Math.round(weather.current?.temperature_2m ?? 0),
    feelsLike: Math.round(weather.current?.apparent_temperature ?? 0),
    airQuality: aqi,
    airQualityLabel,
    airQualityDescription,
    clouds: weather.current?.cloud_cover ?? 0,
    wind: Math.round(weather.current?.wind_speed_10m ?? 0),
    humidity: weather.current?.relative_humidity_2m ?? 0,
    pm25: air.current?.pm2_5 ?? 0,
    pm10: air.current?.pm10 ?? 0,
    weatherCode: weather.current?.weather_code ?? 0,
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "smart-city-session-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 },
    })
  );
  app.get("/api/weather", async (req, res) => {
    try {
      const city = req.query.city as string;
      if (!city) {
        return res.status(400).json({ error: "City parameter required" });
      }

      const geo = await geocodeCity(city);
      if (!geo) {
        return res.status(404).json({ error: "City not found" });
      }

      const weatherData = await fetchWeatherData(geo.lat, geo.lon);
      res.json({ city: geo.name, displayName: geo.displayName, ...weatherData });
    } catch (error: any) {
      console.error("[API] Weather error:", error.message || error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { cityName, message, history } = req.body;

      if (!cityName || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const response = await getCityAssistantResponse(
        cityName,
        message,
        history || []
      );

      res.json({ response });
    } catch (error: any) {
      console.error("[API] AI chat error:", error.message || error);
      res.status(500).json({ 
        error: "Failed to get AI response",
        details: error.message 
      });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await storage.createUser({ 
        username, 
        email: email || "", 
        password: hashedPassword 
      });
      
      req.session.userId = user.id;
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ error: "Not authenticated" });
      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      const { password, ...profile } = user;
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.put("/api/auth/profile", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ error: "Not authenticated" });
      const parsed = updateProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid profile data", details: parsed.error.errors });
      }
      const updated = await storage.updateUser(userId, parsed.data);
      if (!updated) return res.status(404).json({ error: "User not found" });
      const { password, ...profile } = updated;
      res.json(profile);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Logout failed" });
      res.json({ success: true });
    });
  });

  app.get("/api/restaurants", async (req, res) => {
    try {
      const city = req.query.city as string;
      const limit = parseInt(req.query.limit as string) || 10;
      if (!city) return res.status(400).json({ error: "City parameter required" });

      const geo = await geocodeCity(city);
      if (!geo) return res.status(404).json({ error: "City not found" });

      const query = `[out:json][timeout:10];(node["amenity"="restaurant"](around:5000,${geo.lat},${geo.lon}););out body ${limit + 5};`;
      let elements = await queryOverpass(query);

      if (elements.length === 0) {
        try {
          const nominatimResp = await fetch(
            `https://nominatim.openstreetmap.org/search?q=restaurant+in+${encodeURIComponent(city)}&format=json&limit=${limit + 5}&addressdetails=1`,
            { headers: { "User-Agent": "SmartCityExplorer/1.0" } }
          );
          if (nominatimResp.ok) {
            const places = await nominatimResp.json();
            elements = places
              .filter((p: any) => p.name)
              .map((p: any) => ({
                type: "node",
                id: p.place_id,
                lat: parseFloat(p.lat),
                lon: parseFloat(p.lon),
                tags: {
                  name: p.name,
                  cuisine: "",
                  "addr:street": p.address?.road || "",
                  "addr:housenumber": p.address?.house_number || "",
                },
              }));
          }
        } catch {}
      }

      const cuisineMap: Record<string, string> = {
        italian: "Italian", japanese: "Japanese", chinese: "Chinese", mexican: "Mexican",
        thai: "Thai", indian: "Indian", french: "French", korean: "Korean", american: "American",
        pizza: "Pizza", sushi: "Japanese", burger: "American", seafood: "Seafood",
        vietnamese: "Vietnamese", greek: "Greek", mediterranean: "Mediterranean",
        turkish: "Turkish", spanish: "Spanish", brazilian: "Brazilian",
      };

      const restaurants = elements.slice(0, limit).map((el, i) => {
        const name = el.tags?.name || "Restaurant";
        const rawCuisine = (el.tags?.cuisine || "").split(";")[0].trim().toLowerCase();
        const category = cuisineMap[rawCuisine] || (rawCuisine ? rawCuisine.charAt(0).toUpperCase() + rawCuisine.slice(1) : "International");
        const lat = el.lat ?? el.center?.lat ?? geo.lat;
        const lon = el.lon ?? el.center?.lon ?? geo.lon;
        const dist = distanceKm(geo.lat, geo.lon, lat, lon);

        return {
          id: String(el.id),
          name,
          category,
          rating: seededRating(name),
          reviews: (hashCode(name) % 800) + 50,
          priceLevel: seededPrice(name, 3),
          distance: `${dist.toFixed(1)} km away`,
          hours: el.tags?.opening_hours || "Hours not available",
          image: RESTAURANT_IMAGES[i % RESTAURANT_IMAGES.length],
          featured: i === 0,
          openNow: false,
          lat,
          lon,
        };
      });

      res.json({ city: geo.name, displayName: geo.displayName, restaurants });
    } catch (error: any) {
      console.error("[API] Restaurants error:", error.message || error);
      res.status(500).json({ error: "Failed to fetch restaurants" });
    }
  });

  app.get("/api/hotels", async (req, res) => {
    try {
      const city = req.query.city as string;
      const limit = parseInt(req.query.limit as string) || 10;
      if (!city) return res.status(400).json({ error: "City parameter required" });

      const geo = await geocodeCity(city);
      if (!geo) return res.status(404).json({ error: "City not found" });

      const priceToNightly: Record<number, number> = { 1: 85, 2: 145, 3: 220, 4: 380 };
      const typeNames = ["Boutique Hotel", "Business Hotel", "Luxury Hotel", "City Hotel", "Modern Hotel", "Resort"];

      let elements: OsmElement[] = [];
      const overpassQuery = `[out:json][timeout:8];(node["tourism"="hotel"](around:8000,${geo.lat},${geo.lon});way["tourism"="hotel"](around:8000,${geo.lat},${geo.lon}););out center ${limit + 5};`;
      elements = await queryOverpass(overpassQuery);

      if (elements.length === 0) {
        try {
          const nominatimResp = await fetch(
            `https://nominatim.openstreetmap.org/search?q=hotel+in+${encodeURIComponent(city)}&format=json&limit=${limit + 5}&addressdetails=1&extratags=1`,
            { headers: { "User-Agent": "SmartCityExplorer/1.0" } }
          );
          if (nominatimResp.ok) {
            const places = await nominatimResp.json();
            elements = places
              .filter((p: any) => p.name && p.type === "hotel")
              .map((p: any) => ({
                type: "node",
                id: p.place_id,
                lat: parseFloat(p.lat),
                lon: parseFloat(p.lon),
                tags: {
                  name: p.name,
                  "addr:street": p.address?.road || "",
                  "addr:housenumber": p.address?.house_number || "",
                  stars: p.extratags?.stars || "",
                },
              }));
          }
        } catch {}
      }

      const hotels = elements.slice(0, limit).map((el, i) => {
        const name = el.tags?.name || "Hotel";
        const starsTag = parseInt(el.tags?.stars || "0");
        const rating = seededRating(name);
        const stars = starsTag > 0 ? starsTag : Math.min(5, Math.max(2, Math.round(rating)));
        const price = seededPrice(name, 4);
        const lat = el.lat ?? el.center?.lat ?? geo.lat;
        const lon = el.lon ?? el.center?.lon ?? geo.lon;
        const dist = distanceKm(geo.lat, geo.lon, lat, lon);
        const addr = el.tags?.["addr:street"] ? `${el.tags["addr:housenumber"] || ""} ${el.tags["addr:street"]}`.trim() : "";

        return {
          id: String(el.id),
          name,
          type: typeNames[i % typeNames.length],
          rating,
          reviews: (hashCode(name) % 1200) + 100,
          stars,
          location: addr || `${geo.name} + ${dist.toFixed(1)} km`,
          distance: `${dist.toFixed(1)} km`,
          pricePerNight: priceToNightly[price] || 145,
          amenities: ["Free WiFi", "AC", ...(stars >= 4 ? ["Breakfast", "Fitness"] : []), ...(stars >= 5 ? ["Pool", "Spa"] : [])],
          featured: i === 0,
          image: HOTEL_IMAGES[i % HOTEL_IMAGES.length],
          lat,
          lon,
        };
      });

      res.json({ city: geo.name, displayName: geo.displayName, hotels });
    } catch (error: any) {
      console.error("[API] Hotels error:", error.message || error);
      res.status(500).json({ error: "Failed to fetch hotels" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const city = req.query.city as string;
      const limit = parseInt(req.query.limit as string) || 10;
      if (!city) return res.status(400).json({ error: "City parameter required" });

      const geo = await geocodeCity(city);
      if (!geo) return res.status(404).json({ error: "City not found" });

      const query = `[out:json][timeout:10];(node["tourism"="attraction"](around:8000,${geo.lat},${geo.lon});node["amenity"="theatre"](around:8000,${geo.lat},${geo.lon});node["amenity"="cinema"](around:8000,${geo.lat},${geo.lon});node["tourism"="museum"](around:8000,${geo.lat},${geo.lon});node["leisure"="stadium"](around:8000,${geo.lat},${geo.lon});node["amenity"="arts_centre"](around:8000,${geo.lat},${geo.lon});way["tourism"="attraction"](around:8000,${geo.lat},${geo.lon});way["tourism"="museum"](around:8000,${geo.lat},${geo.lon});way["amenity"="theatre"](around:8000,${geo.lat},${geo.lon}););out center ${limit + 5};`;
      let elements = await queryOverpass(query);

      if (elements.length === 0) {
        try {
          const types = ["museum", "theatre", "attraction", "cinema", "stadium"];
          const searches = types.map(t =>
            fetch(`https://nominatim.openstreetmap.org/search?q=${t}+in+${encodeURIComponent(city)}&format=json&limit=4&addressdetails=1`, { headers: { "User-Agent": "SmartCityExplorer/1.0" } })
              .then(r => r.ok ? r.json() : [])
              .catch(() => [])
          );
          const results = await Promise.all(searches);
          const seen = new Set<string>();
          for (const places of results) {
            for (const p of places) {
              if (p.name && !seen.has(p.name)) {
                seen.add(p.name);
                elements.push({
                  type: "node",
                  id: p.place_id,
                  lat: parseFloat(p.lat),
                  lon: parseFloat(p.lon),
                  tags: {
                    name: p.name,
                    tourism: p.type === "museum" ? "museum" : p.type === "attraction" ? "attraction" : undefined,
                    amenity: p.type === "theatre" ? "theatre" : p.type === "cinema" ? "cinema" : undefined,
                    leisure: p.type === "stadium" ? "stadium" : undefined,
                    "addr:street": p.address?.road || "",
                    "addr:housenumber": p.address?.house_number || "",
                  },
                } as OsmElement);
              }
            }
          }
        } catch {}
      }

      const amenityToCategory: Record<string, string> = {
        theatre: "Theater", cinema: "Cinema", arts_centre: "Art",
        museum: "Museum", attraction: "Attraction", stadium: "Sports",
      };
      const categoryToBadge: Record<string, string> = {
        Theater: "Live Show", Cinema: "Screening", Museum: "Culture",
        Art: "Exhibition", Attraction: "Must See", Sports: "Game Day",
      };

      const now = new Date();
      const timeSlots = [
        "7:00 PM - 10:00 PM", "6:00 PM - 11:00 PM", "8:00 PM - 10:30 PM",
        "10:00 AM - 6:00 PM", "9:00 AM - 5:00 PM", "12:00 PM - 8:00 PM",
      ];

      const events = elements.slice(0, limit).map((el, i) => {
        const name = el.tags?.name || "Event";
        const amenity = el.tags?.amenity || el.tags?.tourism || el.tags?.leisure || "attraction";
        const category = amenityToCategory[amenity] || "Entertainment";
        const futureDate = new Date(now);
        futureDate.setDate(futureDate.getDate() + (hashCode(name) % 28) + 1);
        const dateStr = futureDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const addr = el.tags?.["addr:street"] ? `${el.tags["addr:housenumber"] || ""} ${el.tags["addr:street"]}`.trim() : geo.name;
        const lat = el.lat ?? el.center?.lat ?? geo.lat;
        const lon = el.lon ?? el.center?.lon ?? geo.lon;

        return {
          id: String(el.id),
          name,
          category,
          date: dateStr,
          time: timeSlots[hashCode(name) % timeSlots.length],
          location: addr,
          attendees: (hashCode(name) % 4000) + 200,
          price: (hashCode(name) % 3 === 0) ? ("Free" as const) : ((hashCode(name) % 130) + 15),
          featured: i === 0,
          image: EVENT_IMAGES[i % EVENT_IMAGES.length],
          badge: i === 0 ? "Featured" : (categoryToBadge[category] || undefined),
          lat,
          lon,
        };
      });

      res.json({ city: geo.name, displayName: geo.displayName, events });
    } catch (error: any) {
      console.error("[API] Events error:", error.message || error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/city-suggestions", async (req, res) => {
    try {
      const q = req.query.q as string;
      if (!q || q.length < 2) return res.json([]);
      const suggestions = await geocodeCitySuggestions(q);
      res.json(suggestions);
    } catch (error: any) {
      console.error("[API] City suggestions error:", error.message || error);
      res.json([]);
    }
  });

  app.get("/api/geocode", async (req, res) => {
    try {
      const q = req.query.q as string;
      if (!q) return res.status(400).json({ error: "Query parameter required" });
      const geo = await geocodeCity(q);
      if (!geo) return res.status(404).json({ error: "Location not found" });
      res.json(geo);
    } catch (error: any) {
      res.status(500).json({ error: "Geocoding failed" });
    }
  });

  app.get("/api/autocomplete", async (req, res) => {
    try {
      const q = req.query.q as string;
      const city = req.query.city as string;
      if (!q || q.length < 2) return res.json([]);
      const searchQuery = city ? `${q}, ${city}` : q;
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=5`;
      const resp = await fetch(url, {
        headers: { "User-Agent": "SmartCityExplorer/1.0" },
      });
      if (!resp.ok) return res.json([]);
      const data = await resp.json();
      const results = data.map((item: any) => ({
        name: item.display_name.split(",").slice(0, 2).join(",").trim(),
        fullName: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        type: item.type || "place",
      }));
      res.json(results);
    } catch (error: any) {
      console.error("[API] Autocomplete error:", error.message || error);
      res.json([]);
    }
  });

  app.get("/api/route", async (req, res) => {
    try {
      const { olat, olon, dlat, dlon, profile } = req.query;
      if (!olat || !olon || !dlat || !dlon) {
        return res.status(400).json({ error: "Origin and destination coordinates required" });
      }
      const mode = (profile as string) || "driving";
      const osrmProfile = mode === "walk" ? "foot" : mode === "bike" ? "bicycle" : "car";
      const url = `https://router.project-osrm.org/route/v1/${osrmProfile}/${olon},${olat};${dlon},${dlat}?overview=full&geometries=geojson`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("OSRM error");
      const data = await resp.json();
      if (!data.routes || data.routes.length === 0) {
        return res.status(404).json({ error: "No route found" });
      }
      const route = data.routes[0];
      res.json({
        geometry: route.geometry,
        distance: route.distance,
        duration: route.duration,
      });
    } catch (error: any) {
      console.error("[API] Route error:", error.message || error);
      res.status(500).json({ error: "Failed to fetch route" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
