import { useState } from "react";
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
import { mockPortfolio, type PortfolioProject } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search, Star, ExternalLink } from "lucide-react";

const CATEGORIES = ["Websites", "Ads", "Branding", "Content", "Video"];

const emptyForm: Omit<PortfolioProject, "id"> = { title: "", category: CATEGORIES[0], shortDescription: "", fullDescription: "", previewImage: "", demoUrl: "", featured: false, tags: [] };

export default function AdminPortfolio() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<PortfolioProject[]>(mockPortfolio);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<PortfolioProject, "id">>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  function openAdd() { setEditingId(null); setForm(emptyForm); setTagsInput(""); setIsFormOpen(true); }
  function openEdit(p: PortfolioProject) { setEditingId(p.id); setForm({ title: p.title, category: p.category, shortDescription: p.shortDescription, fullDescription: p.fullDescription, previewImage: p.previewImage, demoUrl: p.demoUrl, featured: p.featured, tags: p.tags }); setTagsInput(p.tags.join(", ")); setIsFormOpen(true); }

  function handleSave() {
    if (!form.title.trim()) { toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" }); return; }
    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
    if (editingId !== null) {
      setProjects(prev => prev.map(p => p.id === editingId ? { ...p, ...form, tags } : p));
      toast({ title: "Project updated", description: `"${form.title}" has been updated.` });
    } else {
      const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
      setProjects(prev => [...prev, { id: newId, ...form, tags }]);
      toast({ title: "Project added", description: `"${form.title}" has been added.` });
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    if (deleteId === null) return;
    const proj = projects.find(p => p.id === deleteId);
    setProjects(prev => prev.filter(p => p.id !== deleteId));
    toast({ title: "Project deleted", description: `"${proj?.title}" has been removed.` });
    setIsDeleteOpen(false);
  }

  return (
    <AdminLayout title="Portfolio Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500" />
          </div>
          <Button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2"><Plus size={16} /> Add Project</Button>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 text-left">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Tags</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-500">No projects found.</td></tr>
              ) : filtered.map(project => (
                <tr key={project.id} className="bg-slate-900 hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{project.title}</div>
                    <div className="text-slate-500 text-xs mt-0.5 hidden sm:block">{project.shortDescription.slice(0, 50)}...</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><Badge variant="outline" className="border-slate-700 text-slate-400">{project.category}</Badge></td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">{project.tags.slice(0, 2).map(t => <span key={t} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">{t}</span>)}</div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {project.featured ? <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 gap-1"><Star size={10} /> Featured</Badge> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="ghost" className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 h-8 w-8 p-0"><ExternalLink size={14} /></Button></a>}
                      <Button size="sm" variant="ghost" onClick={() => openEdit(project)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0"><Pencil size={14} /></Button>
                      <Button size="sm" variant="ghost" onClick={() => { setDeleteId(project.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"><Trash2 size={14} /></Button>
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
          <DialogHeader><DialogTitle>{editingId !== null ? "Edit Project" : "Add New Project"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5"><Label className="text-slate-300">Title *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" /></div>
            <div className="space-y-1.5">
              <Label className="text-slate-300">Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">{CATEGORIES.map(c => <SelectItem key={c} value={c} className="text-white hover:bg-slate-700">{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label className="text-slate-300">Short Description</Label><Textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={2} /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Full Description</Label><Textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={3} /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Preview Image URL</Label><Input value={form.previewImage} onChange={e => setForm(f => ({ ...f, previewImage: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="https://..." /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Demo / Live URL</Label><Input value={form.demoUrl} onChange={e => setForm(f => ({ ...f, demoUrl: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="https://..." /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Tags (comma separated)</Label><Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="bg-slate-800 border-slate-700 text-white" placeholder="e.g. Branding, Logo, Design" /></div>
            <div className="flex items-center gap-3"><input type="checkbox" id="featured-p" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-orange-500" /><Label htmlFor="featured-p" className="text-slate-300 cursor-pointer">Mark as Featured</Label></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">Cancel</Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">{editingId !== null ? "Save Changes" : "Add Project"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
          <AlertDialogHeader><AlertDialogTitle>Delete Project</AlertDialogTitle><AlertDialogDescription className="text-slate-400">Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
