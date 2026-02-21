import Header from "./Header";
import Footer from "./Footer";
import AnimatedPage from "./AnimatedPage";

interface PageLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function PageLayout({
  children,
  showHeader = true,
  showFooter = true,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1a1d26] text-white font-['Inter',sans-serif] flex flex-col">
      {showHeader && <Header />}
      <main className="max-w-[1400px] mx-auto px-6 py-8 w-full flex-1">
        <AnimatedPage>{children}</AnimatedPage>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
