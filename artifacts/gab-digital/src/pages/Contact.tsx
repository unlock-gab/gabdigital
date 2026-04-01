import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Instagram, Send, HelpCircle, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  message: z.string().min(10, "الرسالة مطلوبة (10 أحرف على الأقل)"),
});

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "تم إرسال رسالتك",
      description: "شكراً لتواصلك معنا، سنرد عليك في أقرب وقت.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            نحن هنا <span className="text-primary">للاستماع إليك</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            لديك استفسار؟ تريد التعاون معنا؟ فريقنا جاهز للرد على كل تساؤلاتك.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
           {/* Contact Info */}
           <div className="lg:col-span-1 space-y-8">
              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="bg-card p-6 rounded-3xl border border-border"
              >
                 <h3 className="text-xl font-bold mb-6">معلومات التواصل</h3>
                 <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <MapPin size={24} />
                       </div>
                       <div>
                          <div className="font-bold mb-1">العنوان</div>
                          <div className="text-muted-foreground text-sm">الجزائر، الجزائر العاصمة</div>
                       </div>
                    </li>
                    <li className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Phone size={24} />
                       </div>
                       <div>
                          <div className="font-bold mb-1">رقم الهاتف / واتساب</div>
                          <div className="text-muted-foreground text-sm" dir="ltr">+213 555 55 55 55</div>
                       </div>
                    </li>
                    <li className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Mail size={24} />
                       </div>
                       <div>
                          <div className="font-bold mb-1">البريد الإلكتروني</div>
                          <div className="text-muted-foreground text-sm">contact@gabdigital.com</div>
                       </div>
                    </li>
                 </ul>

                 <div className="mt-8 pt-8 border-t border-border">
                    <h4 className="font-bold mb-4">تابعنا على المنصات</h4>
                    <a 
                       href="https://www.instagram.com/digital.gab16" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                       <Instagram size={20} />
                       <span>digital.gab16</span>
                    </a>
                 </div>
              </motion.div>
           </div>

           {/* Contact Form */}
           <div className="lg:col-span-2">
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="bg-card p-8 rounded-3xl border border-border shadow-xl shadow-primary/5"
              >
                 <h3 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h3>
                 <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold">الاسم</FormLabel>
                              <FormControl>
                                <Input placeholder="الاسم الكامل" className="bg-background" {...field} data-testid="input-contact-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold">البريد الإلكتروني</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="example@domain.com" className="bg-background text-left" dir="ltr" {...field} data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                     </div>
                     <FormField
                       control={form.control}
                       name="message"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="font-bold">الرسالة</FormLabel>
                           <FormControl>
                             <Textarea 
                               placeholder="كيف يمكننا مساعدتك؟" 
                               className="min-h-[150px] bg-background" 
                               {...field} 
                               data-testid="textarea-contact-msg"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <Button type="submit" className="w-full md:w-auto px-8 font-bold" data-testid="btn-contact-submit">
                       إرسال الرسالة
                       <Send className="mr-2 w-4 h-4" />
                     </Button>
                   </form>
                 </Form>
              </motion.div>
           </div>
        </div>

        {/* Subscription Help Service Section */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-gradient-to-r from-secondary/20 to-blue-500/20 border border-secondary/30 rounded-3xl p-8 md:p-12 text-center md:text-right flex flex-col md:flex-row items-center gap-8"
        >
           <div className="w-24 h-24 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
              <ShieldCheck size={48} />
           </div>
           <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary font-bold text-sm mb-4">
                 <HelpCircle size={16} /> خدمة خاصة لعملائنا
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">مساعدة في الاشتراكات الرسمية للأدوات الرقمية</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                 هل تواجه صعوبة في الاشتراك بالأدوات الرقمية الأساسية لعملك (مثل Canva Pro، باقة Adobe Creative Cloud، أو غيرها) بسبب عدم توفر وسائل دفع دولية؟ نحن في GAB Digital نوفر خدمة المساعدة في تفعيل الاشتراكات الرسمية والقانونية لعملائنا بالدينار الجزائري لتسهيل عملهم.
              </p>
              <Button variant="secondary" className="font-bold rounded-full" onClick={() => window.open('https://wa.me/213555555555', '_blank')}>
                 استفسر عن الخدمة عبر واتساب
              </Button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
