import { useWeather } from '../hooks/useWeather'
import { useApp } from '../context/AppContext'

/**
 * WeatherWidget — shows live weather for our event hub (Colombo by default).
 * Demonstrates external API consumption (Open-Meteo).
 */
export default function WeatherWidget({ lat, lon, locationName = 'Colombo' }) {
  const { t } = useApp()
  const { data, loading, error } = useWeather(lat, lon)

  return (
    <div
      role="region"
      aria-label={t.home.weatherTitle}
      className="card glass max-w-md mx-auto flex items-center gap-4"
    >
      <div className="text-5xl" aria-hidden="true">
        {loading ? '⏳' : error ? '⚠️' : data?.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t.home.weatherTitle}
        </p>
        {loading && <p className="font-semibold">{t.common.loading}</p>}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {t.home.weatherFallback}
          </p>
        )}
        {data && (
          <>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(data.temperature)}°C
              <span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-2">
                {data.description}
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              📍 {locationName} · Wind {Math.round(data.windSpeed)} km/h
            </p>
          </>
        )}
      </div>
    </div>
  )
}
