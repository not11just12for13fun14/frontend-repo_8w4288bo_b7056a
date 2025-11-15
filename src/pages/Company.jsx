import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api } from '../api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Company(){
  const { id } = useParams()
  const [company, setCompany] = useState(null)
  const [meds, setMeds] = useState([])

  useEffect(()=>{
    api.get('companies').then((cs)=> setCompany(cs.find(c=> String(c.id)===String(id))))
    api.get('medicines').then((ms)=> setMeds(ms.filter(m=> String(m.companyId)===String(id))))
  }, [id])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {company && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <p className="text-gray-700 mb-6">{company.description}</p>
              <div className="overflow-x-auto rounded border">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">Medicine</th>
                      <th className="px-4 py-2 text-left">MGO</th>
                      <th className="px-4 py-2 text-left">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meds.map((m)=> (
                      <tr key={m.id} className="border-t">
                        <td className="px-4 py-2"><a href={`/medicine/${m.id}`} className="text-blue-600 hover:underline">{m.name}</a></td>
                        <td className="px-4 py-2">{m.mgo || '-'}</td>
                        <td className="px-4 py-2">{m.qty || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
