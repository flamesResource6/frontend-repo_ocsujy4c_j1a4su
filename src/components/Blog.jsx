import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

export default function Blog(){
  const [posts, setPosts] = useState([])
  useEffect(()=>{ apiGet('/blog').then(setPosts).catch(()=>setPosts([])) },[])
  return (
    <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-6">
      {posts.length===0 && <div className="col-span-full text-emerald-900/70">No posts yet.</div>}
      {posts.map(p=> (
        <article key={p.slug} className="bg-white rounded-3xl shadow overflow-hidden relative">
          <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-lg bg-emerald-500 text-white text-xs">
            {new Date(p.published_at||Date.now()).toLocaleDateString()}
          </div>
          {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover"/>}
          <div className="p-5">
            <h3 className="font-semibold text-emerald-900">{p.title}</h3>
            <p className="text-emerald-900/70">{p.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  )
}