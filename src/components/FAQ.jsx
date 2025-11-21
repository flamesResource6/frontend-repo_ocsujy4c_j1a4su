export default function FAQ(){
  const faqs = [
    {q:'How long does a UAE tourist visa take?', a:'Typically 24-72 hours depending on type.'},
    {q:'Can you arrange Oman border runs?', a:'Yes, we coordinate bus renewals with smooth processing.'},
    {q:'Do you book flights?', a:'Yes, we offer competitive fares and flexible options.'},
  ]
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-extrabold text-emerald-900 mb-6">FAQ</h1>
      <div className="space-y-4">
        {faqs.map((f,i)=> (
          <details key={i} className="bg-white rounded-2xl p-4 shadow">
            <summary className="cursor-pointer font-semibold text-emerald-900">{f.q}</summary>
            <p className="text-emerald-900/80 mt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}