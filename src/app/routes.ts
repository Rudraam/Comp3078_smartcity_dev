import { createBrowserRouter } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import RestaurantsPage from "./components/RestaurantsPage";
import HotelsPage from "./components/HotelsPage";
import EventsPage from "./components/EventsPage";
import MapPage from "./components/MapPage";
import ProfilePage from "./components/ProfilePage";
import RedirectionPage from "./components/RedirectionPage";
import NotFoundPage from "./components/NotFoundPage";

export const router = createBrowserRouter([
  {
    Component: ScrollToTop,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/auth",
        Component: AuthPage,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/restaurants",
        Component: RestaurantsPage,
      },
      {
        path: "/hotels",
        Component: HotelsPage,
      },
      {
        path: "/events",
        Component: EventsPage,
      },
      {
        path: "/map",
        Component: MapPage,
      },
      {
        path: "/profile",
        Component: ProfilePage,
      },
      {
        path: "/redirect",
        Component: RedirectionPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
