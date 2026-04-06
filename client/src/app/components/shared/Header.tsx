import { useState } from "react";
import { Sparkles, Map, User, Menu, X, ShieldCheck, Building2, CalendarDays, Utensils, Hotel, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "../../hooks/router-compat";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: React.ReactNode;
}

function NavButton({ icon, label, isActive, onClick, badge }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive
          ? "bg-black/40 shadow-inner"
          : "bg-black/20 hover:bg-black/30"
      } transition-all px-5 py-2 rounded-lg flex items-center gap-2 font-medium w-full xl:w-auto justify-center relative`}
    >
      {icon}
      {label}
      {badge}
    </button>
  );
}

function QuickNavButton({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive ? "bg-white/20" : "bg-white/10 hover:bg-white/20"
      } transition-all px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium w-full xl:w-auto justify-center`}
    >
      {icon}
      {label}
    </button>
  );
}

const ROLE_BADGE: Record<string, { label: string; classes: string }> = {
  admin: { label: "Admin", classes: "bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold" },
  commercial: { label: "Pro", classes: "bg-amber-400/30 text-amber-100 text-[10px] px-1.5 py-0.5 rounded-full font-semibold" },
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, isCommercial } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const roleBadge = user?.role && ROLE_BADGE[user.role]
    ? <span className={ROLE_BADGE[user.role].classes}>{ROLE_BADGE[user.role].label}</span>
    : null;

  const profileLabel = user?.username
    ? `Profile (${user.username})`
    : "Profile";

  const profileIcon = user?.avatar
    ? <img src={user.avatar} alt="" className="w-5 h-5 rounded-full object-cover ring-1 ring-white/40" aria-hidden="true" />
    : <User className="w-4 h-4" aria-hidden="true" />;

  const primaryNavItems = [
    { path: "/dashboard", icon: <Sparkles className="w-4 h-4" aria-hidden="true" />, label: "Dashboard" },
    { path: "/map", icon: <Map className="w-4 h-4" aria-hidden="true" />, label: "Map" },
    { path: "/profile", icon: profileIcon, label: profileLabel, badge: roleBadge },
    ...(isCommercial ? [{ path: "/submit", icon: <Building2 className="w-4 h-4" aria-hidden="true" />, label: "Submit Listing" }] : []),
    ...(isAdmin ? [{ path: "/admin", icon: <ShieldCheck className="w-4 h-4" aria-hidden="true" />, label: "Admin" }] : []),
  ];

  const quickNavItems = [
    { path: "/events", icon: <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />, label: "Events" },
    { path: "/restaurants", icon: <Utensils className="w-3.5 h-3.5" aria-hidden="true" />, label: "Restaurants" },
    { path: "/hotels", icon: <Hotel className="w-3.5 h-3.5" aria-hidden="true" />, label: "Hotels" },
  ];

  return (
    <header className="bg-[#1152d4] text-white sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <h1
          className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity shrink-0"
          onClick={() => handleNav("/dashboard")}
        >
          Smart City Dashboard
        </h1>

        <nav className="hidden xl:flex items-center gap-2 flex-wrap" aria-label="Main navigation">
          {primaryNavItems.map((item) => (
            <NavButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              onClick={() => handleNav(item.path)}
              badge={"badge" in item ? item.badge : undefined}
            />
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          <div className="w-px h-6 bg-white/20 mx-1" />
          <div className="flex items-center gap-1.5" aria-label="Quick navigation">
            {quickNavItems.map((item) => (
              <QuickNavButton
                key={item.path}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.path}
                onClick={() => handleNav(item.path)}
              />
            ))}
          </div>
          <div className="w-px h-6 bg-white/20 mx-1" />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark
              ? <Sun className="w-4 h-4" aria-hidden="true" />
              : <Moon className="w-4 h-4" aria-hidden="true" />
            }
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 hover:bg-black/20 rounded-lg transition-colors shrink-0"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="xl:hidden px-6 pb-4 flex flex-col gap-2 max-w-[1400px] mx-auto" aria-label="Mobile navigation">
          {primaryNavItems.map((item) => (
            <NavButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              onClick={() => handleNav(item.path)}
              badge={"badge" in item ? item.badge : undefined}
            />
          ))}
          <div className="h-px bg-white/20 my-1" />
          {quickNavItems.map((item) => (
            <QuickNavButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              onClick={() => handleNav(item.path)}
            />
          ))}
          <div className="h-px bg-white/20 my-1" />
          <button
            onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </nav>
      )}
    </header>
  );
}
