import { useEffect } from "react";
import { useLocation } from "wouter";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedPage from "./AnimatedPage";
import { useTheme } from "../../hooks/useTheme";

interface PageLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/restaurants": "Restaurants",
  "/hotels": "Hotels",
  "/events": "Events",
  "/map": "Map",
  "/profile": "Profile",
};

export default function PageLayout({
  children,
  pageTitle,
  showHeader = true,
  showFooter = true,
}: PageLayoutProps) {
  const [location] = useLocation();
  const { announce } = useTheme();

  useEffect(() => {
    const title = pageTitle || PAGE_TITLES[location] || "Smart City Explorer";
    announce(`${title} page loaded`);
  }, [location, pageTitle, announce]);

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] font-['Inter',sans-serif] flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#1152d4] text-white px-4 py-2 rounded-lg font-medium"
      >
        Skip to main content
      </a>
      {showHeader && <Header />}
      <main
        id="main-content"
        role="main"
        aria-label={pageTitle || PAGE_TITLES[location] || "Page content"}
        className="max-w-[1400px] mx-auto px-6 py-8 w-full flex-1"
      >
        <AnimatedPage>{children}</AnimatedPage>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
