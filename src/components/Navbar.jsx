import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-blue-700 text-lg">Medico</Link>
        <nav className="hidden md:flex gap-6 text-sm text-gray-700">
          <NavLink to="/" className={({isActive})=> isActive? 'text-blue-700 font-semibold' : ''}>Home</NavLink>
          <NavLink to="/about" className={({isActive})=> isActive? 'text-blue-700 font-semibold' : ''}>About</NavLink>
          <NavLink to="/products" className={({isActive})=> isActive? 'text-blue-700 font-semibold' : ''}>Our Products</NavLink>
          <NavLink to="/contact" className={({isActive})=> isActive? 'text-blue-700 font-semibold' : ''}>Contact</NavLink>
          <NavLink to="/admin" className={({isActive})=> isActive? 'text-blue-700 font-semibold' : ''}>Admin</NavLink>
        </nav>
        <button className="md:hidden p-2 rounded hover:bg-gray-100">
          <Menu size={20} />
        </button>
      </div>
    </header>
  )
}
