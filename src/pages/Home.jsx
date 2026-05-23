import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import data from '../data/items.json'
import { useApp } from '../context/AppContext'
import CategoryCard from '../components/CategoryCard'
import ItemCard from '../components/ItemCard'
import WeatherWidget from '../components/WeatherWidget'

export default function Home() {
  const { t } = useApp()
  // Master–detail state: which category is selected on the homepage
  const [activeCat, setActiveCat] = useState(data.categories[0].id)

  // Combine everything into one big pool, then filter
  const allItems = useMemo(
    () => [...data.products, ...data.workshops, ...data.events],
    [],
  )
  const filteredItems = useMemo(
    () => allItems.filter((i) => i.category === activeCat).slice(0, 3),
    [allItems, activeCat],
  )

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-harvest-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="section-container text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 text-gray-900 dark:text-white">
            {t.home.heroLine1}{' '}
            <span className="text-gradient-green">{t.home.heroLine2}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t.home.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/catalogue" className="btn-primary">{t.home.ctaBrowse}</Link>
            <Link to="/booking"   className="btn-outline">{t.home.ctaSubscribe}</Link>
          </div>

          {/* External-API widget */}
          <WeatherWidget />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
            {[
              { num: '5,000+', label: 'Members' },
              { num: '50T',    label: 'CO₂ Saved' },
              { num: '100+',   label: 'Farmers' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-bold text-harvest-600 dark:text-harvest-400 font-heading">
                  {s.num}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASTER–DETAIL: pick category → see items */}
      <section className="section-container">
        <header className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-3">
            {t.home.featuredTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.home.featuredSub}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {data.categories.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              active={activeCat === c.id}
              onClick={setActiveCat}
            />
          ))}
        </div>

        {/* Detail panel — items in the selected category */}
        <div
          aria-live="polite"
          aria-label={`Items in category ${activeCat}`}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((i) => (
            <ItemCard key={i.id} item={i} variant={
              i.category === 'education' ? 'workshop'
              : i.category === 'events'  ? 'event'
              : 'product'
            } />
          ))}
          {filteredItems.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-8">
              {t.catalogue.noResults}
            </p>
          )}
        </div>

        <div className="text-center mt-10">
          <Link to="/catalogue" className="btn-secondary">
            See full catalogue →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-harvest-600 text-white">
        <div className="section-container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg sm:text-xl text-harvest-100 mb-8">
            Join thousands of eco-conscious people reducing their footprint.
          </p>
          <Link
            to="/booking"
            className="inline-block bg-white text-harvest-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-harvest-50 transition-all hover:scale-105"
          >
            {t.home.ctaSubscribe}
          </Link>
        </div>
      </section>
    </>
  )
}
