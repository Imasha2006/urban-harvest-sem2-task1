import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import Workshops from './pages/Workshops'
import Events from './pages/Events'
import ItemDetail from './pages/ItemDetail'
import Booking from './pages/Booking'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Accessibility: skip-to-content link */}
      <a href="#main" className="skip-link">Skip to main content</a>

      <Navbar />

      <main id="main" className="flex-1">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/catalogue"   element={<Catalogue />} />
          <Route path="/workshops"   element={<Workshops />} />
          <Route path="/events"      element={<Events />} />
          {/* Dynamic master–detail route — required by spec (/products/:id pattern) */}
          <Route path="/item/:id"    element={<ItemDetail />} />
          <Route path="/products/:id" element={<ItemDetail />} />
          <Route path="/booking"     element={<Booking />} />
          <Route path="/about"       element={<About />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
