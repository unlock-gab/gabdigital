import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function OurWork() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "websites", label: "مواقع" },
    { id: "ads", label: "إعلانات" },
    { id: "branding", label: "هوية بصرية" },
    { id: "content", label: "محتوى" },
    { id: "video", label: "فيديو" }
  ];

  const projects = [
    {
      id: 1,
      title: "متجر ألفا للإلكترونيات",
      category: "websites",
      categoryLabel: "تجارة إلكترونية",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      desc: "تطوير متجر إلكتروني متكامل مع بوابات الدفع وتجربة مستخدم سلسة زادت المبيعات بنسبة 40٪."
    },
    {
      id: "2",
      title: "حملة إطلاق عطر روز",
      category: "ads",
      categoryLabel: "حملة إعلانية",
      image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=800&q=80",
      desc: "حملة متكاملة على منصات التواصل الاجتماعي حققت أكثر من 2 مليون ظهور في أول أسبوع."
    },
    {
      id: "3",
      title: "هوية مطعم كراست",
      category: "branding",
      categoryLabel: "هوية بصرية",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
      desc: "تصميم هوية بصرية كاملة لمطعم برجر جديد تعكس الطابع الشبابي والعصري."
    },
    {
      id: "4",
      title: "إدارة محتوى عيادة دنتال",
      category: "content",
      categoryLabel: "إدارة محتوى",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      desc: "خطة محتوى شهرية تركز على التوعية الطبية وزيادة حجوزات المواعيد بنسبة 60٪."
    },
    {
      id: "5",
      title: "فيديو تعريفي لتطبيق فاست",
      category: "video",
      categoryLabel: "موشن جرافيك",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      desc: "إنتاج فيديو موشن جرافيك يشرح مميزات التطبيق بطريقة مبسطة وجذابة."
    },
    {
      id: "6",
      title: "موقع شركة أركان العقارية",
      category: "websites",
      categoryLabel: "موقع مؤسسي",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      desc: "تصميم وتطوير موقع يعرض مشاريع الشركة بتصميم فخم يليق بمستوى العقارات."
    },
    {
      id: "7",
      title: "تغليف منتجات بيور",
      category: "branding",
      categoryLabel: "تصميم تغليف",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
      desc: "تصميم علب منتجات عناية بالبشرة طبيعية بتصميم يعكس النقاء والجودة."
    },
    {
      id: "8",
      title: "إعلانات جوجل لشركة نقل",
      category: "ads",
      categoryLabel: "إعلانات بحث",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      desc: "حملة إعلانات على محرك بحث جوجل لاستهداف الكلمات المفتاحية المتعلقة بنقل الأثاث."
    }
  ];

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-20">
      {/* Hero */}
      <section className="bg-[#0f172a] py-32 pt-40 mb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            أعمالنا التي <span className="text-orange-500">نفخر بها</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            نستعرض هنا بعضاً من مشاريعنا التي ساهمت في نجاح عملائنا وتحقيق أهدافهم التسويقية.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === category.id
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
              data-testid={`tab-${category.id}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-orange-500/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                    {project.categoryLabel}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{project.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {project.desc}
                  </p>
                  <Button variant="outline" className="w-full font-bold group/btn border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full mt-auto" data-testid={`btn-view-project-${project.id}`}>
                    عرض التفاصيل
                    <ExternalLink className="mr-2 w-4 h-4 transition-colors" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-lg">لا توجد مشاريع في هذا التصنيف حالياً.</p>
          </div>
        )}
      </div>
      
      {/* CTA */}
      <section className="container mx-auto px-4 mt-32 text-center">
        <h2 className="text-3xl font-black mb-6 text-slate-900">هل تريد أن يكون مشروعك التالي هنا؟</h2>
        <Link href="/start-project">
          <Button size="lg" className="font-bold rounded-full px-8 h-14 text-lg bg-orange-500 text-white hover:bg-orange-600 shadow-md">
            ابدأ مشروعك الآن
            <ArrowLeft className="mr-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
