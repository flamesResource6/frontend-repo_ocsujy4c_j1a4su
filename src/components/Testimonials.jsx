import { useEffect, useRef, useState } from 'react'
import { apiGet } from '../lib/api'

export default function Testimonials(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/testimonials').then(setItems).catch(()=>setItems([])) },[])
  const track = useRef(null)
  useEffect(()=>{
    let x=0; const el = track.current; if(!el) return
    const id = setInterval(()=>{ x = (x-1) % (el.scrollWidth); el.scrollLeft = -x; }, 30)
    return ()=>clearInterval(id)
  },[items])

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-extrabold text-emerald-900 mb-6">Happy travelers</h1>
      <div ref={track} className="overflow-x-auto whitespace-nowrap no-scrollbar">
        {items.length===0 && <div className="text-emerald-900/70">No testimonials yet.</div>}
        {items.map((t,i)=> (
          <div key={i} className="inline-block align-top w-80 mr-4 bg-white rounded-3xl p-5 shadow">
            <div className="flex items-center gap-3 mb-2">
              <img src={t.avatar_url || 'https://i.pravatar.cc/100'} alt="avatar" className="w-12 h-12 rounded-full"/>
              <div>
                <div className="font-semibold text-emerald-900">{t.name}</div>
                <div className="text-emerald-700">{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
              </div>
            </div>
            <p className="text-emerald-900/80">{t.quote}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
