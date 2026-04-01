import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { mockFAQs, type FAQ } from "@/lib/adminData";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const emptyForm: Omit<FAQ, "id"> = { question: "", answer: "", category: "" };

export default function AdminFAQ() {
  const { toast } = useToast();
  const [faqs, setFaqs] = useLocalStorage<FAQ[]>('admin_faqs', mockFAQs);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<FAQ, "id">>(emptyForm);

  function openAdd() { setEditingId(null); setForm(emptyForm); setIsFormOpen(true); }
  function openEdit(f: FAQ) { setEditingId(f.id); setForm({ question: f.question, answer: f.answer, category: f.category }); setIsFormOpen(true); }

  function handleSave() {
    if (!form.question.trim()) { toast({ title: "Validation Error", description: "Question is required.", variant: "destructive" }); return; }
    if (editingId !== null) {
      setFaqs(prev => prev.map(f => f.id === editingId ? { ...f, ...form } : f));
      toast({ title: "FAQ updated" });
    } else {
      const newId = Math.max(0, ...faqs.map(f => f.id)) + 1;
      setFaqs(prev => [...prev, { id: newId, ...form }]);
      toast({ title: "FAQ added" });
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    if (deleteId === null) return;
    setFaqs(prev => prev.filter(f => f.id !== deleteId));
    toast({ title: "FAQ deleted" });
    setIsDeleteOpen(false);
  }

  return (
    <AdminLayout title="FAQ Management">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2"><Plus size={16} /> Add FAQ</Button>
        </div>

        <div className="space-y-3">
          {faqs.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No FAQs yet.</div>
          ) : faqs.map(faq => (
            <div key={faq.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-white font-medium">{faq.question}</p>
                  {faq.category && <p className="text-slate-500 text-xs mt-0.5">{faq.category}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(faq)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-7 w-7 p-0"><Pencil size={13} /></Button>
                  <Button size="sm" variant="ghost" onClick={() => { setDeleteId(faq.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-7 w-7 p-0"><Trash2 size={13} /></Button>
                  <div className="text-slate-500 ml-1">
                    {expandedId === faq.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>
              {expandedId === faq.id && (
                <div className="px-4 pb-4 border-t border-slate-800 pt-3">
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
          <DialogHeader><DialogTitle>{editingId !== null ? "Edit FAQ" : "Add New FAQ"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5"><Label className="text-slate-300">Question *</Label><Input value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="e.g. How long does it take to build a website?" /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Answer *</Label><Textarea value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={4} /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Category</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="e.g. Web Development, General, Paid Ads" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">Cancel</Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">{editingId !== null ? "Save Changes" : "Add FAQ"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
          <AlertDialogHeader><AlertDialogTitle>Delete FAQ</AlertDialogTitle><AlertDialogDescription className="text-slate-400">Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
