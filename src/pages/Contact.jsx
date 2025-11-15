import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-700 mb-6">Have questions? Reach out and we'll get back to you soon.</p>
            <form className="space-y-4">
              <input className="w-full rounded border px-3 py-2" placeholder="Name" value={form.name} onChange={(e)=> setForm({...form, name: e.target.value})} />
              <input className="w-full rounded border px-3 py-2" placeholder="Email" value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} />
              <textarea className="w-full rounded border px-3 py-2" rows="5" placeholder="Message" value={form.message} onChange={(e)=> setForm({...form, message: e.target.value})} />
              <button type="button" className="rounded bg-blue-600 text-white px-4 py-2">Send</button>
            </form>
          </div>
          <div>
            <iframe title="map" className="w-full h-80 rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509387!2d144.95373631590477!3d-37.8162797420218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5778f8f3e!2sPharmacy!5e0!3m2!1sen!2s!4v1614590123456!5m2!1sen!2s" allowFullScreen="" loading="lazy"></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
