import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, TrendingUp, Eye, Award, Zap } from "lucide-react";

const categories = [
  { id: "all", label: "الكل" },
  { id: "websites", label: "مواقع" },
  { id: "ads", label: "إعلانات" },
  { id: "branding", label: "هوية بصرية" },
  { id: "content", label: "محتوى" },
  { id: "video", label: "فيديو" },
];

const projects = [
  {
    id: 1,
    title: "متجر ألفا للإلكترونيات",
    category: "websites",
    categoryLabel: "تجارة إلكترونية",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    desc: "تطوير متجر إلكتروني متكامل مع بوابات الدفع وتجربة مستخدم سلسة محسّنة.",
    result: "+40٪ في المبيعات",
    resultIcon: TrendingUp,
    accent: "#6366F1",
    featured: true,
  },
  {
    id: "2",
    title: "حملة إطلاق عطر روز",
    category: "ads",
    categoryLabel: "حملة إعلانية",
    image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=800&q=80",
    desc: "حملة متكاملة على منصات التواصل حققت أكثر من 2 مليون ظهور في أول أسبوع.",
    result: "2M+ ظهور",
    resultIcon: Eye,
    accent: "#F97316",
    featured: false,
  },
  {
    id: "3",
    title: "هوية مطعم كراست",
    category: "branding",
    categoryLabel: "هوية بصرية",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
    desc: "تصميم هوية بصرية كاملة لمطعم برجر عصري تعكس الطابع الشبابي الجريء.",
    result: "هوية كاملة ✓",
    resultIcon: Award,
    accent: "#EC4899",
    featured: false,
  },
  {
    id: "4",
    title: "إدارة محتوى عيادة دنتال",
    category: "content",
    categoryLabel: "إدارة محتوى",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    desc: "خطة محتوى شهرية مدروسة حوّلت الصفحة إلى مرجع طبي موثوق يزيد الحجوزات.",
    result: "+60٪ حجوزات",
    resultIcon: TrendingUp,
    accent: "#10B981",
    featured: false,
  },
  {
    id: "5",
    title: "فيديو تعريفي لتطبيق فاست",
    category: "video",
    categoryLabel: "موشن جرافيك",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    desc: "إنتاج فيديو موشن جرافيك يشرح مميزات التطبيق بطريقة مبسطة وجذابة.",
    result: "1.5M+ مشاهدة",
    resultIcon: Eye,
    accent: "#8B5CF6",
    featured: false,
  },
  {
    id: "6",
    title: "موقع شركة أركان العقارية",
    category: "websites",
    categoryLabel: "موقع مؤسسي",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    desc: "تصميم وتطوير موقع يعرض مشاريع عقارية فاخرة بتصميم يليق بقيمة الأصول.",
    result: "+85٪ زوار جدد",
    resultIcon: TrendingUp,
    accent: "#0EA5E9",
    featured: false,
  },
  {
    id: "7",
    title: "تغليف منتجات بيور",
    category: "branding",
    categoryLabel: "تصميم تغليف",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    desc: "تصميم علب منتجات عناية طبيعية تعكس النقاء والفخامة وتجذب العميل من أول نظرة.",
    result: "3 جوائز تصميم",
    resultIcon: Award,
    accent: "#14B8A6",
    featured: false,
  },
  {
    id: "8",
    title: "إعلانات جوجل لشركة نقل",
    category: "ads",
    categoryLabel: "إعلانات بحث",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    desc: "حملة إعلانات بحث دقيقة استهدفت كلمات مفتاحية عالية القيمة بتكلفة اكتساب منخفضة.",
    result: "×3 عائد الاستثمار",
    resultIcon: Zap,
    accent: "#F59E0B",
    featured: false,
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function OurWork() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab);
  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <div className="min-h-screen pb-24" style={{ background: "#F8FAFC" }}>

      {/* ─────────────────── HERO ─────────────────── */}
      <section className="relative overflow-hidden pt-40 pb-28 text-white text-center" style={{ background: "#0F172A" }}>
        {/* ambient glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle,#F97316,transparent)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle,#6366F1,transparent)" }} />

        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            محفظة أعمالنا
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            أعمالنا التي <span className="text-orange-500">نفخر بها</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            نستعرض هنا حالات دراسية حقيقية ساهمت في نجاح عملائنا وتحقيق نتائج ملموسة وقابلة للقياس.
          </motion.p>

          {/* mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {[
              { val: "+500", lbl: "مشروع منجز" },
              { val: "+200", lbl: "عميل راضٍ" },
              { val: "5+", lbl: "سنوات خبرة" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-orange-400 mb-1" dir="ltr">{s.val}</div>
                <div className="text-sm text-slate-400 font-semibold">{s.lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0 h-14 overflow-hidden">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 56 L0 28 Q360 0 720 28 Q1080 56 1440 28 L1440 56 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-4">

        {/* ─────────────────── FILTERS ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                data-testid={`tab-${cat.id}`}
                onClick={() => setActiveTab(cat.id)}
                className="relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
                style={{
                  background: isActive ? "#F97316" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#475569",
                  border: `2px solid ${isActive ? "#F97316" : "#E2E8F0"}`,
                  boxShadow: isActive ? "0 4px 14px rgba(249,115,22,0.3)" : "0 1px 3px rgba(0,0,0,0.06)",
                  transform: isActive ? "translateY(-1px)" : "none",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>

            {/* ─────────────────── FEATURED PROJECT ─────────────────── */}
            {featured && (
              <motion.div
                custom={0}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                className="mb-8 group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* image */}
                  <div className="lg:w-1/2 relative overflow-hidden" style={{ minHeight: 320 }}>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                    />
                    {/* dark overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
                    {/* category badge */}
                    <div className="absolute top-5 right-5 z-20 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                      style={{ background: featured.accent, boxShadow: `0 4px 12px ${featured.accent}55` }}>
                      {featured.categoryLabel}
                    </div>
                    {/* featured tag */}
                    <div className="absolute top-5 left-5 z-20 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-black/30 backdrop-blur-sm border border-white/20">
                      ⭐ مميّز
                    </div>
                  </div>

                  {/* content */}
                  <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${featured.accent}18`, color: featured.accent }}>
                        {featured.categoryLabel}
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">دراسة حالة</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">{featured.title}</h2>
                    <p className="text-slate-500 text-base leading-relaxed mb-8">{featured.desc}</p>

                    {/* result badge */}
                    <div className="flex items-center gap-3 mb-10 p-4 rounded-2xl" style={{ background: `${featured.accent}10`, border: `1px solid ${featured.accent}25` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: featured.accent }}>
                        <featured.resultIcon size={18} color="white" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-semibold mb-0.5">النتيجة المحققة</div>
                        <div className="font-black text-slate-900 text-lg">{featured.result}</div>
                      </div>
                    </div>

                    <button
                      data-testid={`btn-view-project-${featured.id}`}
                      className="inline-flex items-center gap-2 px-8 h-12 rounded-full font-bold text-sm text-white self-start transition-all hover:-translate-y-0.5 hover:shadow-xl"
                      style={{ background: `linear-gradient(135deg,${featured.accent},${featured.accent}cc)`, boxShadow: `0 4px 14px ${featured.accent}44` }}
                    >
                      عرض دراسة الحالة
                      <ExternalLink size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─────────────────── GRID ─────────────────── */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((project, i) => {
                  const ResultIcon = project.resultIcon;
                  return (
                    <motion.div
                      key={project.id}
                      custom={i + 1}
                      variants={cardVariant}
                      initial="hidden"
                      animate="visible"
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 flex flex-col"
                    >
                      {/* image */}
                      <div className="relative overflow-hidden" style={{ height: 220 }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />

                        {/* category pill */}
                        <div
                          className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ background: project.accent, boxShadow: `0 3px 10px ${project.accent}55` }}
                        >
                          {project.categoryLabel}
                        </div>

                        {/* result on hover */}
                        <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                            <ResultIcon size={15} style={{ color: project.accent }} />
                            <span className="font-black text-slate-900 text-sm">{project.result}</span>
                          </div>
                        </div>
                      </div>

                      {/* content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-black text-slate-900 mb-2">{project.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">{project.desc}</p>

                        {/* result row */}
                        <div className="flex items-center gap-2 mb-5 pb-5 border-b border-slate-100">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${project.accent}18` }}>
                            <ResultIcon size={13} style={{ color: project.accent }} />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{project.result}</span>
                        </div>

                        <button
                          data-testid={`btn-view-project-${project.id}`}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                          style={{
                            border: `2px solid ${project.accent}`,
                            color: project.accent,
                            background: "transparent",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = project.accent;
                            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            (e.currentTarget as HTMLButtonElement).style.color = project.accent;
                          }}
                        >
                          عرض التفاصيل
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
                <p className="text-slate-400 text-lg font-semibold">لا توجد مشاريع في هذا التصنيف حالياً.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* ─────────────────── CTA ─────────────────── */}
      <section className="container mx-auto px-4 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-12 lg:p-16 text-center text-white"
          style={{ background: "#0F172A" }}
        >
          {/* glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full blur-[80px] opacity-25"
              style={{ background: "radial-gradient(circle,#F97316,transparent)" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-400 text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              أضف مشروعك هنا
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-5">هل تريد مشروعك في قائمة أعمالنا؟</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              انضم إلى أكثر من 200 عميل اختاروا GAB Digital لتحويل أفكارهم إلى نتائج حقيقية وقابلة للقياس.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project">
                <button
                  className="flex items-center gap-2 px-9 h-13 py-3.5 text-base font-bold rounded-full text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#F97316,#EA580C)", boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}
                >
                  ابدأ مشروعك الآن
                  <ArrowLeft size={18} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center gap-2 px-9 h-13 py-3.5 text-base font-bold rounded-full border-2 border-white/20 text-white hover:bg-white/10 transition-all">
                  تواصل معنا أولاً
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
