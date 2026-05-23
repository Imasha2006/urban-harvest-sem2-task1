import { useParams, Link, useNavigate } from 'react-router-dom'
import data from '../data/items.json'
import { useApp } from '../context/AppContext'

export default function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, addToCart } = useApp()

  // Search all three pools for this id
  const item =
    data.products.find((p) => p.id === id) ??
    data.workshops.find((w) => w.id === id) ??
    data.events.find((e) => e.id === id)

  if (!item) {
    return (
      <section className="section-container text-center">
        <h1 className="text-3xl font-bold font-heading mb-4">Item not found</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          The item you’re looking for doesn’t exist or has been removed.
        </p>
        <Link to="/catalogue" className="btn-primary">
          {t.detail.back}
        </Link>
      </section>
    )
  }

  const handleBook = () => {
    addToCart(item.id, 1)
    navigate(`/booking?item=${item.id}`)
  }

  const stockColor =
    item.stock > 10
      ? 'text-harvest-600 dark:text-harvest-400'
      : item.stock > 0
        ? 'text-earth-600 dark:text-earth-400'
        : 'text-red-600'

  return (
    <section className="section-container">
      <Link
        to="/catalogue"
        className="inline-block mb-6 text-harvest-700 dark:text-harvest-400 hover:underline font-semibold"
      >
        {t.detail.back}
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags?.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-3">
            {item.name}
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {item.description}
          </p>

          {item.date && (
            <div className="card mb-6 !p-4">
              <h2 className="font-semibold mb-2">{t.detail.whenWhere}</h2>
              <p className="text-sm">📅 {item.date}</p>
              <p className="text-sm">📍 {item.location}</p>
            </div>
          )}

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold text-harvest-700 dark:text-harvest-400 font-heading">
              {item.price === 0 ? 'Free' : `$${item.price}`}
            </span>
            {item.price > 0 && (
              <span className="text-gray-500 dark:text-gray-400">{item.unit}</span>
            )}
          </div>

          <p className={`text-sm mb-6 font-medium ${stockColor}`}>
            {item.stock > 0
              ? `${item.stock} ${t.detail.stockLeft}`
              : t.detail.outOfStock}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleBook}
              disabled={item.stock === 0}
              className="btn-primary"
            >
              {t.detail.bookNow}
            </button>
            <button
              type="button"
              onClick={() => addToCart(item.id, 1)}
              disabled={item.stock === 0}
              className="btn-outline"
            >
              {t.detail.addCart}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
