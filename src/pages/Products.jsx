import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui'
import { api } from '../api'
import { useEffect, useMemo, useState } from 'react'

export default function Products(){
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [companies, setCompanies] = useState([])
  const [activeTab, setActiveTab] = useState('All')
  const [activeSub, setActiveSub] = useState(null)

  useEffect(() => {
    Promise.all([
      api.get('categories'),
      api.get('subcategories'),
      api.get('companies')
    ]).then(([c1, c2, c3]) => {
      setCategories(c1)
      setSubcategories(c2)
      setCompanies(c3)
    })
  }, [])

  const activeCategory = useMemo(() => categories.find(c => c.name===activeTab), [categories, activeTab])
  const subsForActive = useMemo(() => subcategories.filter(s => s.categoryId === (activeCategory?.id || -1)), [subcategories, activeCategory])

  const filteredCompanies = useMemo(() => {
    return companies.filter(c => {
      const byCat = activeCategory?.name === 'All' ? true : c.categoryId === activeCategory?.id
      const bySub = activeSub ? c.subcategoryId === activeSub : true
      return byCat && bySub
    })
  }, [companies, activeCategory, activeSub])

  useEffect(() => {
    setActiveSub(null)
  }, [activeTab])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.name}>{cat.name}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeTab}>
              {subsForActive.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {subsForActive.map((s)=> (
                    <button key={s.id} onClick={()=> setActiveSub(s.id)} className={`rounded-full border px-3 py-1 text-sm ${activeSub===s.id? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700'}`}>{s.name}</button>
                  ))}
                  {activeSub && (
                    <button onClick={()=> setActiveSub(null)} className="rounded-full border px-3 py-1 text-sm bg-white text-gray-700">Clear</button>
                  )}
                </div>
              )}

              <div className="mt-6 overflow-x-auto rounded border border-gray-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">Company</th>
                      <th className="px-4 py-2 text-left">Description</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Subcategory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((c)=> (
                      <tr key={c.id} className="border-t">
                        <td className="px-4 py-2">{c.name}</td>
                        <td className="px-4 py-2 text-gray-600">{c.description}</td>
                        <td className="px-4 py-2">{categories.find(x=> x.id===c.categoryId)?.name || '-'}</td>
                        <td className="px-4 py-2">{subcategories.find(x=> x.id===c.subcategoryId)?.name || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  )
}
