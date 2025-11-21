import { motion } from 'framer-motion'
import { Plane, Star, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow text-emerald-700 mb-4">
              <Plane size={16}/> Easy UAE Visa & Travel
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-900 leading-tight">
              Smooth journeys, friendly help, modern service
            </h1>
            <p className="mt-4 text-emerald-900/80 text-lg">Visas, renewals, Oman border runs, tickets and holidays — all in one place.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/services" className="px-5 py-3 rounded-full bg-emerald-500 text-white shadow hover:bg-emerald-600">Explore Services</Link>
              <Link to="/offers" className="px-5 py-3 rounded-full bg-white text-emerald-800 shadow hover:shadow-md">View Offers</Link>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop" alt="traveler" className="rounded-3xl shadow-xl"/>
            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-200 to-orange-200 -z-10"/>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-gradient-to-br from-orange-200 to-emerald-100 -z-10"/>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        {["UAE Visa Services","Oman Border Renewal","Holiday Packages"].map((t,i)=> (
          <div key={i} className="bg-white rounded-3xl p-6 shadow hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3"><MapPin/></div>
            <h3 className="font-semibold text-emerald-900">{t}</h3>
            <p className="text-emerald-900/70">Fast, transparent, and hassle-free support.</p>
          </div>
        ))}
      </section>
    </div>
  )
}
