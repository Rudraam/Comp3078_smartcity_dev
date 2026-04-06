import { createContext, useContext, useState, useEffect, useCallback } from "react";

type BrowserPermission = "default" | "granted" | "denied";

interface NotificationContextType {
  isSupported: boolean;
  browserPermission: BrowserPermission;
  appEnabled: boolean;
  promptShown: boolean;
  requestPermission: () => Promise<BrowserPermission>;
  setAppEnabled: (enabled: boolean) => void;
  markPromptShown: (choice: "yes" | "no") => void;
  sendNotification: (title: string, body: string, options?: { icon?: string; tag?: string }) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  isSupported: false,
  browserPermission: "default",
  appEnabled: false,
  promptShown: false,
  requestPermission: async () => "default",
  setAppEnabled: () => {},
  markPromptShown: () => {},
  sendNotification: () => {},
});

const PROMPT_KEY = "city-explorer-notif-prompt-shown";
const ENABLED_KEY = "city-explorer-notif-enabled";

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const isSupported = typeof window !== "undefined" && "Notification" in window;

  const [browserPermission, setBrowserPermission] = useState<BrowserPermission>(() => {
    if (!isSupported) return "denied";
    return Notification.permission as BrowserPermission;
  });

  const [appEnabled, setAppEnabledState] = useState<boolean>(() => {
    return localStorage.getItem(ENABLED_KEY) === "true";
  });

  const [promptShown, setPromptShown] = useState<boolean>(() => {
    return localStorage.getItem(PROMPT_KEY) === "true";
  });

  useEffect(() => {
    if (!isSupported) return;
    setBrowserPermission(Notification.permission as BrowserPermission);
  }, [isSupported]);

  const requestPermission = useCallback(async (): Promise<BrowserPermission> => {
    if (!isSupported) return "denied";
    const result = await Notification.requestPermission();
    const perm = result as BrowserPermission;
    setBrowserPermission(perm);
    if (perm === "granted") {
      setAppEnabledState(true);
      localStorage.setItem(ENABLED_KEY, "true");
    }
    return perm;
  }, [isSupported]);

  const setAppEnabled = useCallback((enabled: boolean) => {
    setAppEnabledState(enabled);
    localStorage.setItem(ENABLED_KEY, String(enabled));
  }, []);

  const markPromptShown = useCallback((choice: "yes" | "no") => {
    setPromptShown(true);
    localStorage.setItem(PROMPT_KEY, "true");
    if (choice === "no") {
      setAppEnabledState(false);
      localStorage.setItem(ENABLED_KEY, "false");
    }
  }, []);

  const sendNotification = useCallback(
    (title: string, body: string, options?: { icon?: string; tag?: string }) => {
      if (!isSupported || browserPermission !== "granted" || !appEnabled) return;
      try {
        new Notification(title, {
          body,
          icon: options?.icon ?? "/favicon.ico",
          tag: options?.tag,
          badge: "/favicon.ico",
        });
      } catch {
        // Notification may fail in some environments — fail silently
      }
    },
    [isSupported, browserPermission, appEnabled]
  );

  return (
    <NotificationContext.Provider
      value={{
        isSupported,
        browserPermission,
        appEnabled,
        promptShown,
        requestPermission,
        setAppEnabled,
        markPromptShown,
        sendNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
