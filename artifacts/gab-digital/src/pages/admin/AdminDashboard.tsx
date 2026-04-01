import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Briefcase, ShoppingBag, GraduationCap, Image as ImageIcon, Star, MessageSquare } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  mockServiceCategories, mockServiceItems, mockProducts,
  mockCourses, mockPortfolio, mockTestimonials, mockMessages,
  type ServiceCategory, type ServiceItem, type Product, type Course,
  type PortfolioProject, type Testimonial, type ContactMessage,
} from "@/lib/adminData";

export default function AdminDashboard() {
  const [categories] = useLocalStorage<ServiceCategory[]>("admin_service_categories", mockServiceCategories);
  const [services] = useLocalStorage<ServiceItem[]>("admin_service_items", mockServiceItems);
  const [products] = useLocalStorage<Product[]>("admin_products", mockProducts);
  const [courses] = useLocalStorage<Course[]>("admin_courses", mockCourses);
  const [portfolio] = useLocalStorage<PortfolioProject[]>("admin_portfolio", mockPortfolio);
  const [testimonials] = useLocalStorage<Testimonial[]>("admin_testimonials", mockTestimonials);
  const [messages] = useLocalStorage<ContactMessage[]>("admin_messages", mockMessages);

  const stats = [
    { label: "تصنيفات الخدمات", value: categories.length, icon: Layers, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "الخدمات", value: services.length, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "المنتجات", value: products.length, icon: ShoppingBag, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "الدورات", value: courses.length, icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "أعمالنا", value: portfolio.length, icon: ImageIcon, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "رسائل جديدة", value: messages.filter(m => m.status === "Unread").length, icon: MessageSquare, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <AdminLayout title="لوحة التحكم">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="bg-slate-900 border-slate-800">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">آخر الخدمات المضافة</h3>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-slate-800">
                {services.slice(0, 5).map((svc, i) => {
                  const cat = categories.find(c => c.id === svc.categoryId);
                  return (
                    <li key={i} className="p-4 px-6 flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300 font-medium truncate">{svc.title}</p>
                        {cat && <p className="text-xs text-slate-500 truncate">{cat.title}</p>}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${svc.isVisible ? "bg-green-500/15 text-green-400" : "bg-slate-700 text-slate-400"}`}>
                        {svc.isVisible ? "ظاهر" : "مخفي"}
                      </span>
                    </li>
                  );
                })}
                {services.length === 0 && (
                  <li className="p-8 text-center text-slate-500 text-sm">لا توجد خدمات بعد</li>
                )}
              </ul>
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">تصنيفات الخدمات</h3>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-slate-800">
                {categories.slice(0, 6).map((cat, i) => {
                  const count = services.filter(s => s.categoryId === cat.id).length;
                  return (
                    <li key={i} className="p-4 px-6 flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      <span className="text-sm text-slate-300 flex-1 truncate">{cat.title}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 font-bold">{count} خدمة</span>
                    </li>
                  );
                })}
                {categories.length === 0 && (
                  <li className="p-8 text-center text-slate-500 text-sm">لا توجد تصنيفات بعد</li>
                )}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
