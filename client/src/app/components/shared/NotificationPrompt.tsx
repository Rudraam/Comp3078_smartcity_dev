import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, BellOff, X } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";

export default function NotificationPrompt() {
  const { isSupported, browserPermission, promptShown, requestPermission, markPromptShown } =
    useNotifications();
  const [dismissed, setDismissed] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const shouldShow =
    isSupported &&
    browserPermission === "default" &&
    !promptShown &&
    !dismissed;

  const handleAllow = async () => {
    setRequesting(true);
    const result = await requestPermission();
    markPromptShown("yes");
    setDismissed(true);
    if (result === "granted") {
      new Notification("Smart City Explorer", {
        body: "Notifications enabled! You'll receive weather alerts and city updates.",
        icon: "/favicon.ico",
      });
    }
  };

  const handleDismiss = () => {
    markPromptShown("no");
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="dialog"
          aria-modal="false"
          aria-label="Enable notifications"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl shadow-xl p-5">
            <div className="flex items-start gap-4">
              <div className="bg-[#1152d4]/10 rounded-xl w-12 h-12 flex items-center justify-center shrink-0 text-[#1152d4]">
                <Bell className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--app-text)] mb-1">
                  Stay in the know
                </h3>
                <p className="text-sm text-[var(--app-text-muted)] leading-relaxed">
                  Get weather alerts and city updates delivered as notifications.
                  You can always change this in your profile.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={handleAllow}
                    disabled={requesting}
                    className="flex items-center gap-2 bg-[#1152d4] hover:bg-[#0d3fa3] disabled:opacity-60 transition-colors text-white px-5 py-2.5 rounded-lg text-sm font-medium"
                  >
                    <Bell className="w-4 h-4" aria-hidden="true" />
                    {requesting ? "Requesting…" : "Enable notifications"}
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="flex items-center gap-2 text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors text-sm px-3 py-2.5"
                  >
                    <BellOff className="w-4 h-4" aria-hidden="true" />
                    Not now
                  </button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss notification prompt"
                className="text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors shrink-0 mt-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
