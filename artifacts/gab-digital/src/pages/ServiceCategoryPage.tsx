import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, Star, Package } from "lucide-react";
import { useServiceCategories, useServiceItems } from "@/hooks/useSiteData";
import { getIcon, getPalette } from "@/lib/palette";
import NotFound from "@/pages/not-found";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function ServiceCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const categories = useServiceCategories();
  const allItems = useServiceItems();

  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return <NotFound />;

  const palette = getPalette(categories.indexOf(category));
  const Icon = getIcon(category.icon);
  const services = allItems.filter(s => s.categoryId === category.id);
  const otherCategories = categories.filter(c => c.id !== category.id).slice(0, 4);

  return (
    <div className="min-h-screen pb-24" style={{ background: "#F8FAFC" }}>

      {/* ─── Hero ─── */}
      <section className={`relative overflow-hidden pt-36 pb-24 bg-gradient-to-br ${palette.visualGradient}`}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: palette.glowColor }} />
        </div>
        {category.imageUrl && (
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${category.imageUrl})` }} />
        )}

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-white/60 text-sm font-medium mb-10 flex-wrap">
            <Link href="/"><span className="hover:text-white cursor-pointer transition-colors">الرئيسية</span></Link>
            <ChevronLeft size={14} />
            <Link href="/services"><span className="hover:text-white cursor-pointer transition-colors">الخدمات</span></Link>
            <ChevronLeft size={14} />
            <span className="text-white">{category.title}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Icon */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Icon size={44} color={palette.accentColor} />
            </motion.div>

            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3 mb-4">
                {category.isFeatured && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-yellow-300 border border-white/20">
                    <Star size={10} fill="currentColor" /> مميز
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white/70 border border-white/20">
                  {services.length} خدمة متاحة
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
                {category.title}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-lg text-white/75 max-w-2xl leading-relaxed">
                {category.fullDescription || category.shortDescription}
              </motion.p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 48 L0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ─── Services List ─── */}
      <div className="container mx-auto px-4 pt-8">
        {services.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
            <Package size={56} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-2xl font-bold text-slate-600 mb-2">لا توجد خدمات في هذا التصنيف</h3>
            <p className="text-slate-400 mb-6">أضف خدمات من لوحة الإدارة لتظهر هنا.</p>
            <Link href="/services">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white"
                style={{ background: "linear-gradient(135deg,#F97316,#EA580C)" }}>
                العودة للخدمات
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={service.id} {...inView(i * 0.07)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">

                {/* Service image — 16:9 banner, consistent height */}
                <div className="relative w-full h-[200px] sm:h-[220px] md:h-[260px] overflow-hidden"
                  style={{ background: service.imageUrl ? undefined : `linear-gradient(135deg, ${palette.accentColor}22, ${palette.accentColor}44)` }}>
                  {service.imageUrl ? (
                    <>
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{ background: `${palette.accentColor}22`, border: `2px solid ${palette.accentColor}44` }}>
                        <Icon size={28} style={{ color: palette.accentColor }} />
                      </div>
                    </div>
                  )}
                  {service.isFeatured && (
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow">
                      <Star size={9} fill="currentColor" /> مميز
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{service.shortDescription}</p>

                  {/* Top 3 features */}
                  {service.features.slice(0, 3).length > 0 && (
                    <ul className="space-y-1.5 mb-4">
                      {service.features.slice(0, 3).map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={14} className="shrink-0 text-orange-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link href={`/services/${category.slug}/${service.slug}`}>
                    <button className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm border-2 text-orange-500 border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200">
                      عرض الخدمة
                      <ArrowLeft size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ─── Other Categories ─── */}
        {otherCategories.length > 0 && (
          <motion.div {...inView(0.1)} className="mt-20">
            <h2 className="text-2xl font-black text-slate-900 mb-6">تصنيفات أخرى قد تهمك</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherCategories.map((cat, i) => {
                const p = getPalette(categories.indexOf(cat));
                const CatIcon = getIcon(cat.icon);
                return (
                  <Link key={cat.id} href={`/services/${cat.slug}`}>
                    <motion.div {...inView(i * 0.05)}
                      className="group p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer text-center">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                        style={{ background: `${p.accentColor}18` }}>
                        <CatIcon size={22} style={{ color: p.accentColor }} />
                      </div>
                      <p className="text-sm font-bold text-slate-700 leading-snug">{cat.title}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── CTA ─── */}
        <motion.div {...inView()} className="mt-16 relative overflow-hidden rounded-2xl p-10 text-center text-white"
          style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E293B 100%)" }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 rounded-full blur-[70px] opacity-30" style={{ background: "radial-gradient(circle,#F97316 0%,transparent 70%)" }} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4">جاهز لبدء مشروعك؟</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">تواصل معنا اليوم واحصل على استشارة مجانية لاختيار الخدمة المثالية.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#F97316,#EA580C)", boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}>
                  ابدأ مشروعك
                  <ArrowLeft size={16} />
                </button>
              </Link>
              <Link href="/services">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white border-2 border-white/20 hover:border-white/50 transition-all hover:bg-white/5">
                  العودة للخدمات
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
