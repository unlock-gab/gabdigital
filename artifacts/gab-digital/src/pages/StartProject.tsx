import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف غير صالح"),
  businessType: z.string().min(1, "يرجى تحديد نوع النشاط"),
  serviceRequired: z.string().min(1, "يرجى تحديد الخدمة المطلوبة"),
  budget: z.string().min(1, "يرجى تحديد الميزانية المتوقعة"),
  startDate: z.string().min(1, "يرجى تحديد موعد البدء"),
  description: z.string().min(20, "الرجاء تقديم وصف أطول للمشروع (20 حرف على الأقل)"),
  links: z.string().optional(),
});

export default function StartProject() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessType: "",
      serviceRequired: "",
      budget: "",
      startDate: "",
      description: "",
      links: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here we would normally send data to API
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "تم استلام طلبك بنجاح!",
        description: "سيقوم فريقنا بدراسة طلبك والتواصل معك في أقرب وقت.",
      });
    }, 1000);
  }

  if (isSubmitted) {
     return (
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-background">
           <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card p-12 rounded-[3rem] border border-border text-center max-w-lg mx-auto shadow-2xl shadow-primary/5"
           >
              <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                 <CheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-black mb-4">شكراً لتواصلك معنا!</h2>
              <p className="text-muted-foreground text-lg mb-8">
                 تم استلام تفاصيل مشروعك بنجاح. يقوم فريقنا الآن بمراجعتها وسنتواصل معك خلال 24-48 ساعة القادمة لمناقشة الخطوات التالية.
              </p>
              <Button onClick={() => window.location.href = '/'} className="font-bold rounded-full px-8 h-12 w-full">
                 العودة للرئيسية
              </Button>
           </motion.div>
        </div>
     );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            دعنا نبني شيئاً <span className="text-primary">عظيماً معاً</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            املأ النموذج أدناه لنفهم احتياجاتك بشكل أفضل ونقدم لك الحل الأنسب لمشروعك.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xl shadow-primary/5"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                   control={form.control}
                   name="fullName"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-base font-bold">الاسم الكامل *</FormLabel>
                       <FormControl>
                         <Input placeholder="أحمد محمد" className="h-12 bg-background" {...field} data-testid="input-fullname" />
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
                       <FormLabel className="text-base font-bold">البريد الإلكتروني *</FormLabel>
                       <FormControl>
                         <Input type="email" placeholder="example@domain.com" className="h-12 bg-background text-left" dir="ltr" {...field} data-testid="input-email" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                   control={form.control}
                   name="phone"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-base font-bold">رقم الهاتف / الواتساب *</FormLabel>
                       <FormControl>
                         <Input placeholder="+213 555 55 55 55" className="h-12 bg-background text-left" dir="ltr" {...field} data-testid="input-phone" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 
                 <FormField
                   control={form.control}
                   name="businessType"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-base font-bold">نوع النشاط التجاري *</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="h-12 bg-background" data-testid="select-business">
                             <SelectValue placeholder="اختر نوع النشاط" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="ecommerce">تجارة إلكترونية</SelectItem>
                           <SelectItem value="services">خدمات B2B</SelectItem>
                           <SelectItem value="realestate">عقارات</SelectItem>
                           <SelectItem value="medical">طبي / عيادات</SelectItem>
                           <SelectItem value="restaurant">مطعم / مقهى</SelectItem>
                           <SelectItem value="startup">شركة ناشئة (Startup)</SelectItem>
                           <SelectItem value="personal">علامة شخصية</SelectItem>
                           <SelectItem value="other">أخرى</SelectItem>
                         </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                   control={form.control}
                   name="serviceRequired"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-base font-bold">الخدمة الرئيسية المطلوبة *</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="h-12 bg-background" data-testid="select-service">
                             <SelectValue placeholder="اختر الخدمة" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="social">إدارة التواصل الاجتماعي</SelectItem>
                           <SelectItem value="ads">حملات إعلانية ممولة</SelectItem>
                           <SelectItem value="web">تصميم موقع / متجر</SelectItem>
                           <SelectItem value="branding">تصميم هوية بصرية</SelectItem>
                           <SelectItem value="video">إنتاج فيديو / موشن جرافيك</SelectItem>
                           <SelectItem value="comprehensive">باقة تسويق شاملة</SelectItem>
                         </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 
                 <FormField
                   control={form.control}
                   name="budget"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-base font-bold">الميزانية المتوقعة (شهرياً أو للمشروع) *</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="h-12 bg-background" data-testid="select-budget">
                             <SelectValue placeholder="حدد الميزانية التقريبية" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="under-50k">أقل من 50,000 دج</SelectItem>
                           <SelectItem value="50k-100k">50,000 - 100,000 دج</SelectItem>
                           <SelectItem value="100k-200k">100,000 - 200,000 دج</SelectItem>
                           <SelectItem value="over-200k">أكثر من 200,000 دج</SelectItem>
                           <SelectItem value="not-sure">غير متأكد / أحتاج استشارة</SelectItem>
                         </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">وصف المشروع والأهداف *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="حدثنا عن مشروعك، ما هي التحديات التي تواجهها؟ وما هي الأهداف التي تطمح لتحقيقها؟" 
                        className="min-h-[120px] bg-background resize-y" 
                        {...field} 
                        data-testid="textarea-desc"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                   control={form.control}
                   name="links"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-base font-bold">روابط مفيدة (اختياري)</FormLabel>
                       <FormControl>
                         <Input placeholder="رابط موقعك الحالي أو حسابات التواصل" className="h-12 bg-background text-left" dir="ltr" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />

                 <FormField
                   control={form.control}
                   name="startDate"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel className="text-base font-bold">متى ترغب في البدء؟ *</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="h-12 bg-background" data-testid="select-start">
                             <SelectValue placeholder="اختر الموعد" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="immediately">في أسرع وقت ممكن</SelectItem>
                           <SelectItem value="1-2-weeks">خلال أسبوع إلى أسبوعين</SelectItem>
                           <SelectItem value="next-month">الشهر القادم</SelectItem>
                           <SelectItem value="just-exploring">أستكشف الخيارات فقط</SelectItem>
                         </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
              </div>

              <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-xl mt-4" disabled={form.formState.isSubmitting} data-testid="btn-submit-project">
                {form.formState.isSubmitting ? "جاري الإرسال..." : "إرسال طلب المشروع"}
                {!form.formState.isSubmitting && <Send className="mr-2 w-5 h-5" />}
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4">
                 معلوماتك آمنة معنا ولن يتم مشاركتها مع أي جهة خارجية.
              </p>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
