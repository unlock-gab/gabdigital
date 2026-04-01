import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft, Star, TrendingUp, Users, Award,
  Quote, Zap, ShieldCheck, BarChart2, HeartHandshake
} from "lucide-react";
import { useServiceCategories, useTestimonials } from "@/hooks/useSiteData";
import { getIcon, getPalette } from "@/lib/palette";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" }
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, delay, ease: "easeOut" }
});

const whyUs = [
  { icon: Award, title: "فريق خبراء محترف", desc: "كل عضو في فريقنا متخصص في مجاله بخبرة عملية لا مثيل لها." },
  { icon: Zap, title: "نتائج سريعة وقابلة للقياس", desc: "نضع مؤشرات واضحة ونقدم تقارير دورية عن أداء كل خدمة." },
  { icon: ShieldCheck, title: "شفافية تامة في التعامل", desc: "لا مفاجآت، لا تكاليف خفية. شراكة مبنية على الثقة." },
  { icon: HeartHandshake, title: "دعم مستمر لعملائنا", desc: "نبقى بجانبك بعد التسليم ونقدم استشارات مجانية للعملاء." },
  { icon: BarChart2, title: "أسعار مرنة وتنافسية", desc: "باقات مصممة لتناسب الشركات الناشئة والعلامات المحترفة." },
  { icon: TrendingUp, title: "استراتيجيات مخصصة", desc: "لا حلول جاهزة — كل خطة مصممة خصيصاً لطبيعة عملك." },
];

export default function Home() {
  const allCategories = useServiceCategories();
  const services = allCategories.slice(0, 6);
  const allTestimonials = useTestimonials();
  const testimonials = allTestimonials.map(t => ({
    name: t.clientName,
    role: t.businessName,
    text: t.text,
    rating: t.rating,
  }));

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F8FAFC" }}>

      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-[96vh] flex items-center overflow-hidden" style={{ background: "#0F172A" }}>
        {/* ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F97316 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 65%)" }} />

        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* floating shapes */}
        <div className="absolute top-24 right-24 w-20 h-20 rounded-full border-2 border-orange-500/20 animate-pulse" />
        <div className="absolute bottom-32 left-16 w-14 h-14 rounded-xl border-2 border-indigo-400/20 rotate-12" />
        <div className="absolute top-1/2 left-8 w-3 h-3 rounded-full bg-orange-500/40" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-white/20" />

        <div className="container mx-auto px-4 relative z-10 text-white py-40">
          <div className="max-w-4xl mx-auto text-center">

            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              وكالة التسويق الرقمي الرائدة في الجزائر
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl lg:text-8xl font-black mb-7 leading-[1.1]">
              حوّل تواجدك الرقمي<br />
              مع <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)" }} dir="ltr">GAB Digital</span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              نبني آلات تسويقية تضاعف مبيعاتك وتعزز علامتك في السوق الرقمي — من الاستراتيجية إلى التنفيذ.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project">
                <button
                  data-testid="btn-hero-start"
                  className="flex items-center gap-2 px-8 h-14 text-lg font-bold rounded-full text-white transition-all hover:-translate-y-1 hover:shadow-2xl"
                  style={{ background: "linear-gradient(135deg,#F97316,#EA580C)", boxShadow: "0 6px 24px rgba(249,115,22,0.4)" }}
                >
                  ابدأ مشروعك الآن
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <Link href="/our-work">
                <button
                  data-testid="btn-hero-work"
                  className="flex items-center gap-2 px-8 h-14 text-lg font-bold rounded-full border-2 border-white/25 text-white hover:bg-white/10 transition-all"
                >
                  اكتشف أعمالنا
                </button>
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div {...fadeUp(0.4)} className="mt-16 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm font-semibold">
              {["+200 عميل", "+500 مشروع", "98% رضا العملاء", "+5 سنوات خبرة"].map((t, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* wave separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 64 L0 32 Q360 0 720 32 Q1080 64 1440 32 L1440 64 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ─────────────── STATS ─────────────── */}
      <section className="py-0 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden -mt-2">
            {[
              { value: "+200", label: "عميل سعيد", icon: Users },
              { value: "+500", label: "مشروع منجز", icon: Award },
              { value: "98%", label: "نسبة الرضا", icon: Star },
              { value: "+5", label: "سنوات خبرة", icon: TrendingUp },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  {...inView(i * 0.08)}
                  className="flex flex-col items-center justify-center py-10 px-4 text-center border-l border-slate-100 first:border-l-0 relative group hover:bg-orange-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-3 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-slate-900 mb-1" dir="ltr">{stat.value}</div>
                  <div className="text-slate-500 font-semibold text-base">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── SERVICES ─────────────── */}
      <section className="py-28" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4">

          <motion.div {...inView()} className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-orange-100 text-orange-600 mb-5">خدماتنا</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
              كل ما تحتاجه <span className="text-orange-500">تحت سقف واحد</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              نقدم حلولاً رقمية متكاملة تغطي كل احتياجات علامتك التجارية للوصول إلى أهدافك.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length === 0 ? (
              <div className="col-span-3 text-center py-16 bg-white rounded-2xl border border-slate-100">
                <p className="text-slate-400 font-semibold">لا توجد خدمات حالياً — أضفها من لوحة الإدارة.</p>
              </div>
            ) : services.map((service, i) => {
              const palette = getPalette(i);
              const Icon = getIcon(service.icon);
              return (
                <motion.div
                  key={service.id}
                  {...inView(i * 0.06)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* visual top band */}
                  <div className={`relative h-28 bg-gradient-to-br ${palette.gradient} flex items-center justify-between px-6 overflow-hidden`}>
                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-50" style={{ background: palette.glow }} />
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "16px 16px" }} />
                    {service.imageUrl && (
                      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${service.imageUrl})` }} />
                    )}
                    <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                      <Icon size={30} color="white" />
                    </div>
                    {service.isFeatured && (
                      <span className="relative z-10 text-xs font-bold text-yellow-300 flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> مميز
                      </span>
                    )}
                  </div>

                  {/* content */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.shortDescription}</p>
                    <Link href={`/services/${service.slug}`}>
                      <span className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm group-hover:gap-3 transition-all cursor-pointer">
                        معرفة المزيد
                        <ArrowLeft size={15} />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}

            {/* View all card */}
            <motion.div {...inView(services.length * 0.06)} className="flex items-center justify-center">
              <Link href="/services">
                <div className="flex flex-col items-center justify-center gap-4 w-full h-full min-h-[200px] rounded-2xl border-2 border-dashed border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer p-8 text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <ArrowLeft size={24} />
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-orange-600 transition-colors">عرض جميع الخدمات</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── WHY US ─────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left: visual card */}
            <motion.div {...inView()} className="lg:w-5/12 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background: "#0F172A" }}>
                {/* glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full blur-[80px] opacity-30"
                    style={{ background: "radial-gradient(circle,#F97316,transparent)" }} />
                </div>
                {/* dots */}
                <div className="absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

                <div className="relative z-10 p-10">
                  <div className="text-6xl font-black text-transparent bg-clip-text mb-1"
                    style={{ backgroundImage: "linear-gradient(135deg,#F97316,#FB923C)" }} dir="ltr">GAB</div>
                  <div className="text-2xl font-black text-white tracking-widest mb-8" dir="ltr">DIGITAL</div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: "+200", lbl: "عميل" },
                      { val: "98%", lbl: "رضا" },
                      { val: "+500", lbl: "مشروع" },
                      { val: "+5", lbl: "سنوات" },
                    ].map((s, i) => (
                      <div key={i} className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="text-3xl font-black text-orange-400 mb-1" dir="ltr">{s.val}</div>
                        <div className="text-slate-400 text-sm font-semibold">{s.lbl}</div>
                      </div>
                    ))}
                  </div>

                  {/* rating pill */}
                  <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="flex text-yellow-400 gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <span className="text-white font-bold">5.0</span>
                    <span className="text-slate-400 text-sm">· تقييم العملاء</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: content */}
            <div className="lg:w-7/12">
              <motion.div {...inView(0.1)}>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-orange-100 text-orange-600 mb-5">لماذا نحن؟</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">
                  لماذا تختار <span className="text-orange-500" dir="ltr">GAB Digital؟</span>
                </h2>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  نحن لا نكتفي بتقديم الخدمات — نصبح شركاء نجاحك الحقيقيين ونجمع بين الإبداع والتكنولوجيا وعلم البيانات.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {whyUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} {...inView(0.1 + i * 0.07)}
                      className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 mb-1">{item.title}</div>
                        <div className="text-slate-500 text-sm leading-relaxed">{item.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div {...inView(0.5)} className="mt-10">
                <Link href="/start-project">
                  <button
                    className="flex items-center gap-2 px-8 h-13 py-3.5 text-base font-bold rounded-full text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg,#F97316,#EA580C)", boxShadow: "0 4px 16px rgba(249,115,22,0.35)" }}
                  >
                    ابدأ معنا اليوم
                    <ArrowLeft size={18} />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── DARK BANNER ─────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#0F172A" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-[80px] opacity-20"
          style={{ background: "radial-gradient(circle,#F97316,transparent)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Zap, title: "سرعة التنفيذ", desc: "نلتزم بالمواعيد ونسلّم مشاريعنا في الوقت المحدد دائماً." },
              { icon: ShieldCheck, title: "جودة مضمونة", desc: "نقدّم أعمالاً باحترافية عالية بمعايير دولية." },
              { icon: HeartHandshake, title: "شراكة طويلة الأمد", desc: "علاقتنا بك لا تنتهي عند التسليم — نبقى دائماً بجانبك." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} {...inView(i * 0.1)} className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.25)" }}>
                    <Icon size={24} color="#F97316" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── TESTIMONIALS ─────────────── */}
      <section className="py-28" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4">

          <motion.div {...inView()} className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-orange-100 text-orange-600 mb-5">آراء العملاء</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
              ماذا يقول <span className="text-orange-500">عملاؤنا</span>
            </h2>
            <p className="text-lg text-slate-600">نجاح عملائنا هو النجاح الحقيقي الذي نسعى إليه كل يوم.</p>
          </motion.div>

          {testimonials.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-400 font-semibold">لا توجد شهادات حالياً — أضفها من لوحة الإدارة.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...inView(i * 0.1)}
                className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-100 flex flex-col gap-5"
              >
                <Quote size={36} className="text-orange-100 absolute top-6 left-6" fill="currentColor" />
                <div className="flex gap-1 text-yellow-400">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" className={s <= (t.rating || 5) ? "" : "opacity-30"} />)}
                </div>
                <p className="text-slate-700 text-base leading-relaxed relative z-10">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 pt-2 border-t border-slate-100 mt-auto">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-orange-600 font-black text-lg"
                    style={{ background: "linear-gradient(135deg,#FED7AA,#FEF3C7)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#EA580C 0%,#F97316 50%,#FB923C 100%)" }} />
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full blur-[80px] opacity-30 bg-white" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 bg-yellow-300" />

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div {...inView()}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/25 text-white text-sm font-bold mb-8">
              <Zap size={14} fill="currentColor" />
              ابدأ رحلتك الرقمية اليوم
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              جاهز لمضاعفة<br />نتائجك الرقمية؟
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              لا تترك مساحة لمنافسيك. تواصل معنا اليوم ونبني معاً تواجداً رقمياً يليق بعلامتك.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project">
                <button className="flex items-center gap-2 px-9 h-14 text-lg font-bold rounded-full bg-white text-orange-600 hover:bg-slate-50 shadow-xl transition-all hover:-translate-y-0.5">
                  اطلب استشارة مجانية
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center gap-2 px-9 h-14 text-lg font-bold rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-all">
                  تواصل معنا
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
