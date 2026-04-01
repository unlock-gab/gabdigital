import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, BookOpen, GraduationCap, ArrowLeft, Trophy, Users, MonitorPlay } from "lucide-react";

export default function Academy() {
  const courses = [
    {
      id: 1,
      title: "احتراف إعلانات فيسبوك وانستغرام",
      instructor: "أحمد جاب",
      level: "مبتدئ إلى متقدم",
      duration: "12 ساعة",
      lessons: 45,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
      desc: "تعلم كيف تطلق حملات إعلانية مربحة خطوة بخطوة مع استراتيجيات التوسع وإعادة الاستهداف.",
      tag: "الأكثر مبيعاً"
    },
    {
      id: 2,
      title: "أسرار إعلانات تيك توك",
      instructor: "فريق جاب",
      level: "متوسط",
      duration: "8 ساعات",
      lessons: 32,
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=800&q=80",
      desc: "استغل المنصة الأسرع نمواً، تعلم كيفية صياغة الفيديوهات البيعية وإطلاق إعلانات تحقق نتائج.",
      tag: "جديد"
    },
    {
      id: 3,
      title: "إدارة التواصل الاجتماعي للشركات",
      instructor: "سارة محمد",
      level: "مبتدئ",
      duration: "15 ساعة",
      lessons: 50,
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80",
      desc: "دليل شامل لكيفية كتابة المحتوى، الجدولة، تحليل البيانات، والتعامل مع العملاء كمدير حسابات."
    },
    {
      id: 4,
      title: "مونتاج الفيديو التسويقي بالهاتف",
      instructor: "عمر خالد",
      level: "مبتدئ",
      duration: "6 ساعات",
      lessons: 25,
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
      desc: "احتراف تطبيقات المونتاج على الهاتف لإنتاج فيديوهات ريلز وتيك توك جذابة وعالية الجودة."
    },
    {
      id: 5,
      title: "التصميم الجرافيكي للمسوقين",
      instructor: "ياسين علي",
      level: "متوسط",
      duration: "10 ساعات",
      lessons: 40,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
      desc: "تعلم أساسيات الفوتوشوب واليستريتور لتصميم إعلانات ومنشورات احترافية."
    },
    {
      id: 6,
      title: "دليلك للعمل الحر كمستقل",
      instructor: "أحمد جاب",
      level: "مبتدئ",
      duration: "5 ساعات",
      lessons: 20,
      image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80",
      desc: "كيف تبني ملفك الشخصي، تسعر خدماتك، وتحصل على أول عملائك في منصات العمل الحر."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-20">
      {/* Hero */}
      <section className="bg-[#0f172a] py-32 pt-40 mb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 mb-6">
            <GraduationCap size={20} />
            <span className="text-sm font-bold">تعلم من خبراء السوق</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            أكاديمية GAB — <span className="text-orange-500">أتقن المهارات الرقمية</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto mb-10"
          >
            دورات تدريبية عملية ومكثفة مصممة لتأهيلك لسوق العمل أو لتطوير مهاراتك في تنمية مشروعك الخاص.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6">
             <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <Users className="text-orange-500" size={20} />
                <span>+1000 طالب مسجل</span>
             </div>
             <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <MonitorPlay className="text-orange-500" size={20} />
                <span>+50 ساعة تدريبية</span>
             </div>
             <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <Trophy className="text-orange-500" size={20} />
                <span>شهادات معتمدة</span>
             </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Learning Paths */}
        <div className="mb-24">
           <h2 className="text-3xl font-black mb-10 text-center text-slate-900">مسارات التعلم <span className="text-orange-500">المقترحة</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                 { title: "مدير التواصل الاجتماعي", desc: "تعلم صناعة المحتوى والتصميم الأساسي والإدارة.", color: "border-blue-100 bg-blue-50 text-blue-600" },
                 { title: "مشتري الإعلانات (Media Buyer)", desc: "احتراف منصات الإعلانات وبناء مسارات التحويل.", color: "border-orange-100 bg-orange-50 text-orange-600" },
                 { title: "المونتير التسويقي", desc: "ركز على مهارات إنتاج الفيديو الجذاب للمنصات.", color: "border-purple-100 bg-purple-50 text-purple-600" },
                 { title: "المستقل المبتدئ", desc: "مهارات أساسية مع دليل البدء في العمل الحر.", color: "border-emerald-100 bg-emerald-50 text-emerald-600" }
              ].map((path, i) => (
                 <div key={i} className={`p-6 rounded-2xl border ${path.color} shadow-sm`}>
                    <h3 className="text-xl font-bold mb-3">{path.title}</h3>
                    <p className="text-sm opacity-90 mb-6 font-medium">{path.desc}</p>
                    <button className="text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                       عرض مسار التعلم <ArrowLeft size={16} />
                    </button>
                 </div>
              ))}
           </div>
        </div>

        {/* Courses Grid */}
        <h2 className="text-3xl font-black mb-10 text-center text-slate-900">تصفح <span className="text-orange-500">جميع الدورات</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <PlayCircle size={64} className="text-white" />
                </div>
                {course.tag && (
                  <div className="absolute top-4 left-4 z-20 bg-orange-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                    {course.tag}
                  </div>
                )}
                <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                  {course.level}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 text-slate-900">{course.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                  {course.desc}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                   <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-orange-500" />
                      <span>{course.duration}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <BookOpen size={16} className="text-orange-500" />
                      <span>{course.lessons} درس</span>
                   </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                        {course.instructor.charAt(0)}
                     </div>
                     <span className="text-sm font-semibold text-slate-700">{course.instructor}</span>
                  </div>
                  <Button variant="outline" className="font-bold rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white" data-testid={`btn-course-${course.id}`}>
                    تفاصيل الدورة
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
