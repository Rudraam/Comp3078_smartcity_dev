import imgPedroLastraNyvq2Juw4OUnsplash1 from "../../assets/62dc7a1487c1792e6c0d3b7b27e5e8f649bdb796.png";
import { useNavigate } from "../hooks/router-compat";
import { motion } from "motion/react";
import {
  MapPinIcon,
  LightningIcon,
  ShieldIcon,
  UsersIcon,
} from "./landing/LandingIcons";
import StatsCounter from "./landing/StatsCounter";
import HowItWorks from "./landing/HowItWorks";
import TestimonialCard from "./landing/TestimonialCard";
import LandingFooter from "./landing/LandingFooter";
import { testimonials } from "../data/landing-data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const features = [
  {
    icon: <MapPinIcon />,
    title: "Smart Navigation",
    description: "Real time city exploration with live data",
  },
  {
    icon: <LightningIcon />,
    title: "Live Updates",
    description: "Weather, pollution, and events in real time",
  },
  {
    icon: <UsersIcon />,
    title: "Community Driven",
    description: "Reviews and recommendations from locals",
  },
  {
    icon: <ShieldIcon />,
    title: "Trusted Data",
    description: "Verified information from reliable sources",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa] font-['Inter',sans-serif]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={imgPedroLastraNyvq2Juw4OUnsplash1}
            alt="City skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center px-8 max-w-7xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 drop-shadow-lg">
            Explore Smart Cities
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-12 drop-shadow-lg max-w-5xl mx-auto leading-relaxed">
            Discover comprehensive city information including weather, pollution
            levels, events, transportation, restaurants, and hotels - all in one
            place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate("/auth")}
              className="bg-[#1152d4] hover:bg-[#0d3fa3] transition-colors text-white px-12 py-6 rounded-[40px] text-2xl md:text-3xl lg:text-4xl font-bold shadow-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#2c2c2c] hover:bg-[#1a1a1a] transition-colors text-white px-12 py-6 rounded-[40px] text-2xl md:text-3xl lg:text-4xl font-bold shadow-lg"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/80 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* Features Section */}
      <section id="features" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Why Choose Smart City Explorer?
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-[#98aab3] font-light max-w-4xl mx-auto">
              Experience cities like never before with our comprehensive
              platform designed for modern travelers and residents.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#f5f5f5] rounded-[30px] shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="bg-[#1152d4] rounded-[30px] w-32 h-32 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg md:text-xl text-[#454545]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* CTA Banner */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759210720487-c74d9764da79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
            alt="City at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1152d4]/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Explore?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join over a million users who are already experiencing cities in a
            smarter way. Sign up today and start exploring.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-white hover:bg-gray-100 transition-colors text-[#1152d4] px-10 py-4 rounded-full text-lg font-bold shadow-lg"
          >
            Get Started For Free
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-[#98aab3] max-w-2xl mx-auto">
              Trusted by travelers, residents, and businesses worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <LandingFooter />
    </div>
  );
}
