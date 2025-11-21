import { useState } from 'react'
import { apiPost } from '../../lib/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault(); setErr('')
    try{
      const res = await apiPost('/auth/login', { email, password })
      sessionStorage.setItem('access_token', res.access_token)
      navigate('/admin')
    }catch(e){ setErr('Invalid credentials') }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl p-6 shadow">
        <h1 className="text-2xl font-extrabold text-emerald-900 mb-4">Admin Login</h1>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border p-3"/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border p-3"/>
          {err && <div className="text-red-600 text-sm">{err}</div>}
          <button className="w-full px-5 py-3 rounded-full bg-emerald-500 text-white shadow hover:bg-emerald-600">Sign in</button>
        </form>
      </div>
    </div>
  )
}
