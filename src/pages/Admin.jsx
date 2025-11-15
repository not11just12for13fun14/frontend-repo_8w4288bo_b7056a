import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api } from '../api'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, Input, Label, Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui'

function countBy(list, key){
  return list.reduce((acc, item)=> {
    const k = item[key]
    acc[k] = (acc[k]||0)+1
    return acc
  }, {})
}

export default function Admin(){
  const [auth, setAuth] = useState(false)
  const [login, setLogin] = useState({ username: '', password: '' })

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [companies, setCompanies] = useState([])
  const [medicines, setMedicines] = useState([])

  const [openCompany, setOpenCompany] = useState(false)
  const [companyForm, setCompanyForm] = useState({ photo:'', name:'', description:'', categoryId: '', subcategoryId: '' })

  const [openMedicine, setOpenMedicine] = useState(false)
  const [medicineForm, setMedicineForm] = useState({ companyId:'', photo:'', name:'', subname:'', description:'', mgo:'', qty:'', sideeffects:'', usage:'' })

  useEffect(()=>{
    Promise.all([
      api.get('categories'),
      api.get('subcategories'),
      api.get('companies'),
      api.get('medicines')
    ]).then(([c1,c2,c3,c4])=>{
      setCategories(c1)
      setSubcategories(c2)
      setCompanies(c3)
      setMedicines(c4)
    })
  },[])

  const companyCounts = useMemo(()=> countBy(companies, 'categoryId'), [companies])
  const subCounts = useMemo(()=> countBy(companies, 'subcategoryId'), [companies])

  const tryLogin = async () => {
    const admins = await api.get('admins')
    const ok = admins.find(a => a.username===login.username && a.password===login.password)
    if (ok) setAuth(true)
    else alert('Invalid credentials')
  }

  const addCategory = async () => {
    const name = prompt('New category name:')
    if (!name) return
    const created = await api.post('categories', { name })
    setCategories([...categories, created])
  }

  const addSubcategory = async (categoryId) => {
    const name = prompt('New subcategory name:')
    if (!name) return
    const created = await api.post('subcategories', { name, categoryId })
    setSubcategories([...subcategories, created])
  }

  const createCompany = async () => {
    const payload = { ...companyForm, categoryId: Number(companyForm.categoryId), subcategoryId: Number(companyForm.subcategoryId), status: 'active' }
    const created = await api.post('companies', payload)
    setCompanies([...companies, created])
    setOpenCompany(false)
  }

  const createMedicine = async () => {
    const payload = { ...medicineForm, companyId: Number(medicineForm.companyId), status: 'active' }
    const created = await api.post('medicines', payload)
    setMedicines([...medicines, created])
    setOpenMedicine(false)
  }

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Super Admin</h1>
          <p className="text-sm text-gray-600 mb-4">Sign in to manage content</p>
          <div className="space-y-3">
            <div>
              <Label>Username</Label>
              <Input value={login.username} onChange={(e)=> setLogin({...login, username: e.target.value})} />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" value={login.password} onChange={(e)=> setLogin({...login, password: e.target.value})} />
            </div>
            <Button onClick={tryLogin} className="w-full">Login</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h1>

          <Tabs defaultValue="companies">
            <TabsList>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="medicines">Medicines</TabsTrigger>
              <TabsTrigger value="taxonomy">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="companies">
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">Categories: {categories.length} • Subcategories: {subcategories.length} • Companies: {companies.length}</div>
                <div className="flex gap-2">
                  <Button onClick={()=> setOpenCompany(true)}>Add Company</Button>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto rounded border border-gray-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Subcategory</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c)=> (
                      <tr key={c.id} className="border-t">
                        <td className="px-4 py-2">{c.name}</td>
                        <td className="px-4 py-2">{categories.find(x=> x.id===c.categoryId)?.name}</td>
                        <td className="px-4 py-2">{subcategories.find(x=> x.id===c.subcategoryId)?.name}</td>
                        <td className="px-4 py-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status==='active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Dialog open={openCompany} onOpenChange={setOpenCompany}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Company</DialogTitle>
                    <DialogDescription>Create a new company entry</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Photo URL</Label>
                      <Input value={companyForm.photo} onChange={(e)=> setCompanyForm({...companyForm, photo: e.target.value})} />
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input value={companyForm.name} onChange={(e)=> setCompanyForm({...companyForm, name: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Input value={companyForm.description} onChange={(e)=> setCompanyForm({...companyForm, description: e.target.value})} />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <select className="w-full rounded-md border px-3 py-2" value={companyForm.categoryId} onChange={(e)=> setCompanyForm({...companyForm, categoryId: e.target.value})}>
                        <option value="">Select</option>
                        {categories.filter(c=> c.name!=='All').map((c)=> (
                          <option key={c.id} value={c.id}>{c.name} ({companyCounts[c.id]||0})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Subcategory</Label>
                      <select className="w-full rounded-md border px-3 py-2" value={companyForm.subcategoryId} onChange={(e)=> setCompanyForm({...companyForm, subcategoryId: e.target.value})}>
                        <option value="">Select</option>
                        {subcategories.filter(s=> String(s.categoryId)===String(companyForm.categoryId)).map((s)=> (
                          <option key={s.id} value={s.id}>{s.name} ({subCounts[s.id]||0})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <Button onClick={()=> setOpenCompany(false)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</Button>
                    <Button onClick={createCompany}>Save</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="medicines">
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">Total medicines: {medicines.length}</div>
                <Button onClick={()=> setOpenMedicine(true)}>Add Medicine</Button>
              </div>

              <div className="mt-4 overflow-x-auto rounded border border-gray-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Company</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((m)=> (
                      <tr key={m.id} className="border-t">
                        <td className="px-4 py-2">{m.name}</td>
                        <td className="px-4 py-2">{companies.find(c=> c.id===m.companyId)?.name}</td>
                        <td className="px-4 py-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${m.status==='active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{m.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Dialog open={openMedicine} onOpenChange={setOpenMedicine}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Medicine</DialogTitle>
                    <DialogDescription>Create a new medicine entry</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company</Label>
                      <select className="w-full rounded-md border px-3 py-2" value={medicineForm.companyId} onChange={(e)=> setMedicineForm({...medicineForm, companyId: e.target.value})}>
                        <option value="">Select</option>
                        {companies.map((c)=> (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Photo URL</Label>
                      <Input value={medicineForm.photo} onChange={(e)=> setMedicineForm({...medicineForm, photo: e.target.value})} />
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input value={medicineForm.name} onChange={(e)=> setMedicineForm({...medicineForm, name: e.target.value})} />
                    </div>
                    <div>
                      <Label>Subname</Label>
                      <Input value={medicineForm.subname} onChange={(e)=> setMedicineForm({...medicineForm, subname: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Input value={medicineForm.description} onChange={(e)=> setMedicineForm({...medicineForm, description: e.target.value})} />
                    </div>
                    <div>
                      <Label>MGO</Label>
                      <Input value={medicineForm.mgo} onChange={(e)=> setMedicineForm({...medicineForm, mgo: e.target.value})} />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input value={medicineForm.qty} onChange={(e)=> setMedicineForm({...medicineForm, qty: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Side Effects</Label>
                      <Input value={medicineForm.sideeffects} onChange={(e)=> setMedicineForm({...medicineForm, sideeffects: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Usage</Label>
                      <Input value={medicineForm.usage} onChange={(e)=> setMedicineForm({...medicineForm, usage: e.target.value})} />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <Button onClick={()=> setOpenMedicine(false)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</Button>
                    <Button onClick={createMedicine}>Save</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="taxonomy">
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">Manage categories and subcategories</div>
                <div className="flex gap-2">
                  <Button onClick={addCategory}>Add Category</Button>
                </div>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                {categories.filter(c=> c.name!=='All').map((cat)=> (
                  <div key={cat.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{cat.name}</div>
                      <Button onClick={()=> addSubcategory(cat.id)} className="bg-gray-900 hover:bg-black">Add Sub-tab</Button>
                    </div>
                    <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
                      {subcategories.filter(s=> s.categoryId===cat.id).map((s)=> (
                        <li key={s.id}>{s.name} <span className="text-gray-500">({subCounts[s.id]||0})</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  )
}
