import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, ShoppingBag, GraduationCap, Image as ImageIcon, Star, MessageSquare } from "lucide-react";
import { mockServices, mockProducts, mockCourses, mockPortfolio, mockTestimonials, mockMessages } from "@/lib/adminData";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Services", value: mockServices.length, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Products", value: mockProducts.length, icon: ShoppingBag, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Total Courses", value: mockCourses.length, icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Total Portfolio", value: mockPortfolio.length, icon: ImageIcon, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Testimonials", value: mockTestimonials.length, icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "New Messages", value: mockMessages.filter(m => m.status === 'Unread').length, icon: MessageSquare, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
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
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-slate-800">
                {[
                  "New contact message from Ahmad",
                  "Project request from Entreprise X",
                  "New course enrollment for Digital Marketing",
                  "Product 'Social Media Template' downloaded",
                  "Testimonial added by Sarah Ahmed"
                ].map((activity, i) => (
                  <li key={i} className="p-4 px-6 flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-slate-300">{activity}</span>
                    <span className="ml-auto text-xs text-slate-500">2h ago</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}