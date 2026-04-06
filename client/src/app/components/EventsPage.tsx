import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, SlidersHorizontal, Loader2, RefreshCw } from "lucide-react";
import PageLayout from "./shared/PageLayout";
import SearchInput from "./shared/SearchInput";
import StatsGrid from "./shared/StatsGrid";
import CategoryFilter from "./shared/CategoryFilter";
import FilterSortPanel from "./shared/FilterSortPanel";
import RangeInput from "./shared/RangeInput";
import SortSelect from "./shared/SortSelect";
import EventCard from "./events/EventCard";
import FeaturedEvent from "./events/FeaturedEvent";
import { EventDetailModal, useDetailModal } from "./shared/DetailModal";
import { useCity } from "../hooks/useCityContext";
import type { EventItem } from "../types";
import {
  filterEvents,
  sortEvents,
  defaultEventFilters,
  countActiveFilters,
  type EventFilters,
  type EventSortKey,
} from "../utils/filter-helpers";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "date-asc", label: "Date (Earliest First)" },
  { value: "date-desc", label: "Date (Latest First)" },
  { value: "attendees-desc", label: "Most Popular" },
];

export default function EventsPage() {
  const { city } = useCity();
  const queryClient = useQueryClient();
  const eventModal = useDetailModal<EventItem>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<EventFilters>(defaultEventFilters);
  const [sortKey, setSortKey] = useState<EventSortKey>("default");

  const queryKey = `/api/events?city=${encodeURIComponent(city)}&limit=50`;

  const { data: apiData, isLoading: loading, isFetching, error: queryError, refetch } = useQuery<{ events: EventItem[] }>({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await fetch(queryKey);
      if (!res.ok) throw new Error("Failed to load events");
      return res.json();
    },
  });

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: [queryKey] });
    refetch();
  };

  const allData = apiData?.events ?? [];
  const error = queryError ? (queryError as Error).message : "";

  const categories = useMemo(() => {
    const cats = new Set(allData.map(e => e.category));
    return ["All", ...Array.from(cats).sort()];
  }, [allData]);

  const featuredEvent = allData.find((e) => e.featured);
  const upcomingEvents = allData.filter((e) => !e.featured);

  const activeFilterCount = countActiveFilters(filters);

  const stats = useMemo(() => {
    const freeCount = allData.filter(e => e.price === "Free").length;
    const totalAttendees = allData.reduce((s, e) => s + e.attendees, 0);
    return [
      { value: String(allData.length), label: "Upcoming Events" },
      { value: String(categories.length - 1), label: "Categories" },
      { value: String(freeCount), label: "Free Events" },
      { value: totalAttendees > 1000 ? `${(totalAttendees / 1000).toFixed(1)}k` : String(totalAttendees), label: "Attendees" },
    ];
  }, [allData, categories]);

  const processedEvents = useMemo(() => {
    let result = upcomingEvents;

    if (selectedCategory !== "All") {
      result = result.filter((e) => e.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = filterEvents(result, filters);
    result = sortEvents(result, sortKey);

    return result;
  }, [upcomingEvents, selectedCategory, searchQuery, filters, sortKey]);

  const clearFilters = () => {
    setFilters(defaultEventFilters);
    setSortKey("default");
  };

  const updateFilter = <K extends keyof EventFilters>(
    key: K,
    value: EventFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Calendar className="w-10 h-10" />
          <h1 className="text-5xl font-bold">Events</h1>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isFetching}
          title="Refresh events"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--app-card)] text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors disabled:opacity-50 text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <p className="text-[var(--app-text-muted)] mb-6">Showing results for <span className="text-[var(--app-text)] font-medium">{city}</span></p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#1152d4] mb-4" />
          <p className="text-[var(--app-text-muted)]">Finding events in {city}...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-400 mb-2">{error}</p>
          <button onClick={() => window.location.reload()} className="text-[#51a2ff] hover:underline text-sm">Try again</button>
        </div>
      ) : (
        <>
          <StatsGrid stats={stats} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search events..."
            />
            <input
              type="date"
              className="bg-[var(--app-card)] text-[var(--app-text)] px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
            />
            <input
              type="text"
              placeholder="Location"
              className="bg-[var(--app-card)] text-[var(--app-text)] placeholder-[#6b7280] px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <button className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors px-8 py-3 rounded-lg font-medium">
              Search
            </button>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                filtersOpen || activeFilterCount > 0
                  ? "bg-[#1152d4] text-white border border-[#1152d4] shadow-sm"
                  : "bg-[var(--app-bg)] text-[var(--app-text)] border border-[var(--app-border)] hover:border-[#1152d4]/60 hover:text-[#1152d4]"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters & Sort</span>
              {activeFilterCount > 0 && (
                <span className="bg-white text-[#1152d4] text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <FilterSortPanel
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            onClear={() => { clearFilters(); setSelectedCategory("All"); }}
          >
            <RangeInput
              label="Price Range"
              minValue={filters.minPrice}
              maxValue={filters.maxPrice}
              onMinChange={(v) => updateFilter("minPrice", v)}
              onMaxChange={(v) => updateFilter("maxPrice", v)}
              prefix="$"
              minPlaceholder="0"
              maxPlaceholder="200"
              min={0}
            />
            <RangeInput
              label="Minimum Attendees"
              minValue={filters.minAttendees}
              maxValue=""
              onMinChange={(v) => updateFilter("minAttendees", v)}
              onMaxChange={() => {}}
              minPlaceholder="0"
              maxPlaceholder="-"
              min={0}
            />
            <SortSelect
              options={sortOptions}
              value={sortKey}
              onChange={(v) => setSortKey(v as EventSortKey)}
            />
            <div>
              <label className="block text-sm text-[var(--app-text-muted)] mb-2 font-medium">
                Quick Filters
              </label>
              <button
                onClick={() => updateFilter("freeOnly", !filters.freeOnly)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filters.freeOnly
                    ? "bg-[#1152d4] text-white border border-[#1152d4] shadow-sm"
                    : "bg-[var(--app-bg)] text-[var(--app-text)] border border-[var(--app-border)] hover:border-[#1152d4]/60 hover:text-[#1152d4]"
                }`}
              >
                Free Events Only
              </button>
            </div>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              className="col-span-full"
            />
          </FilterSortPanel>

          {featuredEvent && <FeaturedEvent event={featuredEvent} onClick={() => eventModal.open(featuredEvent)} />}

          <section>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-2xl font-semibold">
                Upcoming Events
                <span className="text-sm text-[var(--app-text-muted)] font-normal ml-2">
                  ({processedEvents.length} results)
                </span>
              </h2>
              <button className="text-[#1152d4] hover:text-[#0d3fa3] transition-colors text-sm">
                View calendar
              </button>
            </div>

            {processedEvents.length === 0 ? (
              <div className="text-center py-12 text-[var(--app-text-muted)]">
                <p className="text-lg mb-2">No events found</p>
                <p className="text-sm">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedEvents.map((event) => (
                  <EventCard key={event.id} event={event} onClick={() => eventModal.open(event)} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
      {eventModal.selectedItem && (
        <EventDetailModal
          event={eventModal.selectedItem}
          isOpen={eventModal.isOpen}
          onClose={eventModal.close}
          city={city}
        />
      )}
    </PageLayout>
  );
}
