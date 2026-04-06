import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CityProvider } from "./app/hooks/useCityContext";
import { ThemeProvider } from "./app/hooks/useTheme";
import { NotificationProvider } from "./app/hooks/useNotifications";
import { AuthProvider } from "./app/hooks/useAuth";
import LandingPage from "./app/components/LandingPage";
import AuthPage from "./app/components/AuthPage";
import Dashboard from "./app/components/Dashboard";
import RestaurantsPage from "./app/components/RestaurantsPage";
import HotelsPage from "./app/components/HotelsPage";
import EventsPage from "./app/components/EventsPage";
import MapPage from "./app/components/MapPage";
import ProfilePage from "./app/components/ProfilePage";
import AdminDashboard from "./app/components/AdminDashboard";
import SubmitListing from "./app/components/SubmitListing";
import ScrollToTop from "./app/components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/restaurants" component={RestaurantsPage} />
      <Route path="/hotels" component={HotelsPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/map" component={MapPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/submit" component={SubmitListing} />
      <Route>
        <div className="min-h-screen bg-[#1a1d26] text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-[#99a1af]">Page not found</p>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <CityProvider>
                <ScrollToTop>
                  <Router />
                </ScrollToTop>
              </CityProvider>
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
