import { useState, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { mockServiceCategories, type ServiceCategory } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search, Star, Upload, Image as ImageIcon, Eye, EyeOff, GripVertical } from "lucide-react";

const ICONS = ["share-2", "camera", "globe", "trending-up", "search", "printer", "graduation-cap", "monitor-smartphone", "video", "layers", "megaphone", "pen-tool", "book-open", "bar-chart-2", "target", "zap", "award", "users", "shopping-cart", "layout", "smartphone", "mail", "palette", "play", "star", "brush", "file-text", "image", "film", "package", "tag", "lightbulb", "settings"];

const emptyForm: Omit<ServiceCategory, "id"> = {
  title: "", slug: "", shortDescription: "", fullDescription: "",
  imageUrl: "", icon: "layers", order: 1, isVisible: true, isFeatured: false,
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminServiceCategories() {
  const { toast } = useToast();
  const [categories, setCategories] = useLocalStorage<ServiceCategory[]>("admin_service_categories", mockServiceCategories);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<ServiceCategory, "id">>(emptyForm);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = categories.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, order: Math.max(0, ...categories.map(c => c.order)) + 1 });
    setImagePreview("");
    setIsFormOpen(true);
  }

  function openEdit(cat: ServiceCategory) {
    setEditingId(cat.id);
    setForm({ title: cat.title, slug: cat.slug, shortDescription: cat.shortDescription, fullDescription: cat.fullDescription, imageUrl: cat.imageUrl, icon: cat.icon, order: cat.order, isVisible: cat.isVisible, isFeatured: cat.isFeatured });
    setImagePreview(cat.imageUrl);
    setIsFormOpen(true);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "الصورة كبيرة جداً", description: "يجب أن تكون الصورة أقل من 2MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImagePreview(dataUrl);
      setForm(f => ({ ...f, imageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  }

  function handleTitleChange(title: string) {
    setForm(f => ({ ...f, title, slug: editingId ? f.slug : slugify(title) }));
  }

  function handleSave() {
    if (!form.title.trim()) {
      toast({ title: "خطأ في التحقق", description: "العنوان مطلوب.", variant: "destructive" });
      return;
    }
    if (!form.slug.trim()) {
      toast({ title: "خطأ في التحقق", description: "الـ Slug مطلوب.", variant: "destructive" });
      return;
    }
    const slugExists = categories.some(c => c.slug === form.slug && c.id !== editingId);
    if (slugExists) {
      toast({ title: "خطأ في التحقق", description: "هذا الـ Slug مستخدم بالفعل.", variant: "destructive" });
      return;
    }
    if (editingId !== null) {
      setCategories(prev => prev.map(c => c.id === editingId ? { ...c, ...form } : c));
      toast({ title: "تم التحديث", description: `تم تحديث "${form.title}" بنجاح.` });
    } else {
      const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
      setCategories(prev => [...prev, { id: newId, ...form }]);
      toast({ title: "تمت الإضافة", description: `تمت إضافة "${form.title}" بنجاح.` });
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    if (deleteId === null) return;
    const cat = categories.find(c => c.id === deleteId);
    setCategories(prev => prev.filter(c => c.id !== deleteId));
    toast({ title: "تم الحذف", description: `تم حذف "${cat?.title}".` });
    setIsDeleteOpen(false);
  }

  function toggleVisibility(id: number) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, isVisible: !c.isVisible } : c));
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">تصنيفات الخدمات</h1>
            <p className="text-slate-400 text-sm mt-1">{categories.length} تصنيف مُضاف</p>
          </div>
          <Button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            <Plus size={16} /> إضافة تصنيف
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="بحث في التصنيفات..." className="pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" />
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="px-4 py-3 text-right text-slate-400 font-medium">التصنيف</th>
                  <th className="px-4 py-3 text-right text-slate-400 font-medium hidden md:table-cell">الـ Slug</th>
                  <th className="px-4 py-3 text-center text-slate-400 font-medium">الترتيب</th>
                  <th className="px-4 py-3 text-center text-slate-400 font-medium">الحالة</th>
                  <th className="px-4 py-3 text-center text-slate-400 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-12 text-slate-500">لا توجد تصنيفات</td></tr>
                )}
                {filtered.map(cat => (
                  <tr key={cat.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center shrink-0">
                          {cat.imageUrl ? (
                            <img src={cat.imageUrl} alt={cat.title} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={18} className="text-slate-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            {cat.title}
                            {cat.isFeatured && <Star size={12} className="text-yellow-400" fill="currentColor" />}
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5 max-w-xs truncate">{cat.shortDescription}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <code className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-300">{cat.slug}</code>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-slate-300 font-mono text-sm">{cat.order}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => toggleVisibility(cat.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${cat.isVisible ? "bg-green-500/15 text-green-400 hover:bg-green-500/25" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}>
                        {cat.isVisible ? <><Eye size={11} /> ظاهر</> : <><EyeOff size={11} /> مخفي</>}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(cat)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0">
                          <Pencil size={14} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { setDeleteId(cat.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── Form Dialog ─── */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editingId ? "تعديل التصنيف" : "إضافة تصنيف جديد"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Image upload */}
            <div>
              <Label className="text-slate-300 mb-2 block">صورة التصنيف</Label>
              <div className="flex gap-4 items-start">
                <div className="w-28 h-24 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={28} className="text-slate-600" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 gap-2">
                    <Upload size={14} /> رفع صورة
                  </Button>
                  <p className="text-xs text-slate-500">PNG, JPG, WEBP — أقل من 2MB</p>
                  {imagePreview && (
                    <button onClick={() => { setImagePreview(""); setForm(f => ({ ...f, imageUrl: "" })); }}
                      className="text-xs text-red-400 hover:text-red-300">حذف الصورة</button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300 mb-1.5 block">العنوان *</Label>
                <Input value={form.title} onChange={e => handleTitleChange(e.target.value)}
                  placeholder="إدارة التواصل الاجتماعي" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" />
              </div>
              <div>
                <Label className="text-slate-300 mb-1.5 block">الـ Slug *</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                  placeholder="social-media" dir="ltr" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-left" />
              </div>
            </div>

            <div>
              <Label className="text-slate-300 mb-1.5 block">الوصف المختصر</Label>
              <Input value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))}
                placeholder="وصف قصير يظهر على بطاقة التصنيف" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" />
            </div>

            <div>
              <Label className="text-slate-300 mb-1.5 block">الوصف الكامل</Label>
              <Textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))}
                placeholder="وصف تفصيلي يظهر في صفحة التصنيف" rows={4} className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300 mb-1.5 block">الأيقونة</Label>
                <select value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2 text-sm">
                  {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-slate-300 mb-1.5 block">الترتيب</Label>
                <Input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))}
                  min={1} className="bg-slate-800 border-slate-700 text-white" />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-3">
                <Switch checked={form.isVisible} onCheckedChange={v => setForm(f => ({ ...f, isVisible: v }))} />
                <Label className="text-slate-300">ظاهر على الموقع</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.isFeatured} onCheckedChange={v => setForm(f => ({ ...f, isFeatured: v }))} />
                <Label className="text-slate-300">مميز</Label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button variant="ghost" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white">إلغاء</Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
              {editingId ? "حفظ التعديلات" : "إضافة التصنيف"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Delete Dialog ─── */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              هل أنت متأكد من حذف هذا التصنيف؟ سيتم حذف ارتباطه بالخدمات لكن الخدمات نفسها لن تُحذف.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700 text-slate-300 hover:bg-slate-800">إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
