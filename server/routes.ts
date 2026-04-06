import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { getCityAssistantResponse } from "./openai";
import { updateProfileSchema, insertSubmissionSchema, insertReviewSchema } from "@shared/schema";
import bcrypt from "bcrypt";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    role?: string;
  }
}

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) return res.status(401).json({ error: "Not authenticated" });
  next();
}

function requireRole(...roles: string[]) {
  return (req: any, res: any, next: any) => {
    if (!req.session?.userId) return res.status(401).json({ error: "Not authenticated" });
    if (!roles.includes(req.session?.role ?? "regular")) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
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

function cityMatches(subCity: string, queryCity: string): boolean {
  const a = subCity.toLowerCase().trim().split(",")[0].trim();
  const b = queryCity.toLowerCase().trim().split(",")[0].trim();
  return a === b || a.includes(b) || b.includes(a);
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
  countryCode: string;
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
    countryCode: (best.country_code || "").toUpperCase(),
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
      countryCode: (r.country_code || "").toUpperCase(),
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
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "smart-city-session-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
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

      const adminCount = await storage.getAdminCount();
      const role = adminCount === 0 ? "admin" : "regular";

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await storage.createUser({ 
        username, 
        email: email || "", 
        password: hashedPassword,
        role,
      });
      
      req.session.userId = user.id;
      req.session.role = user.role;
      res.status(201).json({ id: user.id, username: user.username, role: user.role });
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
      req.session.role = user.role;
      res.json({ id: user.id, username: user.username, role: user.role });
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
      req.session.role = user.role;
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

      const query = `[out:json][timeout:25];(node["amenity"="restaurant"](around:10000,${geo.lat},${geo.lon}););out body ${limit + 10};`;
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

      // Merge in approved user-submitted restaurants for this city
      const approvedRestaurantSubs = await storage.getApprovedSubmissions("restaurant");
      const subRestaurants = approvedRestaurantSubs
        .filter(s => cityMatches(s.city, city))
        .map(s => ({
          id: `sub_${s.id}`,
          name: s.name,
          category: s.additionalInfo || s.description || "Restaurant",
          rating: 0,
          reviews: 0,
          priceLevel: 1,
          distance: "",
          hours: s.phone ? `Call: ${s.phone}` : "Contact for hours",
          image: undefined,
          featured: false,
          openNow: undefined,
          lat: undefined,
          lon: undefined,
          isUserSubmission: true,
          address: s.address,
          website: s.website,
          description: s.description,
        }));

      res.json({ city: geo.name, displayName: geo.displayName, restaurants: [...restaurants, ...subRestaurants] });
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
      const overpassQuery = `[out:json][timeout:25];(node["tourism"="hotel"](around:15000,${geo.lat},${geo.lon});way["tourism"="hotel"](around:15000,${geo.lat},${geo.lon}););out center ${limit + 10};`;
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

      // Merge in approved user-submitted hotels for this city
      const approvedHotelSubs = await storage.getApprovedSubmissions("hotel");
      const subHotels = approvedHotelSubs
        .filter(s => cityMatches(s.city, city))
        .map(s => ({
          id: `sub_${s.id}`,
          name: s.name,
          type: s.additionalInfo || "Boutique Hotel",
          rating: 0,
          reviews: 0,
          stars: 0,
          location: s.address || s.city,
          distance: "",
          pricePerNight: 0,
          amenities: [],
          featured: false,
          image: undefined,
          lat: undefined,
          lon: undefined,
          isUserSubmission: true,
          address: s.address,
          website: s.website,
          description: s.description,
        }));

      res.json({ city: geo.name, displayName: geo.displayName, hotels: [...hotels, ...subHotels] });
    } catch (error: any) {
      console.error("[API] Hotels error:", error.message || error);
      res.status(500).json({ error: "Failed to fetch hotels" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const city = req.query.city as string;
      const limit = parseInt(req.query.limit as string) || 20;
      if (!city) return res.status(400).json({ error: "City parameter required" });

      const geo = await geocodeCity(city);
      if (!geo) return res.status(404).json({ error: "City not found" });

      const TM_KEY = process.env.TICKETMASTER_API_KEY;
      if (!TM_KEY) {
        return res.status(200).json({ city, displayName: geo.displayName, events: [], note: "Events unavailable — API key not configured" });
      }

      // Map country code to the correct Ticketmaster regional domain
      const TM_DOMAIN: Record<string, string> = {
        CA: "https://www.ticketmaster.ca",
        GB: "https://www.ticketmaster.co.uk",
        IE: "https://www.ticketmaster.ie",
        AU: "https://www.ticketmaster.com.au",
        NZ: "https://www.ticketmaster.co.nz",
        MX: "https://www.ticketmaster.com.mx",
        DE: "https://www.ticketmaster.de",
        FR: "https://www.ticketmaster.fr",
        ES: "https://www.ticketmaster.es",
        NL: "https://www.ticketmaster.nl",
        BE: "https://www.ticketmaster.be",
        SE: "https://www.ticketmaster.se",
        NO: "https://www.ticketmaster.no",
        DK: "https://www.ticketmaster.dk",
        FI: "https://www.ticketmaster.fi",
        PL: "https://www.ticketmaster.pl",
      };
      const tmDomain = TM_DOMAIN[geo.countryCode ?? ""] ?? "https://www.ticketmaster.com";

      // Segment ID → human-readable category
      const SEGMENT_ID_MAP: Record<string, string> = {
        "KZFzniwnSyZfZ7v7nJ": "Music",
        "KZFzniwnSyZfZ7v7nE": "Sports",
        "KZFzniwnSyZfZ7v7na": "Arts & Theatre",
        "KZFzniwnSyZfZ7v7nn": "Film",
        "KZFzniwnSyZfZ7v7n1": "Miscellaneous",
      };

      const tmApiUrl = new URL("https://app.ticketmaster.com/discovery/v2/events.json");
      tmApiUrl.searchParams.set("apikey", TM_KEY);
      tmApiUrl.searchParams.set("latlong", `${geo.lat},${geo.lon}`);
      tmApiUrl.searchParams.set("radius", "100");
      tmApiUrl.searchParams.set("unit", "km");
      tmApiUrl.searchParams.set("size", "200");
      tmApiUrl.searchParams.set("sort", "date,asc");
      tmApiUrl.searchParams.set("includeTest", "no");
      // Only return future events — format: YYYY-MM-DDTHH:mm:ssZ
      const nowUtc = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
      tmApiUrl.searchParams.set("startDateTime", nowUtc);
      if (geo.countryCode) tmApiUrl.searchParams.set("countryCode", geo.countryCode);

      const tmApiResp = await fetch(tmApiUrl.toString(), { headers: { Accept: "application/json" } });
      if (!tmApiResp.ok) {
        const errText = await tmApiResp.text();
        console.error("[Ticketmaster] API error:", tmApiResp.status, errText);
        return res.status(502).json({ error: "Failed to fetch events from Ticketmaster" });
      }

      const tmApiData = await tmApiResp.json();
      const allRaw: any[] = tmApiData?._embedded?.events ?? [];

      // Patterns that indicate internal/private events not meant for public purchase
      const INTERNAL_PATTERNS = [
        /^this is not a (game )?ticket/i,
        /license fee/i,
        /subscription/i,
        /horsemen/i,
        /experiences?$/i,
        /lounge$/i,
        /test game/i,
        /\bvip\b.*\bpackage\b/i,
      ];
      const isInternalEvent = (name: string) =>
        INTERNAL_PATTERNS.some((re) => re.test(name));

      // Keep events that look like real public events; give them all a URL
      const goodEvents = allRaw.filter((ev: any) => !isInternalEvent(ev.name || ""));
      const rawEvents = goodEvents.slice(0, limit);

      const events = rawEvents.map((ev: any, i: number) => {
        const name: string = ev.name || "Event";

        // Resolve category: check segment/genre by ID first (most reliable), then fall back to name
        const cls = ev.classifications?.[0];
        const segmentId: string = cls?.segment?.id || "";
        const segmentName: string = cls?.segment?.name || "";
        const genreName: string = cls?.genre?.name || "";
        const subGenreName: string = cls?.subGenre?.name || "";

        let category: string;
        if (SEGMENT_ID_MAP[segmentId]) {
          // Known TM segment ID — use genre if specific, else segment
          const resolvedSegment = SEGMENT_ID_MAP[segmentId];
          category = (genreName && genreName !== "Undefined" && genreName !== resolvedSegment)
            ? genreName
            : resolvedSegment;
        } else if (segmentName && segmentName !== "Undefined") {
          category = (genreName && genreName !== "Undefined" && genreName !== segmentName)
            ? genreName
            : segmentName;
        } else if (genreName && genreName !== "Undefined") {
          category = genreName;
        } else if (subGenreName && subGenreName !== "Undefined") {
          category = subGenreName;
        } else {
          // No classification data at all — make an educated guess from the name
          const lower = name.toLowerCase();
          if (/\bfilm\b|w\/e\.s\.t\.|english subtitles|subtitles|cinema|movie\b/.test(lower)) category = "Film";
          else if (/\btour\b.*\b(stadium|arena|centre|center|ground)\b|\b(stadium|arena)\b.*\btour\b/.test(lower)) category = "Sports";
          else if (/\bcomedy\b/.test(lower)) category = "Comedy";
          else if (/\btheatre\b|\btheater\b|\bmusical\b|\bopera\b|\bballet\b/.test(lower)) category = "Arts & Theatre";
          else if (/\bconcert\b|\bfestival\b/.test(lower)) category = "Music";
          else category = "Live Event";
        }

        const segment = segmentName || SEGMENT_ID_MAP[segmentId] || "Live Event";

        const dateObj = ev.dates?.start?.localDate ? new Date(ev.dates.start.localDate) : null;
        const dateStr = dateObj
          ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : "TBA";

        const localTime: string = ev.dates?.start?.localTime ?? "";
        let timeStr = "TBA";
        if (localTime) {
          const [h, m] = localTime.split(":").map(Number);
          const ampm = h >= 12 ? "PM" : "AM";
          const hour12 = h % 12 || 12;
          timeStr = `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
        }

        const venue = ev._embedded?.venues?.[0];
        const venueName: string = venue?.name || geo.name;
        const venueCity: string = venue?.city?.name || geo.name;
        const location = venueName !== venueCity ? `${venueName}, ${venueCity}` : venueName;
        const lat: number = parseFloat(venue?.location?.latitude) || geo.lat;
        const lon: number = parseFloat(venue?.location?.longitude) || geo.lon;

        const priceRanges = ev.priceRanges;
        let price: number | "Free" | null = null;
        if (priceRanges && priceRanges.length > 0) {
          const min = priceRanges[0].min;
          price = min > 0 ? Math.round(min) : "Free";
        }

        const tmImage = ev.images?.find((img: any) => img.ratio === "16_9" && img.width >= 640)?.url
          || ev.images?.[0]?.url
          || EVENT_IMAGES[i % EVENT_IMAGES.length];

        // Build URL: prefer direct event URL, then attraction page, then country-specific TM search
        const attractionUrl: string = ev._embedded?.attractions?.[0]?.url || "";
        let tmUrl2: string;
        if (ev.url && ev.url.startsWith("http")) {
          tmUrl2 = ev.url;
        } else if (attractionUrl && attractionUrl.startsWith("http")) {
          tmUrl2 = attractionUrl;
        } else {
          // Include venue name in search for specificity (e.g. "Levity TIFF Bell Lightbox")
          const venueForSearch = venue?.name ? ` ${venue.name}` : "";
          const searchQ = encodeURIComponent(`${name}${venueForSearch}`);
          tmUrl2 = `${tmDomain}/search?q=${searchQ}`;
        }

        const badgeMap: Record<string, string> = {
          Music: "Live Music", Sports: "Game Day", "Arts & Theatre": "Live Show",
          Film: "Screening", Miscellaneous: "Event", Comedy: "Comedy Night",
          "Live Event": "Live Event", Theatre: "Live Show", Theater: "Live Show",
          Rock: "Live Music", Pop: "Live Music", "Hip-Hop": "Live Music",
          "R&B": "Live Music", Country: "Live Music", Jazz: "Live Music",
          Classical: "Live Music", Electronic: "Live Music", Folk: "Live Music",
          Basketball: "Game Day", Football: "Game Day", Hockey: "Game Day",
          Baseball: "Game Day", Soccer: "Game Day", Tennis: "Game Day",
          Wrestling: "Game Day", Boxing: "Game Day",
        };
        const badge = i === 0 ? "Featured" : (badgeMap[category] || badgeMap[segment] || undefined);

        return {
          id: ev.id || String(i),
          name,
          category,
          date: dateStr,
          time: timeStr,
          location,
          attendees: (hashCode(name) % 8000) + 500,
          price,
          featured: i === 0,
          image: tmImage,
          badge,
          lat,
          lon,
          url: tmUrl2,
        };
      });

      // Merge in approved user-submitted events for this city
      const approvedEventSubs = await storage.getApprovedSubmissions("event");
      const subEvents = approvedEventSubs
        .filter(s => cityMatches(s.city, city))
        .map(s => ({
          id: `sub_${s.id}`,
          name: s.name,
          category: s.additionalInfo || "Community Event",
          date: "TBA",
          time: "TBA",
          location: s.address || s.city,
          attendees: 0,
          price: "Free" as const,
          featured: false,
          image: undefined,
          lat: undefined,
          lon: undefined,
          isUserSubmission: true,
          url: s.website || undefined,
          description: s.description,
        }));

      res.json({ city: geo.name, displayName: geo.displayName, events: [...events, ...subEvents] });
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

  app.get("/api/reverse-geocode", async (req, res) => {
    try {
      const lat = req.query.lat as string;
      const lon = req.query.lon as string;
      if (!lat || !lon) return res.status(400).json({ error: "lat and lon required" });

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
      const resp = await fetch(url, { headers: { "User-Agent": "SmartCityExplorer/1.0" } });
      if (!resp.ok) return res.status(502).json({ error: "Reverse geocoding failed" });
      const data = await resp.json();

      const address = data.address || {};
      const cityName = address.city || address.town || address.village || address.municipality || address.county || data.name || "Toronto";
      const state = address.state || address.region || "";
      const country = address.country || "";
      const displayName = [cityName, state, country].filter(Boolean).join(", ");

      res.json({ name: cityName, displayName, lat: parseFloat(lat), lon: parseFloat(lon) });
    } catch (error: any) {
      res.status(500).json({ error: "Reverse geocoding failed" });
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

  app.get("/api/reviews/mine", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const items = await storage.getReviewsByUser(userId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch your reviews" });
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const { placeId, placeType } = req.query as { placeId: string; placeType: string };
      if (!placeId || !placeType) return res.status(400).json({ error: "placeId and placeType required" });
      const items = await storage.getReviewsByPlace(placeId, placeType);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const parsed = insertReviewSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid review data", details: parsed.error.errors });

      const existing = await storage.getUserReviewForPlace(userId, parsed.data.placeId, parsed.data.placeType);
      if (existing) return res.status(409).json({ error: "You have already reviewed this place" });

      const review = await storage.createReview(userId, user.username, {
        placeId: parsed.data.placeId,
        placeName: parsed.data.placeName ?? "",
        placeType: parsed.data.placeType,
        rating: parsed.data.rating,
        comment: parsed.data.comment ?? "",
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  app.delete("/api/reviews/:id", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const deleted = await storage.deleteReview(req.params.id, userId);
      if (!deleted) return res.status(404).json({ error: "Review not found or not owned by you" });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  app.get("/api/admin/stats", requireRole("admin"), async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/users", requireRole("admin"), async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const safe = allUsers.map(({ password, ...u }) => u);
      res.json(safe);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.put("/api/admin/users/:id/role", requireRole("admin"), async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      if (!["regular", "commercial", "admin"].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }
      const updated = await storage.updateUserRole(id, role);
      if (!updated) return res.status(404).json({ error: "User not found" });
      const { password, ...safe } = updated;
      res.json(safe);
    } catch (error) {
      res.status(500).json({ error: "Failed to update role" });
    }
  });

  app.get("/api/admin/submissions", requireRole("admin"), async (req, res) => {
    try {
      const subs = await storage.getAllSubmissions();
      res.json(subs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.put("/api/admin/submissions/:id", requireRole("admin"), async (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNote } = req.body;
      if (!["approved", "rejected", "pending"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      const reviewedBy = req.session.userId!;
      const updated = await storage.updateSubmission(id, status, adminNote ?? "", reviewedBy);
      if (!updated) return res.status(404).json({ error: "Submission not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update submission" });
    }
  });

  app.post("/api/commercial/submissions", requireRole("commercial", "admin"), async (req, res) => {
    try {
      const userId = req.session.userId!;
      const parsed = insertSubmissionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid submission data", details: parsed.error.errors });
      }
      const sub = await storage.createSubmission(userId, parsed.data);
      res.status(201).json(sub);
    } catch (error) {
      res.status(500).json({ error: "Failed to create submission" });
    }
  });

  app.get("/api/commercial/submissions", requireRole("commercial", "admin"), async (req, res) => {
    try {
      const userId = req.session.userId!;
      const role = req.session.role;
      const subs = role === "admin"
        ? await storage.getAllSubmissions()
        : await storage.getSubmissionsByUser(userId);
      res.json(subs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
