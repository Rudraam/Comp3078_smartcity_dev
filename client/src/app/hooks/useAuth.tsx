import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type UserRole = "regular" | "commercial" | "admin";

interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  isCommercial: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadFromStorage = () => {
    const id = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const role = (localStorage.getItem("userRole") as UserRole) || "regular";
    const avatar = localStorage.getItem("city-explorer-avatar") ?? undefined;
    if (id && username) return { id, username, role, avatar };
    return null;
  };

  const saveToStorage = (u: AuthUser) => {
    localStorage.setItem("userId", u.id);
    localStorage.setItem("username", u.username);
    localStorage.setItem("userRole", u.role);
    if (u.avatar !== undefined) {
      if (u.avatar) localStorage.setItem("city-explorer-avatar", u.avatar);
      else localStorage.removeItem("city-explorer-avatar");
    }
  };

  const clearStorage = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("city-explorer-avatar");
  };

  const refresh = useCallback(async () => {
    try {
      const resp = await fetch("/api/auth/me");
      if (resp.ok) {
        const data = await resp.json();
        const u: AuthUser = { id: data.id, username: data.username, role: (data.role as UserRole) || "regular", avatar: data.avatar || undefined };
        setUser(u);
        saveToStorage(u);
        return;
      }
    } catch {
    }
    const stored = loadFromStorage();
    setUser(stored);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const login = async (username: string, password: string) => {
    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error || "Login failed");
    }
    const data = await resp.json();
    const u: AuthUser = { id: data.id, username: data.username, role: (data.role as UserRole) || "regular" };
    setUser(u);
    saveToStorage(u);
  };

  const register = async (username: string, email: string, password: string) => {
    const resp = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error || "Registration failed");
    }
    const data = await resp.json();
    const u: AuthUser = { id: data.id, username: data.username, role: (data.role as UserRole) || "regular" };
    setUser(u);
    saveToStorage(u);
  };

  const logout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    clearStorage();
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const isCommercial = user?.role === "commercial" || isAdmin;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, isCommercial, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
