import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Company from './pages/Company'
import Medicine from './pages/Medicine'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/company/:id" element={<Company />} />
      <Route path="/medicine/:id" element={<Medicine />} />
    </Routes>
  )
}

export default App
