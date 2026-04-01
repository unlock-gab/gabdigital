import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useServices } from "@/hooks/useSiteData";
import { getIcon, getPalette, parseFeatures } from "@/lib/palette";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" }
  })
};

export default function Services() {
  const services = useServices();

  return (
    <div className="min-h-screen pb-24" style={{ background: "#F8FAFC" }}>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-36 pb-28 text-white" style={{ background: "#0F172A" }}>
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-20" style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

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
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            كل ما تحتاجه للنجاح في العالم الرقمي تحت سقف واحد. من الفكرة إلى التنفيذ والتسويق.
          </motion.p>

          {services.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mt-10">
              {services.map((s, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10 bg-white/5 text-slate-300">
                  {s.category}
                </span>
              ))}
            </motion.div>
          )}
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
          <div className="text-center py-32 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-slate-600 mb-2">لا توجد خدمات حالياً</h3>
            <p className="text-slate-400">أضف خدمات من لوحة الإدارة لتظهر هنا.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {services.map((service, index) => {
              const palette = getPalette(index);
              const Icon = getIcon(service.icon);
              const DecorIcons = palette.decorIcons;
              const isEven = index % 2 === 0;
              const features = parseFeatures(service.fullDescription);

              return (
                <motion.div
                  key={service.id}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className={`flex flex-col lg:flex-row gap-0 overflow-hidden rounded-2xl border shadow-lg hover:shadow-2xl transition-all duration-300 group ${isEven ? "" : "lg:flex-row-reverse"}`}
                  style={{ background: "#ffffff", borderColor: "#E2E8F0" }}
                >
                  {/* ── Visual Panel ── */}
                  <div className={`lg:w-5/12 relative flex items-center justify-center min-h-[280px] lg:min-h-[380px] p-10 overflow-hidden bg-gradient-to-br ${palette.visualGradient}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full blur-2xl" style={{ background: palette.glowColor }} />
                    </div>
                    <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full border opacity-20" style={{ borderColor: palette.accentColor }} />
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full border opacity-20" style={{ borderColor: palette.accentColor }} />
                    <div className="absolute top-1/2 right-2 w-3 h-3 rounded-full opacity-30" style={{ background: palette.accentColor }} />
                    <div className="absolute top-1/4 left-8 w-2 h-2 rounded-full opacity-30" style={{ background: palette.accentColor }} />

                    {DecorIcons.slice(0, 3).map((DecorIcon, di) => {
                      const positions = ["top-6 left-6 opacity-25", "bottom-6 right-6 opacity-25", "top-6 right-24 opacity-20"];
                      return (
                        <div key={di} className={`absolute ${positions[di]} text-white`}>
                          <DecorIcon size={18} />
                        </div>
                      );
                    })}

                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
                        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                        <Icon size={44} color={palette.accentColor} />
                      </div>
                      <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide"
                        style={{ background: "rgba(255,255,255,0.12)", color: palette.accentColor, border: "1px solid rgba(255,255,255,0.15)" }}>
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* ── Content Panel ── */}
                  <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#FFF7ED", color: "#F97316" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {service.category}
                      </span>
                      <span className="text-xs font-bold text-slate-400" dir="ltr">0{index + 1}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight" style={{ color: "#0F172A" }}>
                      {service.title}
                    </h2>

                    <p className="text-base leading-relaxed mb-7" style={{ color: "#475569" }}>
                      {service.shortDescription}
                    </p>

                    {features.length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <CheckCircle2 size={16} className="shrink-0" style={{ color: "#F97316" }} />
                            <span className="text-sm font-semibold" style={{ color: "#334155" }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div>
                      <Link href="/start-project">
                        <button
                          data-testid={`btn-request-${service.id}`}
                          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                          style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", boxShadow: "0 4px 14px rgba(249,115,22,0.35)" }}
                        >
                          اطلب هذه الخدمة
                          <ArrowLeft size={16} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── CTA Section ─── */}
      <section className="container mx-auto px-4 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-12 lg:p-16 text-center text-white"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full blur-[80px] opacity-30" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              استشارة مجانية
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-5">محتار من أين تبدأ؟</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              احجز استشارة مجانية مع خبرائنا لنحدد معاً الخدمات الأنسب لمشروعك والتي ستحقق لك أفضل النتائج في أسرع وقت.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}>
                  تواصل معنا للاستشارة
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
