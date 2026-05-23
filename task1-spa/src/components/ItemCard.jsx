import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

/**
 * ItemCard — a reusable card for any catalogue entry
 * (product, workshop, or event).
 *
 * Props:
 *   item       — the data object (id, name, image, price, …)
 *   variant    — 'product' | 'workshop' | 'event' (controls badge colour)
 *   linkPrefix — route prefix for the detail link (default '/item')
 */
export default function ItemCard({ item, variant = 'product', linkPrefix = '/item' }) {
  const { t } = useApp()

  const badgeClass =
    variant === 'workshop' ? 'badge-earth'
    : variant === 'event'  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium'
    : 'badge'

  return (
    <article className="card-interactive flex flex-col">
      <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-lg font-bold font-heading">{item.name}</h3>
        {item.tags?.[0] && <span className={badgeClass}>{item.tags[0]}</span>}
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
        {item.shortDesc}
      </p>

      {item.date && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          📅 {item.date} · 📍 {item.location}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2">
        <div>
          <span className="text-2xl font-bold text-harvest-600 dark:text-harvest-400">
            {item.price === 0 ? 'Free' : `$${item.price}`}
          </span>
          {item.price > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {item.unit}
            </span>
          )}
        </div>
        <Link
          to={`${linkPrefix}/${item.id}`}
          className="btn-primary !py-2 !px-4 text-sm"
          aria-label={`View details of ${item.name}`}
        >
          {t.catalogue.view}
        </Link>
      </div>
    </article>
  )
}
