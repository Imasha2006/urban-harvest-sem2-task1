import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const VALUES = [
  { icon: '🌍', title: 'Environmental Stewardship', body: 'Every decision considers its impact on the planet. Carbon-neutral operations and zero-waste packaging.' },
  { icon: '🤝', title: 'Community First',          body: 'Lasting relationships with local farmers and customers — a network of support that benefits everyone.' },
  { icon: '✨', title: 'Quality & Transparency',   body: 'Open about sourcing, practices, and impact. You deserve to know exactly where your food comes from.' },
]

const TEAM = [
  { initials: 'SK', name: 'Sarah Kumar',    role: 'Founder & CEO',             bio: 'Former agricultural consultant passionate about sustainable food systems.' },
  { initials: 'MJ', name: 'Marcus Johnson', role: 'Head of Farmer Relations',  bio: 'Third-generation farmer bridging producers and consumers.' },
  { initials: 'AL', name: 'Aisha Li',       role: 'Sustainability Director',   bio: 'Environmental scientist keeping operations carbon-neutral.' },
]

export default function About() {
  const { t } = useApp()
  return (
    <>
      <section className="bg-gradient-to-br from-harvest-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="section-container text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6">
            Our Mission:{' '}
            <span className="text-gradient-green">Sustainable Living for All</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Supporting local farmers, reducing waste, and building a greener future — together.
          </p>
        </div>
      </section>

      <section className="section-container max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold font-heading mb-6 text-center">Who We Are</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
          Urban Harvest Hub was born from a simple idea: what if sustainable living
          were easier and more accessible? We saw many people wanting to support local
          farmers and shrink their footprint but struggling to source quality
          eco-friendly products consistently.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Today we partner with 100+ organic farmers within a 50-mile radius, delivering
          fresh produce, hosting workshops, and convening community events.
          Every box, every workshop, every market is a step toward something better.
        </p>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800/50">
        <div className="section-container">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {VALUES.map((v) => (
              <article key={v.title} className="card text-center">
                <div className="text-4xl mb-3" aria-hidden="true">{v.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {TEAM.map((m) => (
            <article key={m.name} className="card text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-harvest-400 to-emerald-500 text-white font-bold text-2xl flex items-center justify-center">
                {m.initials}
              </div>
              <h3 className="font-heading font-bold">{m.name}</h3>
              <p className="text-sm text-harvest-600 dark:text-harvest-400 mb-2">{m.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{m.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-harvest-600 text-white">
        <div className="section-container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg mb-8 text-harvest-100">
            Together we can build something better — one box, one workshop at a time.
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
