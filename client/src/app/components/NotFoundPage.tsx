import { useNavigate } from "../hooks/router-compat";
import { motion } from "motion/react";
import { MapPin, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] font-['Inter',sans-serif] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center max-w-lg"
      >
        {/* Animated icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 inline-flex"
        >
          <div className="bg-[#1152d4]/20 rounded-full p-6">
            <MapPin className="w-16 h-16 text-[#1152d4]" />
          </div>
        </motion.div>

        <h1 className="text-7xl font-bold text-[#1152d4] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-3">Location Not Found</h2>
        <p className="text-[var(--app-text-muted)] mb-8">
          Looks like this destination doesn't exist on our map. Let's get you
          back to exploring the city.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-[var(--app-card)] hover:bg-[var(--app-card-inner)] transition-colors text-[var(--app-text)] px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}
