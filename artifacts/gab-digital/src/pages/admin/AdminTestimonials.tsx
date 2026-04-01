import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockTestimonials, type Testimonial } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

const emptyForm: Omit<Testimonial, "id"> = { clientName: "", businessName: "", text: "", image: "", rating: 5, serviceUsed: "" };

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} />)}
    </div>
  );
}

export default function AdminTestimonials() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(emptyForm);

  function openAdd() { setEditingId(null); setForm(emptyForm); setIsFormOpen(true); }
  function openEdit(t: Testimonial) { setEditingId(t.id); setForm({ clientName: t.clientName, businessName: t.businessName, text: t.text, image: t.image, rating: t.rating, serviceUsed: t.serviceUsed }); setIsFormOpen(true); }

  function handleSave() {
    if (!form.clientName.trim()) { toast({ title: "Validation Error", description: "Client name is required.", variant: "destructive" }); return; }
    if (editingId !== null) {
      setTestimonials(prev => prev.map(t => t.id === editingId ? { ...t, ...form } : t));
      toast({ title: "Testimonial updated" });
    } else {
      const newId = Math.max(0, ...testimonials.map(t => t.id)) + 1;
      setTestimonials(prev => [...prev, { id: newId, ...form }]);
      toast({ title: "Testimonial added" });
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    if (deleteId === null) return;
    setTestimonials(prev => prev.filter(t => t.id !== deleteId));
    toast({ title: "Testimonial deleted" });
    setIsDeleteOpen(false);
  }

  return (
    <AdminLayout title="Testimonials Management">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2"><Plus size={16} /> Add Testimonial</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {testimonials.length === 0 ? (
            <div className="col-span-full text-center py-16 text-slate-500">No testimonials yet.</div>
          ) : testimonials.map(t => (
            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-white font-semibold">{t.clientName}</p>
                  <p className="text-slate-400 text-sm">{t.businessName}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(t)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-7 w-7 p-0"><Pencil size={13} /></Button>
                  <Button size="sm" variant="ghost" onClick={() => { setDeleteId(t.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-7 w-7 p-0"><Trash2 size={13} /></Button>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">"{t.text}"</p>
              <p className="text-orange-400 text-xs font-medium">{t.serviceUsed}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingId !== null ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-slate-300">Client Name *</Label><Input value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" /></div>
              <div className="space-y-1.5"><Label className="text-slate-300">Business Name</Label><Input value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" /></div>
            </div>
            <div className="space-y-1.5"><Label className="text-slate-300">Testimonial Text *</Label><Textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={4} /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Client Image URL</Label><Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="https://..." /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Service Used</Label><Input value={form.serviceUsed} onChange={e => setForm(f => ({ ...f, serviceUsed: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="e.g. Social Media Management" /></div>
            <div className="space-y-1.5">
              <Label className="text-slate-300">Rating</Label>
              <Select value={String(form.rating)} onValueChange={v => setForm(f => ({ ...f, rating: Number(v) }))}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {[5, 4, 3, 2, 1].map(r => <SelectItem key={r} value={String(r)} className="text-white hover:bg-slate-700">{r} Star{r !== 1 ? "s" : ""}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">Cancel</Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">{editingId !== null ? "Save Changes" : "Add Testimonial"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
          <AlertDialogHeader><AlertDialogTitle>Delete Testimonial</AlertDialogTitle><AlertDialogDescription className="text-slate-400">Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
