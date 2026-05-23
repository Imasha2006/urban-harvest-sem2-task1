import data from '../data/items.json'
import { useApp } from '../context/AppContext'
import ItemCard from '../components/ItemCard'
import WeatherWidget from '../components/WeatherWidget'

export default function Events() {
  const { t } = useApp()
  return (
    <section className="section-container">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
          {t.nav.events}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Markets, planting days, and community gatherings.
          Most events are free and family-friendly.
        </p>
        <WeatherWidget />
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.events.map((e) => (
          <ItemCard key={e.id} item={e} variant="event" linkPrefix="/item" />
        ))}
      </div>
    </section>
  )
}
