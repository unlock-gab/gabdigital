import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Play, Star, TrendingUp, Users, Award, MonitorSmartphone, Megaphone, PenTool, BookOpen } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        {/* Background elements */}
        <div className="absolute inset-0 bg-background z-0" />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full z-0" />
        <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/20 blur-[120px] rounded-full z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-bold">وكالة التسويق الرقمي الرائدة</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              حوّل تواجدك الرقمي مع <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-orange-400">GAB Digital</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              نحن لا نصنع تصاميم ومواقع فقط، بل نبني آلات تسويقية تضاعف مبيعاتك وتعزز علامتك التجارية في السوق الرقمي.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/start-project">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-full group" data-testid="btn-hero-start">
                  ابدأ مشروعك الآن
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/our-work">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold rounded-full hover:bg-white/5 border-muted-foreground/30" data-testid="btn-hero-work">
                  اكتشف أعمالنا
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x-reverse md:divide-x divide-border">
            {[
              { value: "+200", label: "عميل سعيد" },
              { value: "+500", label: "مشروع منجز" },
              { value: "98%", label: "نسبة الرضا" },
              { value: "+5", label: "سنوات خبرة" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-primary mb-2" dir="ltr">{stat.value}</div>
                <div className="text-muted-foreground font-semibold text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">خدماتنا <span className="text-primary">المتكاملة</span></h2>
            <p className="text-lg text-muted-foreground">نقدم حلولاً شاملة تغطي كافة احتياجاتك الرقمية للوصول إلى جمهورك المستهدف وتحقيق أهدافك.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {[
              { icon: <MonitorSmartphone size={32} />, title: "التواصل الاجتماعي", desc: "إدارة وبناء مجتمعات نشطة تعزز ولاء عملائك." },
              { icon: <PenTool size={32} />, title: "إنتاج المحتوى", desc: "محتوى إبداعي يجذب الانتباه ويحكي قصة علامتك." },
              { icon: <MonitorSmartphone size={32} />, title: "المواقع والتجارة", desc: "متاجر ومواقع سريعة، جذابة، وعالية التحويل." },
              { icon: <Megaphone size={32} />, title: "الإعلانات", desc: "حملات إعلانية دقيقة تحقق أعلى عائد استثمار." },
              { icon: <TrendingUp size={32} />, title: "التسويق الرقمي", desc: "استراتيجيات مبنية على البيانات لتحقيق النمو." },
              { icon: <PenTool size={32} />, title: "الطباعة والهوية", desc: "تصاميم تعكس قيمتك وتجعلك لا تُنسى." },
              { icon: <BookOpen size={32} />, title: "الدورات والتدريب", desc: "تدريب عملي لتطوير مهاراتك في العالم الرقمي." }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="bg-card p-8 rounded-3xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{service.desc}</p>
                <Link href="/services">
                  <span className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                    اكتشف المزيد <ArrowLeft size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">لماذا <span className="text-primary">GAB Digital؟</span></h2>
              <p className="text-lg text-muted-foreground mb-10">
                نحن لا نكتفي بتقديم الخدمات، بل نصبح شركاء نجاحك. نجمع بين الإبداع، التكنولوجيا، واستراتيجيات التسويق الحديثة لنقدم لك نتائج ملموسة.
              </p>
              
              <div className="flex flex-col gap-6">
                {[
                  "فريق خبراء محترف في مختلف المجالات الرقمية",
                  "استراتيجيات مخصصة تناسب طبيعة عملك وأهدافك",
                  "شفافية تامة وتقارير دورية عن الأداء",
                  "دعم فني مستمر واستشارات مجانية للعملاء",
                  "أسعار تنافسية وباقات مرنة للشركات الناشئة"
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 bg-primary/20 text-primary rounded-full p-1">
                      <CheckCircle size={20} />
                    </div>
                    <p className="text-lg font-semibold">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              {/* Abstract decorative elements */}
              <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-primary/20 to-secondary/20 border border-border rotate-3 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-background/40 backdrop-blur-xl"></div>
                 <div className="relative z-10 text-center p-8">
                    <div className="text-8xl mb-4 font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-orange-600">GAB</div>
                    <div className="text-3xl font-black tracking-widest text-foreground">DIGITAL</div>
                 </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-3xl border border-border shadow-xl">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex text-yellow-400">
                    <Star size={20} fill="currentColor" />
                    <Star size={20} fill="currentColor" />
                    <Star size={20} fill="currentColor" />
                    <Star size={20} fill="currentColor" />
                    <Star size={20} fill="currentColor" />
                  </div>
                  <span className="font-bold">5.0</span>
                </div>
                <p className="text-sm text-muted-foreground font-semibold">تقييم العملاء الممتاز</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (simplified) */}
      <section className="py-24 bg-background">
         {/* ... (would have testimonials here, keeping it brief for the first iteration) ... */}
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">ماذا يقول <span className="text-primary">عملاؤنا</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
               {[1,2,3].map((i) => (
                  <div key={i} className="p-8 rounded-3xl bg-card border border-border text-right relative">
                     <Users className="text-primary/20 absolute top-8 left-8" size={64} />
                     <div className="flex text-yellow-500 mb-6">
                        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                     </div>
                     <p className="text-lg mb-8 relative z-10 text-muted-foreground italic">"فريق محترف جداً، تعاملت معهم في إنشاء موقعي وإدارة حملاتي الإعلانية وكانت النتائج مبهرة، أنصح بشدة بالتعامل معهم."</p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20"></div>
                        <div>
                           <div className="font-bold">أحمد محمد</div>
                           <div className="text-sm text-muted-foreground">صاحب متجر إلكتروني</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">جاهز للبدء في رحلة نجاحك؟</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            لا تترك مساحة لمنافسيك. تواصل معنا اليوم لنبدأ معاً في بناء تواجد رقمي قوي يليق بعلامتك التجارية.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/start-project">
              <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-white text-primary hover:bg-white/90">
                اطلب استشارة مجانية
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
