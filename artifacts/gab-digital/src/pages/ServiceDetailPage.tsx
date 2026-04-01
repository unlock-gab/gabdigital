import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle2, ChevronLeft, Star, Users, Package, ArrowRight } from "lucide-react";
import { useServiceCategories, useServiceItems } from "@/hooks/useSiteData";
import { getIcon, getPalette } from "@/lib/palette";
import NotFound from "@/pages/not-found";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function ServiceDetailPage() {
  const { categorySlug, serviceSlug } = useParams<{ categorySlug: string; serviceSlug: string }>();
  const categories = useServiceCategories();
  const allItems = useServiceItems();

  const category = categories.find(c => c.slug === categorySlug);
  const service = allItems.find(s => s.slug === serviceSlug && s.categoryId === category?.id);

  if (!category || !service) return <NotFound />;

  const catIdx = categories.indexOf(category);
  const palette = getPalette(catIdx);
  const CatIcon = getIcon(category.icon);

  const relatedServices = allItems
    .filter(s => s.categoryId === category.id && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pb-24" style={{ background: "#F8FAFC" }}>

      {/* ─── Hero ─── */}
      <section className={`relative overflow-hidden pt-36 pb-24 bg-gradient-to-br ${palette.visualGradient}`}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: palette.glowColor }} />
        </div>
        {service.imageUrl && (
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${service.imageUrl})` }} />
        )}

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-white/60 text-sm font-medium mb-10 flex-wrap">
            <Link href="/"><span className="hover:text-white cursor-pointer transition-colors">الرئيسية</span></Link>
            <ChevronLeft size={14} />
            <Link href="/services"><span className="hover:text-white cursor-pointer transition-colors">الخدمات</span></Link>
            <ChevronLeft size={14} />
            <Link href={`/services/${category.slug}`}><span className="hover:text-white cursor-pointer transition-colors">{category.title}</span></Link>
            <ChevronLeft size={14} />
            <span className="text-white">{service.title}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3 mb-5">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white/80 border border-white/20">
                  <CatIcon size={12} />
                  {category.title}
                </span>
                {service.isFeatured && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                    <Star size={10} fill="currentColor" /> مميز
                  </span>
                )}
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
                {service.title}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-lg text-white/75 leading-relaxed mb-8">
                {service.shortDescription}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4">
                <Link href="/start-project">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg,#F97316,#EA580C)", boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}>
                    اطلب هذه الخدمة
                    <ArrowLeft size={16} />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white border-2 border-white/25 hover:border-white/50 transition-all hover:bg-white/5">
                    تواصل معنا
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right: service image or icon */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
              className="hidden lg:flex items-center justify-center">
              {service.imageUrl ? (
                <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-64 object-cover" />
                </div>
              ) : (
                <div className="w-48 h-48 rounded-3xl flex items-center justify-center shadow-2xl"
                  style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(16px)", border: "2px solid rgba(255,255,255,0.15)" }}>
                  <CatIcon size={80} color={palette.accentColor} />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 48 L0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ─── Content ─── */}
      <div className="container mx-auto px-4 pt-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Full description */}
            {service.fullDescription && (
              <motion.div {...inView()} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-4">نبذة عن الخدمة</h2>
                <p className="text-slate-600 leading-relaxed text-base">{service.fullDescription}</p>
              </motion.div>
            )}

            {/* Features */}
            {service.features.length > 0 && (
              <motion.div {...inView(0.05)} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6">مميزات الخدمة</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-orange-500" />
                      <span className="text-slate-700 text-sm font-semibold leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* What's included */}
            {service.includedItems.length > 0 && (
              <motion.div {...inView(0.1)} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6">ما يشمله الطلب</h2>
                <ul className="space-y-3">
                  {service.includedItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 text-orange-600"
                        style={{ background: "#FFF7ED" }}>{i + 1}</span>
                      <span className="text-slate-700 font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Target audience */}
            {service.targetAudience && (
              <motion.div {...inView(0.15)} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                  <Users size={22} className="text-orange-500" />
                  لمن هذه الخدمة؟
                </h2>
                <p className="text-slate-600 leading-relaxed">{service.targetAudience}</p>
              </motion.div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Quick CTA */}
            <motion.div {...inView(0.1)} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-lg font-black text-slate-900 mb-4">اطلب هذه الخدمة الآن</h3>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">تواصل معنا وسنعود عليك خلال 24 ساعة بعرض سعر مخصص لمشروعك.</p>
              <Link href="/start-project">
                <button className="w-full py-3 rounded-xl font-bold text-white mb-3 transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#F97316,#EA580C)", boxShadow: "0 4px 14px rgba(249,115,22,0.3)" }}>
                  ابدأ مشروعك
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full py-3 rounded-xl font-bold text-slate-700 border-2 border-slate-200 hover:border-slate-300 transition-all">
                  تواصل معنا
                </button>
              </Link>
            </motion.div>

            {/* Category info */}
            <motion.div {...inView(0.15)} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4">التصنيف</h3>
              <Link href={`/services/${category.slug}`}>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${palette.accentColor}18` }}>
                    <CatIcon size={18} style={{ color: palette.accentColor }} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 group-hover:text-orange-500 transition-colors text-sm">{category.title}</p>
                    <p className="text-xs text-slate-400">عرض كل خدمات هذا التصنيف</p>
                  </div>
                  <ArrowRight size={16} className="mr-auto text-slate-300 group-hover:text-orange-400 transition-colors" />
                </div>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ─── Related services ─── */}
        {relatedServices.length > 0 && (
          <motion.div {...inView()} className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">خدمات أخرى في نفس التصنيف</h2>
              <Link href={`/services/${category.slug}`}>
                <span className="text-orange-500 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                  عرض الكل <ArrowLeft size={14} />
                </span>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((s, i) => (
                <motion.div key={s.id} {...inView(i * 0.07)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt={s.title} className="h-32 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="h-32 flex items-center justify-center" style={{ background: `linear-gradient(135deg,${palette.accentColor}18,${palette.accentColor}33)` }}>
                      <CatIcon size={32} style={{ color: palette.accentColor }} />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{s.shortDescription}</p>
                    <Link href={`/services/${category.slug}/${s.slug}`}>
                      <button className="w-full py-2 rounded-xl text-sm font-bold border-2 text-orange-500 border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                        عرض الخدمة
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
