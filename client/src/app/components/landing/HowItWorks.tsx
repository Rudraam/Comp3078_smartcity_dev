import { Search, MapPin, Star } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-white" />,
    step: "01",
    title: "Search Your City",
    description:
      "Enter any city to access real-time weather, pollution data, and local insights.",
  },
  {
    icon: <MapPin className="w-8 h-8 text-white" />,
    step: "02",
    title: "Explore & Navigate",
    description:
      "Discover restaurants, hotels, and events. Get directions with real-time traffic updates.",
  },
  {
    icon: <Star className="w-8 h-8 text-white" />,
    step: "03",
    title: "Experience & Review",
    description:
      "Book reservations, get event tickets, and share your experiences with the community.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#98aab3] max-w-2xl mx-auto">
            Get started in three simple steps and unlock the full potential of
            smart city exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="relative inline-flex mb-6">
                <div className="bg-[#1152d4] rounded-2xl w-20 h-20 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {item.title}
              </h3>
              <p className="text-[#454545] text-sm leading-relaxed max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
