import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { api } from '../api'
import { useEffect, useState } from 'react'

export default function Home(){
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    api.get('companies').then(setCompanies)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Companies</h2>
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c)=> (
                  <tr key={c.id} className="border-t">
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2 text-gray-600">{c.description}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status==='active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Google Reviews</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1,2,3].map((i)=> (
                <div key={i} className="rounded-lg border bg-white p-4 text-sm text-gray-700 shadow-sm">
                  <p className="italic">“Amazing quality and prompt support!”</p>
                  <div className="mt-3 text-xs text-gray-500">— Customer {i}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
