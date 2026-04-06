import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

const DEFAULT_CITY = "Toronto, Ontario, Canada";
const DEFAULT_CITY_SHORT = "Toronto";

interface CityContextType {
  city: string;
  setCity: (city: string) => void;
  cityLoading: boolean;
}

const CityContext = createContext<CityContextType>({
  city: DEFAULT_CITY_SHORT,
  setCity: () => {},
  cityLoading: false,
});

export function CityProvider({ children }: { children: ReactNode }) {
  const storedCity = (() => {
    try { return sessionStorage.getItem("smartcity_city") || null; } catch { return null; }
  })();

  const [city, setCityState] = useState(storedCity || DEFAULT_CITY_SHORT);
  const [cityLoading, setCityLoading] = useState(!storedCity);

  const setCity = useCallback((newCity: string) => {
    setCityState(newCity);
    try { sessionStorage.setItem("smartcity_city", newCity); } catch {}
  }, []);

  useEffect(() => {
    if (storedCity) {
      setCityLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      setCity(DEFAULT_CITY);
      setCityLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      setCity(DEFAULT_CITY);
      setCityLoading(false);
    }, 8000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeout);
        try {
          const { latitude, longitude } = position.coords;
          const resp = await fetch(`/api/reverse-geocode?lat=${latitude}&lon=${longitude}`);
          if (resp.ok) {
            const data = await resp.json();
            const resolved = data.displayName || data.name || DEFAULT_CITY;
            setCity(resolved);
          } else {
            setCity(DEFAULT_CITY);
          }
        } catch {
          setCity(DEFAULT_CITY);
        } finally {
          setCityLoading(false);
        }
      },
      () => {
        clearTimeout(timeout);
        setCity(DEFAULT_CITY);
        setCityLoading(false);
      },
      { timeout: 7000, maximumAge: 60000 }
    );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <CityContext.Provider value={{ city, setCity, cityLoading }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
