import { Star } from "lucide-react";

interface StarRatingFilterProps {
  label?: string;
  minStars: number;
  onMinChange: (stars: number) => void;
  maxStars?: number;
}

export default function StarRatingFilter({
  label = "Minimum Star Rating",
  minStars,
  onMinChange,
  maxStars = 5,
}: StarRatingFilterProps) {
  return (
    <div>
      <label className="block text-sm text-[#99a1af] mb-2">{label}</label>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            onClick={() => onMinChange(star === minStars ? 0 : star)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= minStars
                  ? "fill-[#FFC107] text-[#FFC107]"
                  : "fill-none text-[#6b7280] hover:text-[#FFC107]"
              }`}
            />
          </button>
        ))}
        {minStars > 0 && (
          <span className="text-xs text-[#99a1af] ml-2">{minStars}+ stars</span>
        )}
      </div>
    </div>
  );
}
