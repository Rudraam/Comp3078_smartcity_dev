import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface CityContextType {
  city: string;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextType>({
  city: "Toronto",
  setCity: () => {},
});

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState(() => {
    try {
      return sessionStorage.getItem("smartcity_city") || "Toronto";
    } catch {
      return "Toronto";
    }
  });

  const setCity = useCallback((newCity: string) => {
    setCityState(newCity);
    try {
      sessionStorage.setItem("smartcity_city", newCity);
    } catch {}
  }, []);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
