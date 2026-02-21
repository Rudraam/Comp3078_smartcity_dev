import { useLocation as useWouterLocation } from "wouter";

export function useNavigate() {
  const [, setLocation] = useWouterLocation();
  return (pathOrDelta: string | number, _options?: Record<string, unknown>) => {
    if (typeof pathOrDelta === "number") {
      window.history.go(pathOrDelta);
    } else {
      setLocation(pathOrDelta);
    }
  };
}

export function useLocation() {
  const [pathname] = useWouterLocation();
  return { pathname, search: "", hash: "", state: null, key: "" };
}
