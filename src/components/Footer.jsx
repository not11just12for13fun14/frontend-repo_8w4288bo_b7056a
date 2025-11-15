export default function Footer(){
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        <div>
          <h4 className="text-gray-900 font-semibold mb-3">Medico</h4>
          <p>Modern healthcare and pharmaceuticals platform.</p>
        </div>
        <div>
          <h4 className="text-gray-900 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-blue-600">About</a></li>
            <li><a href="/products" className="hover:text-blue-600">Our Products</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 font-semibold mb-3">Contact</h4>
          <p>Email: hello@medico.example</p>
          <p>Phone: +1 (555) 010-2025</p>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Medico. All rights reserved.</div>
    </footer>
  )
}
