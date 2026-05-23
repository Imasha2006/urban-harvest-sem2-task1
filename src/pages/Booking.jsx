import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import data from '../data/items.json'
import { useApp } from '../context/AppContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Booking() {
  const { t, clearCart } = useApp()
  const [params] = useSearchParams()
  const preselectedId = params.get('item')

  const allItems = useMemo(
    () => [...data.products, ...data.workshops, ...data.events],
    [],
  )

  const [form, setForm] = useState({
    name: '',
    email: '',
    qty: 1,
    itemId: preselectedId ?? allItems[0]?.id ?? '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate(state) {
    const e = {}
    if (!state.name.trim())                 e.name  = t.booking.errors.nameRequired
    if (!state.email.trim())                e.email = t.booking.errors.emailRequired
    else if (!EMAIL_RE.test(state.email))   e.email = t.booking.errors.emailInvalid
    if (Number(state.qty) < 1)              e.qty   = t.booking.errors.qtyMin
    return e
  }

  function handleChange(field, value) {
    const next = { ...form, [field]: value }
    setForm(next)
    if (Object.keys(errors).length) setErrors(validate(next))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setSubmitted(true)
      clearCart()
      // Reset after 4s
      setTimeout(() => setSubmitted(false), 4000)
      setForm({ name: '', email: '', qty: 1, itemId: allItems[0]?.id ?? '', notes: '' })
    }
  }

  return (
    <section className="section-container">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-3">
            {t.booking.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.booking.sub}
          </p>
        </header>

        {submitted && (
          <div
            role="status"
            aria-live="polite"
            className="card !bg-harvest-50 dark:!bg-harvest-900/20 border-harvest-300 dark:border-harvest-700 mb-6 flex gap-3"
          >
            <span className="text-2xl" aria-hidden="true">✅</span>
            <div>
              <p className="font-semibold text-harvest-800 dark:text-harvest-200">
                {t.booking.success}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="card space-y-5">
          {/* Item */}
          <div>
            <label htmlFor="itemId" className="block text-sm font-semibold mb-2">
              {t.booking.item} <span className="text-red-500" aria-label="required">*</span>
            </label>
            <select
              id="itemId"
              value={form.itemId}
              onChange={(e) => handleChange('itemId', e.target.value)}
              className="input-field"
            >
              {allItems.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name} {i.price > 0 ? `— $${i.price}${i.unit}` : '— Free'}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              {t.booking.name} <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="input-field"
              required
            />
            {errors.name && (
              <p id="name-error" role="alert" className="text-red-600 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              {t.booking.email} <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="input-field"
              required
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-red-600 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="qty" className="block text-sm font-semibold mb-2">
              {t.booking.qty} <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              id="qty"
              type="number"
              min="1"
              max="10"
              value={form.qty}
              onChange={(e) => handleChange('qty', e.target.value)}
              aria-invalid={!!errors.qty}
              className="input-field"
              required
            />
            {errors.qty && (
              <p role="alert" className="text-red-600 text-sm mt-1">{errors.qty}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold mb-2">
              {t.booking.notes}
            </label>
            <textarea
              id="notes"
              rows="3"
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="input-field resize-y"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {t.booking.submit}
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            By submitting, you agree to our{' '}
            <Link to="/about" className="underline hover:text-harvest-600">
              terms
            </Link>.
          </p>
        </form>
      </div>
    </section>
  )
}
