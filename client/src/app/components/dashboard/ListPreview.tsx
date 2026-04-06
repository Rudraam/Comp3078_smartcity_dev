import { useNavigate } from "../../hooks/router-compat";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { DashboardStarIcon } from "./DashboardIcons";
import type { LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  items: ListItem[];
  navigateTo: string;
  onItemClick?: (id: string) => void;
}

export default function ListPreview({
  title,
  icon: Icon,
  items,
  navigateTo,
  onItemClick,
}: ListPreviewProps) {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Icon className="w-5 h-5" /> {title}
        </h3>
        <button
          onClick={() => navigate(navigateTo)}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-[#1152d4]/10 text-[#1152d4] hover:bg-[#1152d4]/20 transition-colors"
        >
          See All &rsaquo;
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl p-4 hover:bg-[var(--app-card-inner)] transition-colors cursor-pointer flex items-center gap-4"
            onClick={() => onItemClick?.(item.id)}
          >
            <div className="w-14 h-14 rounded-xl shrink-0 overflow-hidden">
              {item.image ? (
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[var(--app-card-hover)]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold mb-1 truncate">{item.name}</h4>
              <div className="flex items-center gap-2 text-sm text-[var(--app-text-muted)]">
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
            <div className="text-[var(--app-text-muted)]">&rsaquo;</div>
          </div>
        ))}
      </div>
    </section>
  );
}
