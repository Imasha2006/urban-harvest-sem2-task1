import data from '../data/items.json'
import { useApp } from '../context/AppContext'
import ItemCard from '../components/ItemCard'

export default function Workshops() {
  const { t } = useApp()
  return (
    <section className="section-container">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
          {t.nav.workshops}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Hands-on sustainability workshops for every level.
          From composting basics to plant-based cooking, learn skills you’ll use for life.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.workshops.map((w) => (
          <ItemCard key={w.id} item={w} variant="workshop" linkPrefix="/item" />
        ))}
      </div>
    </section>
  )
}
