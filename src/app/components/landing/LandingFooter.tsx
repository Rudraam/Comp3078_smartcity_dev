import { useNavigate } from "react-router";

export default function LandingFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#1a1d26] text-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-xl font-bold mb-1 cursor-pointer hover:text-[#1152d4] transition-colors"
              onClick={() => navigate("/")}
            >
              Smart City Explorer
            </h3>
            <p className="text-[#99a1af] text-sm">
              Discover, navigate, and experience cities smarter.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-[#99a1af] hover:text-white text-sm transition-colors">
              About
            </button>
            <button className="text-[#99a1af] hover:text-white text-sm transition-colors">
              Contact
            </button>
            <button className="text-[#99a1af] hover:text-white text-sm transition-colors">
              Privacy
            </button>
            <button className="text-[#99a1af] hover:text-white text-sm transition-colors">
              Terms
            </button>
          </div>
        </div>

        <div className="border-t border-[#2a2e3a] mt-8 pt-6 text-center">
          <p className="text-[#6b7280] text-xs">
            2026 Smart City Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
