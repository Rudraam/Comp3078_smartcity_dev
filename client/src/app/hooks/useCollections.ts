import { useState, useCallback } from "react";

export interface SavedItem {
  id: string;
  name: string;
  type: "restaurant" | "hotel" | "event";
  image?: string;
  subtitle?: string;
  city?: string;
  savedAt: number;
}

const STORAGE_KEY = "city-explorer-saved";

function load(): SavedItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function persist(items: SavedItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useCollections() {
  const [saved, setSaved] = useState<SavedItem[]>(load);

  const isSaved = useCallback((id: string) => saved.some((s) => s.id === id), [saved]);

  const save = useCallback((item: Omit<SavedItem, "savedAt">) => {
    setSaved((prev) => {
      const filtered = prev.filter((s) => s.id !== item.id);
      const updated = [{ ...item, savedAt: Date.now() }, ...filtered];
      persist(updated);
      return updated;
    });
  }, []);

  const unsave = useCallback((id: string) => {
    setSaved((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  const toggle = useCallback((item: Omit<SavedItem, "savedAt">) => {
    setSaved((prev) => {
      if (prev.some((s) => s.id === item.id)) {
        const updated = prev.filter((s) => s.id !== item.id);
        persist(updated);
        return updated;
      } else {
        const updated = [{ ...item, savedAt: Date.now() }, ...prev];
        persist(updated);
        return updated;
      }
    });
  }, []);

  return { saved, isSaved, save, unsave, toggle };
}
