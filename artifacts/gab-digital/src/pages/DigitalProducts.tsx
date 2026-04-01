import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Download, Star } from "lucide-react";
import { useProducts } from "@/hooks/useSiteData";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
];

const CATEGORY_MAP: Record<string, string> = {
  "Templates": "قوالب",
  "Marketing Resources": "موارد تسويقية",
  "Creative Assets": "أصول إبداعية",
  "Learning Materials": "مواد تعليمية",
  "Business Packs": "حزم أعمال",
};

export default function DigitalProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const products = useProducts();

  const rawCategories = Array.from(new Set(products.map(p => p.category)));
  const categories = [
    { id: "all", label: "الكل" },
    ...rawCategories.map(cat => ({ id: cat, label: CATEGORY_MAP[cat] || cat }))
  ];

  const filteredProducts = activeTab === "all" ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-20">
      {/* Hero */}
      <section className="bg-[#0f172a] py-32 pt-40 mb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 mb-6">
            <Download size={16} />
            <span className="text-sm font-bold">تحميل فوري بعد الدفع</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6">
            متجر <span className="text-orange-500">الموارد الرقمية</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto">
            أدوات، قوالب، وحزم احترافية جاهزة للاستخدام لتسريع عملك ومضاعفة إنتاجيتك في التسويق والتصميم.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Filters */}
        {products.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === category.id
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
                data-testid={`tab-${category.id}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {products.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-slate-600 mb-2">لا توجد منتجات حالياً</h3>
            <p className="text-slate-400">أضف منتجات من لوحة الإدارة لتظهر هنا.</p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product, idx) => {
                  const image = product.thumbnail || PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];
                  const rating = 4.8;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group rounded-2xl overflow-hidden bg-white border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 shadow-sm transition-all flex flex-col"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <img src={image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                          <span dir="ltr">{rating}</span>
                        </div>
                        {product.featured && (
                          <div className="absolute top-4 right-4 z-20 bg-orange-500 px-2 py-0.5 rounded-full text-xs font-bold text-white">
                            مميّز
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 text-slate-900">{product.name}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                          {product.shortDescription}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <div className="text-xl font-black text-orange-500">
                              {product.price.toLocaleString()} <span className="text-sm font-normal text-slate-500">د.ج</span>
                            </div>
                            {product.oldPrice && (
                              <div className="text-sm line-through text-slate-400">{product.oldPrice.toLocaleString()} د.ج</div>
                            )}
                          </div>
                          <Button size="icon" className="rounded-full w-10 h-10 bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20 border-0" data-testid={`btn-buy-${product.id}`}>
                            <ShoppingCart size={18} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-lg">لا توجد منتجات في هذا التصنيف حالياً.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
