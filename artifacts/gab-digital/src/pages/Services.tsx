import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Star, Layers } from "lucide-react";
import { useServiceCategories, useServiceItems } from "@/hooks/useSiteData";
import { getIcon, getPalette } from "@/lib/palette";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function Services() {
  const categories = useServiceCategories();
  const allItems = useServiceItems();

  const getItemCount = (catId: number) => allItems.filter(s => s.categoryId === catId).length;
  const getFeatured = (catId: number) => allItems.filter(s => s.categoryId === catId && s.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen pb-24" style={{ background: "#F8FAFC" }}>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-36 pb-28 text-white" style={{ background: "#0F172A" }}>
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: "radial-gradient(circle,#F97316 0%,transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-20" style={{ background: "radial-gradient(circle,#6366F1 0%,transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            خدمات <span dir="ltr">GAB Digital</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-6">
            خدمات <span className="text-orange-500">متكاملة</span> للنمو
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            اختر القسم المناسب لمشروعك واستكشف كل الخدمات المتاحة تحته بالتفصيل.
          </motion.p>

          {categories.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3">
              {categories.map((c, i) => {
                const Icon = getIcon(c.icon);
                return (
                  <Link key={c.id} href={`/services/${c.slug}`}>
                    <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                      <Icon size={13} />
                      {c.title}
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 48 L0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      {categories.length > 0 && (
        <div className="container mx-auto px-4 -mt-6 mb-16">
          <motion.div {...inView()} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "تصنيف خدمة", value: categories.length },
              { label: "خدمة متاحة", value: allItems.length },
              { label: "عميل راضٍ", value: "200+" },
              { label: "سنوات خبرة", value: "5+" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-orange-500 mb-1">{s.value}</div>
                <div className="text-sm text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ─── Categories Grid ─── */}
      <div className="container mx-auto px-4">
        {categories.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Layers size={56} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-2xl font-bold text-slate-600 mb-2">لا توجد تصنيفات حالياً</h3>
            <p className="text-slate-400">أضف تصنيفات الخدمات من لوحة الإدارة لتظهر هنا.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => {
              const palette = getPalette(i);
              const Icon = getIcon(cat.icon);
              const count = getItemCount(cat.id);
              const featured = getFeatured(cat.id);

              return (
                <motion.div key={cat.id} {...inView(i * 0.07)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">

                  {/* Visual Header */}
                  <div className="relative h-52 overflow-hidden flex items-center justify-center">

                    {cat.imageUrl ? (
                      /* ── IMAGE MODE ── full cover with gradient overlay */
                      <>
                        <img
                          src={cat.imageUrl}
                          alt={cat.title}
                          className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* bottom gradient so text is always readable */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                        {/* subtle color tint matching the palette */}
                        <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${palette.glowColor}, transparent)` }} />
                      </>
                    ) : (
                      /* ── ICON / GRADIENT FALLBACK ── */
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${palette.visualGradient}`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-40 h-40 rounded-full blur-2xl opacity-40" style={{ background: palette.glowColor }} />
                        </div>
                        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
                        <div className="relative z-10">
                          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300"
                            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                            <Icon size={36} color={palette.accentColor} />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Icon badge — shown on top of image too */}
                    {cat.imageUrl && (
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300"
                          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                          <Icon size={28} color="#ffffff" />
                        </div>
                      </div>
                    )}

                    {/* Featured badge */}
                    {cat.isFeatured && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                          style={{ background: "rgba(0,0,0,0.45)", color: "#FCD34D", border: "1px solid rgba(255,205,61,0.3)", backdropFilter: "blur(8px)" }}>
                          <Star size={10} fill="currentColor" />
                          مميز
                        </span>
                      </div>
                    )}

                    {/* Count badge */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}>
                      {count} خدمة
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-slate-900 mb-2 leading-snug">{cat.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{cat.shortDescription}</p>

                    {/* Featured service names */}
                    {featured.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {featured.map(s => (
                          <span key={s.id} className="text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-100 font-medium">
                            {s.title}
                          </span>
                        ))}
                        {count > featured.length && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100 font-bold">
                            +{count - featured.length} أكثر
                          </span>
                        )}
                      </div>
                    )}

                    <Link href={`/services/${cat.slug}`}>
                      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 group/btn"
                        style={{ background: `linear-gradient(135deg, ${palette.accentColor}CC, ${palette.accentColor})` }}>
                        معرفة المزيد
                        <ArrowLeft size={15} className="group-hover/btn:-translate-x-0.5 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── CTA ─── */}
      <section className="container mx-auto px-4 mt-24">
        <motion.div {...inView()} className="relative overflow-hidden rounded-2xl p-12 lg:p-16 text-center text-white"
          style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E293B 100%)" }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full blur-[80px] opacity-30" style={{ background: "radial-gradient(circle,#F97316 0%,transparent 70%)" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              استشارة مجانية
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-5">محتار من أين تبدأ؟</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              احجز استشارة مجانية مع خبرائنا لنحدد معاً الخدمات الأنسب لمشروعك.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#F97316 0%,#EA580C 100%)", boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}>
                  تواصل معنا
                  <ArrowLeft size={18} />
                </button>
              </Link>
              <Link href="/start-project">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white border-2 border-white/20 hover:border-white/50 transition-all hover:bg-white/5">
                  ابدأ مشروعك الآن
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
