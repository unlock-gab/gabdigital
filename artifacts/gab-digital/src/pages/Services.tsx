import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  MonitorSmartphone, PenTool, Megaphone, TrendingUp, BookOpen,
  Layers, Video, ArrowLeft, CheckCircle2, BarChart2, Globe,
  Share2, Camera, Search, Mail, Palette, Zap, Play, Star,
  ShoppingCart, Layout, Smartphone, Target, Users, Award,
  FileText, Printer, Brush, GraduationCap
} from "lucide-react";

const categories = [
  {
    id: "social",
    tag: "إدارة المجتمع",
    title: "التواصل الاجتماعي والمحتوى",
    icon: MonitorSmartphone,
    desc: "ندير تواجدك الرقمي باحترافية لنبني لك مجتمعاً يتفاعل مع علامتك التجارية ويتحوّل إلى عملاء حقيقيين.",
    features: [
      "إدارة الصفحات كاملة",
      "إعداد وتحسين الملفات الشخصية",
      "إنشاء المحتوى الحصري",
      "الجدولة والنشر الذكي",
      "إدارة المجتمع والردود",
      "خطة المحتوى الشهرية"
    ],
    visualGradient: "from-blue-900 via-indigo-900 to-purple-900",
    glowColor: "rgba(99,102,241,0.4)",
    accentColor: "#818CF8",
    decorIcons: [Share2, BarChart2, Globe, Users],
  },
  {
    id: "creative",
    tag: "الإنتاج المرئي",
    title: "الإنتاج الإبداعي",
    icon: Video,
    desc: "نحوّل أفكارك إلى صور وفيديوهات تخطف الأنظار وتحفز الشراء وتبني هوية بصرية لا تُنسى.",
    features: [
      "تصوير المنتجات الاحترافي",
      "فيديوهات ترويجية (Reels/TikTok)",
      "المونتاج السينمائي",
      "الجرافيك المتحرك (Motion Graphics)",
      "تغطية الفعاليات والمؤتمرات"
    ],
    visualGradient: "from-rose-900 via-pink-900 to-orange-900",
    glowColor: "rgba(251,113,133,0.4)",
    accentColor: "#FB7185",
    decorIcons: [Camera, Play, Star, Palette],
  },
  {
    id: "web",
    tag: "التطوير الرقمي",
    title: "المواقع والتجارة الإلكترونية",
    icon: Layers,
    desc: "نصمم ونطوّر مواقع ومتاجر إلكترونية سريعة، آمنة، وعالية التحويل تمثّل علامتك بأفضل صورة.",
    features: [
      "مواقع الشركات التعريفية",
      "منصات الخدمات التفاعلية",
      "مواقع العقارات والمحفظة",
      "المتاجر الإلكترونية المتكاملة",
      "إدارة النطاق والاستضافة",
      "تحسين السرعة والأداء"
    ],
    visualGradient: "from-cyan-900 via-teal-900 to-emerald-900",
    glowColor: "rgba(20,184,166,0.4)",
    accentColor: "#2DD4BF",
    decorIcons: [Globe, Layout, ShoppingCart, Smartphone],
  },
  {
    id: "ads",
    tag: "الإعلانات المدفوعة",
    title: "الإعلانات والأداء",
    icon: Megaphone,
    desc: "حملات إعلانية ممولة ومدروسة تصل إلى جمهورك المستهدف بدقة عالية وأقل تكلفة ممكنة لتحقيق أعلى عائد.",
    features: [
      "إعلانات ميتا (فيسبوك وانستغرام)",
      "إعلانات جوجل وشبكة البحث",
      "إعلانات تيك توك",
      "حملات إعادة الاستهداف (Retargeting)",
      "تحليل الحملات والبيانات",
      "التحسين المستمر (A/B Testing)"
    ],
    visualGradient: "from-orange-900 via-amber-900 to-yellow-900",
    glowColor: "rgba(249,115,22,0.4)",
    accentColor: "#FB923C",
    decorIcons: [Target, BarChart2, Zap, Award],
  },
  {
    id: "marketing",
    tag: "التسويق الاستراتيجي",
    title: "التسويق الرقمي",
    icon: TrendingUp,
    desc: "استراتيجيات متكاملة مبنية على البيانات والتحليل لتحقيق نمو مستدام وانتشار قوي في السوق الرقمي.",
    features: [
      "خطط التسويق الشاملة",
      "تحليل المنافسين والسوق",
      "تحسين محركات البحث (SEO)",
      "التسويق بالبريد الإلكتروني",
      "بناء مسارات التحويل (Funnels)"
    ],
    visualGradient: "from-green-900 via-teal-900 to-cyan-900",
    glowColor: "rgba(34,197,94,0.4)",
    accentColor: "#4ADE80",
    decorIcons: [Search, Mail, BarChart2, Globe],
  },
  {
    id: "branding",
    tag: "الهوية البصرية",
    title: "الطباعة والهوية البصرية",
    icon: PenTool,
    desc: "نصمم لك هوية بصرية احترافية لا تُنسى ومواد مطبوعة تعكس قيمتك وتميّزك عن المنافسين.",
    features: [
      "تصميم المنشورات والبروشورات",
      "اللافتات الإعلانية",
      "الملصقات الدعائية",
      "تصميم التغليف والعلب",
      "المواد الإعلانية للشركات"
    ],
    visualGradient: "from-purple-900 via-violet-900 to-indigo-900",
    glowColor: "rgba(167,139,250,0.4)",
    accentColor: "#A78BFA",
    decorIcons: [Brush, Palette, FileText, Printer],
  },
  {
    id: "training",
    tag: "التعليم والتطوير",
    title: "الدورات والتدريب",
    icon: BookOpen,
    desc: "ننقل خبراتنا إليك عبر دورات عملية مكثفة تؤهّلك للعمل في المجال الرقمي بكفاءة واحترافية.",
    features: [
      "إدارة التواصل الاجتماعي",
      "مونتاج الفيديو الاحترافي",
      "التصميم الجرافيكي",
      "إدارة الحملات الإعلانية",
      "العمل الحر وتطوير الذات"
    ],
    visualGradient: "from-yellow-900 via-amber-900 to-orange-900",
    glowColor: "rgba(251,191,36,0.4)",
    accentColor: "#FCD34D",
    decorIcons: [GraduationCap, Star, Award, Users],
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" }
  })
};

export default function Services() {
  return (
    <div className="min-h-screen pb-24" style={{ background: "#F8FAFC" }}>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-36 pb-28 text-white" style={{ background: "#0F172A" }}>
        {/* ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-20" style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }} />

        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            خدمات GAB Digital
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            خدمات <span className="text-orange-500">متكاملة</span> للنمو
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            كل ما تحتاجه للنجاح في العالم الرقمي تحت سقف واحد. من الفكرة إلى التنفيذ والتسويق.
          </motion.p>

          {/* service count badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {["التواصل الاجتماعي", "الإنتاج الإبداعي", "المواقع", "الإعلانات", "التسويق", "الهوية البصرية", "التدريب"].map((s, i) => (
              <span key={i} className="px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10 bg-white/5 text-slate-300">
                {s}
              </span>
            ))}
          </motion.div>
        </div>

        {/* bottom wave separator */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 48 L0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ─── Services List ─── */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col gap-10">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={cat.id}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`flex flex-col lg:flex-row gap-0 overflow-hidden rounded-2xl border shadow-lg hover:shadow-2xl transition-all duration-300 group ${isEven ? "" : "lg:flex-row-reverse"}`}
                style={{ background: "#ffffff", borderColor: "#E2E8F0" }}
              >
                {/* ── Visual Panel ── */}
                <div
                  className={`lg:w-5/12 relative flex items-center justify-center min-h-[280px] lg:min-h-[380px] p-10 overflow-hidden`}
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-via, var(--tw-gradient-from)), var(--tw-gradient-to))`,
                    backgroundImage: `linear-gradient(135deg, ${
                      cat.visualGradient.replace("from-", "").replace("via-", "").replace("to-", "")
                    })`,
                  }}
                >
                  {/* Use explicit background since tailwind JIT might not pick arbitrary combos */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.visualGradient}`} />

                  {/* Glow circle behind icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full blur-2xl" style={{ background: cat.glowColor }} />
                  </div>

                  {/* Dot grid overlay */}
                  <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }} />

                  {/* Decorative floating circles */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full border opacity-20" style={{ borderColor: cat.accentColor }} />
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full border opacity-20" style={{ borderColor: cat.accentColor }} />
                  <div className="absolute top-1/2 right-2 w-3 h-3 rounded-full opacity-30" style={{ background: cat.accentColor }} />
                  <div className="absolute top-1/4 left-8 w-2 h-2 rounded-full opacity-30" style={{ background: cat.accentColor }} />

                  {/* Decorative mini icons */}
                  {cat.decorIcons.slice(0, 3).map((DecorIcon, di) => {
                    const positions = [
                      "top-6 left-6 opacity-25",
                      "bottom-6 right-6 opacity-25",
                      "top-6 right-24 opacity-20"
                    ];
                    return (
                      <div key={di} className={`absolute ${positions[di]} text-white`}>
                        <DecorIcon size={18} />
                      </div>
                    );
                  })}

                  {/* Main icon */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
                      style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      <Icon size={44} color={cat.accentColor} />
                    </div>
                    <span
                      className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide"
                      style={{ background: "rgba(255,255,255,0.12)", color: cat.accentColor, border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      {cat.tag}
                    </span>
                  </div>
                </div>

                {/* ── Content Panel ── */}
                <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
                  {/* Tag + number */}
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: "#FFF7ED", color: "#F97316" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {cat.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-400" dir="ltr">0{index + 1}</span>
                  </div>

                  <h2
                    className="text-2xl md:text-3xl font-black mb-4 leading-tight"
                    style={{ color: "#0F172A" }}
                  >
                    {cat.title}
                  </h2>

                  <p className="text-base leading-relaxed mb-7" style={{ color: "#475569" }}>
                    {cat.desc}
                  </p>

                  {/* Feature bullets */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {cat.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2
                          size={16}
                          className="shrink-0"
                          style={{ color: "#F97316" }}
                        />
                        <span className="text-sm font-semibold" style={{ color: "#334155" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div>
                    <Link href="/start-project">
                      <button
                        data-testid={`btn-request-${cat.id}`}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                          boxShadow: "0 4px 14px rgba(249,115,22,0.35)"
                        }}
                        onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 20px rgba(249,115,22,0.5)")}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 14px rgba(249,115,22,0.35)")}
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
      </div>

      {/* ─── CTA Section ─── */}
      <section className="container mx-auto px-4 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-12 lg:p-16 text-center text-white"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}
        >
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full blur-[80px] opacity-30" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
          </div>

          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }} />

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
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}
                >
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
