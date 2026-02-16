import { useState, useMemo } from "react";
import { Hotel, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import PageLayout from "./shared/PageLayout";
import SearchInput from "./shared/SearchInput";
import StatsGrid from "./shared/StatsGrid";
import FilterSortPanel from "./shared/FilterSortPanel";
import RangeInput from "./shared/RangeInput";
import SortSelect from "./shared/SortSelect";
import StarRatingFilter from "./shared/StarRatingFilter";
import CheckboxFilter from "./shared/CheckboxFilter";
import HotelCard from "./hotels/HotelCard";
import FeaturedHotel from "./hotels/FeaturedHotel";
import { mockHotels, amenityOptions } from "../data/hotels-data";
import {
  filterHotels,
  sortHotels,
  defaultHotelFilters,
  countActiveFilters,
  type HotelFilters,
  type HotelSortKey,
} from "../utils/filter-helpers";

const stats = [
  { value: "48", label: "Total Hotels" },
  { value: "36", label: "Available Tonight" },
  { value: "4.3", label: "Average Rating" },
  { value: "$125", label: "Avg. price/night" },
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "rating-desc", label: "Rating (High to Low)" },
  { value: "rating-asc", label: "Rating (Low to High)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "stars-desc", label: "Stars (High to Low)" },
  { value: "stars-asc", label: "Stars (Low to High)" },
  { value: "reviews-desc", label: "Most Reviews" },
];

export default function HotelsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<HotelFilters>(defaultHotelFilters);
  const [sortKey, setSortKey] = useState<HotelSortKey>("default");

  const featuredHotel = mockHotels.find((h) => h.featured);
  const allHotels = mockHotels.filter((h) => !h.featured);

  const activeFilterCount = countActiveFilters(filters);

  const processedHotels = useMemo(() => {
    let result = allHotels;

    // Search
    if (searchQuery) {
      result = result.filter((h) =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filters
    result = filterHotels(result, filters);

    // Sort
    result = sortHotels(result, sortKey);

    return result;
  }, [allHotels, searchQuery, filters, sortKey]);

  const clearFilters = () => {
    setFilters(defaultHotelFilters);
    setSortKey("default");
  };

  const updateFilter = <K extends keyof HotelFilters>(
    key: K,
    value: HotelFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PageLayout>
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <Hotel className="w-10 h-10" />
        <h1 className="text-5xl font-bold">Hotels</h1>
      </div>

      <StatsGrid stats={stats} />

      {/* Search and Filter Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search hotels..."
          buttonLabel="Search"
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
          label="Price Per Night"
          minValue={filters.minPrice}
          maxValue={filters.maxPrice}
          onMinChange={(v) => updateFilter("minPrice", v)}
          onMaxChange={(v) => updateFilter("maxPrice", v)}
          prefix="$"
          minPlaceholder="0"
          maxPlaceholder="500"
          min={0}
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
          onChange={(v) => setSortKey(v as HotelSortKey)}
        />
        <StarRatingFilter
          label="Minimum Star Rating"
          minStars={filters.minStars}
          onMinChange={(v) => updateFilter("minStars", v)}
          maxStars={5}
        />
        <CheckboxFilter
          label="Amenities"
          options={amenityOptions}
          selected={filters.amenities}
          onChange={(v) => updateFilter("amenities", v)}
        />
      </FilterSortPanel>

      {/* Popular Amenities */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {amenityOptions.map((amenity) => {
            const isSelected = filters.amenities.includes(amenity);
            return (
              <button
                key={amenity}
                onClick={() => {
                  const next = isSelected
                    ? filters.amenities.filter((a) => a !== amenity)
                    : [...filters.amenities, amenity];
                  updateFilter("amenities", next);
                }}
                className={`p-6 rounded-xl text-center cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[#1152d4]/20 border border-[#1152d4]"
                    : "bg-[#23262f] hover:bg-[#2a2e3a]"
                }`}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-[#3a3e4a] rounded-lg" />
                <p className="text-sm">{amenity}</p>
                <p className="text-xs text-[#99a1af] mt-1">24 Hotels</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Hotel */}
      {featuredHotel && <FeaturedHotel hotel={featuredHotel} />}

      {/* All Hotels */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            All Hotels
            <span className="text-sm text-[#99a1af] font-normal ml-2">
              ({processedHotels.length} results)
            </span>
          </h2>
          <button
            onClick={() => navigate("/map")}
            className="text-[#1152d4] hover:text-[#0d3fa3] transition-colors text-sm"
          >
            View on map
          </button>
        </div>

        {processedHotels.length === 0 ? (
          <div className="text-center py-12 text-[#99a1af]">
            <p className="text-lg mb-2">No hotels found</p>
            <p className="text-sm">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}