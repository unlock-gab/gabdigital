import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      {/* Hero */}
      <section className="bg-card py-20 border-b border-border mb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            من هي <span className="text-primary">GAB Digital؟</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            نحن وكالة تسويق رقمي جزائرية برؤية عالمية، نجمع بين الإبداع، البيانات، والتقنية لمساعدة الشركات على بناء تواجد رقمي قوي ومربح في عالم يتسارع يومياً.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-3xl border border-border text-center"
           >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                 <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">رسالتنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                 تزويد الشركات ورواد الأعمال بأدوات وحلول تسويقية رقمية مبتكرة تحقق نمواً قابلاً للقياس وتزيد من إيراداتهم بتكلفة عادلة.
              </p>
           </motion.div>
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border text-center"
           >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                 <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                 أن نكون الوكالة الرقمية الرائدة والموثوقة في المنطقة، والخيار الأول لكل علامة تجارية تطمح للتميز والريادة في سوقها.
              </p>
           </motion.div>
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card p-8 rounded-3xl border border-border text-center"
           >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                 <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">قيمنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                 الشفافية المطلقة مع العميل، الإبداع المستمر، الالتزام بالمواعيد، والشغف الدائم بتحقيق نتائج تفوق التوقعات.
              </p>
           </motion.div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
           <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">لماذا نحن <span className="text-primary">مختلفون؟</span></h2>
              <div className="space-y-6">
                 {[
                    { title: "نركز على العائد على الاستثمار (ROI)", desc: "لا نهتم فقط بالشكل الجميل أو الإعجابات، هدفنا النهائي هو زيادة مبيعاتك وتنمية أعمالك." },
                    { title: "فريق متكامل وليس شخصاً واحداً", desc: "عندما تعمل معنا، أنت توظف فريقاً من المصممين، المبرمجين، والمسوقين بكسر تكلفة توظيف شخص واحد." },
                    { title: "نواكب التحديثات يومياً", desc: "خوارزميات المنصات تتغير يومياً، ونحن نضمن أن استراتيجيتك محدثة دائماً وتستفيد من أحدث التوجهات." }
                 ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                       <CheckCircle2 className="text-primary shrink-0 mt-1" size={24} />
                       <div>
                          <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                          <p className="text-muted-foreground">{item.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                 <div className="aspect-square rounded-3xl bg-muted overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Team" className="w-full h-full object-cover" />
                 </div>
                 <div className="aspect-[4/3] rounded-3xl bg-primary/10 flex items-center justify-center p-6 text-center text-primary font-bold">
                    "نعمل بشغف لأننا نؤمن بقوة التأثير الرقمي"
                 </div>
              </div>
              <div className="space-y-4 pt-8">
                 <div className="aspect-[4/3] rounded-3xl bg-secondary/10 flex flex-col items-center justify-center p-6 text-center text-secondary font-bold">
                    <span className="text-4xl block mb-2">+5</span>
                    سنوات من الخبرة والإبداع
                 </div>
                 <div className="aspect-square rounded-3xl bg-muted overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" alt="Meeting" className="w-full h-full object-cover" />
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-orange-500 rounded-[3rem] p-12 text-center max-w-4xl mx-auto text-white shadow-xl shadow-primary/20">
          <h2 className="text-3xl font-black mb-6 text-white">انضم إلى قائمة عملائنا الناجحين</h2>
          <p className="text-lg text-white/80 mb-8">
            جاهزون لنقل أعمالك إلى المستوى التالي. لنتحدث عن مشروعك وكيف يمكننا مساعدتك.
          </p>
          <Link href="/start-project">
            <Button size="lg" className="font-bold rounded-full px-8 h-14 text-lg bg-white text-primary hover:bg-white/90">
              تواصل معنا الآن
              <ArrowLeft className="mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
