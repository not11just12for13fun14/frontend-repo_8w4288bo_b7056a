import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api } from '../api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Medicine(){
  const { id } = useParams()
  const [medicine, setMedicine] = useState(null)

  useEffect(()=>{
    api.get('medicines').then((ms)=> setMedicine(ms.find(m=> String(m.id)===String(id))))
  }, [id])

  if (!medicine) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-lg bg-gray-100" style={{backgroundImage: medicine.photo? `url(${medicine.photo})` : 'none', backgroundSize:'cover'}} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{medicine.name} <span className="text-gray-500">{medicine.subname}</span></h1>
              {medicine.mgo && <div className="mt-2 text-sm text-gray-600">MGO: {medicine.mgo}</div>}
              {medicine.qty && <div className="text-sm text-gray-600">Quantity: {medicine.qty}</div>}
              <p className="mt-4 text-gray-700">{medicine.description}</p>
              {medicine.usage && (
                <div className="mt-6">
                  <div className="font-medium text-gray-900 mb-1">Usage</div>
                  <p className="text-gray-700 text-sm">{medicine.usage}</p>
                </div>
              )}
              {medicine.sideeffects && (
                <div className="mt-4">
                  <div className="font-medium text-gray-900 mb-1">Side Effects</div>
                  <p className="text-gray-700 text-sm">{medicine.sideeffects}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
