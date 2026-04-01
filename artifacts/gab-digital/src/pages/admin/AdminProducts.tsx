import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockProducts, type Product } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";

const CATEGORIES = ["Templates", "Marketing Resources", "Creative Assets", "Learning Materials", "Business Packs"];
const emptyForm: Omit<Product, "id"> = { name: "", category: CATEGORIES[0], shortDescription: "", fullDescription: "", thumbnail: "", price: 0, oldPrice: undefined, featured: false, downloadUrl: "", tags: [] };

export default function AdminProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useLocalStorage<Product[]>('admin_products', mockProducts);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  function openAdd() { setEditingId(null); setForm(emptyForm); setTagsInput(""); setIsFormOpen(true); }
  function openEdit(p: Product) { setEditingId(p.id); setForm({ name: p.name, category: p.category, shortDescription: p.shortDescription, fullDescription: p.fullDescription, thumbnail: p.thumbnail, price: p.price, oldPrice: p.oldPrice, featured: p.featured, downloadUrl: p.downloadUrl, tags: p.tags }); setTagsInput(p.tags.join(", ")); setIsFormOpen(true); }

  function handleSave() {
    if (!form.name.trim()) { toast({ title: "Validation Error", description: "Product name is required.", variant: "destructive" }); return; }
    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
    if (editingId !== null) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...form, tags } : p));
      toast({ title: "Product updated", description: `"${form.name}" has been updated.` });
    } else {
      const newId = Math.max(0, ...products.map(p => p.id)) + 1;
      setProducts(prev => [...prev, { id: newId, ...form, tags }]);
      toast({ title: "Product added", description: `"${form.name}" has been added.` });
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    if (deleteId === null) return;
    const prod = products.find(p => p.id === deleteId);
    setProducts(prev => prev.filter(p => p.id !== deleteId));
    toast({ title: "Product deleted", description: `"${prod?.name}" has been removed.` });
    setIsDeleteOpen(false);
  }

  return (
    <AdminLayout title="Digital Products Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500" />
          </div>
          <Button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2"><Plus size={16} /> Add Product</Button>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 text-left">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Price (DZD)</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-500">No products found.</td></tr>
              ) : filtered.map(product => (
                <tr key={product.id} className="bg-slate-900 hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{product.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5 hidden sm:block">{product.shortDescription.slice(0, 45)}...</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><Badge variant="outline" className="border-slate-700 text-slate-400">{product.category}</Badge></td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-orange-400 font-semibold">{product.price.toLocaleString()}</span>
                    {product.oldPrice && <span className="text-slate-600 line-through ml-2 text-xs">{product.oldPrice.toLocaleString()}</span>}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {product.featured ? <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 gap-1"><Star size={10} /> Featured</Badge> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(product)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0"><Pencil size={14} /></Button>
                      <Button size="sm" variant="ghost" onClick={() => { setDeleteId(product.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"><Trash2 size={14} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingId !== null ? "Edit Product" : "Add New Product"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5"><Label className="text-slate-300">Product Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" /></div>
            <div className="space-y-1.5">
              <Label className="text-slate-300">Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">{CATEGORIES.map(c => <SelectItem key={c} value={c} className="text-white hover:bg-slate-700">{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label className="text-slate-300">Short Description</Label><Textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={2} /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Full Description</Label><Textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={3} /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Thumbnail URL</Label><Input value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="https://..." /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-slate-300">Price (DZD)</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} className="bg-slate-800 border-slate-700 text-white" /></div>
              <div className="space-y-1.5"><Label className="text-slate-300">Old Price (optional)</Label><Input type="number" value={form.oldPrice ?? ""} onChange={e => setForm(f => ({ ...f, oldPrice: e.target.value ? Number(e.target.value) : undefined }))} className="bg-slate-800 border-slate-700 text-white" /></div>
            </div>
            <div className="space-y-1.5"><Label className="text-slate-300">Download / External URL</Label><Input value={form.downloadUrl} onChange={e => setForm(f => ({ ...f, downloadUrl: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="https://..." /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Tags (comma separated)</Label><Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="bg-slate-800 border-slate-700 text-white" /></div>
            <div className="flex items-center gap-3"><input type="checkbox" id="featured-prod" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-orange-500" /><Label htmlFor="featured-prod" className="text-slate-300 cursor-pointer">Mark as Featured</Label></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">Cancel</Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">{editingId !== null ? "Save Changes" : "Add Product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
          <AlertDialogHeader><AlertDialogTitle>Delete Product</AlertDialogTitle><AlertDialogDescription className="text-slate-400">Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
