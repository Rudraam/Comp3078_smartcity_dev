import { useNavigate } from "../../hooks/router-compat";
import { Map, Utensils, Hotel, Calendar, User } from "lucide-react";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  path: string;
  color: string;
}

const actions: QuickAction[] = [
  {
    icon: <Map className="w-6 h-6" />,
    label: "Map",
    path: "/map",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    label: "Restaurants",
    path: "/restaurants",
    color: "bg-orange-500/20 text-orange-400",
  },
  {
    icon: <Hotel className="w-6 h-6" />,
    label: "Hotels",
    path: "/hotels",
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    label: "Events",
    path: "/events",
    color: "bg-green-500/20 text-green-400",
  },
  {
    icon: <User className="w-6 h-6" />,
    label: "Profile",
    path: "/profile",
    color: "bg-pink-500/20 text-pink-400",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="bg-[#23262f] hover:bg-[#2a2e3a] transition-colors rounded-xl p-4 flex flex-col items-center gap-2"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}
            >
              {action.icon}
            </div>
            <span className="text-xs text-[#99a1af]">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
