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
import { mockServices, type Service } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";

const CATEGORIES = ["Social Media & Content", "Creative Production", "Web & E-commerce", "Paid Ads & Performance", "Digital Marketing", "Printing & Branding", "Courses & Training"];

const emptyForm: Omit<Service, "id"> = { title: "", category: CATEGORIES[0], shortDescription: "", fullDescription: "", icon: "", featured: false, displayOrder: 1 };

export default function AdminServices() {
  const { toast } = useToast();
  const [services, setServices] = useLocalStorage<Service[]>('admin_services', mockServices);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(emptyForm);

  const filtered = services.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  }

  function openEdit(service: Service) {
    setEditingId(service.id);
    setForm({ title: service.title, category: service.category, shortDescription: service.shortDescription, fullDescription: service.fullDescription, icon: service.icon, featured: service.featured, displayOrder: service.displayOrder });
    setIsFormOpen(true);
  }

  function handleSave() {
    if (!form.title.trim()) { toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" }); return; }
    if (editingId !== null) {
      setServices(prev => prev.map(s => s.id === editingId ? { ...s, ...form } : s));
      toast({ title: "Service updated", description: `"${form.title}" has been updated.` });
    } else {
      const newId = Math.max(0, ...services.map(s => s.id)) + 1;
      setServices(prev => [...prev, { id: newId, ...form }]);
      toast({ title: "Service added", description: `"${form.title}" has been added.` });
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    if (deleteId === null) return;
    const svc = services.find(s => s.id === deleteId);
    setServices(prev => prev.filter(s => s.id !== deleteId));
    toast({ title: "Service deleted", description: `"${svc?.title}" has been removed.` });
    setIsDeleteOpen(false);
    setDeleteId(null);
  }

  return (
    <AdminLayout title="Services Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500" />
          </div>
          <Button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            <Plus size={16} /> Add Service
          </Button>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 text-left">
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-500">No services found.</td></tr>
              ) : filtered.map(service => (
                <tr key={service.id} className="bg-slate-900 hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-slate-300">{service.displayOrder}</td>
                  <td className="px-4 py-3 text-white font-medium">{service.title}</td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{service.category}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {service.featured ? <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 gap-1"><Star size={10} /> Featured</Badge> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(service)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0"><Pencil size={14} /></Button>
                      <Button size="sm" variant="ghost" onClick={() => { setDeleteId(service.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"><Trash2 size={14} /></Button>
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
          <DialogHeader><DialogTitle>{editingId !== null ? "Edit Service" : "Add New Service"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-slate-300">Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="Service title" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300">Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">{CATEGORIES.map(c => <SelectItem key={c} value={c} className="text-white hover:bg-slate-700">{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300">Short Description</Label>
              <Textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={2} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300">Full Description</Label>
              <Textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-300">Icon Name</Label>
                <Input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="e.g. share-2" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Display Order</Label>
                <Input type="number" value={form.displayOrder} onChange={e => setForm(f => ({ ...f, displayOrder: Number(e.target.value) }))} className="bg-slate-800 border-slate-700 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
              <Label htmlFor="featured" className="text-slate-300 cursor-pointer">Mark as Featured</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">Cancel</Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">{editingId !== null ? "Save Changes" : "Add Service"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">Are you sure you want to delete this service? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
