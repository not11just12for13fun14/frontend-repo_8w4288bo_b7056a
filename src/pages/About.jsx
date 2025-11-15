import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-700 leading-relaxed max-w-3xl">We are a modern healthcare platform focused on transparency and quality in pharmaceuticals. Our mission is to connect professionals and patients with trusted products from verified companies.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
