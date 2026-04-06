import { useState, useEffect } from "react";
import { useNavigate } from "../hooks/router-compat";
import { motion } from "motion/react";
import { ExternalLink, ArrowLeft } from "lucide-react";

export default function RedirectionPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-[#0f1319] flex flex-col items-center justify-center font-['Inter',sans-serif] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Animated external link icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex mb-8"
        >
          <div className="bg-[#1152d4]/20 rounded-full p-6">
            <ExternalLink className="w-12 h-12 text-[#1152d4]" />
          </div>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--app-text)] mb-4">
          Redirecting You
        </h1>
        <p className="text-[var(--app-text-muted)] mb-8">
          You're being redirected to an external service. This feature connects
          to a third-party platform for bookings, reservations, and more.
        </p>

        {/* Countdown */}
        <div className="mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke="#23262f"
                strokeWidth="4"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke="#1152d4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={220}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 220 }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[var(--app-text)]">
              {countdown}
            </span>
          </div>
          <p className="text-sm text-[#6b7280]">
            {countdown > 0
              ? "Preparing your connection..."
              : "Connection ready!"}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[var(--app-card)] rounded-full h-1.5 mb-8 overflow-hidden">
          <motion.div
            className="bg-[#1152d4] h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>

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
            className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-6 py-3 rounded-lg font-medium"
          >
            Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}
