import { useState, useMemo } from "react";
import { Utensils, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import PageLayout from "./shared/PageLayout";
import SearchInput from "./shared/SearchInput";
import StatsGrid from "./shared/StatsGrid";
import CategoryFilter from "./shared/CategoryFilter";
import FilterSortPanel from "./shared/FilterSortPanel";
import RangeInput from "./shared/RangeInput";
import SortSelect from "./shared/SortSelect";
import RestaurantCard from "./restaurants/RestaurantCard";
import FeaturedRestaurant from "./restaurants/FeaturedRestaurant";
import { mockRestaurants, restaurantCategories } from "../data/restaurants-data";
import {
  filterRestaurants,
  sortRestaurants,
  defaultRestaurantFilters,
  countActiveFilters,
  type RestaurantFilters,
  type RestaurantSortKey,
} from "../utils/filter-helpers";

const stats = [
  { value: "156", label: "Total Restaurants" },
  { value: "24", label: "Cuisines" },
  { value: "4.2", label: "Average Rating" },
  { value: "89", label: "Open Now" },
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<RestaurantFilters>(
    defaultRestaurantFilters
  );
  const [sortKey, setSortKey] = useState<RestaurantSortKey>("default");

  const featuredRestaurant = mockRestaurants.find((r) => r.featured);
  const allRestaurants = mockRestaurants.filter((r) => !r.featured);

  const activeFilterCount = countActiveFilters(filters);

  const processedRestaurants = useMemo(() => {
    let result = allRestaurants;

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((r) => r.category === selectedCategory);
    }

    // Search
    if (searchQuery) {
      result = result.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filters
    result = filterRestaurants(result, filters);

    // Sort
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
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <Utensils className="w-10 h-10" />
        <h1 className="text-5xl font-bold">Restaurants</h1>
      </div>

      <StatsGrid stats={stats} />

      {/* Search and Filter Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search restaurants..."
          className="flex-1"
        />
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
          label="Price Level (1-4)"
          minValue={filters.minPrice}
          maxValue={filters.maxPrice}
          onMinChange={(v) => updateFilter("minPrice", v)}
          onMaxChange={(v) => updateFilter("maxPrice", v)}
          minPlaceholder="1"
          maxPlaceholder="4"
          min={1}
          max={4}
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
          <label className="block text-sm text-[#99a1af] mb-2">
            Availability
          </label>
          <button
            onClick={() => updateFilter("openNow", !filters.openNow)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filters.openNow
                ? "bg-[#1152d4] text-white"
                : "bg-[#23262f] text-[#99a1af] hover:bg-[#2a2e3a]"
            }`}
          >
            Open Now
          </button>
        </div>
      </FilterSortPanel>

      <CategoryFilter
        categories={restaurantCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Featured Restaurant */}
      {featuredRestaurant && (
        <FeaturedRestaurant restaurant={featuredRestaurant} />
      )}

      {/* All Restaurants */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            All Restaurants
            <span className="text-sm text-[#99a1af] font-normal ml-2">
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
          <div className="text-center py-12 text-[#99a1af]">
            <p className="text-lg mb-2">No restaurants found</p>
            <p className="text-sm">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}