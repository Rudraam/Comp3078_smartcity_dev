import { Search } from "lucide-react";

export default function MapControls() {
  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2">
      <button className="bg-[var(--app-card-inner)] hover:bg-[var(--app-card-inner)] transition-colors p-3 rounded-lg">
        <Search className="w-5 h-5" />
      </button>
      <button className="bg-[var(--app-card-inner)] hover:bg-[var(--app-card-inner)] transition-colors p-3 rounded-lg">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m8-8H4" />
        </svg>
      </button>
      <button className="bg-[var(--app-card-inner)] hover:bg-[var(--app-card-inner)] transition-colors p-3 rounded-lg">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12h-16" />
        </svg>
      </button>
      <button className="bg-[var(--app-card-inner)] hover:bg-[var(--app-card-inner)] transition-colors p-3 rounded-lg">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
}
