import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Download, Star } from "lucide-react";

export default function DigitalProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "الكل" },
    { id: "templates", label: "قوالب" },
    { id: "marketing", label: "موارد تسويقية" },
    { id: "creative", label: "أصول إبداعية" },
    { id: "educational", label: "مواد تعليمية" },
    { id: "bundles", label: "حزم أعمال" }
  ];

  const products = [
    {
      id: 1,
      title: "قوالب CapCut الاحترافية",
      category: "templates",
      price: 800,
      image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=800&q=80",
      desc: "مجموعة من 50 قالب انتقالات وتأثيرات جاهزة لبرنامج CapCut.",
      rating: 4.8
    },
    {
      id: 2,
      title: "إضافات LUT السينمائية",
      category: "creative",
      price: 1200,
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
      desc: "حزمة تلوين سينمائية احترافية للبريمير برو ودافنشي ريزولف.",
      rating: 5.0
    },
    {
      id: 3,
      title: "قوالب Canva لمنصات التواصل",
      category: "templates",
      price: 900,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
      desc: "أكثر من 100 قالب قابل للتعديل بسهولة على Canva لمختلف المنصات.",
      rating: 4.7
    },
    {
      id: 4,
      title: "حزم منشورات جاهزة (عقارات)",
      category: "marketing",
      price: 1900,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      desc: "محتوى مكتوب وتصاميم جاهزة تكفي لمدة 3 أشهر لوكالات العقارات.",
      rating: 4.9
    },
    {
      id: 5,
      title: "قوالب إعلانات عالية التحويل",
      category: "marketing",
      price: 2400,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      desc: "هياكل إعلانية مجربة أثبتت نجاحها في حملات فيسبوك وانستغرام.",
      rating: 5.0
    },
    {
      id: 6,
      title: "تقويمات المحتوى (2025)",
      category: "marketing",
      price: 1400,
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
      desc: "خطة محتوى شاملة مع أفكار لكل يوم في السنة لتنشيط حساباتك.",
      rating: 4.6
    },
    {
      id: 7,
      title: "كتاب: أسرار الإعلانات الممولة",
      category: "educational",
      price: 700,
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80",
      desc: "دليل شامل لاحتراف إطلاق وتحسين الحملات الإعلانية من الصفر.",
      rating: 4.9
    },
    {
      id: 8,
      title: "قوائم تحقق إطلاق المشاريع",
      category: "educational",
      price: 500,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
      desc: "قائمة بالخطوات اللازمة قبل إطلاق أي متجر أو موقع إلكتروني.",
      rating: 4.5
    },
    {
      id: 9,
      title: "نظام إدارة الوكالة (Notion)",
      category: "templates",
      price: 1200,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      desc: "مساحة عمل جاهزة على نوشن لإدارة العملاء والمشاريع والفريق.",
      rating: 5.0
    },
    {
      id: 10,
      title: "حزمة رواد الأعمال الشاملة",
      category: "bundles",
      price: 3600,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      desc: "تتضمن قوالب مالية، عقود، خطط تسويق، وعروض تقديمية (وفر 40٪).",
      rating: 5.0
    },
    {
      id: 11,
      title: "مجموعة سكريبتات فيديو البيع",
      category: "marketing",
      price: 2100,
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
      desc: "نصوص جاهزة لكتابة سيناريوهات فيديوهات بيعية VSL تقنع العميل.",
      rating: 4.8
    },
    {
      id: 12,
      title: "الدليل العملي لتحسين SEO",
      category: "educational",
      price: 600,
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
      desc: "ملف PDF يحتوي على خطوات عملية لتصدر نتائج البحث في جوجل.",
      rating: 4.7
    }
  ];

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      {/* Hero */}
      <section className="bg-card py-20 border-b border-border mb-16 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Download size={16} />
            <span className="text-sm font-bold">تحميل فوري بعد الدفع</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            متجر <span className="text-primary">الموارد الرقمية</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            أدوات، قوالب، وحزم احترافية جاهزة للاستخدام لتسريع عملك ومضاعفة إنتاجيتك في التسويق والتصميم.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === category.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-testid={`tab-${category.id}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-foreground flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span dir="ltr">{product.rating}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {product.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-xl font-black text-primary" dir="rtl">
                      {product.price} <span className="text-sm font-normal text-muted-foreground">د.ج</span>
                    </div>
                    <Button size="icon" className="rounded-full w-10 h-10 shadow-md shadow-primary/20" data-testid={`btn-buy-${product.id}`}>
                      <ShoppingCart size={18} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">لا توجد منتجات في هذا التصنيف حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
}
