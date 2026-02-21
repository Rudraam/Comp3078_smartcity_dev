import { useState, useEffect, useCallback } from "react";
import { Mail, Phone, MapPin, Calendar, Bell, Send, Save, X, Loader2, LogOut, User, Pencil, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "../hooks/router-compat";
import PageLayout from "./shared/PageLayout";
import { ProfileUserIcon } from "./profile/ProfileIcon";

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
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const resp = await fetch("/api/auth/me");
      if (resp.status === 401) {
        navigate("/auth");
        return;
      }
      if (resp.ok) {
        const data = await resp.json();
        setProfile(data);
      }
    } catch {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const startEditing = () => {
    if (!profile) return;
    setEditData({
      username: profile.username,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
      preferredCity: profile.preferredCity,
    });
    setEditing(true);
    setError("");
    setSuccess("");
  };

  const cancelEditing = () => {
    setEditing(false);
    setEditData({});
    setError("");
  };

  const saveProfile = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const resp = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (resp.ok) {
        const data = await resp.json();
        setProfile(data);
        setEditing(false);
        setSuccess("Profile updated successfully");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await resp.json();
        setError(data.error || "Failed to save profile");
      }
    } catch {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const togglePreference = async (key: "notificationsEnabled" | "darkMode") => {
    if (!profile) return;
    const newValue = !profile[key];
    try {
      const resp = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: newValue }),
      });
      if (resp.ok) {
        const data = await resp.json();
        setProfile(data);
      }
    } catch {}
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/auth");
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-[#1152d4]" />
        </div>
      </PageLayout>
    );
  }

  if (!profile) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <User className="w-16 h-16 text-[#99a1af]" />
          <p className="text-[#99a1af] text-lg">Please log in to view your profile</p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors px-8 py-3 rounded-lg font-medium"
          >
            Go to Login
          </button>
        </div>
      </PageLayout>
    );
  }

  const statsCards = [
    { icon: <Calendar className="w-5 h-5" />, label: "Events Attended", value: "12" },
    { icon: <Bell className="w-5 h-5" />, label: "Active Alerts", value: "3" },
    { icon: <Send className="w-5 h-5" />, label: "Check-ins", value: "28" },
  ];

  return (
    <PageLayout>
      <h1 className="text-6xl font-normal mb-8">Profile</h1>

      {error && (
        <div className="flex items-center gap-2 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          <span>{error}</span>
          <button onClick={() => setError("")} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 mb-4 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-400 text-sm">
          <span>{success}</span>
        </div>
      )}

      <div className="bg-[#23262f] rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="bg-[#314158] rounded-xl w-32 h-32 flex items-center justify-center shrink-0">
            <ProfileUserIcon />
          </div>

          <div className="flex-1 text-center sm:text-left">
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#99a1af] block mb-1">Username</label>
                  <input
                    type="text"
                    value={editData.username || ""}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    className="w-full bg-[#2a2e3a] text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#99a1af] block mb-1">Email</label>
                  <input
                    type="email"
                    value={editData.email || ""}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full bg-[#2a2e3a] text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#99a1af] block mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editData.phone || ""}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    placeholder="Enter your phone number..."
                    className="w-full bg-[#2a2e3a] text-white placeholder-[#6b7280] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#99a1af] block mb-1">Location</label>
                  <input
                    type="text"
                    value={editData.location || ""}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    placeholder="Enter your city or area..."
                    className="w-full bg-[#2a2e3a] text-white placeholder-[#6b7280] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#99a1af] block mb-1">Bio</label>
                  <textarea
                    value={editData.bio || ""}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="w-full bg-[#2a2e3a] text-white placeholder-[#6b7280] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#99a1af] block mb-1">Preferred City</label>
                  <input
                    type="text"
                    value={editData.preferredCity || ""}
                    onChange={(e) => setEditData({ ...editData, preferredCity: e.target.value })}
                    className="w-full bg-[#2a2e3a] text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] text-sm"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-normal mb-1">{profile.username}</h2>
                {profile.bio && <p className="text-[#99a1af] mb-4">{profile.bio}</p>}
                {!profile.bio && <p className="text-[#99a1af] mb-4 italic">No bio set</p>}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#99a1af] justify-center sm:justify-start">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email || "No email set"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#99a1af] justify-center sm:justify-start">
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone || "No phone set"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#99a1af] justify-center sm:justify-start">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location || "No location set"}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            {editing ? (
              <>
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="bg-[#1152d4] hover:bg-[#0d3fa3] disabled:opacity-50 transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-[#2a2e3a] hover:bg-[#3a3e4a] transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={startEditing}
                  className="bg-[#1f2533] hover:bg-[#2a2e3a] transition-colors border border-[#2c2c2c] px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-[#2a2e3a] hover:bg-red-500/20 transition-colors px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card) => (
          <div key={card.label} className="bg-[#23262f] rounded-2xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#314158] rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <p className="text-[#99a1af] text-sm mb-3">{card.label}</p>
              <p className="text-3xl font-normal">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#23262f] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <SettingsIcon className="w-5 h-5" />
            <h3 className="text-xl font-semibold">Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#2a2e3a] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-[#314158] rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Notifications</h4>
                  <p className="text-sm text-[#99a1af]">Receive alerts for events and updates</p>
                </div>
              </div>
              <button
                onClick={() => togglePreference("notificationsEnabled")}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  profile.notificationsEnabled ? "bg-[#1152d4]" : "bg-[#3a3e4a]"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    profile.notificationsEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="bg-[#2a2e3a] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-[#314158] rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Preferred City</h4>
                  <p className="text-sm text-[#99a1af]">{profile.preferredCity || "Toronto"}</p>
                </div>
              </div>
              <span className="text-[#1152d4] text-sm font-medium">{profile.preferredCity || "Toronto"}</span>
            </div>

            <div className="bg-[#2a2e3a] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-[#314158] rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
                  <SettingsIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Dark Mode</h4>
                  <p className="text-sm text-[#99a1af]">Use dark theme across the app</p>
                </div>
              </div>
              <button
                onClick={() => togglePreference("darkMode")}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  profile.darkMode ? "bg-[#1152d4]" : "bg-[#3a3e4a]"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    profile.darkMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#23262f] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5" />
            <h3 className="text-xl font-semibold">Account Details</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#2a2e3a] rounded-xl p-4">
              <p className="text-xs text-[#99a1af] mb-1">User ID</p>
              <p className="text-sm font-mono truncate">{profile.id}</p>
            </div>
            <div className="bg-[#2a2e3a] rounded-xl p-4">
              <p className="text-xs text-[#99a1af] mb-1">Username</p>
              <p className="text-sm">{profile.username}</p>
            </div>
            <div className="bg-[#2a2e3a] rounded-xl p-4">
              <p className="text-xs text-[#99a1af] mb-1">Email</p>
              <p className="text-sm">{profile.email || "Not set"}</p>
            </div>
            <div className="bg-[#2a2e3a] rounded-xl p-4">
              <p className="text-xs text-[#99a1af] mb-1">Preferred City</p>
              <p className="text-sm">{profile.preferredCity || "Toronto"}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
