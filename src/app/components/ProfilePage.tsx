import { Mail, Phone, MapPin, Calendar, Bell, Send } from "lucide-react";
import PageLayout from "./shared/PageLayout";
import { ProfileUserIcon } from "./profile/ProfileIcon";
import SettingsSection from "./profile/SettingsSection";
import RecentActivity from "./profile/RecentActivity";
import { mockProfileEvents } from "../data/profile-data";

const statsCards = [
  { icon: <Calendar className="w-5 h-5" />, label: "Events Attended", value: "12" },
  { icon: <Bell className="w-5 h-5" />, label: "Active Alerts", value: "3" },
  { icon: <Send className="w-5 h-5" />, label: "Check-ins", value: "28" },
];

const contactInfo = [
  { icon: <Mail className="w-4 h-4" />, text: "sarah.chen@email.com" },
  { icon: <Phone className="w-4 h-4" />, text: "+1 (416) 555-0123" },
  { icon: <MapPin className="w-4 h-4" />, text: "Downtown Toronto, ON" },
];

export default function ProfilePage() {
  return (
    <PageLayout>
      {/* Page Title */}
      <h1 className="text-6xl font-normal mb-8">Profile</h1>

      {/* Profile Card */}
      <div className="bg-[#23262f] rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="bg-[#314158] rounded-xl w-32 h-32 flex items-center justify-center shrink-0">
            <ProfileUserIcon />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-normal mb-2">Sarah Chen</h2>
            <p className="text-[#99a1af] mb-4">Resident since 2019</p>

            <div className="space-y-3">
              {contactInfo.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-[#99a1af] justify-center sm:justify-start"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="bg-[#1f2533] hover:bg-[#2a2e3a] transition-colors border border-[#2c2c2c] px-6 py-3 rounded-lg text-sm font-medium shrink-0">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
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
        <SettingsSection />
        <RecentActivity events={mockProfileEvents} />
      </div>
    </PageLayout>
  );
}
