import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MonitorSmartphone, PenTool, Megaphone, TrendingUp, BookOpen, Layers, Video, ArrowLeft } from "lucide-react";

export default function Services() {
  const categories = [
    {
      id: "social",
      title: "التواصل الاجتماعي والمحتوى",
      icon: <MonitorSmartphone size={40} />,
      desc: "ندير تواجدك الرقمي باحترافية لنبني لك مجتمعاً يتفاعل مع علامتك التجارية.",
      features: ["إدارة الصفحات كاملة", "إعداد وتحسين الملفات الشخصية", "إنشاء المحتوى الحصري", "الجدولة والنشر", "إدارة المجتمع والردود", "خطة المحتوى الشهرية"]
    },
    {
      id: "creative",
      title: "الإنتاج الإبداعي",
      icon: <Video size={40} />,
      desc: "نحول أفكارك إلى صور وفيديوهات تخطف الأنظار وتحفز الشراء.",
      features: ["تصوير المنتجات الاحترافي", "الفيديوهات الترويجية (Reels/TikTok)", "المونتاج السينمائي", "الجرافيك المتحرك (Motion Graphics)", "تغطية الفعاليات والمؤتمرات"]
    },
    {
      id: "web",
      title: "المواقع والتجارة الإلكترونية",
      icon: <Layers size={40} />,
      desc: "نصمم ونطور مواقع ومتاجر سريعة، آمنة، وعالية التحويل.",
      features: ["مواقع الشركات التعريفية", "منصات الخدمات التفاعلية", "مواقع العقارات والمحفظة", "المتاجر الإلكترونية المتكاملة", "إدارة النطاق والاستضافة", "تحسين السرعة والأداء"]
    },
    {
      id: "ads",
      title: "الإعلانات والأداء",
      icon: <Megaphone size={40} />,
      desc: "حملات ممولة دقيقة تصل لجمهورك المستهدف بأقل تكلفة ممكنة.",
      features: ["إعلانات ميتا (فيسبوك وانستغرام)", "إعلانات جوجل وشبكة البحث", "إعلانات تيك توك", "حملات إعادة الاستهداف", "تحليل الحملات والبيانات", "التحسين المستمر للأداء (A/B Testing)"]
    },
    {
      id: "marketing",
      title: "التسويق الرقمي",
      icon: <TrendingUp size={40} />,
      desc: "استراتيجيات متكاملة للنمو المستدام في السوق الرقمي المزدحم.",
      features: ["خطط التسويق الشاملة", "تحليل المنافسين والسوق", "تحسين محركات البحث (SEO)", "التسويق بالبريد الإلكتروني", "بناء مسارات التحويل (Funnels)"]
    },
    {
      id: "branding",
      title: "الطباعة والهوية البصرية",
      icon: <PenTool size={40} />,
      desc: "نصمم لك هوية لا تُنسى ومواد مطبوعة تعكس احترافيتك.",
      features: ["تصميم المنشورات والبروشورات", "اللافتات الإعلانية", "الملصقات الدعائية", "تصميم التغليف والعلب", "المواد الإعلانية للشركات"]
    },
    {
      id: "training",
      title: "الدورات والتدريب",
      icon: <BookOpen size={40} />,
      desc: "ننقل خبراتنا إليك عبر دورات عملية ومكثفة.",
      features: ["إدارة التواصل الاجتماعي", "مونتاج الفيديو", "التصميم الجرافيكي", "إدارة الحملات الإعلانية", "العمل الحر وتطوير الذات"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <section className="bg-[#0f172a] py-32 pt-40 mb-16 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            خدمات <span className="text-orange-500">متكاملة</span> للنمو
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            كل ما تحتاجه للنجاح في العالم الرقمي تحت سقف واحد. من الفكرة إلى التنفيذ والتسويق.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12 lg:gap-24">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col lg:flex-row gap-12 items-center bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-slate-100 hover:shadow-xl transition-shadow ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2">
                <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  {cat.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900">{cat.title}</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {cat.desc}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {cat.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
                      <span className="font-semibold text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/start-project">
                  <Button className="font-bold rounded-full px-8 h-12 bg-orange-500 hover:bg-orange-600 text-white shadow-md border-0" data-testid={`btn-request-${cat.id}`}>
                    اطلب هذه الخدمة
                  </Button>
                </Link>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-orange-50 to-slate-100 border border-slate-100 flex items-center justify-center overflow-hidden relative shadow-inner">
                   <div className="relative z-10 text-orange-500/20 text-9xl transform scale-150">
                     {cat.icon}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-32">
        <div className="bg-gradient-to-l from-orange-500 to-orange-600 rounded-[2rem] p-12 text-center max-w-4xl mx-auto text-white shadow-xl">
          <h2 className="text-3xl font-black mb-6">محتار من أين تبدأ؟</h2>
          <p className="text-lg text-white/90 mb-8">
            احجز استشارة مجانية مع خبرائنا لنحدد معاً الخدمات الأنسب لمشروعك والتي ستحقق لك أفضل النتائج في أسرع وقت.
          </p>
          <Link href="/contact">
            <Button size="lg" className="font-bold rounded-full px-8 h-14 text-lg bg-white text-orange-600 hover:bg-slate-50 border-0 shadow-md">
              تواصل معنا للاستشارة
              <ArrowLeft className="mr-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
