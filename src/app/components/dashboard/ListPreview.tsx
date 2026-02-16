import { useNavigate } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { DashboardStarIcon } from "./DashboardIcons";

interface ListItem {
  id: string;
  name: string;
  rating: number;
  subtitle: string;
  priceLevel: number;
  image?: string;
}

interface ListPreviewProps {
  title: string;
  emoji: string;
  items: ListItem[];
  navigateTo: string;
}

export default function ListPreview({
  title,
  emoji,
  items,
  navigateTo,
}: ListPreviewProps) {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          {emoji} {title}
        </h3>
        <button
          onClick={() => navigate(navigateTo)}
          className="text-[#99a1af] hover:text-white transition-colors flex items-center gap-1 text-sm"
        >
          {"\u2630"} See All
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#23262f] rounded-2xl p-4 hover:bg-[#2a2e3a] transition-colors cursor-pointer flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-xl shrink-0 overflow-hidden">
              {item.image ? (
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#3a3e4a]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold mb-1 truncate">{item.name}</h4>
              <div className="flex items-center gap-2 text-sm text-[#99a1af]">
                <div className="flex items-center gap-1">
                  <DashboardStarIcon />
                  <span>{item.rating}</span>
                </div>
                <span>&bull;</span>
                <span>{item.subtitle}</span>
                <span>&bull;</span>
                <span>{"$".repeat(item.priceLevel)}</span>
              </div>
            </div>
            <div className="text-[#99a1af]">&rsaquo;</div>
          </div>
        ))}
      </div>
    </section>
  );
}
