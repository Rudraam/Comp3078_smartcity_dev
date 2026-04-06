export interface AttendedEvent {
  id: string;
  name: string;
  date: string;
  category: string;
  location: string;
  image?: string;
  url?: string;
  attendedAt: string;
}

export interface CheckIn {
  id: string;
  name: string;
  type: "restaurant" | "hotel" | "event";
  location: string;
  city: string;
  checkedInAt: string;
}

const ATTENDED_KEY = "city-explorer-attended-events";
const CHECKINS_KEY = "city-explorer-checkins";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function getAttendedEvents(): AttendedEvent[] {
  return readJson<AttendedEvent[]>(ATTENDED_KEY, []);
}

export function isEventAttended(id: string): boolean {
  return getAttendedEvents().some((e) => e.id === id);
}

export function markEventAttended(event: Omit<AttendedEvent, "attendedAt">) {
  const current = getAttendedEvents();
  if (!current.find((e) => e.id === event.id)) {
    current.unshift({ ...event, attendedAt: new Date().toISOString() });
    localStorage.setItem(ATTENDED_KEY, JSON.stringify(current));
  }
}

export function unmarkEventAttended(id: string) {
  const updated = getAttendedEvents().filter((e) => e.id !== id);
  localStorage.setItem(ATTENDED_KEY, JSON.stringify(updated));
}

export function getCheckIns(): CheckIn[] {
  return readJson<CheckIn[]>(CHECKINS_KEY, []);
}

export function addCheckIn(place: Omit<CheckIn, "checkedInAt">) {
  const current = getCheckIns();
  if (!current.find((c) => c.id === place.id)) {
    current.unshift({ ...place, checkedInAt: new Date().toISOString() });
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(current));
  }
}

export function removeCheckIn(id: string) {
  const updated = getCheckIns().filter((c) => c.id !== id);
  localStorage.setItem(CHECKINS_KEY, JSON.stringify(updated));
}
