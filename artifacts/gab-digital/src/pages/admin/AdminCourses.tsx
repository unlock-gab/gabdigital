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
import { mockCourses, type Course } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const PATHS = ["Social Media Manager Path", "Media Buyer Path", "Video Editor Path", "Freelancer Starter Path"];
const emptyForm: Omit<Course, "id"> = { title: "", shortDescription: "", fullDescription: "", image: "", level: LEVELS[0], duration: "", price: 0, featured: false, learningPath: PATHS[0], ctaLink: "/academy" };

const levelColors: Record<string, string> = { Beginner: "bg-green-500/20 text-green-400 border-green-500/30", Intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30", Advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30" };

export default function AdminCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Course, "id">>(emptyForm);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.learningPath.toLowerCase().includes(search.toLowerCase()));

  function openAdd() { setEditingId(null); setForm(emptyForm); setIsFormOpen(true); }
  function openEdit(c: Course) { setEditingId(c.id); setForm({ title: c.title, shortDescription: c.shortDescription, fullDescription: c.fullDescription, image: c.image, level: c.level, duration: c.duration, price: c.price, featured: c.featured, learningPath: c.learningPath, ctaLink: c.ctaLink }); setIsFormOpen(true); }

  function handleSave() {
    if (!form.title.trim()) { toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" }); return; }
    if (editingId !== null) {
      setCourses(prev => prev.map(c => c.id === editingId ? { ...c, ...form } : c));
      toast({ title: "Course updated", description: `"${form.title}" has been updated.` });
    } else {
      const newId = Math.max(0, ...courses.map(c => c.id)) + 1;
      setCourses(prev => [...prev, { id: newId, ...form }]);
      toast({ title: "Course added", description: `"${form.title}" has been added.` });
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    if (deleteId === null) return;
    const course = courses.find(c => c.id === deleteId);
    setCourses(prev => prev.filter(c => c.id !== deleteId));
    toast({ title: "Course deleted", description: `"${course?.title}" has been removed.` });
    setIsDeleteOpen(false);
  }

  return (
    <AdminLayout title="Courses Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500" />
          </div>
          <Button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2"><Plus size={16} /> Add Course</Button>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 text-left">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Level</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Duration</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Price (DZD)</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-500">No courses found.</td></tr>
              ) : filtered.map(course => (
                <tr key={course.id} className="bg-slate-900 hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{course.title}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{course.learningPath}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><Badge className={`${levelColors[course.level]} border`}>{course.level}</Badge></td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{course.duration}</td>
                  <td className="px-4 py-3 hidden sm:table-cell"><span className="text-orange-400 font-semibold">{course.price.toLocaleString()}</span></td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {course.featured ? <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 gap-1"><Star size={10} /> Featured</Badge> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(course)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0"><Pencil size={14} /></Button>
                      <Button size="sm" variant="ghost" onClick={() => { setDeleteId(course.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"><Trash2 size={14} /></Button>
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
          <DialogHeader><DialogTitle>{editingId !== null ? "Edit Course" : "Add New Course"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5"><Label className="text-slate-300">Course Title *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Short Description</Label><Textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={2} /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Full Description</Label><Textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} className="bg-slate-800 border-slate-700 text-white resize-none" rows={3} /></div>
            <div className="space-y-1.5"><Label className="text-slate-300">Course Image URL</Label><Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="https://..." /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-300">Level</Label>
                <Select value={form.level} onValueChange={v => setForm(f => ({ ...f, level: v }))}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">{LEVELS.map(l => <SelectItem key={l} value={l} className="text-white hover:bg-slate-700">{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label className="text-slate-300">Duration</Label><Input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" placeholder="e.g. 6 weeks" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-slate-300">Price (DZD)</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} className="bg-slate-800 border-slate-700 text-white" /></div>
              <div className="space-y-1.5"><Label className="text-slate-300">CTA Link</Label><Input value={form.ctaLink} onChange={e => setForm(f => ({ ...f, ctaLink: e.target.value }))} className="bg-slate-800 border-slate-700 text-white" /></div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300">Learning Path</Label>
              <Select value={form.learningPath} onValueChange={v => setForm(f => ({ ...f, learningPath: v }))}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">{PATHS.map(p => <SelectItem key={p} value={p} className="text-white hover:bg-slate-700">{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3"><input type="checkbox" id="featured-c" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-orange-500" /><Label htmlFor="featured-c" className="text-slate-300 cursor-pointer">Mark as Featured</Label></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">Cancel</Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">{editingId !== null ? "Save Changes" : "Add Course"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
          <AlertDialogHeader><AlertDialogTitle>Delete Course</AlertDialogTitle><AlertDialogDescription className="text-slate-400">Are you sure? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
