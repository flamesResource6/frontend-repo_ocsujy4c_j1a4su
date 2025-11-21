import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

function Countdown({expires}){
  const [left, setLeft] = useState(0)
  useEffect(()=>{
    const end = new Date(expires).getTime()
    const t = setInterval(()=> setLeft(Math.max(0, end - Date.now())), 1000)
    return ()=>clearInterval(t)
  },[expires])
  const s = Math.floor(left/1000)
  const d = Math.floor(s/86400)
  const h = Math.floor((s%86400)/3600)
  const m = Math.floor((s%3600)/60)
  const sec = s%60
  return <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">⏳ Ends in {d}d {h}h {m}m {sec}s</div>
}

export default function Offers(){
  const [offers, setOffers] = useState([])
  useEffect(()=>{ apiGet('/offers').then(setOffers).catch(()=>setOffers([])) },[])
  return (
    <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-6">
      {offers.length===0 && (
        <div className="col-span-full text-emerald-900/70">No live offers yet. Add in admin panel.</div>
      )}
      {offers.map(of=> (
        <div key={of.title} className="bg-white rounded-3xl overflow-hidden shadow">
          <img src={of.image_url} alt={of.title} className="w-full h-60 object-cover"/>
          <div className="p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-emerald-900">{of.title}</h3>
              <Countdown expires={of.expires_at}/>
            </div>
            {of.description && <p className="text-emerald-900/70">{of.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}