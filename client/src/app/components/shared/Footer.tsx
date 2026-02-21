import { useNavigate } from "../../hooks/router-compat";
import { MapPin, Mail, Phone } from "lucide-react";

const quickLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Map", path: "/map" },
  { label: "Restaurants", path: "/restaurants" },
  { label: "Hotels", path: "/hotels" },
  { label: "Events", path: "/events" },
];

const resourceLinks = [
  { label: "Help Center", path: "/redirect" },
  { label: "Community", path: "/redirect" },
  { label: "API Docs", path: "/redirect" },
  { label: "Terms of Service", path: "/redirect" },
  { label: "Privacy Policy", path: "/redirect" },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#13151c] border-t border-[#2a2e3a] mt-12">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-bold text-white mb-4 cursor-pointer hover:text-[#1152d4] transition-colors"
              onClick={() => navigate("/dashboard")}
            >
              Smart City Dashboard
            </h3>
            <p className="text-[#99a1af] text-sm mb-4">
              Your comprehensive platform for exploring and navigating smart
              cities with real-time data.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#99a1af] text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Toronto, Ontario, Canada</span>
              </div>
              <div className="flex items-center gap-2 text-[#99a1af] text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hello@smartcity.io</span>
              </div>
              <div className="flex items-center gap-2 text-[#99a1af] text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+1 (416) 555-0100</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-[#99a1af] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-[#99a1af] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-[#99a1af] text-sm mb-4">
              Get the latest city updates and features delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#23262f] text-white placeholder-[#6b7280] px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
              />
              <button
                type="submit"
                className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-4 py-2.5 rounded-lg text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2a2e3a] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6b7280] text-xs">
            2026 Smart City Explorer. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-[#6b7280] hover:text-white text-xs transition-colors">
              Terms
            </button>
            <button className="text-[#6b7280] hover:text-white text-xs transition-colors">
              Privacy
            </button>
            <button className="text-[#6b7280] hover:text-white text-xs transition-colors">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
