import { useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, apiDelete, refreshAccessToken } from '../../lib/api'

function useAuth(){
  const [token, setToken] = useState(sessionStorage.getItem('access_token'))
  const refresh = async()=>{
    try{ const r = await refreshAccessToken(); sessionStorage.setItem('access_token', r.access_token); setToken(r.access_token) }catch(e){ setToken(null) }
  }
  return { token, refresh }
}

export default function Admin(){
  const { token, refresh } = useAuth()
  const [tab, setTab] = useState('offers')

  useEffect(()=>{ if(!token) refresh() },[])

  if(!token) return <div className="max-w-xl mx-auto px-4 py-14">Please login again.</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-emerald-900 mb-6">Admin Panel</h1>
      <div className="flex gap-2 mb-6">
        {['offers','testimonials','packages','blog','services','contacts'].map(t=> (
          <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full ${tab===t?'bg-emerald-500 text-white':'bg-white shadow'}`}>{t}</button>
        ))}
      </div>
      {tab==='offers' && <OffersTab token={token} />}
      {tab==='testimonials' && <TestimonialsTab token={token} />}
      {tab==='packages' && <PackagesTab token={token} />}
      {tab==='blog' && <BlogTab token={token} />}
      {tab==='services' && <ServicesTab token={token} />}
      {tab==='contacts' && <ContactsExport token={token} />}
    </div>
  )
}

function OffersTab({token}){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({title:'', image_url:'', description:'', expires_at:''})
  const load = async()=> setItems(await apiGet('/offers'))
  useEffect(()=>{ load() },[])
  const add = async()=>{ await apiPost('/admin/offers', {...form, active:true}, token); setForm({title:'', image_url:'', description:'', expires_at:''}); load() }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl p-5 shadow">
        <h3 className="font-semibold mb-3">Add Offer</h3>
        <input className="w-full border rounded p-2 mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Expires at (YYYY-MM-DDTHH:MM:SSZ)" value={form.expires_at} onChange={e=>setForm({...form, expires_at:e.target.value})}/>
        <textarea className="w-full border rounded p-2 mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <button onClick={add} className="px-4 py-2 rounded bg-emerald-500 text-white">Save</button>
      </div>
      <div>
        {items.map(it=> (
          <div key={it.title} className="bg-white rounded-3xl p-4 shadow mb-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm">{it.expires_at}</div>
            </div>
            <button onClick={async()=>{await apiDelete(`/admin/offers/${encodeURIComponent(it.title)}`, token); load()}} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialsTab({token}){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({name:'', avatar_url:'', rating:5, quote:''})
  const load = async()=> setItems(await apiGet('/testimonials'))
  useEffect(()=>{ load() },[])
  const add = async()=>{ await apiPost('/admin/testimonials', form, token); setForm({name:'', avatar_url:'', rating:5, quote:''}); load() }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl p-5 shadow">
        <h3 className="font-semibold mb-3">Add Testimonial</h3>
        <input className="w-full border rounded p-2 mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Avatar URL" value={form.avatar_url} onChange={e=>setForm({...form, avatar_url:e.target.value})}/>
        <input type="number" className="w-full border rounded p-2 mb-2" placeholder="Rating (1-5)" value={form.rating} onChange={e=>setForm({...form, rating:Number(e.target.value)})}/>
        <textarea className="w-full border rounded p-2 mb-2" placeholder="Quote" value={form.quote} onChange={e=>setForm({...form, quote:e.target.value})}/>
        <button onClick={add} className="px-4 py-2 rounded bg-emerald-500 text-white">Save</button>
      </div>
      <div>
        {items.map(it=> (
          <div key={it.name} className="bg-white rounded-3xl p-4 shadow mb-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm">{it.rating}★</div>
            </div>
            <button onClick={async()=>{await apiDelete(`/admin/testimonials/${encodeURIComponent(it.name)}`, token); load()}} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function PackagesTab({token}){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({title:'', slug:'', image_url:'', price:0, highlights:''})
  const load = async()=> setItems(await apiGet('/packages'))
  useEffect(()=>{ load() },[])
  const add = async()=>{ const payload = {...form, highlights: form.highlights.split('|').map(s=>s.trim())}; await apiPost('/admin/packages', payload, token); setForm({title:'', slug:'', image_url:'', price:0, highlights:''}); load() }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl p-5 shadow">
        <h3 className="font-semibold mb-3">Add Package</h3>
        <input className="w-full border rounded p-2 mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Slug" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})}/>
        <input type="number" className="w-full border rounded p-2 mb-2" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Highlights (separate with |)" value={form.highlights} onChange={e=>setForm({...form, highlights:e.target.value})}/>
        <button onClick={add} className="px-4 py-2 rounded bg-emerald-500 text-white">Save</button>
      </div>
      <div>
        {items.map(it=> (
          <div key={it.slug} className="bg-white rounded-3xl p-4 shadow mb-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm">{it.price} {it.currency}</div>
            </div>
            <button onClick={async()=>{await apiDelete(`/admin/packages/${encodeURIComponent(it.slug)}`, token); load()}} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function BlogTab({token}){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({title:'', slug:'', excerpt:'', content:'', image_url:'', published:true})
  const load = async()=> setItems(await apiGet('/blog'))
  useEffect(()=>{ load() },[])
  const add = async()=>{ await apiPost('/admin/blog', {...form, published_at:new Date().toISOString()}, token); setForm({title:'', slug:'', excerpt:'', content:'', image_url:'', published:true}); load() }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl p-5 shadow">
        <h3 className="font-semibold mb-3">Add Post</h3>
        <input className="w-full border rounded p-2 mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Slug" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})}/>
        <textarea className="w-full border rounded p-2 mb-2" placeholder="Excerpt" value={form.excerpt} onChange={e=>setForm({...form, excerpt:e.target.value})}/>
        <textarea className="w-full border rounded p-2 mb-2" placeholder="Content" value={form.content} onChange={e=>setForm({...form, content:e.target.value})}/>
        <button onClick={add} className="px-4 py-2 rounded bg-emerald-500 text-white">Publish</button>
      </div>
      <div>
        {items.map(it=> (
          <div key={it.slug} className="bg-white rounded-3xl p-4 shadow mb-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm">{new Date(it.published_at||Date.now()).toLocaleDateString()}</div>
            </div>
            <button onClick={async()=>{await apiDelete(`/admin/blog/${encodeURIComponent(it.slug)}`, token); load()}} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServicesTab({token}){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({title:'', slug:'', description:'', icon:'', content:'', featured:false, order:0})
  const load = async()=> setItems(await apiGet('/services'))
  useEffect(()=>{ load() },[])
  const add = async()=>{ await apiPost('/admin/services', form, token); setForm({title:'', slug:'', description:'', icon:'', content:'', featured:false, order:0}); load() }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl p-5 shadow">
        <h3 className="font-semibold mb-3">Add Service</h3>
        <input className="w-full border rounded p-2 mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input className="w-full border rounded p-2 mb-2" placeholder="Slug" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})}/>
        <textarea className="w-full border rounded p-2 mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <button onClick={add} className="px-4 py-2 rounded bg-emerald-500 text-white">Save</button>
      </div>
      <div>
        {items.map(it=> (
          <div key={it.slug} className="bg-white rounded-3xl p-4 shadow mb-3 flex items-center justify-between">
            <div className="font-semibold">{it.title}</div>
            <button onClick={async()=>{await apiDelete(`/admin/services/${encodeURIComponent(it.slug)}`, token); load()}} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactsExport({token}){
  const exportCsv = ()=>{ window.location.href = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/admin/contacts/export` }
  return (
    <div className="bg-white rounded-3xl p-5 shadow">
      <p className="mb-3">Download received contact submissions as CSV.</p>
      <button onClick={exportCsv} className="px-4 py-2 rounded bg-emerald-500 text-white">Export CSV</button>
    </div>
  )
}
