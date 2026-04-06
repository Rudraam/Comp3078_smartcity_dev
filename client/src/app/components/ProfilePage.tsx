import { useState, useEffect, useCallback } from "react";
import {
  Mail, Phone, MapPin, Calendar, Bell, Send, Save, X, Loader2,
  LogOut, User, Pencil, Settings as SettingsIcon, CheckCircle2,
  Trash2, AlertTriangle, Wind, Thermometer, Droplets, ExternalLink,
  Accessibility, Type, Contrast, Volume2, Shield, Bookmark, Star,
  Utensils, Hotel, CalendarDays, MessageSquare, Camera,
} from "lucide-react";
import { useNavigate } from "../hooks/router-compat";
import PageLayout from "./shared/PageLayout";
import { ProfileUserIcon } from "./profile/ProfileIcon";
import { useTheme, type FontSize } from "../hooks/useTheme";
import { useNotifications } from "../hooks/useNotifications";
import { useAuth } from "../hooks/useAuth";
import {
  getAttendedEvents, unmarkEventAttended,
  getCheckIns, removeCheckIn,
  type AttendedEvent, type CheckIn,
} from "../hooks/useUserActivity";
import { useCollections, type SavedItem } from "../hooks/useCollections";
import { RestaurantDetailModal, HotelDetailModal, EventDetailModal } from "./shared/DetailModal";
import type { Restaurant, HotelItem, EventItem } from "../types";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  preferredCity: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  avatar?: string;
}

async function compressImageToBase64(file: File, maxKB = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      const maxDim = 512;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      let quality = 0.85;
      let dataUrl = canvas.toDataURL("image/jpeg", quality);
      while (dataUrl.length > maxKB * 1024 * 1.37 && quality > 0.3) {
        quality -= 0.1;
        dataUrl = canvas.toDataURL("image/jpeg", quality);
      }
      resolve(dataUrl);
    };
    img.onerror = reject;
    img.src = url;
  });
}

interface WeatherAlert {
  id: string;
  type: "heat" | "cold" | "wind" | "humidity" | "airquality";
  title: string;
  description: string;
  severity: "info" | "warning" | "danger";
  city: string;
}

function deriveAlerts(weather: any, city: string): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];
  if (!weather) return alerts;
  const temp = weather.temperature ?? 0;
  const humidity = weather.humidity ?? 0;
  const wind = weather.wind ?? 0;
  const aqi = weather.airQuality ?? 0;
  if (temp >= 30) alerts.push({ id: "heat", type: "heat", title: "Heat Advisory", description: `Temperature is ${temp}°C in ${city}. Stay hydrated and avoid prolonged sun exposure.`, severity: "warning", city });
  if (temp <= -10) alerts.push({ id: "cold", type: "cold", title: "Cold Weather Warning", description: `Temperature is ${temp}°C in ${city}. Dress in warm layers when heading outside.`, severity: "warning", city });
  if (wind >= 40) alerts.push({ id: "wind", type: "wind", title: "Strong Wind Advisory", description: `Wind speeds are ${wind} km/h in ${city}. Secure loose outdoor items.`, severity: "warning", city });
  if (humidity >= 80) alerts.push({ id: "humidity", type: "humidity", title: "High Humidity", description: `Humidity is ${humidity}% in ${city}. May feel warmer than the actual temperature.`, severity: "info", city });
  if (aqi >= 150) alerts.push({ id: "aqi-danger", type: "airquality", title: "Poor Air Quality", description: `Air quality index is ${aqi} in ${city}. Sensitive groups should avoid outdoor activity.`, severity: "danger", city });
  else if (aqi >= 100) alerts.push({ id: "aqi-warn", type: "airquality", title: "Moderate Air Quality", description: `Air quality index is ${aqi} in ${city}. Consider reducing prolonged outdoor exertion.`, severity: "info", city });
  if (alerts.length === 0) alerts.push({ id: "all-clear", type: "wind", title: "All Clear", description: `Conditions are looking good in ${city} today.`, severity: "info", city });
  return alerts;
}

function isOsmId(s: string): boolean {
  return /^\d+$/.test(s) || s.startsWith("node/") || s.startsWith("way/") || s.startsWith("relation/");
}

function getReviewDisplayName(review: { placeName: string; placeId: string; placeType: string }): string {
  const name = review.placeName?.trim();
  if (name && !isOsmId(name)) return name;
  const id = review.placeId?.trim();
  if (id && !isOsmId(id)) return id;
  const fallback = review.placeType === "restaurant" ? "Restaurant" : review.placeType === "hotel" ? "Hotel" : "Place";
  return `Unknown ${fallback}`;
}

type Tab = "attended" | "alerts" | "checkins" | "saved" | "reviews";

interface MyReview {
  id: string;
  placeId: string;
  placeName: string;
  placeType: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { isDark, setDark, fontSize, setFontSize, isHighContrast, toggleHighContrast, isScreenReader, toggleScreenReader } = useTheme();
  const { browserPermission, appEnabled, requestPermission, setAppEnabled } = useNotifications();
  const { user: authUser, isAdmin, isCommercial, refresh: refreshAuth } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("attended");
  const [attended, setAttended] = useState<AttendedEvent[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [modalItem, setModalItem] = useState<{ type: "restaurant" | "hotel" | "event"; data: Restaurant | HotelItem | EventItem } | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const { saved: savedItems, unsave } = useCollections();

  function buildRestaurantFromSaved(item: SavedItem): Restaurant {
    return { id: item.id, name: item.name, category: item.subtitle || "Restaurant", rating: 0, reviews: 0, priceLevel: 1, distance: "", hours: "", image: item.image };
  }
  function buildHotelFromSaved(item: SavedItem): HotelItem {
    return { id: item.id, name: item.name, type: "Hotel", rating: 0, reviews: 0, stars: 3, location: item.city || "", distance: "", pricePerNight: 0, amenities: [], image: item.image };
  }
  function buildEventFromSaved(item: SavedItem): EventItem {
    return { id: item.id, name: item.name, category: "Event", date: item.subtitle || "", time: "", location: item.city || "", attendees: 0, price: null, image: item.image };
  }
  function buildRestaurantFromReview(review: MyReview): Restaurant {
    return { id: review.placeId, name: getReviewDisplayName(review), category: "Restaurant", rating: review.rating, reviews: 1, priceLevel: 1, distance: "", hours: "", image: undefined };
  }
  function buildHotelFromReview(review: MyReview): HotelItem {
    return { id: review.placeId, name: getReviewDisplayName(review), type: "Hotel", rating: review.rating, reviews: 1, stars: 3, location: "", distance: "", pricePerNight: 0, amenities: [], image: undefined };
  }
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const resp = await fetch("/api/auth/me");
      if (resp.status === 401 || !resp.ok) {
        const localUsername = localStorage.getItem("username") || "Guest";
        setProfile({ id: localStorage.getItem("userId") || "guest", username: localUsername, email: "", phone: "", location: "", bio: "", preferredCity: "Toronto", notificationsEnabled: true, darkMode: isDark });
        setLoading(false);
        return;
      }
      const data = await resp.json();
      setProfile(data);
    } catch {
      const localUsername = localStorage.getItem("username") || "Guest";
      setProfile({ id: localStorage.getItem("userId") || "guest", username: localUsername, email: "", phone: "", location: "", bio: "", preferredCity: "Toronto", notificationsEnabled: true, darkMode: isDark });
    } finally {
      setLoading(false);
    }
  }, [isDark]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    setAvatarUploading(true);
    setError("");
    try {
      const dataUrl = await compressImageToBase64(file);
      const resp = await fetch("/api/auth/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: dataUrl }),
      });
      if (!resp.ok) throw new Error("Upload failed");
      const updated = await resp.json();
      setProfile((prev) => prev ? { ...prev, avatar: updated.avatar } : prev);
      await refreshAuth();
      setSuccess("Profile picture updated!");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to upload image. Please try a smaller file.");
    } finally {
      setAvatarUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarUploading(true);
    try {
      const resp = await fetch("/api/auth/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: "" }),
      });
      if (!resp.ok) throw new Error("Failed");
      setProfile((prev) => prev ? { ...prev, avatar: "" } : prev);
      await refreshAuth();
      setSuccess("Profile picture removed.");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to remove picture.");
    } finally {
      setAvatarUploading(false);
    }
  };

  useEffect(() => {
    setAttended(getAttendedEvents());
    setCheckIns(getCheckIns());
  }, []);

  useEffect(() => {
    if (!authUser) return;
    setReviewsLoading(true);
    fetch("/api/reviews/mine", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : []))
      .then(setMyReviews)
      .catch(() => setMyReviews([]))
      .finally(() => setReviewsLoading(false));
  }, [authUser]);

  useEffect(() => {
    const city = profile?.preferredCity || "Toronto";
    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setAlerts(deriveAlerts(data, city)); })
      .catch(() => {});
  }, [profile?.preferredCity]);

  const startEditing = () => {
    if (!profile) return;
    setEditData({ username: profile.username, email: profile.email, phone: profile.phone, location: profile.location, bio: profile.bio, preferredCity: profile.preferredCity });
    setEditing(true); setError(""); setSuccess("");
  };
  const cancelEditing = () => { setEditing(false); setEditData({}); setError(""); };

  const saveProfile = async () => {
    setSaving(true); setError(""); setSuccess("");
    try {
      const resp = await fetch("/api/auth/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editData) });
      if (resp.ok) { const data = await resp.json(); setProfile(data); setEditing(false); setSuccess("Profile updated successfully"); setTimeout(() => setSuccess(""), 3000); }
      else { const data = await resp.json(); setError(data.error || "Failed to save profile"); }
    } catch { setError("Failed to save profile"); } finally { setSaving(false); }
  };

  const toggleNotifications = async () => {
    if (!profile) return;
    const newValue = !profile.notificationsEnabled;
    try {
      const resp = await fetch("/api/auth/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notificationsEnabled: newValue }) });
      if (resp.ok) { const data = await resp.json(); setProfile(data); }
    } catch {}
  };

  const toggleDarkMode = async () => {
    const newDark = !isDark;
    setDark(newDark);
    try {
      await fetch("/api/auth/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ darkMode: newDark }) });
      if (profile) setProfile({ ...profile, darkMode: newDark });
    } catch {}
  };

  const handleLogout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    localStorage.removeItem("userId"); localStorage.removeItem("username");
    navigate("/auth");
  };

  const handleUnmarkAttended = (id: string) => {
    unmarkEventAttended(id);
    setAttended(getAttendedEvents());
  };

  const handleRemoveCheckIn = (id: string) => {
    removeCheckIn(id);
    setCheckIns(getCheckIns());
  };

  const dismissAlert = (id: string) => setDismissedAlerts(prev => [...prev, id]);

  const visibleAlerts = alerts.filter(a => !dismissedAlerts.includes(a.id));

  const alertIcon = (type: WeatherAlert["type"]) => {
    if (type === "heat" || type === "cold") return <Thermometer className="w-5 h-5" />;
    if (type === "wind") return <Wind className="w-5 h-5" />;
    if (type === "humidity") return <Droplets className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
  };

  const alertBorderColor = (severity: WeatherAlert["severity"]) => {
    if (severity === "danger") return "border-red-500/40 bg-red-500/5";
    if (severity === "warning") return "border-yellow-500/40 bg-yellow-500/5";
    return "border-blue-500/30 bg-blue-500/5";
  };

  const alertTextColor = (severity: WeatherAlert["severity"]) => {
    if (severity === "danger") return "text-red-400";
    if (severity === "warning") return "text-yellow-400";
    return "text-blue-400";
  };

  const typeLabel: Record<CheckIn["type"], string> = { restaurant: "Restaurant", hotel: "Hotel", event: "Event" };

  if (loading) return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#1152d4]" />
      </div>
    </PageLayout>
  );

  if (!profile) return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <User className="w-16 h-16 text-[var(--app-text-muted)]" />
        <p className="text-[var(--app-text-muted)] text-lg">Please log in to view your profile</p>
        <button onClick={() => navigate("/auth")} className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors px-8 py-3 rounded-lg font-medium text-white">Go to Login</button>
      </div>
    </PageLayout>
  );

  const statsCards = [
    { icon: <Calendar className="w-5 h-5" />, label: "Events Attended", value: attended.length, tab: "attended" as Tab },
    { icon: <Bell className="w-5 h-5" />, label: "Active Alerts", value: visibleAlerts.length, tab: "alerts" as Tab },
    { icon: <Send className="w-5 h-5" />, label: "Check-ins", value: checkIns.length, tab: "checkins" as Tab },
    { icon: <Bookmark className="w-5 h-5" />, label: "Saved Places", value: savedItems.length, tab: "saved" as Tab },
    { icon: <MessageSquare className="w-5 h-5" />, label: "My Reviews", value: myReviews.length, tab: "reviews" as Tab },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: "attended", label: "Events Attended" },
    { id: "alerts", label: "Active Alerts" },
    { id: "checkins", label: "Check-ins" },
    { id: "saved", label: "Saved" },
    { id: "reviews", label: "My Reviews" },
  ];

  return (
    <>
    <PageLayout>
      <h1 className="text-6xl font-normal mb-8 text-[var(--app-text)]">Profile</h1>

      {error && (
        <div className="flex items-center gap-2 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          <span>{error}</span>
          <button onClick={() => setError("")} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 mb-4 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-400 text-sm">
          <span>{success}</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-[var(--app-card)] rounded-2xl p-6 mb-6 border border-[var(--app-border)]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar upload */}
          <div className="relative shrink-0 group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-[var(--app-icon-bg)] flex items-center justify-center">
              {profile?.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <ProfileUserIcon />
              )}
              {avatarUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
            </div>
            {/* Camera overlay on hover */}
            <label
              className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 bg-black/0 group-hover:bg-black/50 transition-colors cursor-pointer"
              title="Upload profile picture"
            >
              <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">Upload</span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAvatarChange}
                disabled={avatarUploading}
              />
            </label>
            {/* Remove button — only shown when an avatar exists */}
            {profile?.avatar && !avatarUploading && (
              <button
                onClick={handleRemoveAvatar}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Remove photo"
                aria-label="Remove profile picture"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            {editing ? (
              <div className="space-y-4">
                {[
                  { label: "Username", key: "username", type: "text" },
                  { label: "Email", key: "email", type: "email" },
                  { label: "Phone", key: "phone", type: "tel" },
                  { label: "Location", key: "location", type: "text" },
                  { label: "Preferred City", key: "preferredCity", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="text-xs text-[var(--app-text-muted)] block mb-1">{label}</label>
                    <input type={type} value={(editData as any)[key] || ""} onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                      className="w-full bg-[var(--app-card-inner)] border border-[var(--app-border)] text-[var(--app-text)] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] text-sm" />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-[var(--app-text-muted)] block mb-1">Bio</label>
                  <textarea value={editData.bio || ""} onChange={(e) => setEditData({ ...editData, bio: e.target.value })} placeholder="Tell us about yourself..." rows={3}
                    className="w-full bg-[var(--app-card-inner)] border border-[var(--app-border)] text-[var(--app-text)] placeholder-[var(--app-text-muted)] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] text-sm resize-none" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-3 mb-1 justify-center sm:justify-start">
                  <h2 className="text-3xl font-normal text-[var(--app-text)]">{profile.username}</h2>
                  {authUser?.role && (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      authUser.role === "admin"
                        ? "bg-[#1152d4]/15 text-[#5281e0] border border-[#1152d4]/25"
                        : authUser.role === "commercial"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-[var(--app-card-inner)] text-[var(--app-text-muted)] border border-[var(--app-border)]"
                    }`}>
                      {authUser.role === "admin" ? "Admin" : authUser.role === "commercial" ? "Commercial" : "Regular"}
                    </span>
                  )}
                </div>
                {profile.bio ? <p className="text-[var(--app-text-muted)] mb-4">{profile.bio}</p> : <p className="text-[var(--app-text-muted)] mb-4 italic">No bio set</p>}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[var(--app-text-muted)] justify-center sm:justify-start"><Mail className="w-4 h-4" aria-hidden="true" /><span>{profile.email || "No email set"}</span></div>
                  <div className="flex items-center gap-3 text-[var(--app-text-muted)] justify-center sm:justify-start"><Phone className="w-4 h-4" aria-hidden="true" /><span>{profile.phone || "No phone set"}</span></div>
                  <div className="flex items-center gap-3 text-[var(--app-text-muted)] justify-center sm:justify-start"><MapPin className="w-4 h-4" aria-hidden="true" /><span>{profile.location || "No location set"}</span></div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            {editing ? (
              <>
                <button onClick={saveProfile} disabled={saving}
                  className="bg-[#1152d4] hover:bg-[#0d3fa3] disabled:opacity-50 transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 text-white">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                </button>
                <button onClick={cancelEditing}
                  className="bg-[var(--app-card-inner)] hover:bg-[var(--app-card-hover)] transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 text-[var(--app-text)]">
                  <X className="w-4 h-4" /> Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={startEditing}
                  className="bg-[var(--app-card-inner)] hover:bg-[var(--app-card-hover)] border border-[var(--app-border)] transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 text-[var(--app-text)]">
                  <Pencil className="w-4 h-4" aria-hidden="true" /> Edit Profile
                </button>
                {isCommercial && (
                  <button onClick={() => navigate("/submit")}
                    className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 text-amber-400">
                    <Send className="w-4 h-4" aria-hidden="true" /> Submit Listing
                  </button>
                )}
                {isAdmin && (
                  <button onClick={() => navigate("/admin")}
                    className="bg-[#1152d4]/10 hover:bg-[#1152d4]/20 border border-[#1152d4]/20 transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 text-[#5281e0]">
                    <Shield className="w-4 h-4" aria-hidden="true" /> Admin Dashboard
                  </button>
                )}
                <button onClick={handleLogout}
                  className="bg-[var(--app-card-inner)] hover:bg-red-500/20 transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 text-red-400">
                  <LogOut className="w-4 h-4" aria-hidden="true" /> Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card) => (
          <button key={card.label} onClick={() => setActiveTab(card.tab)}
            className={`bg-[var(--app-card)] border rounded-2xl p-6 transition-colors text-left w-full ${activeTab === card.tab ? "border-[#1152d4]" : "border-[var(--app-border)] hover:border-[#1152d4]/50"}`}>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[var(--app-icon-bg)] rounded-lg w-12 h-12 flex items-center justify-center mb-4 text-[#1152d4]">
                {card.icon}
              </div>
              <p className="text-[var(--app-text-muted)] text-sm mb-3">{card.label}</p>
              <p className="text-3xl font-normal text-[var(--app-text)]">{card.value}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl mb-6">
        <div className="flex border-b border-[var(--app-border)]">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-medium transition-colors first:rounded-tl-2xl last:rounded-tr-2xl ${activeTab === tab.id ? "text-[#1152d4] border-b-2 border-[#1152d4] -mb-px" : "text-[var(--app-text-muted)] hover:text-[var(--app-text)]"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Events Attended */}
          {activeTab === "attended" && (
            <div>
              {attended.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <Calendar className="w-12 h-12 text-[var(--app-text-muted)]" />
                  <p className="text-[var(--app-text-muted)] text-sm">You haven't marked any events as attended yet.</p>
                  <button onClick={() => navigate("/events")} className="text-[#1152d4] hover:underline text-sm">Browse Events</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {attended.map((ev) => (
                    <div key={ev.id} className="flex items-center gap-4 bg-[var(--app-card-inner)] rounded-xl p-4 border border-[var(--app-border)]">
                      {ev.image && <img src={ev.image} alt={ev.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[var(--app-text)] truncate">{ev.name}</h4>
                        <p className="text-sm text-[var(--app-text-muted)]">{ev.date} · {ev.category}</p>
                        <p className="text-xs text-[var(--app-text-muted)] truncate">{ev.location}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-lg">
                          <CheckCircle2 className="w-3 h-3" /> Attended
                        </span>
                        {ev.url && (
                          <a href={ev.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                            className="text-[var(--app-text-muted)] hover:text-[#1152d4] transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button onClick={() => handleUnmarkAttended(ev.id)} className="text-[var(--app-text-muted)] hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Active Alerts */}
          {activeTab === "alerts" && (
            <div>
              {visibleAlerts.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <Bell className="w-12 h-12 text-[var(--app-text-muted)]" />
                  <p className="text-[var(--app-text-muted)] text-sm">No active alerts for {profile.preferredCity || "your city"}.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {visibleAlerts.map((alert) => (
                    <div key={alert.id} className={`flex items-start gap-4 rounded-xl p-4 border ${alertBorderColor(alert.severity)}`}>
                      <div className={`mt-0.5 shrink-0 ${alertTextColor(alert.severity)}`}>{alertIcon(alert.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold ${alertTextColor(alert.severity)}`}>{alert.title}</h4>
                        <p className="text-sm text-[var(--app-text-muted)] mt-0.5">{alert.description}</p>
                      </div>
                      <button onClick={() => dismissAlert(alert.id)} className="text-[var(--app-text-muted)] hover:text-[var(--app-text)] shrink-0 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Check-ins */}
          {activeTab === "checkins" && (
            <div>
              {checkIns.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <Send className="w-12 h-12 text-[var(--app-text-muted)]" />
                  <p className="text-[var(--app-text-muted)] text-sm">No check-ins yet. Use the "Check In" button on any restaurant, hotel, or event.</p>
                  <button onClick={() => navigate("/restaurants")} className="text-[#1152d4] hover:underline text-sm">Browse Places</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {checkIns.map((ci) => (
                    <div key={ci.id} className="flex items-center gap-4 bg-[var(--app-card-inner)] rounded-xl p-4 border border-[var(--app-border)]">
                      <div className="bg-[var(--app-icon-bg)] rounded-lg w-10 h-10 flex items-center justify-center shrink-0 text-[#1152d4]">
                        {ci.type === "restaurant" ? <span className="text-sm font-bold">R</span> : ci.type === "hotel" ? <span className="text-sm font-bold">H</span> : <Calendar className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[var(--app-text)] truncate">{ci.name}</h4>
                        <p className="text-sm text-[var(--app-text-muted)]">{typeLabel[ci.type]} · {ci.city}</p>
                        <p className="text-xs text-[var(--app-text-muted)]">{new Date(ci.checkedInAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                      </div>
                      <button onClick={() => handleRemoveCheckIn(ci.id)} className="text-[var(--app-text-muted)] hover:text-red-400 transition-colors shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Places */}
          {activeTab === "saved" && (
            <div>
              {savedItems.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <Bookmark className="w-12 h-12 text-[var(--app-text-muted)]" />
                  <p className="text-[var(--app-text-muted)] text-sm">No saved places yet. Use the "Save" button on any restaurant, hotel, or event.</p>
                  <button onClick={() => navigate("/restaurants")} className="text-[#1152d4] hover:underline text-sm">Browse Places</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-[var(--app-card-inner)] rounded-xl p-4 border border-[var(--app-border)] hover-elevate cursor-pointer"
                      onClick={() => {
                        if (item.type === "restaurant") setModalItem({ type: "restaurant", data: buildRestaurantFromSaved(item) });
                        else if (item.type === "hotel") setModalItem({ type: "hotel", data: buildHotelFromSaved(item) });
                        else setModalItem({ type: "event", data: buildEventFromSaved(item) });
                      }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-[var(--app-icon-bg)] flex items-center justify-center shrink-0 text-[#1152d4]">
                          {item.type === "restaurant" ? <Utensils className="w-6 h-6" /> : item.type === "hotel" ? <Hotel className="w-6 h-6" /> : <CalendarDays className="w-6 h-6" />}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[var(--app-text)] truncate">{item.name}</h4>
                        <p className="text-sm text-[var(--app-text-muted)]">
                          {item.type === "restaurant" ? "Restaurant" : item.type === "hotel" ? "Hotel" : "Event"}
                          {item.subtitle ? ` · ${item.subtitle}` : ""}
                          {item.city ? ` · ${item.city}` : ""}
                        </p>
                        <p className="text-xs text-[var(--app-text-muted)]">Saved {new Date(item.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); unsave(item.id); }} className="text-[var(--app-text-muted)] hover:text-red-400 transition-colors shrink-0" aria-label="Remove from saved">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Reviews */}
          {activeTab === "reviews" && (
            <div>
              {reviewsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1152d4]" />
                </div>
              ) : !authUser ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <MessageSquare className="w-12 h-12 text-[var(--app-text-muted)]" />
                  <p className="text-[var(--app-text-muted)] text-sm">Sign in to see your reviews.</p>
                  <button onClick={() => navigate("/auth")} className="text-[#1152d4] hover:underline text-sm">Sign In</button>
                </div>
              ) : myReviews.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <MessageSquare className="w-12 h-12 text-[var(--app-text-muted)]" />
                  <p className="text-[var(--app-text-muted)] text-sm">You haven't written any reviews yet.</p>
                  <button onClick={() => navigate("/restaurants")} className="text-[#1152d4] hover:underline text-sm">Browse Places</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myReviews.map((review) => {
                    const displayName = getReviewDisplayName(review);
                    return (
                      <button
                        key={review.id}
                        onClick={() => {
                          if (review.placeType === "restaurant") setModalItem({ type: "restaurant", data: buildRestaurantFromReview(review) });
                          else setModalItem({ type: "hotel", data: buildHotelFromReview(review) });
                        }}
                        className="w-full text-left bg-[var(--app-card-inner)] rounded-xl p-4 border border-[var(--app-border)] hover-elevate transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-[var(--app-text)] truncate">{displayName}</h4>
                            <p className="text-xs text-[var(--app-text-muted)] capitalize mt-0.5">{review.placeType}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="flex items-center gap-0.5 justify-end mb-1">
                              {[1,2,3,4,5].map((s) => (
                                <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-[var(--app-border)]"}`} />
                              ))}
                            </div>
                            <p className="text-xs text-[var(--app-text-muted)]">
                              {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-[var(--app-text-muted)] leading-relaxed mt-2 line-clamp-2">{review.comment}</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="w-5 h-5 text-[var(--app-text)]" />
          <h3 className="text-xl font-semibold text-[var(--app-text)]">Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--app-icon-bg)] rounded-lg w-12 h-12 flex items-center justify-center shrink-0 text-[#1152d4]">
                  <Bell className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-[var(--app-text)]">Notifications</h4>
                  <p className="text-sm text-[var(--app-text-muted)]">
                    {browserPermission === "denied"
                      ? "Blocked by browser — enable in browser settings"
                      : browserPermission === "default"
                      ? "Click to request browser permission"
                      : appEnabled
                      ? "Receiving weather alerts and city updates"
                      : "Receive alerts for events and updates"}
                  </p>
                </div>
              </div>
              <button
                onClick={async () => {
                  if (browserPermission === "denied") return;
                  if (browserPermission === "default") {
                    await requestPermission();
                    return;
                  }
                  const newEnabled = !appEnabled;
                  setAppEnabled(newEnabled);
                  toggleNotifications();
                }}
                role="switch"
                aria-checked={browserPermission === "granted" && appEnabled}
                aria-label="Toggle notifications"
                disabled={browserPermission === "denied"}
                className={`relative w-12 h-7 rounded-full transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
                  browserPermission === "granted" && appEnabled ? "bg-[#1152d4]" : "bg-[#94a3b8]"
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  browserPermission === "granted" && appEnabled ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>
            {browserPermission === "denied" && (
              <p className="mt-3 text-xs text-amber-600 dark:text-amber-400 pl-16">
                To enable notifications, open your browser settings and allow notifications for this site.
              </p>
            )}
          </div>

          <div className="bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--app-icon-bg)] rounded-lg w-12 h-12 flex items-center justify-center shrink-0 text-[#1152d4]"><MapPin className="w-5 h-5" /></div>
              <div>
                <h4 className="font-semibold mb-1 text-[var(--app-text)]">Preferred City</h4>
                <p className="text-sm text-[var(--app-text-muted)]">{profile.preferredCity || "Toronto"}</p>
              </div>
            </div>
            <span className="text-[#1152d4] text-sm font-medium">{profile.preferredCity || "Toronto"}</span>
          </div>

          <div className="bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--app-icon-bg)] rounded-lg w-12 h-12 flex items-center justify-center shrink-0 text-[#1152d4]"><SettingsIcon className="w-5 h-5" /></div>
              <div>
                <h4 className="font-semibold mb-1 text-[var(--app-text)]">Dark Mode</h4>
                <p className="text-sm text-[var(--app-text-muted)]">Use dark theme across the app</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              role="switch"
              aria-checked={isDark}
              aria-label="Toggle dark mode"
              className={`relative w-12 h-7 rounded-full transition-colors ${isDark ? "bg-[#1152d4]" : "bg-[#94a3b8]"}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${isDark ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl p-6 mt-6" role="region" aria-label="Accessibility settings">
        <div className="flex items-center gap-2 mb-6">
          <Accessibility className="w-5 h-5 text-[var(--app-text)]" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-[var(--app-text)]">Accessibility</h3>
        </div>

        <div className="space-y-4">
          {/* Screen Reader Support */}
          <div className="bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--app-icon-bg)] rounded-lg w-12 h-12 flex items-center justify-center shrink-0 text-[#1152d4]" aria-hidden="true">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-[var(--app-text)]">Screen Reader Support</h4>
                <p className="text-sm text-[var(--app-text-muted)]">Announce page changes and content updates to screen readers</p>
              </div>
            </div>
            <button
              onClick={toggleScreenReader}
              role="switch"
              aria-checked={isScreenReader}
              aria-label="Toggle screen reader announcements"
              className={`relative w-12 h-7 rounded-full transition-colors ${isScreenReader ? "bg-[#1152d4]" : "bg-[#94a3b8]"}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${isScreenReader ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Font Size */}
          <div className="bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-xl p-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[var(--app-icon-bg)] rounded-lg w-12 h-12 flex items-center justify-center shrink-0 text-[#1152d4]" aria-hidden="true">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-[var(--app-text)]">Font Size</h4>
                <p className="text-sm text-[var(--app-text-muted)]">Adjust the text size across the app</p>
              </div>
            </div>
            <div className="flex gap-3" role="group" aria-label="Font size options">
              {(["normal", "large", "xl"] as FontSize[]).map((size) => {
                const labels: Record<FontSize, string> = { normal: "Normal", large: "Large", xl: "Extra Large" };
                const textSizes: Record<FontSize, string> = { normal: "text-sm", large: "text-base", xl: "text-lg" };
                const isActive = fontSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    aria-pressed={isActive}
                    aria-label={`Set font size to ${labels[size]}`}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors flex flex-col items-center gap-1 ${
                      isActive
                        ? "bg-[#1152d4] border-[#1152d4] text-white"
                        : "bg-[var(--app-card)] border-[var(--app-border)] text-[var(--app-text)] hover:border-[#1152d4]/50"
                    }`}
                  >
                    <span className={`font-semibold ${textSizes[size]}`}>A</span>
                    <span className="text-xs opacity-80">{labels[size]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--app-icon-bg)] rounded-lg w-12 h-12 flex items-center justify-center shrink-0 text-[#1152d4]" aria-hidden="true">
                <Contrast className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-[var(--app-text)]">High Contrast Mode</h4>
                <p className="text-sm text-[var(--app-text-muted)]">Increase contrast for better readability</p>
              </div>
            </div>
            <button
              onClick={toggleHighContrast}
              role="switch"
              aria-checked={isHighContrast}
              aria-label="Toggle high contrast mode"
              className={`relative w-12 h-7 rounded-full transition-colors ${isHighContrast ? "bg-[#1152d4]" : "bg-[#94a3b8]"}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${isHighContrast ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          {isHighContrast && (
            <p className="text-xs text-[var(--app-text-muted)] px-1">
              High contrast mode increases colour contrast across all app surfaces and shows amber focus rings on interactive elements.
            </p>
          )}
        </div>
      </div>
    </PageLayout>

    {modalItem?.type === "restaurant" && (
      <RestaurantDetailModal
        restaurant={modalItem.data as Restaurant}
        isOpen={true}
        onClose={() => setModalItem(null)}
        city={profile?.preferredCity || ""}
      />
    )}
    {modalItem?.type === "hotel" && (
      <HotelDetailModal
        hotel={modalItem.data as HotelItem}
        isOpen={true}
        onClose={() => setModalItem(null)}
        city={profile?.preferredCity || ""}
      />
    )}
    {modalItem?.type === "event" && (
      <EventDetailModal
        event={modalItem.data as EventItem}
        isOpen={true}
        onClose={() => setModalItem(null)}
        city={profile?.preferredCity || ""}
      />
    )}
    </>
  );
}
