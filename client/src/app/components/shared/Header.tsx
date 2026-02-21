import { useState } from "react";
import { Sparkles, Map, User, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "../../hooks/router-compat";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive
          ? "bg-black/40 shadow-inner"
          : "bg-black/20 hover:bg-black/30"
      } transition-all px-5 py-2 rounded-lg flex items-center gap-2 font-medium w-full md:w-auto justify-center`}
    >
      {icon}
      {label}
    </button>
  );
}

const navItems = [
  { path: "/dashboard", icon: <Sparkles className="w-4 h-4" />, label: "Dashboard" },
  { path: "/map", icon: <Map className="w-4 h-4" />, label: "Map" },
  { path: "/profile", icon: <User className="w-4 h-4" />, label: "Profile" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#1152d4] px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <h1
          className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleNav("/dashboard")}
        >
          Smart City Dashboard
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-3">
          {navItems.map((item) => (
            <NavButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              onClick={() => handleNav(item.path)}
            />
          ))}
          <button className="bg-black/20 hover:bg-black/30 transition-colors px-5 py-2 rounded-lg flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4" />
            Ask Assistant
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-black/20 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col gap-2 max-w-[1400px] mx-auto">
          {navItems.map((item) => (
            <NavButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              onClick={() => handleNav(item.path)}
            />
          ))}
          <button
            className="bg-black/20 hover:bg-black/30 transition-colors px-5 py-2 rounded-lg flex items-center gap-2 font-medium w-full justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Sparkles className="w-4 h-4" />
            Ask Assistant
          </button>
        </nav>
      )}
    </header>
  );
}
