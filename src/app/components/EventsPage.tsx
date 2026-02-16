import { useState, useMemo } from "react";
import { Calendar, SlidersHorizontal } from "lucide-react";
import PageLayout from "./shared/PageLayout";
import SearchInput from "./shared/SearchInput";
import StatsGrid from "./shared/StatsGrid";
import CategoryFilter from "./shared/CategoryFilter";
import FilterSortPanel from "./shared/FilterSortPanel";
import RangeInput from "./shared/RangeInput";
import SortSelect from "./shared/SortSelect";
import EventCard from "./events/EventCard";
import FeaturedEvent from "./events/FeaturedEvent";
import {
  mockEvents,
  eventCategories,
  quickFilters,
} from "../data/events-data";
import {
  filterEvents,
  sortEvents,
  defaultEventFilters,
  countActiveFilters,
  type EventFilters,
  type EventSortKey,
} from "../utils/filter-helpers";

const stats = [
  { value: "324", label: "Upcoming Events" },
  { value: "12", label: "This Week" },
  { value: "42", label: "Free Events" },
  { value: "7.2k", label: "Attendees" },
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedQuickFilter, setSelectedQuickFilter] = useState("This Week");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<EventFilters>(defaultEventFilters);
  const [sortKey, setSortKey] = useState<EventSortKey>("default");

  const featuredEvent = mockEvents.find((e) => e.featured);
  const upcomingEvents = mockEvents.filter((e) => !e.featured);

  const activeFilterCount = countActiveFilters(filters);

  const processedEvents = useMemo(() => {
    let result = upcomingEvents;

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((e) => e.category === selectedCategory);
    }

    // Search
    if (searchQuery) {
      result = result.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filters
    result = filterEvents(result, filters);

    // Sort
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
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-10 h-10" />
        <h1 className="text-5xl font-bold">Events</h1>
      </div>

      <StatsGrid stats={stats} />

      {/* Search, Date, Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search events..."
        />
        <input
          type="date"
          className="bg-[#23262f] text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
        />
        <input
          type="text"
          placeholder="Location"
          className="bg-[#23262f] text-white placeholder-[#6b7280] px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] transition-all"
        />
      </div>

      {/* Action Row */}
      <div className="flex items-center gap-3 mb-6">
        <button className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors px-8 py-3 rounded-lg font-medium">
          Search
        </button>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
            filtersOpen || activeFilterCount > 0
              ? "bg-[#1152d4] text-white"
              : "bg-[#23262f] hover:bg-[#2a2e3a] text-white"
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

      {/* Filter & Sort Panel */}
      <FilterSortPanel
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onClear={clearFilters}
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
          <label className="block text-sm text-[#99a1af] mb-2">
            Quick Filters
          </label>
          <button
            onClick={() => updateFilter("freeOnly", !filters.freeOnly)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filters.freeOnly
                ? "bg-[#1152d4] text-white"
                : "bg-[#23262f] text-[#99a1af] hover:bg-[#2a2e3a]"
            }`}
          >
            Free Events Only
          </button>
        </div>
      </FilterSortPanel>

      <CategoryFilter
        categories={eventCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Quick Date Filter */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Quick Date Filter</h2>
        </div>
        <CategoryFilter
          categories={quickFilters}
          selected={selectedQuickFilter}
          onSelect={setSelectedQuickFilter}
        />
      </section>

      {/* Featured Event */}
      {featuredEvent && <FeaturedEvent event={featuredEvent} />}

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            Upcoming Events
            <span className="text-sm text-[#99a1af] font-normal ml-2">
              ({processedEvents.length} results)
            </span>
          </h2>
          <button className="text-[#1152d4] hover:text-[#0d3fa3] transition-colors text-sm">
            View calendar
          </button>
        </div>

        {processedEvents.length === 0 ? (
          <div className="text-center py-12 text-[#99a1af]">
            <p className="text-lg mb-2">No events found</p>
            <p className="text-sm">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}