import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Utensils, SlidersHorizontal, Loader2 } from "lucide-react";
import { useNavigate } from "../hooks/router-compat";
import PageLayout from "./shared/PageLayout";
import SearchInput from "./shared/SearchInput";
import StatsGrid from "./shared/StatsGrid";
import CategoryFilter from "./shared/CategoryFilter";
import FilterSortPanel from "./shared/FilterSortPanel";
import RangeInput from "./shared/RangeInput";
import SortSelect from "./shared/SortSelect";
import RestaurantCard from "./restaurants/RestaurantCard";
import FeaturedRestaurant from "./restaurants/FeaturedRestaurant";
import { RestaurantDetailModal, useDetailModal } from "./shared/DetailModal";
import { useCity } from "../hooks/useCityContext";
import type { Restaurant } from "../types";
import {
  filterRestaurants,
  sortRestaurants,
  defaultRestaurantFilters,
  countActiveFilters,
  type RestaurantFilters,
  type RestaurantSortKey,
} from "../utils/filter-helpers";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "rating-desc", label: "Rating (High to Low)" },
  { value: "rating-asc", label: "Rating (Low to High)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "reviews-desc", label: "Most Reviews" },
];

export default function RestaurantsPage() {
  const navigate = useNavigate();
  const { city } = useCity();
  const restaurantModal = useDetailModal<Restaurant>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<RestaurantFilters>(
    defaultRestaurantFilters
  );
  const [sortKey, setSortKey] = useState<RestaurantSortKey>("default");

  const { data: apiData, isLoading: loading, error: queryError } = useQuery<{ restaurants: Restaurant[] }>({
    queryKey: [`/api/restaurants?city=${encodeURIComponent(city)}&limit=50`],
    queryFn: async () => {
      const res = await fetch(`/api/restaurants?city=${encodeURIComponent(city)}&limit=50`);
      if (!res.ok) throw new Error("Failed to load restaurants");
      return res.json();
    },
  });

  const allData = apiData?.restaurants ?? [];
  const error = queryError ? (queryError as Error).message : "";

  const categories = useMemo(() => {
    const cats = new Set(allData.map(r => r.category));
    return ["All", ...Array.from(cats).sort()];
  }, [allData]);

  const featuredRestaurant = allData.find((r) => r.featured);
  const allRestaurants = allData.filter((r) => !r.featured);

  const activeFilterCount = countActiveFilters(filters);

  const stats = useMemo(() => [
    { value: String(allData.length), label: "Total Restaurants" },
    { value: String(categories.length - 1), label: "Cuisines" },
    { value: allData.length > 0 ? (allData.reduce((s, r) => s + r.rating, 0) / allData.length).toFixed(1) : "0", label: "Average Rating" },
    { value: String(allData.filter(r => r.openNow).length || "-"), label: "Open Now" },
  ], [allData, categories]);

  const processedRestaurants = useMemo(() => {
    let result = allRestaurants;

    if (selectedCategory !== "All") {
      result = result.filter((r) => r.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = filterRestaurants(result, filters);
    result = sortRestaurants(result, sortKey);

    return result;
  }, [allRestaurants, selectedCategory, searchQuery, filters, sortKey]);

  const clearFilters = () => {
    setFilters(defaultRestaurantFilters);
    setSortKey("default");
  };

  const updateFilter = <K extends keyof RestaurantFilters>(
    key: K,
    value: RestaurantFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PageLayout>
      <div className="flex items-center gap-3 mb-2">
        <Utensils className="w-10 h-10" />
        <h1 className="text-5xl font-bold">Restaurants</h1>
      </div>
      <p className="text-[var(--app-text-muted)] mb-6">Showing results for <span className="text-[var(--app-text)] font-medium">{city}</span></p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#1152d4] mb-4" />
          <p className="text-[var(--app-text-muted)]">Finding restaurants in {city}...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-400 mb-2">{error}</p>
          <button onClick={() => window.location.reload()} className="text-[#51a2ff] hover:underline text-sm">Try again</button>
        </div>
      ) : (
        <>
          <StatsGrid stats={stats} />

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search restaurants..."
              className="flex-1"
            />
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
              label="Price Level (1-3)"
              minValue={filters.minPrice}
              maxValue={filters.maxPrice}
              onMinChange={(v) => updateFilter("minPrice", v)}
              onMaxChange={(v) => updateFilter("maxPrice", v)}
              minPlaceholder="1"
              maxPlaceholder="3"
              min={1}
              max={3}
            />
            <RangeInput
              label="Rating"
              minValue={filters.minRating}
              maxValue={filters.maxRating}
              onMinChange={(v) => updateFilter("minRating", v)}
              onMaxChange={(v) => updateFilter("maxRating", v)}
              minPlaceholder="0"
              maxPlaceholder="5"
              step={0.1}
              min={0}
              max={5}
            />
            <SortSelect
              options={sortOptions}
              value={sortKey}
              onChange={(v) => setSortKey(v as RestaurantSortKey)}
            />
            <div>
              <label className="block text-sm text-[var(--app-text-muted)] mb-2 font-medium">
                Availability
              </label>
              <button
                onClick={() => updateFilter("openNow", !filters.openNow)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filters.openNow
                    ? "bg-[#1152d4] text-white border border-[#1152d4] shadow-sm"
                    : "bg-[var(--app-bg)] text-[var(--app-text)] border border-[var(--app-border)] hover:border-[#1152d4]/60 hover:text-[#1152d4]"
                }`}
              >
                Open Now
              </button>
            </div>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              className="col-span-full"
            />
          </FilterSortPanel>

          {featuredRestaurant && (
            <FeaturedRestaurant restaurant={featuredRestaurant} onClick={() => restaurantModal.open(featuredRestaurant)} />
          )}

          <section>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-2xl font-semibold">
                All Restaurants
                <span className="text-sm text-[var(--app-text-muted)] font-normal ml-2">
                  ({processedRestaurants.length} results)
                </span>
              </h2>
              <button
                onClick={() => navigate("/map")}
                className="text-[#1152d4] hover:text-[#0d3fa3] transition-colors text-sm"
              >
                View on map
              </button>
            </div>

            {processedRestaurants.length === 0 ? (
              <div className="text-center py-12 text-[var(--app-text-muted)]">
                <p className="text-lg mb-2">No restaurants found</p>
                <p className="text-sm">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={() => restaurantModal.open(restaurant)} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
      {restaurantModal.selectedItem && (
        <RestaurantDetailModal
          restaurant={restaurantModal.selectedItem}
          isOpen={restaurantModal.isOpen}
          onClose={restaurantModal.close}
          city={city}
        />
      )}
    </PageLayout>
  );
}
