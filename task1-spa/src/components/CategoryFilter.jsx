export default function CategoryFilter({ categories, active, onChange, allLabel = 'All' }) {
  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="flex flex-wrap gap-2 justify-center mb-8"
    >
      <button
        type="button"
        role="tab"
        aria-selected={active === 'all'}
        onClick={() => onChange('all')}
        className={`px-5 py-2 rounded-full font-semibold transition-colors text-sm ${
          active === 'all'
            ? 'bg-harvest-600 text-white shadow-md'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {allLabel}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-5 py-2 rounded-full font-semibold transition-colors text-sm ${
            active === cat.id
              ? 'bg-harvest-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <span className="mr-1" aria-hidden="true">{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  )
}
