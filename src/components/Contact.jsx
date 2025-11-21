import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Contact(){
  const [form, setForm] = useState({full_name:'', phone:'', email:'', message:''})
  const [ok, setOk] = useState(false)

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await apiPost('/contact', form)
      setOk(true)
      setForm({full_name:'', phone:'', email:'', message:''})
    }catch(err){ alert('Failed to send. Please try again.') }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl font-extrabold text-emerald-900 mb-4">Contact Us</h1>
        <p className="text-emerald-900/80 mb-6">We usually reply within a few hours.</p>
        <form onSubmit={submit} className="bg-white rounded-3xl p-6 shadow space-y-4">
          <input className="w-full rounded-xl border p-3" placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} required />
          <div className="grid grid-cols-2 gap-3">
            <input className="w-full rounded-xl border p-3" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
            <input className="w-full rounded-xl border p-3" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          </div>
          <textarea className="w-full rounded-xl border p-3" rows="5" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
          <button className="px-5 py-3 rounded-full bg-emerald-500 text-white shadow hover:bg-emerald-600">Send message</button>
          {ok && <div className="text-emerald-700">Thanks! We received your message.</div>}
        </form>
      </div>
      <div>
        <iframe title="map" className="w-full h-[480px] rounded-3xl shadow" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115697.45128040448!2d55.1371063!3d25.1011414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6c1fc97e6e19%3A0xf9e205f74b82a71e!2sDubai!5e0!3m2!1sen!2sae!4v1700000000000" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}
