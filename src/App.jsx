import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Verticals from './components/Verticals'
import DigitalThread from './components/DigitalThread'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MilestonePopup from './components/MilestonePopup'
import TaglineStrip from './components/TaglineStrip'

// import Products from './pages/Products'
// import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Solutions from './pages/Solutions'
import Manufacturing from './pages/Manufacturing'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    const id = location.state?.scrollTo
    if (!id) return
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => clearTimeout(timer)
  }, [location.state])

  return (
    <>
      <MilestonePopup />
      <Hero />
      <Stats />
      <TaglineStrip />
      <Verticals />
      <DigitalThread />
{/* <section id="clients"><Clients /></section>
      <TestimonialCTA />
      <section id="contact"><Contact /></section> */}
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
