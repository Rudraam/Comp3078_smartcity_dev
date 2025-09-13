import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WelcomeHero from "@/components/WelcomeHero";
import AuthForm from "@/components/AuthForm";
import CitySearch from "@/components/CitySearch";
import CityDashboard from "@/components/CityDashboard";
import ThemeToggle from "@/components/ThemeToggle";

type AppState = "welcome" | "auth" | "search" | "dashboard";

interface User {
  id: string;
  username: string;
}

function App() {
  const [currentView, setCurrentView] = useState<AppState>("welcome");
  const [user, setUser] = useState<User | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setCurrentView("search");
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCurrentView("dashboard");
  };

  const handleBackToSearch = () => {
    setCurrentView("search");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "welcome":
        return <WelcomeHero onGetStarted={handleGetStarted} />;
      case "auth":
        return <AuthForm onAuthSuccess={handleAuthSuccess} />;
      case "search":
        return <CitySearch onCitySelect={handleCitySelect} />;
      case "dashboard":
        return <CityDashboard cityName={selectedCity} onBackToSearch={handleBackToSearch} />;
      default:
        return <WelcomeHero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          {/* Theme Toggle - Fixed Position */}
          {currentView !== "welcome" && (
            <div className="fixed top-6 right-6 z-50">
              <ThemeToggle />
            </div>
          )}
          
          {/* User Info - Fixed Position */}
          {user && currentView !== "welcome" && currentView !== "auth" && (
            <div className="fixed top-6 left-6 z-50">
              <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-sm">
                <p className="text-sm text-foreground" data-testid="text-user-welcome">
                  Welcome, <span className="font-semibold">{user.username}</span>
                </p>
              </div>
            </div>
          )}

          {/* Main Content */}
          {renderCurrentView()}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
