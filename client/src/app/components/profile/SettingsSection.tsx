import {
  Bell,
  Lock,
  Settings as SettingsIcon,
} from "lucide-react";

interface SettingsItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}

const settingsItems: SettingsItem[] = [
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Notifications",
    description: "Manage your notification preferences",
    action: "Enabled",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Privacy & Security",
    description: "Control your privacy settings",
    action: "View Settings",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 20 20"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    ),
    title: "Preferences",
    description: "Customize your experience",
    action: "View Settings",
  },
];

export default function SettingsSection() {
  return (
    <div className="bg-[#23262f] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-5 h-5" />
        <h3 className="text-xl font-semibold">Settings</h3>
      </div>

      <div className="space-y-4">
        {settingsItems.map((item) => (
          <div
            key={item.title}
            className="bg-[#2a2e3a] rounded-xl p-4 flex items-center justify-between hover:bg-[#3a3e4a] transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#314158] rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-[#99a1af]">{item.description}</p>
              </div>
            </div>
            <span className="text-[#1152d4] text-sm font-medium">
              {item.action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
