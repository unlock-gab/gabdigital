import { useState, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockServiceCategories, mockServiceItems, type ServiceCategory, type ServiceItem } from "@/lib/adminData";
import { reindexItems, reindexAfterDelete, getNextOrder } from "@/lib/orderUtils";
import { Plus, Pencil, Trash2, Search, Star, Upload, Image as ImageIcon, Eye, EyeOff, ArrowUpDown } from "lucide-react";

const emptyForm: Omit<ServiceItem, "id"> = {
  categoryId: 0,
  title: "", slug: "", shortDescription: "", fullDescription: "",
  imageUrl: "", features: [], includedItems: [], targetAudience: "",
  order: 1, isVisible: true, isFeatured: false,
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

/** Reindex only the items belonging to a given categoryId, leave others untouched */
function reindexWithinCategory(
  allServices: ServiceItem[],
  categoryId: number,
  movedId: number,
  newOrder: number
): ServiceItem[] {
  const inCat = allServices.filter(s => s.categoryId === categoryId);
  const others = allServices.filter(s => s.categoryId !== categoryId);
  return [...others, ...reindexItems(inCat, movedId, newOrder)];
}

function reindexDeleteWithinCategory(
  allServices: ServiceItem[],
  categoryId: number,
  deletedId: number
): ServiceItem[] {
  const inCat = allServices.filter(s => s.categoryId === categoryId && s.id !== deletedId);
  const others = allServices.filter(s => s.categoryId !== categoryId);
  return [...others, ...reindexAfterDelete(inCat)];
}

export default function AdminServices() {
  const { toast } = useToast();
  const [categories] = useLocalStorage<ServiceCategory[]>("admin_service_categories", mockServiceCategories);
  const [services, setServices] = useLocalStorage<ServiceItem[]>("admin_service_items", mockServiceItems);

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<ServiceItem, "id">>(emptyForm);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [includedInput, setIncludedInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function getServicesInCat(catId: number) {
    return services.filter(s => s.categoryId === catId);
  }

  const sorted = [...services].sort((a, b) => {
    if (a.categoryId !== b.categoryId) return a.categoryId - b.categoryId;
    return a.order - b.order;
  });

  const filtered = sorted.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || s.categoryId === +filterCat;
    return matchSearch && matchCat;
  });

  function getCategoryName(catId: number) {
    return categories.find(c => c.id === catId)?.title ?? "—";
  }

  function openAdd() {
    const defaultCatId = categories[0]?.id ?? 0;
    const catServices = getServicesInCat(defaultCatId);
    setEditingId(null);
    setForm({ ...emptyForm, categoryId: defaultCatId, order: getNextOrder(catServices) });
    setImagePreview("");
    setFeaturesInput("");
    setIncludedInput("");
    setIsFormOpen(true);
  }

  function openEdit(svc: ServiceItem) {
    setEditingId(svc.id);
    setForm({
      categoryId: svc.categoryId, title: svc.title, slug: svc.slug,
      shortDescription: svc.shortDescription, fullDescription: svc.fullDescription,
      imageUrl: svc.imageUrl, features: svc.features, includedItems: svc.includedItems,
      targetAudience: svc.targetAudience, order: svc.order,
      isVisible: svc.isVisible, isFeatured: svc.isFeatured,
    });
    setImagePreview(svc.imageUrl);
    setFeaturesInput(svc.features.join("\n"));
    setIncludedInput(svc.includedItems.join("\n"));
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

  function handleCategoryChange(catIdStr: string) {
    const catId = +catIdStr;
    const catServices = editingId
      ? services.filter(s => s.categoryId === catId && s.id !== editingId)
      : getServicesInCat(catId);
    setForm(f => ({ ...f, categoryId: catId, order: getNextOrder(catServices) }));
  }

  function handleOrderChange(raw: string) {
    const val = parseInt(raw, 10);
    if (isNaN(val)) return;
    const catServices = editingId
      ? services.filter(s => s.categoryId === form.categoryId)
      : services.filter(s => s.categoryId === form.categoryId);
    const max = editingId ? catServices.length : catServices.length + 1;
    setForm(f => ({ ...f, order: Math.max(1, Math.min(val, Math.max(max, 1))) }));
  }

  function syncFeatures() {
    setForm(f => ({ ...f, features: featuresInput.split("\n").map(s => s.trim()).filter(Boolean) }));
  }

  function syncIncluded() {
    setForm(f => ({ ...f, includedItems: includedInput.split("\n").map(s => s.trim()).filter(Boolean) }));
  }

  function handleSave() {
    const features = featuresInput.split("\n").map(s => s.trim()).filter(Boolean);
    const includedItems = includedInput.split("\n").map(s => s.trim()).filter(Boolean);
    const finalForm = { ...form, features, includedItems };

    if (!finalForm.title.trim()) {
      toast({ title: "خطأ في التحقق", description: "العنوان مطلوب.", variant: "destructive" });
      return;
    }
    if (!finalForm.slug.trim()) {
      toast({ title: "خطأ في التحقق", description: "الـ Slug مطلوب.", variant: "destructive" });
      return;
    }
    if (!finalForm.categoryId) {
      toast({ title: "خطأ في التحقق", description: "يرجى اختيار تصنيف.", variant: "destructive" });
      return;
    }
    const slugExists = services.some(s => s.slug === finalForm.slug && s.id !== editingId);
    if (slugExists) {
      toast({ title: "خطأ في التحقق", description: "هذا الـ Slug مستخدم بالفعل.", variant: "destructive" });
      return;
    }

    if (editingId !== null) {
      const oldSvc = services.find(s => s.id === editingId);
      const oldCatId = oldSvc?.categoryId ?? finalForm.categoryId;
      const categoryChanged = oldCatId !== finalForm.categoryId;

      setServices(prev => {
        let updated = prev.map(s => s.id === editingId ? { ...s, ...finalForm } : s);

        if (categoryChanged) {
          // 1. Reindex old category (without this item)
          const oldCatItems = updated.filter(s => s.categoryId === oldCatId);
          const reindexedOld = reindexAfterDelete(oldCatItems.filter(s => s.id !== editingId));
          // 2. The moved item is already in new category; reindex new category
          const newCatItems = updated.filter(s => s.categoryId === finalForm.categoryId);
          const reindexedNew = reindexItems(newCatItems, editingId, finalForm.order);
          const otherCats = updated.filter(s => s.categoryId !== oldCatId && s.categoryId !== finalForm.categoryId);
          return [...otherCats, ...reindexedOld, ...reindexedNew];
        } else {
          return reindexWithinCategory(updated, finalForm.categoryId, editingId, finalForm.order);
        }
      });

      toast({
        title: "تم التحديث ✓",
        description: `تم تحديث "${finalForm.title}" وإعادة ترتيب الخدمات في التصنيف تلقائياً.`,
      });
    } else {
      const newId = Math.max(0, ...services.map(s => s.id)) + 1;
      setServices(prev => {
        const allWithNew = [...prev, { id: newId, ...finalForm }];
        return reindexWithinCategory(allWithNew, finalForm.categoryId, newId, finalForm.order);
      });
      toast({
        title: "تمت الإضافة ✓",
        description: `تمت إضافة "${finalForm.title}" في الموضع ${finalForm.order} داخل التصنيف.`,
      });
    }
    setIsFormOpen(false);
  }

  function handleDelete() {
    if (deleteId === null) return;
    const svc = services.find(s => s.id === deleteId);
    const catId = svc?.categoryId ?? 0;
    setServices(prev => reindexDeleteWithinCategory(prev, catId, deleteId));
    toast({ title: "تم الحذف", description: `تم حذف "${svc?.title}" وإعادة ترقيم الترتيب في التصنيف.` });
    setIsDeleteOpen(false);
  }

  function toggleVisibility(id: number) {
    setServices(prev => prev.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s));
  }

  function moveUp(id: number) {
    const svc = services.find(s => s.id === id);
    if (!svc || svc.order <= 1) return;
    setServices(prev => reindexWithinCategory(prev, svc.categoryId, id, svc.order - 1));
    toast({ title: "تم التحريك للأعلى", description: "تم إعادة الترتيب داخل التصنيف." });
  }

  function moveDown(id: number) {
    const svc = services.find(s => s.id === id);
    if (!svc) return;
    const catCount = services.filter(s => s.categoryId === svc.categoryId).length;
    if (svc.order >= catCount) return;
    setServices(prev => reindexWithinCategory(prev, svc.categoryId, id, svc.order + 1));
    toast({ title: "تم التحريك للأسفل", description: "تم إعادة الترتيب داخل التصنيف." });
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">إدارة الخدمات</h1>
            <p className="text-slate-400 text-sm mt-1">{services.length} خدمة — الترتيب مستقل داخل كل تصنيف</p>
          </div>
          <Button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            <Plus size={16} /> إضافة خدمة
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث في الخدمات..." className="pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" />
          </div>
          <Select value={filterCat} onValueChange={setFilterCat}>
            <SelectTrigger className="w-full sm:w-56 bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="كل التصنيفات" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white">كل التصنيفات</SelectItem>
              {categories.map(c => (
                <SelectItem key={c.id} value={String(c.id)} className="text-white">{c.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Info Banner */}
        <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-indigo-300">
          <ArrowUpDown size={16} className="shrink-0" />
          <span>الترتيب مستقل داخل كل تصنيف. عند تغيير الترتيب أو نقل خدمة لتصنيف آخر، تُعاد ترقيم الخدمات في كلا التصنيفين تلقائياً.</span>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="px-4 py-3 text-center text-slate-400 font-medium w-12">#</th>
                  <th className="px-4 py-3 text-right text-slate-400 font-medium">الخدمة</th>
                  <th className="px-4 py-3 text-right text-slate-400 font-medium hidden md:table-cell">التصنيف</th>
                  <th className="px-4 py-3 text-right text-slate-400 font-medium hidden lg:table-cell">الـ Slug</th>
                  <th className="px-4 py-3 text-center text-slate-400 font-medium">التحريك</th>
                  <th className="px-4 py-3 text-center text-slate-400 font-medium">الحالة</th>
                  <th className="px-4 py-3 text-center text-slate-400 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-slate-500">لا توجد خدمات</td></tr>
                )}
                {filtered.map(svc => {
                  const catCount = services.filter(s => s.categoryId === svc.categoryId).length;
                  return (
                    <tr key={svc.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700 text-white font-mono font-bold text-sm">
                          {svc.order}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center shrink-0">
                            {svc.imageUrl ? (
                              <img src={svc.imageUrl} alt={svc.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={18} className="text-slate-500" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-2">
                              {svc.title}
                              {svc.isFeatured && <Star size={12} className="text-yellow-400" fill="currentColor" />}
                            </div>
                            <div className="text-slate-500 text-xs mt-0.5 max-w-xs truncate">{svc.shortDescription}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 font-medium">
                          {getCategoryName(svc.categoryId)}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <code className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-300">{svc.slug}</code>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => moveUp(svc.id)}
                            disabled={svc.order <= 1}
                            className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                            title="تحريك للأعلى في التصنيف">
                            ▲
                          </button>
                          <button
                            onClick={() => moveDown(svc.id)}
                            disabled={svc.order >= catCount}
                            className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                            title="تحريك للأسفل في التصنيف">
                            ▼
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button onClick={() => toggleVisibility(svc.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${svc.isVisible ? "bg-green-500/15 text-green-400 hover:bg-green-500/25" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}>
                          {svc.isVisible ? <><Eye size={11} /> ظاهر</> : <><EyeOff size={11} /> مخفي</>}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => openEdit(svc)} className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0">
                            <Pencil size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => { setDeleteId(svc.id); setIsDeleteOpen(true); }} className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── Form Dialog ─── */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editingId ? "تعديل الخدمة" : "إضافة خدمة جديدة"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Image upload */}
            <div>
              <Label className="text-slate-300 mb-2 block">صورة الخدمة</Label>
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

            {/* Category */}
            <div>
              <Label className="text-slate-300 mb-1.5 block">التصنيف *</Label>
              <Select value={String(form.categoryId)} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="اختر تصنيفاً" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {categories.map(c => (
                    <SelectItem key={c.id} value={String(c.id)} className="text-white">{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300 mb-1.5 block">اسم الخدمة *</Label>
                <Input value={form.title} onChange={e => handleTitleChange(e.target.value)}
                  placeholder="إدارة الصفحات" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" />
              </div>
              <div>
                <Label className="text-slate-300 mb-1.5 block">الـ Slug *</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                  placeholder="page-management" dir="ltr" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-left" />
              </div>
            </div>

            <div>
              <Label className="text-slate-300 mb-1.5 block">الوصف المختصر</Label>
              <Input value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))}
                placeholder="وصف قصير يظهر على بطاقة الخدمة" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" />
            </div>

            <div>
              <Label className="text-slate-300 mb-1.5 block">الوصف التفصيلي</Label>
              <Textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))}
                placeholder="وصف مفصّل يظهر في صفحة الخدمة" rows={4} className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none" />
            </div>

            <div>
              <Label className="text-slate-300 mb-1.5 block">مميزات الخدمة <span className="text-slate-500 text-xs">(كل ميزة في سطر)</span></Label>
              <Textarea
                value={featuresInput}
                onChange={e => setFeaturesInput(e.target.value)}
                onBlur={syncFeatures}
                placeholder={"تخطيط المحتوى الشهري\nنشر يومي منتظم\nإدارة التعليقات"}
                rows={5}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none font-mono text-sm" />
            </div>

            <div>
              <Label className="text-slate-300 mb-1.5 block">ما يشمله الطلب <span className="text-slate-500 text-xs">(كل بند في سطر)</span></Label>
              <Textarea
                value={includedInput}
                onChange={e => setIncludedInput(e.target.value)}
                onBlur={syncIncluded}
                placeholder={"خطة محتوى شهرية\n30 منشوراً شهرياً\nتقرير شهري"}
                rows={4}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none font-mono text-sm" />
            </div>

            <div>
              <Label className="text-slate-300 mb-1.5 block">لمن هذه الخدمة؟</Label>
              <Textarea value={form.targetAudience} onChange={e => setForm(f => ({ ...f, targetAudience: e.target.value }))}
                placeholder="الشركات والمحلات التجارية التي تريد..." rows={2} className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300 mb-1.5 block">
                  الترتيب داخل التصنيف
                  {form.categoryId > 0 && (
                    <span className="text-slate-500 text-xs mr-2">
                      ({(() => {
                        const count = editingId
                          ? services.filter(s => s.categoryId === form.categoryId).length
                          : services.filter(s => s.categoryId === form.categoryId).length + 1;
                        return `من 1 إلى ${count}`;
                      })()})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={form.order}
                  onChange={e => handleOrderChange(e.target.value)}
                  min={1}
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <p className="text-xs text-slate-500 mt-1">الخدمات الأخرى في التصنيف ستُزاح تلقائياً</p>
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
              {editingId ? "حفظ التعديلات" : "إضافة الخدمة"}
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
              هل أنت متأكد من حذف هذه الخدمة؟ ستُعاد ترقيم بقية خدمات التصنيف تلقائياً.
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
