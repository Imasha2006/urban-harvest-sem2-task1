export default function CategoryCard({ category, active, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(category.id)}
      aria-pressed={active}
      className={`card-interactive text-left w-full ${
        active ? 'ring-4 ring-harvest-400 border-harvest-500' : ''
      }`}
    >
      <div className="text-4xl mb-3" aria-hidden="true">{category.icon}</div>
      <h3 className="font-heading font-bold text-lg mb-2">{category.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {category.description}
      </p>
    </button>
  )
}
