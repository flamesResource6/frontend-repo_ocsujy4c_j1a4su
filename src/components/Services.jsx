export default function Services(){
  const items = [
    {title:'UAE Visa Services', desc:'Tourist, visit, and employment visa assistance.'},
    {title:'Visa Renewals', desc:'Quick and easy renewals with guidance.'},
    {title:'Oman Border Visa Renewal (by bus)', desc:'Comfortable border runs with coordination.'},
    {title:'Flight Ticket Booking', desc:'Competitive fares and flexible options.'},
    {title:'Holiday Packages to Popular Destinations', desc:'Hand-picked getaways with great value.'},
  ]
  return (
    <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-6">
      {items.map((it)=> (
        <div key={it.title} className="bg-white rounded-3xl p-6 shadow hover:shadow-md">
          <h3 className="font-semibold text-emerald-900">{it.title}</h3>
          <p className="text-emerald-900/70">{it.desc}</p>
        </div>
      ))}
    </div>
  )
}