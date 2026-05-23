import { useState, useMemo } from 'react'
import data from '../data/items.json'
import { useApp } from '../context/AppContext'
import CategoryFilter from '../components/CategoryFilter'
import ItemCard from '../components/ItemCard'

export default function Catalogue() {
  const { t } = useApp()
  const [filter, setFilter] = useState('all')
  const [query,  setQuery]  = useState('')

  // Only product categories (food/lifestyle) — workshops/events have their own pages
  const productCategories = data.categories.filter(
    (c) => c.id === 'food' || c.id === 'lifestyle',
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.products
      .filter((p) => filter === 'all' || p.category === filter)
      .filter(
        (p) =>
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q),
      )
  }, [filter, query])

  return (
    <section className="section-container">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
          {t.catalogue.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{t.catalogue.sub}</p>
      </header>

      <div className="max-w-md mx-auto mb-6">
        <label htmlFor="search" className="sr-only">Search products</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="input-field"
        />
      </div>

      <CategoryFilter
        categories={productCategories}
        active={filter}
        onChange={setFilter}
        allLabel={t.catalogue.filterAll}
      />

      <div
        aria-live="polite"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((p) => (
          <ItemCard key={p.id} item={p} variant="product" linkPrefix="/item" />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">{t.catalogue.noResults}</p>
      )}
    </section>
  )
}
