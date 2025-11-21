import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plane, Menu, Clock3, Star, MapPin, Phone, Mail, Shield } from 'lucide-react'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Offers from './components/Offers'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Login from './components/admin/Login'
import Admin from './components/admin/Admin'
import './index.css'

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-orange-300 flex items-center justify-center shadow-md">
            <Plane className="text-emerald-900" size={18} />
          </div>
          <span className="font-extrabold text-emerald-900 text-lg">GreenSky Travel</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-emerald-900/80">
          {[
            ['Home','/'], ['About','/about'], ['Services','/services'], ['Offers','/offers'], ['Testimonials','/testimonials'], ['Blog','/blog'], ['FAQ','/faq'], ['Contact','/contact']
          ].map(([label, path]) => (
            <NavLink key={path} to={path} className={({isActive})=>`hover:text-emerald-900 transition ${isActive?'text-emerald-900 font-semibold':''}`}>{label}</NavLink>
          ))}
          <Link to="/login" className="ml-4 px-4 py-2 rounded-full bg-emerald-500 text-white shadow hover:bg-emerald-600">Admin</Link>
        </nav>
        <button className="md:hidden" onClick={()=>setOpen(!open)}>
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {[
            ['Home','/'], ['About','/about'], ['Services','/services'], ['Offers','/offers'], ['Testimonials','/testimonials'], ['Blog','/blog'], ['FAQ','/faq'], ['Contact','/contact']
          ].map(([label, path]) => (
            <NavLink key={path} to={path} onClick={()=>setOpen(false)} className={({isActive})=>`block py-2 rounded-xl px-3 bg-white shadow ${isActive?'text-emerald-700':''}`}>{label}</NavLink>
          ))}
          <Link to="/login" onClick={()=>setOpen(false)} className="block py-2 rounded-xl px-3 bg-emerald-500 text-white shadow">Admin</Link>
        </div>
      )}
    </header>
  )
}

function GradientBg({children}){
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-orange-50 to-white">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(800px_300px_at_10%_10%,rgba(16,185,129,.25),transparent),radial-gradient(600px_300px_at_90%_20%,rgba(251,146,60,.25),transparent)]" />
      <div className="absolute inset-0 opacity-50 [mask-image:radial-gradient(white,transparent_70%)]" style={{backgroundImage:'radial-gradient(#ccc_1px,transparent_1px)',backgroundSize:'20px 20px'}}/>
      <div className="relative">{children}</div>
    </div>
  )
}

function Footer(){
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-emerald-900/80">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-orange-300 flex items-center justify-center shadow-md">
              <Plane size={16} />
            </div>
            <span className="font-extrabold text-emerald-900">GreenSky Travel</span>
          </div>
          <p>Friendly UAE visa and travel services. Clean, modern, and fast.</p>
        </div>
        <div>
          <h4 className="font-semibold text-emerald-900 mb-2">Contact</h4>
          <p className="flex items-center gap-2"><Phone size={16}/> +971 50 123 4567</p>
          <p className="flex items-center gap-2"><Mail size={16}/> hello@greensky.ae</p>
          <p className="flex items-center gap-2"><MapPin size={16}/> Dubai, UAE</p>
        </div>
        <div>
          <h4 className="font-semibold text-emerald-900 mb-2">Security</h4>
          <p className="flex items-center gap-2"><Shield size={16}/> Secure JWT auth with refresh</p>
          <p className="text-sm">HTTPS enforced in production</p>
        </div>
        <div>
          <h4 className="font-semibold text-emerald-900 mb-2">Hours</h4>
          <p className="flex items-center gap-2"><Clock3 size={16}/> Daily 9:00–19:00</p>
        </div>
      </div>
      <div className="text-center text-sm text-emerald-900/60 py-4 border-t">© {new Date().getFullYear()} GreenSky Travel</div>
    </footer>
  )
}

function App(){
  return (
    <Router>
      <GradientBg>
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/offers" element={<Offers/>} />
            <Route path="/testimonials" element={<Testimonials/>} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/admin" element={<Admin/>} />
          </Routes>
        </main>
        <Footer />
      </GradientBg>
    </Router>
  )
}

export default App
