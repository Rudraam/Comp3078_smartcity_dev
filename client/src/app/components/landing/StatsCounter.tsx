interface StatCounterItem {
  value: string;
  label: string;
}

const counters: StatCounterItem[] = [
  { value: "50+", label: "Cities Covered" },
  { value: "1.2M", label: "Active Users" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Real-Time Data" },
];

export default function StatsCounter() {
  return (
    <section className="py-16 px-8 bg-[#1152d4]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {counters.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">
              {stat.value}
            </p>
            <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
