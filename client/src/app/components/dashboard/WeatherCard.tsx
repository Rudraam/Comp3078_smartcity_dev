import { motion } from "motion/react";
import type { WeatherData } from "../../types";
import { CloudIcon, WindIcon, HumidityIcon } from "./DashboardIcons";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl p-6 mb-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* Weather Conditions */}
        <div>
          <p className="text-[var(--app-text-muted)] text-sm mb-3">
            {"\u26C5"} Weather Conditions
          </p>
          <p className="text-6xl font-normal mb-2">{weather.temperature}°C</p>
          <p className="text-[var(--app-text-muted)]">Feels like {weather.feelsLike}°</p>
        </div>

        {/* Air Quality */}
        <div>
          <p className="text-[var(--app-text-muted)] text-sm mb-3">
            {"\uD83C\uDF0D"} Air Quality
          </p>
          <p className="text-6xl font-normal mb-2">{weather.airQuality}</p>
          <p className={`mb-1 font-medium ${
            weather.airQuality > 200 ? "text-red-700 dark:text-red-400" :
            weather.airQuality > 150 ? "text-red-600 dark:text-red-400" :
            weather.airQuality > 100 ? "text-orange-600 dark:text-orange-400" :
            weather.airQuality > 50 ? "text-amber-600 dark:text-yellow-400" :
            "text-green-700 dark:text-green-400"
          }`}>{weather.airQualityLabel}</p>
          <p className={`text-sm ${
            weather.airQuality > 150 ? "text-red-700 dark:text-red-300" :
            weather.airQuality > 100 ? "text-orange-700 dark:text-orange-300" :
            weather.airQuality > 50 ? "text-amber-700 dark:text-yellow-300" :
            "text-blue-700 dark:text-[#51a2ff]"
          }`}>
            {weather.airQualityDescription}
          </p>
        </div>
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-4">
        <div className="flex flex-col items-center">
          <CloudIcon />
          <p className="text-[var(--app-text-muted)] text-xs mt-2 mb-1">Clouds</p>
          <p className="text-lg">{weather.clouds}%</p>
        </div>
        <div className="flex flex-col items-center">
          <WindIcon />
          <p className="text-[var(--app-text-muted)] text-xs mt-2 mb-1">Wind</p>
          <p className="text-lg">{weather.wind} km/h</p>
        </div>
        <div className="flex flex-col items-center">
          <HumidityIcon />
          <p className="text-[var(--app-text-muted)] text-xs mt-2 mb-1">Humidity</p>
          <p className="text-lg">{weather.humidity}%</p>
        </div>
      </div>

      {/* PM2.5 Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[var(--app-text-muted)] text-xs">PM2.5</p>
          <p className="text-[var(--app-text-muted)] text-xs">{weather.pm25 ?? 0} ug/m3</p>
        </div>
        <div className="w-full bg-[var(--app-card-hover)] rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              (weather.pm25 ?? 0) > 35 ? "bg-gradient-to-r from-orange-500 to-red-400" :
              (weather.pm25 ?? 0) > 12 ? "bg-gradient-to-r from-yellow-500 to-orange-400" :
              "bg-gradient-to-r from-blue-500 to-blue-400"
            }`}
            style={{ width: `${Math.min(((weather.pm25 ?? 0) / 75) * 100, 100)}%` }}
          />
        </div>
      </div>
    </motion.section>
  );
}