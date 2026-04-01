/* ─────────────────────────────────────────────────────────────────────────── */
/*  LEGACY – used only for Home.tsx testimonials / academy / portfolio etc.   */
/* ─────────────────────────────────────────────────────────────────────────── */

export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  previewImage: string;
  demoUrl: string;
  featured: boolean;
  tags: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  price: number;
  oldPrice?: number;
  featured: boolean;
  downloadUrl: string;
  tags: string[];
}

export interface Course {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  level: string;
  duration: string;
  price: number;
  featured: boolean;
  learningPath: string;
  ctaLink: string;
}

export interface Testimonial {
  id: number;
  clientName: string;
  businessName: string;
  text: string;
  image: string;
  rating: number;
  serviceUsed: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "Unread" | "Read";
}

export interface ProjectRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  requestedService: string;
  budget: string;
  description: string;
  websiteLink: string;
  preferredStartDate: string;
  date: string;
  status: "New" | "Reviewed";
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  NEW SERVICES ARCHITECTURE                                                   */
/*  ServiceCategory → ServiceItem (many)                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

export interface ServiceCategory {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  icon: string;
  order: number;
  isVisible: boolean;
  isFeatured: boolean;
}

export interface ServiceItem {
  id: number;
  categoryId: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  features: string[];
  includedItems: string[];
  targetAudience: string;
  order: number;
  isVisible: boolean;
  isFeatured: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MOCK DATA                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

export const mockServiceCategories: ServiceCategory[] = [
  {
    id: 1,
    title: "إدارة التواصل الاجتماعي والمحتوى",
    slug: "social-media-content",
    shortDescription: "حضور قوي ومتواصل على جميع منصات التواصل الاجتماعي مع محتوى يحوّل المتابعين إلى عملاء.",
    fullDescription: "نبني مجتمعات نشطة حول علامتك التجارية عبر إدارة احترافية لصفحاتك على فيسبوك وإنستجرام وتيك توك. نتولى التخطيط الاستراتيجي للمحتوى وإنتاجه ونشره وإدارة التفاعل مع جمهورك بشكل يومي لتحقيق النمو المستمر.",
    imageUrl: "",
    icon: "share-2",
    order: 1,
    isVisible: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "الإنتاج الإبداعي والتصوير",
    slug: "creative-production",
    shortDescription: "محتوى بصري احترافي يخطف الأنظار ويعكس هوية علامتك التجارية بأعلى معايير الجودة.",
    fullDescription: "نقدم خدمات إنتاج بصري متكاملة تشمل التصوير الفوتوغرافي وإنتاج الفيديو والريلز والموشن جرافيك. فريقنا الإبداعي يحول أفكارك إلى محتوى مرئي مذهل يجذب الانتباه ويعزز حضور علامتك.",
    imageUrl: "",
    icon: "camera",
    order: 2,
    isVisible: true,
    isFeatured: true,
  },
  {
    id: 3,
    title: "المواقع والتجارة الإلكترونية",
    slug: "web-ecommerce",
    shortDescription: "مواقع سريعة وجذابة ومتاجر إلكترونية متكاملة تضاعف معدلات التحويل وتزيد مبيعاتك.",
    fullDescription: "نصمم ونطور مواقع إلكترونية احترافية ومتاجر إلكترونية متكاملة تناسب طبيعة عملك. نركز على تجربة المستخدم وسرعة التحميل وتحسين محركات البحث لضمان أعلى معدل تحويل ممكن.",
    imageUrl: "",
    icon: "globe",
    order: 3,
    isVisible: true,
    isFeatured: true,
  },
  {
    id: 4,
    title: "الإعلانات المدفوعة وتحسين الأداء",
    slug: "ads-performance",
    shortDescription: "حملات إعلانية مدفوعة دقيقة تصل لجمهورك المستهدف بأعلى عائد استثمار ممكن.",
    fullDescription: "ندير حملات إعلانية على ميتا وجوجل وتيك توك بخبرة عالية ومنهجية علمية. نستهدف الجمهور المناسب بالرسالة الصحيحة في الوقت المثالي لتحقيق أفضل عائد على الاستثمار.",
    imageUrl: "",
    icon: "trending-up",
    order: 4,
    isVisible: true,
    isFeatured: false,
  },
  {
    id: 5,
    title: "التسويق الرقمي والـ SEO",
    slug: "digital-marketing",
    shortDescription: "استراتيجيات تسويقية مبنية على البيانات وتحسين ظهورك في محركات البحث لنمو حقيقي.",
    fullDescription: "نضع استراتيجيات تسويق رقمي شاملة مبنية على تحليل دقيق للسوق والمنافسين. نحسّن ظهورك في جوجل عبر تقنيات SEO المتقدمة لجلب زيارات عضوية مستهدفة تتحول إلى عملاء دائمين.",
    imageUrl: "",
    icon: "search",
    order: 5,
    isVisible: true,
    isFeatured: false,
  },
  {
    id: 6,
    title: "الطباعة والهوية البصرية",
    slug: "printing-branding",
    shortDescription: "هوية بصرية متكاملة وتصاميم طباعية احترافية تميّزك في السوق وتترك انطباعاً لا يُنسى.",
    fullDescription: "نصمم هويات بصرية متكاملة تبدأ من الشعار وتمتد لتشمل كل نقاط تواصلك مع العملاء. نقدم أيضاً تصاميم طباعية احترافية لكل احتياجاتك التسويقية.",
    imageUrl: "",
    icon: "printer",
    order: 6,
    isVisible: true,
    isFeatured: false,
  },
];

export const mockServiceItems: ServiceItem[] = [
  {
    id: 1,
    categoryId: 1,
    title: "إدارة الصفحات والحسابات",
    slug: "page-management",
    shortDescription: "إدارة يومية احترافية لصفحاتك على فيسبوك وإنستجرام وتيك توك وسناب شات.",
    fullDescription: "نتولى الإدارة الكاملة لحساباتك على منصات التواصل الاجتماعي من التخطيط للمحتوى إلى النشر وإدارة التعليقات والرسائل والرد على الجمهور. نقدم تقارير أداء شهرية مفصّلة لمتابعة النمو.",
    imageUrl: "",
    features: ["تخطيط المحتوى الشهري", "نشر يومي منتظم", "إدارة التعليقات والرسائل", "تقارير أداء مفصّلة", "استراتيجية نمو الجمهور", "متابعة الاتجاهات والهاشتاقات"],
    includedItems: ["خطة محتوى شهرية", "30 منشوراً شهرياً", "إدارة التفاعل اليومي", "تقرير شهري بالنتائج"],
    targetAudience: "الشركات والمحلات التجارية والعلامات التجارية التي تريد حضوراً قوياً على السوشيال ميديا.",
    order: 1,
    isVisible: true,
    isFeatured: true,
  },
  {
    id: 2,
    categoryId: 1,
    title: "إنتاج وتصميم المحتوى",
    slug: "content-creation",
    shortDescription: "محتوى إبداعي مصمم خصيصاً لعلامتك التجارية يجذب ويحفّز الجمهور على التفاعل.",
    fullDescription: "نصنع محتوى بصري ونصي احترافي يعكس هوية علامتك التجارية ويتحدث بلغة جمهورك. نغطي البوستات والستوريز والريلز والإنفوجرافيك وكل أشكال المحتوى الرقمي.",
    imageUrl: "",
    features: ["تصميم البوستات والستوري", "إنتاج الريلز والفيديوهات", "كتابة الكابشن الإبداعي", "الإنفوجرافيك المعلوماتي", "تصميم يتوافق مع هويتك", "محتوى مُحسَّن للخوارزمية"],
    includedItems: ["تصاميم بوستات شهرية", "قوالب ستوري", "نصوص جاهزة للنشر", "مراجعات غير محدودة"],
    targetAudience: "أي علامة تجارية تحتاج محتوى بصري احترافي ومستمر دون الحاجة لفريق داخلي.",
    order: 2,
    isVisible: true,
    isFeatured: false,
  },
  {
    id: 3,
    categoryId: 2,
    title: "التصوير الاحترافي",
    slug: "photography",
    shortDescription: "جلسات تصوير احترافية للمنتجات والفعاليات والبورتريه التجاري.",
    fullDescription: "نقدم خدمات تصوير احترافية بمعدات عالية الجودة وإضاءة استوديو أو خارجية. نصوّر المنتجات والأشخاص والفعاليات ونعالج الصور بأعلى معايير الجودة.",
    imageUrl: "",
    features: ["تصوير المنتجات بخلفية بيضاء", "التصوير البيئي والسياقي", "تصوير الفعاليات والمناسبات", "معالجة احترافية للصور", "تسليم بصيغ متعددة", "جلسات بالاستوديو أو الموقع"],
    includedItems: ["جلسة تصوير", "معالجة الصور", "ملفات بدقة عالية", "تسليم خلال 48 ساعة"],
    targetAudience: "متاجر إلكترونية، مطاعم، شركات تريد صور احترافية لمواقعها وحساباتها.",
    order: 1,
    isVisible: true,
    isFeatured: true,
  },
  {
    id: 4,
    categoryId: 2,
    title: "إنتاج الفيديو والريلز",
    slug: "video-production",
    shortDescription: "إنتاج فيديو احترافي من الفكرة إلى التصوير والمونتاج للنشر على جميع المنصات.",
    fullDescription: "نتولى الإنتاج الكامل لمحتوى الفيديو بدءاً من كتابة السيناريو والتخطيط وصولاً للتصوير والمونتاج الاحترافي والإخراج النهائي. نصنع ريلز ويوتيوب وإعلانات فيديو وفيديوهات مؤسسية.",
    imageUrl: "",
    features: ["كتابة السيناريو", "التصوير الاحترافي", "المونتاج والتعديل", "الموشن جرافيك", "الفويس أوفر", "تحسين للمنصات المختلفة"],
    includedItems: ["سيناريو", "يوم تصوير", "مونتاج كامل", "3 مراجعات"],
    targetAudience: "شركات وعلامات تجارية تريد محتوى فيديو احترافي لتقديم منتجاتها وخدماتها.",
    order: 2,
    isVisible: true,
    isFeatured: false,
  },
  {
    id: 5,
    categoryId: 3,
    title: "تطوير المواقع الإلكترونية",
    slug: "website-development",
    shortDescription: "مواقع إلكترونية سريعة وعصرية ومتجاوبة مع جميع الأجهزة.",
    fullDescription: "نطور مواقع إلكترونية احترافية بتصميم عصري وسرعة عالية ومتوافق مع جميع الأجهزة والمتصفحات. نستخدم أحدث التقنيات لضمان أفضل تجربة للمستخدم وأعلى تصنيف في محركات البحث.",
    imageUrl: "",
    features: ["تصميم UX/UI احترافي", "تجاوب مع جميع الأجهزة", "سرعة تحميل عالية", "تحسين SEO من الأساس", "لوحة تحكم سهلة", "شهادة SSL مجاناً"],
    includedItems: ["تصميم موقع كامل", "لوحة تحكم", "دومين وهوستينج لسنة", "تدريب على الاستخدام"],
    targetAudience: "الشركات والمشاريع التي تحتاج موقعاً احترافياً يمثلها في الفضاء الرقمي.",
    order: 1,
    isVisible: true,
    isFeatured: true,
  },
  {
    id: 6,
    categoryId: 3,
    title: "المتاجر الإلكترونية",
    slug: "ecommerce-store",
    shortDescription: "متاجر إلكترونية متكاملة مع نظام دفع وإدارة مخزون وتجربة تسوق سلسة.",
    fullDescription: "نبني متاجر إلكترونية متكاملة تشمل كتالوج المنتجات وعربة التسوق ونظام الدفع الإلكتروني وإدارة الطلبات والمخزون. نضمن تجربة تسوق سلسة وآمنة تشجع العملاء على الشراء.",
    imageUrl: "",
    features: ["كتالوج منتجات غير محدود", "نظام دفع إلكتروني", "إدارة الطلبات والمخزون", "تتبع الشحنات", "تقارير المبيعات", "نظام كوبونات وخصومات"],
    includedItems: ["متجر كامل", "دفع إلكتروني", "لوحة تحكم كاملة", "دعم تقني لـ3 أشهر"],
    targetAudience: "أصحاب المشاريع الذين يريدون بيع منتجاتهم أونلاين بشكل احترافي ومنظم.",
    order: 2,
    isVisible: true,
    isFeatured: true,
  },
  {
    id: 7,
    categoryId: 4,
    title: "إعلانات ميتا (فيسبوك وإنستجرام)",
    slug: "meta-ads",
    shortDescription: "حملات إعلانية مدروسة على فيسبوك وإنستجرام تصل لجمهورك المثالي.",
    fullDescription: "نصمم وندير حملات إعلانية احترافية على منصات ميتا باستهداف دقيق يضمن وصول رسالتك للجمهور المناسب. نتابع الأداء يومياً ونحسّن الحملات باستمرار لتحقيق أعلى عائد على الاستثمار.",
    imageUrl: "",
    features: ["استهداف دقيق للجمهور", "إعلانات ريتارجيتينج", "اختبار A/B للإعلانات", "تحسين مستمر للأداء", "تقارير أسبوعية", "حملات توعية وتحويل"],
    includedItems: ["إعداد الحملة", "تصميم إعلانات", "إدارة شهرية", "تقرير الأداء"],
    targetAudience: "أي نشاط تجاري يريد زيادة مبيعاته وتوسيع قاعدة عملائه عبر إعلانات ميتا.",
    order: 1,
    isVisible: true,
    isFeatured: true,
  },
  {
    id: 8,
    categoryId: 4,
    title: "إعلانات جوجل (Google Ads)",
    slug: "google-ads",
    shortDescription: "ظهور في أعلى نتائج جوجل عند بحث عملائك عن خدماتك.",
    fullDescription: "نبني حملات جوجل أدز ذكية تستهدف الكلمات المفتاحية الأكثر قيمة لنشاطك التجاري. نجمع بين إعلانات البحث والشبكة الإعلانية وحملات الريماركتينج لتعظيم نتائجك.",
    imageUrl: "",
    features: ["بحث عن كلمات مفتاحية", "إعلانات بحث Google", "إعلانات الشبكة الإعلانية", "ريماركتينج ذكي", "تتبع التحويلات", "تقارير ROI مفصّلة"],
    includedItems: ["إعداد الحساب", "بحث كلمات مفتاحية", "إدارة شهرية", "تقرير أداء مفصّل"],
    targetAudience: "الشركات التي تريد جذب عملاء يبحثون عن خدماتها على جوجل بشكل فوري.",
    order: 2,
    isVisible: true,
    isFeatured: false,
  },
  {
    id: 9,
    categoryId: 5,
    title: "تحسين محركات البحث (SEO)",
    slug: "seo",
    shortDescription: "تحسين ظهور موقعك في نتائج جوجل لجذب زيارات عضوية ومستهدفة.",
    fullDescription: "نحسّن موقعك لمحركات البحث بمنهجية شاملة تبدأ من تدقيق تقني كامل وتمتد لأبحاث الكلمات المفتاحية وتحسين المحتوى وبناء الروابط. نستهدف الظهور الأول في جوجل لكلمات مفتاحية ذات قيمة تجارية عالية.",
    imageUrl: "",
    features: ["تدقيق SEO شامل", "بحث كلمات مفتاحية", "تحسين المحتوى", "SEO تقني متقدم", "بناء روابط خارجية", "تقارير تقدم شهرية"],
    includedItems: ["تدقيق أولي", "استراتيجية SEO", "تحسين الصفحات", "تقرير شهري"],
    targetAudience: "المواقع التي تريد زيادة زياراتها العضوية على المدى البعيد دون الاعتماد على الإعلانات.",
    order: 1,
    isVisible: true,
    isFeatured: false,
  },
  {
    id: 10,
    categoryId: 6,
    title: "تصميم الهوية البصرية",
    slug: "brand-identity",
    shortDescription: "هوية بصرية متكاملة من الشعار إلى دليل العلامة التجارية.",
    fullDescription: "نصمم هويات بصرية متكاملة تبدأ من الشعار وتشمل لوحة الألوان والخطوط والعناصر البصرية وتنتهي بدليل الهوية الكامل. هويتك البصرية هي أول ما يراه عملاؤك فنجعلها لا تُنسى.",
    imageUrl: "",
    features: ["تصميم الشعار", "لوحة الألوان والخطوط", "دليل الهوية البصرية", "بطاقات الأعمال", "أغلفة السوشيال ميديا", "ملفات بجميع الصيغ"],
    includedItems: ["3 مقترحات للشعار", "دليل هوية بصرية", "ملفات قابلة للتعديل", "مراجعات غير محدودة"],
    targetAudience: "المشاريع الجديدة والشركات التي تريد إعادة بناء هويتها البصرية بشكل احترافي.",
    order: 1,
    isVisible: true,
    isFeatured: true,
  },
];

export const mockPortfolio: PortfolioProject[] = [
  { id: 1, title: "E-commerce Store for Fashion Brand", category: "Websites", shortDescription: "Full e-commerce website with payment integration.", fullDescription: "A complete online fashion store with product catalog, cart, checkout, and payment gateway.", previewImage: "", demoUrl: "https://example.com", featured: true, tags: ["E-commerce", "Fashion", "Web"] },
  { id: 2, title: "Meta Ads Campaign – Restaurant Chain", category: "Ads", shortDescription: "Targeted Facebook & Instagram ads for 3 restaurant locations.", fullDescription: "Multi-location restaurant campaign that achieved 5x ROAS across Meta platforms.", previewImage: "", demoUrl: "", featured: true, tags: ["Meta Ads", "Restaurant", "Performance"] },
  { id: 3, title: "Brand Identity – Construction Company", category: "Branding", shortDescription: "Complete brand identity from logo to brand guidelines.", fullDescription: "Logo design, color palette, typography, business cards, and brand manual.", previewImage: "", demoUrl: "", featured: false, tags: ["Branding", "Logo", "Construction"] },
  { id: 4, title: "Social Media Content – Cosmetics Brand", category: "Content", shortDescription: "60 days of premium content for Instagram and TikTok.", fullDescription: "Full content calendar with product photography, reels, stories, and captions.", previewImage: "", demoUrl: "", featured: true, tags: ["Content", "Cosmetics", "Social Media"] },
  { id: 5, title: "Corporate Promo Video – Tech Startup", category: "Video", shortDescription: "2-minute corporate introduction video.", fullDescription: "Professional video production including scripting, filming, voiceover, and post-production.", previewImage: "", demoUrl: "", featured: false, tags: ["Video", "Corporate", "Tech"] },
  { id: 6, title: "Portfolio Website – Freelance Photographer", category: "Websites", shortDescription: "Elegant portfolio website with gallery and contact form.", fullDescription: "Minimalist portfolio site with lightbox gallery, booking form, and SEO optimization.", previewImage: "", demoUrl: "", featured: false, tags: ["Portfolio", "Photography", "Web"] },
];

export const mockProducts: Product[] = [
  { id: 1, name: "Instagram Post Templates Pack", category: "Templates", shortDescription: "50 premium Canva templates for Instagram posts.", fullDescription: "A collection of 50 professionally designed Instagram post templates in Canva, ready to customize for any brand.", thumbnail: "", price: 1500, oldPrice: 2500, featured: true, downloadUrl: "", tags: ["Instagram", "Canva", "Templates"] },
  { id: 2, name: "Social Media Content Calendar 2025", category: "Marketing Resources", shortDescription: "Full-year content calendar with post ideas.", fullDescription: "A comprehensive 12-month content calendar with 365 post ideas, hashtag lists, and engagement strategies.", thumbnail: "", price: 800, featured: false, downloadUrl: "", tags: ["Calendar", "Planning", "Social Media"] },
  { id: 3, name: "Brand Identity Starter Kit", category: "Creative Assets", shortDescription: "Everything you need to build a professional brand.", fullDescription: "Logo templates, color palette guide, font pairing guide, brand board template, and mockup files.", thumbnail: "", price: 2000, oldPrice: 3500, featured: true, downloadUrl: "", tags: ["Branding", "Logo", "Design"] },
  { id: 4, name: "Meta Ads Mastery Guide", category: "Learning Materials", shortDescription: "Step-by-step guide to running profitable Meta Ads.", fullDescription: "PDF guide covering campaign structure, audience targeting, creatives, budgeting, and scaling strategies.", thumbnail: "", price: 1200, featured: true, downloadUrl: "", tags: ["Meta Ads", "Guide", "Paid Ads"] },
];

export const mockCourses: Course[] = [
  { id: 1, title: "Social Media Manager Pro", shortDescription: "Master social media management and grow brands online.", fullDescription: "A comprehensive course covering content strategy, platform algorithms, scheduling tools, analytics, and client management.", image: "", level: "Beginner", duration: "6 weeks", price: 8000, featured: true, learningPath: "Social Media Manager Path", ctaLink: "/academy" },
  { id: 2, title: "Meta & Google Ads Mastery", shortDescription: "Run profitable paid advertising campaigns.", fullDescription: "From campaign setup to scaling: Meta Ads, Google Ads, audience targeting, creative testing, and performance optimization.", image: "", level: "Intermediate", duration: "8 weeks", price: 12000, featured: true, learningPath: "Media Buyer Path", ctaLink: "/academy" },
  { id: 3, title: "Freelance Digital Marketing", shortDescription: "Launch your freelance career in digital marketing.", fullDescription: "Everything you need to start freelancing: finding clients, pricing services, contracts, delivery, and building a portfolio.", image: "", level: "Beginner", duration: "4 weeks", price: 5000, featured: true, learningPath: "Freelancer Starter Path", ctaLink: "/academy" },
];

export const mockTestimonials: Testimonial[] = [
  { id: 1, clientName: "أحمد بن علي", businessName: "متجر بن علي للأزياء", text: "حولت GAB Digital حضورنا الرقمي بشكل كامل. تضاعف متابعينا ثلاث مرات وزادت مبيعاتنا أونلاين بنسبة 200% في 3 أشهر فقط.", image: "", rating: 5, serviceUsed: "إدارة التواصل الاجتماعي" },
  { id: 2, clientName: "فاطمة الزهراء", businessName: "FZ Cosmetics", text: "المحتوى الذي يصنعونه في مستوى رائع. كل منشور يبدو احترافياً ومتسقاً مع هوية علامتنا. أنصح بهم بشدة.", image: "", rating: 5, serviceUsed: "إنتاج المحتوى" },
  { id: 3, clientName: "كريم منصوري", businessName: "منصوري للبناء والمقاولات", text: "موقعنا الجديد وهويتنا البصرية تجاوزا توقعاتنا. فريق محترف جداً وتواصل رائع طوال المشروع.", image: "", rating: 5, serviceUsed: "تطوير المواقع والهوية البصرية" },
  { id: 4, clientName: "سارة حاج", businessName: "Sarah Beauty Studio", text: "حملات الإعلانات الممولة حققت نتائج ملموسة. امتلأت مواعيدي لشهرين متتاليين بعد إطلاق الحملة!", image: "", rating: 4, serviceUsed: "الإعلانات المدفوعة" },
  { id: 5, clientName: "عمر بوضياف", businessName: "تك ستارت الجزائر", text: "محترفون وملتزمون ومبدعون. فريق GAB Digital نفّذ كل ما وعد به وأكثر.", image: "", rating: 5, serviceUsed: "تطوير المواقع" },
];

export const mockMessages: ContactMessage[] = [
  { id: 1, name: "أمينة خليف", email: "amina@example.com", phone: "0550123456", subject: "استفسار عن خدمات التواصل الاجتماعي", message: "مرحباً، أهتم بخدمة إدارة السوشيال ميديا لمطعمي. هل يمكنكم إرسال قائمة الأسعار؟", date: "2025-01-15", status: "Unread" },
  { id: 2, name: "يوسف براهيم", email: "youcef@example.com", phone: "0661234567", subject: "تصميم موقع إلكتروني", message: "نحتاج موقعاً لشركة مقاولات. نريد شيئاً احترافياً مع قسم أعمال ونموذج اتصال.", date: "2025-01-14", status: "Read" },
  { id: 3, name: "نادية تلمساني", email: "nadia@example.com", phone: "0770987654", subject: "هوية بصرية لعلامة تجارية جديدة", message: "أنا أطلق علامة تجارية لمستحضرات التجميل وأحتاج هوية بصرية كاملة.", date: "2025-01-13", status: "Unread" },
];

export const mockProjectRequests = [
  { id: 1, fullName: "طارق بلحاج", email: "tarek@fashionstore.dz", phone: "0550111222", businessType: "تجارة الأزياء", requestedService: "تطوير متجر إلكتروني", budget: "150,000 - 300,000 دج", description: "نحتاج متجراً إلكترونياً كاملاً لعلامتنا في الأزياء.", websiteLink: "", preferredStartDate: "2025-02-01", date: "2025-01-15", status: "New" },
  { id: 2, fullName: "سمية شايب", email: "soumia@beauty.com", phone: "0661999888", businessType: "التجميل والعناية", requestedService: "إدارة السوشيال ميديا وإنتاج المحتوى", budget: "50,000 - 100,000 دج/شهر", description: "أريد باقة إدارة كاملة لصالون التجميل الخاص بي.", websiteLink: "", preferredStartDate: "2025-01-20", date: "2025-01-14", status: "Reviewed" },
];

export const mockFAQs: FAQ[] = [
  { id: 1, question: "كم يستغرق تصميم الموقع الإلكتروني؟", answer: "الموقع العادي يستغرق 2-4 أسابيع. المتاجر الإلكترونية قد تستغرق 4-8 أسابيع حسب التعقيد. نقدم جدولاً زمنياً واضحاً قبل البدء.", category: "تطوير المواقع" },
  { id: 2, question: "ماذا يشمل باقة إدارة التواصل الاجتماعي؟", answer: "تشمل الباقات: إنتاج المحتوى، الجدولة والنشر، إدارة التفاعل، تقارير شهرية، وجلسات استراتيجية. التفاصيل تختلف حسب الباقة.", category: "التواصل الاجتماعي" },
  { id: 3, question: "هل تقدمون استشارة مجانية؟", answer: "نعم، نقدم استشارة مجانية لمدة 30 دقيقة لفهم احتياجات مشروعك وتقديم أفضل الحلول.", category: "عام" },
  { id: 4, question: "ما هو الحد الأدنى لميزانية الإعلانات؟", answer: "نوصي بميزانية لا تقل عن 20,000 دج/شهر لتحقيق نتائج ملموسة. رسوم الإدارة منفصلة عن ميزانية الإعلانات.", category: "الإعلانات المدفوعة" },
  { id: 5, question: "هل يمكن الاشتراك في الدورات عن بُعد؟", answer: "نعم، معظم دوراتنا متاحة أونلاين ووجهاً لوجه. نقدم جلسات مباشرة مع تسجيلات للمراجعة.", category: "الأكاديمية" },
];
