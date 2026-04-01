export interface Service {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  featured: boolean;
  displayOrder: number;
}

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
  status: "Read" | "Unread";
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

export const mockServices: Service[] = [
  { id: 1, title: "Social Media Management", category: "Social Media & Content", shortDescription: "Complete management of your social media presence across all platforms.", fullDescription: "We handle content creation, scheduling, community management, and growth strategies for Facebook, Instagram, TikTok, and more.", icon: "share-2", featured: true, displayOrder: 1 },
  { id: 2, title: "Content Creation & Photography", category: "Creative Production", shortDescription: "Professional visual content for your brand.", fullDescription: "Photo sessions, video production, reels, stories, and all visual assets that make your brand stand out.", icon: "camera", featured: true, displayOrder: 2 },
  { id: 3, title: "Website & E-commerce Development", category: "Web & E-commerce", shortDescription: "Modern, fast, and conversion-optimized websites.", fullDescription: "We build professional websites and full e-commerce stores tailored to your business needs.", icon: "globe", featured: true, displayOrder: 3 },
  { id: 4, title: "Paid Ads & Performance Marketing", category: "Paid Ads & Performance", shortDescription: "Data-driven advertising campaigns that deliver results.", fullDescription: "Meta Ads, Google Ads, and TikTok Ads campaigns managed by certified experts to maximize your ROI.", icon: "trending-up", featured: false, displayOrder: 4 },
  { id: 5, title: "SEO & Digital Strategy", category: "Digital Marketing", shortDescription: "Get found online and grow organically.", fullDescription: "Comprehensive SEO audits, keyword research, on-page optimization, and long-term digital growth strategies.", icon: "search", featured: false, displayOrder: 5 },
  { id: 6, title: "Printing & Brand Identity", category: "Printing & Branding", shortDescription: "Logos, brand guides, and all printed materials.", fullDescription: "Complete branding packages including logo design, brand guidelines, business cards, banners, and flyers.", icon: "printer", featured: false, displayOrder: 6 },
  { id: 7, title: "Digital Marketing Training", category: "Courses & Training", shortDescription: "Learn digital marketing from expert practitioners.", fullDescription: "Hands-on courses and workshops covering social media, paid ads, content creation, and freelancing skills.", icon: "graduation-cap", featured: true, displayOrder: 7 },
];

export const mockPortfolio: PortfolioProject[] = [
  { id: 1, title: "E-commerce Store for Fashion Brand", category: "Websites", shortDescription: "Full e-commerce website with payment integration.", fullDescription: "A complete online fashion store with product catalog, cart, checkout, and payment gateway.", previewImage: "", demoUrl: "https://example.com", featured: true, tags: ["E-commerce", "Fashion", "Web"] },
  { id: 2, title: "Meta Ads Campaign – Restaurant Chain", category: "Ads", shortDescription: "Targeted Facebook & Instagram ads for 3 restaurant locations.", fullDescription: "Multi-location restaurant campaign that achieved 5x ROAS across Meta platforms.", previewImage: "", demoUrl: "", featured: true, tags: ["Meta Ads", "Restaurant", "Performance"] },
  { id: 3, title: "Brand Identity – Construction Company", category: "Branding", shortDescription: "Complete brand identity from logo to brand guidelines.", fullDescription: "Logo design, color palette, typography, business cards, and brand manual.", previewImage: "", demoUrl: "", featured: false, tags: ["Branding", "Logo", "Construction"] },
  { id: 4, title: "Social Media Content – Cosmetics Brand", category: "Content", shortDescription: "60 days of premium content for Instagram and TikTok.", fullDescription: "Full content calendar with product photography, reels, stories, and captions.", previewImage: "", demoUrl: "", featured: true, tags: ["Content", "Cosmetics", "Social Media"] },
  { id: 5, title: "Corporate Promo Video – Tech Startup", category: "Video", shortDescription: "2-minute corporate introduction video.", fullDescription: "Professional video production including scripting, filming, voiceover, and post-production.", previewImage: "", demoUrl: "", featured: false, tags: ["Video", "Corporate", "Tech"] },
  { id: 6, title: "Portfolio Website – Freelance Photographer", category: "Websites", shortDescription: "Elegant portfolio website with gallery and contact form.", fullDescription: "Minimalist portfolio site with lightbox gallery, booking form, and SEO optimization.", previewImage: "", demoUrl: "", featured: false, tags: ["Portfolio", "Photography", "Web"] },
  { id: 7, title: "Google Ads Campaign – Real Estate Agency", category: "Ads", shortDescription: "Lead generation campaign for property listings.", fullDescription: "Search and display campaigns targeting buyers and renters with high-converting landing pages.", previewImage: "", demoUrl: "", featured: false, tags: ["Google Ads", "Real Estate", "Leads"] },
  { id: 8, title: "TikTok Content Series – Food Delivery App", category: "Content", shortDescription: "Viral TikTok content strategy and production.", fullDescription: "Weekly TikTok videos, trending audio, and hashtag strategy that grew the account by 15k followers.", previewImage: "", demoUrl: "", featured: true, tags: ["TikTok", "Food", "Content"] },
];

export const mockProducts: Product[] = [
  { id: 1, name: "Instagram Post Templates Pack", category: "Templates", shortDescription: "50 premium Canva templates for Instagram posts.", fullDescription: "A collection of 50 professionally designed Instagram post templates in Canva, ready to customize for any brand.", thumbnail: "", price: 1500, oldPrice: 2500, featured: true, downloadUrl: "", tags: ["Instagram", "Canva", "Templates"] },
  { id: 2, name: "Social Media Content Calendar 2025", category: "Marketing Resources", shortDescription: "Full-year content calendar with post ideas.", fullDescription: "A comprehensive 12-month content calendar with 365 post ideas, hashtag lists, and engagement strategies.", thumbnail: "", price: 800, featured: false, downloadUrl: "", tags: ["Calendar", "Planning", "Social Media"] },
  { id: 3, name: "Brand Identity Starter Kit", category: "Creative Assets", shortDescription: "Everything you need to build a professional brand.", fullDescription: "Logo templates, color palette guide, font pairing guide, brand board template, and mockup files.", thumbnail: "", price: 2000, oldPrice: 3500, featured: true, downloadUrl: "", tags: ["Branding", "Logo", "Design"] },
  { id: 4, name: "Meta Ads Mastery Guide", category: "Learning Materials", shortDescription: "Step-by-step guide to running profitable Meta Ads.", fullDescription: "PDF guide covering campaign structure, audience targeting, creatives, budgeting, and scaling strategies.", thumbnail: "", price: 1200, featured: true, downloadUrl: "", tags: ["Meta Ads", "Guide", "Paid Ads"] },
  { id: 5, name: "Freelancer Starter Business Pack", category: "Business Packs", shortDescription: "All documents a freelancer needs to start professionally.", fullDescription: "Client proposal template, contract template, invoice template, project brief, and client onboarding checklist.", thumbnail: "", price: 900, featured: false, downloadUrl: "", tags: ["Freelance", "Business", "Templates"] },
  { id: 6, name: "Reels & Stories Templates", category: "Templates", shortDescription: "30 animated CapCut and Canva templates for Reels.", fullDescription: "Ready-to-use animated templates for Instagram Reels and Stories, compatible with CapCut and Canva.", thumbnail: "", price: 1200, featured: false, downloadUrl: "", tags: ["Reels", "Stories", "CapCut"] },
  { id: 7, name: "E-commerce Marketing Playbook", category: "Marketing Resources", shortDescription: "Complete marketing system for online stores.", fullDescription: "A proven marketing playbook covering ads, email marketing, influencer strategy, and customer retention.", thumbnail: "", price: 1800, oldPrice: 2800, featured: true, downloadUrl: "", tags: ["E-commerce", "Marketing", "Playbook"] },
  { id: 8, name: "Photography Presets – Warm Edition", category: "Creative Assets", shortDescription: "10 professional Lightroom presets for product photography.", fullDescription: "Warm-toned Lightroom presets perfect for product, food, and lifestyle photography.", thumbnail: "", price: 700, featured: false, downloadUrl: "", tags: ["Lightroom", "Photography", "Presets"] },
  { id: 9, name: "Copywriting Templates Pack", category: "Marketing Resources", shortDescription: "Fill-in-the-blank copy templates for ads and posts.", fullDescription: "100+ copywriting templates for ads, captions, email subject lines, and landing pages.", thumbnail: "", price: 600, featured: false, downloadUrl: "", tags: ["Copywriting", "Ads", "Templates"] },
  { id: 10, name: "TikTok Content Blueprint", category: "Learning Materials", shortDescription: "Viral TikTok strategy for businesses.", fullDescription: "A complete TikTok growth blueprint including niche strategy, content pillars, hook formulas, and hashtag research.", thumbnail: "", price: 1000, featured: false, downloadUrl: "", tags: ["TikTok", "Strategy", "Content"] },
  { id: 11, name: "Agency Business Starter Pack", category: "Business Packs", shortDescription: "Start your own digital marketing agency.", fullDescription: "Agency setup guide, service pricing calculator, client acquisition scripts, and SOPs for managing clients.", thumbnail: "", price: 2500, featured: true, downloadUrl: "", tags: ["Agency", "Business", "Freelance"] },
  { id: 12, name: "Annual Report & Presentation Templates", category: "Creative Assets", shortDescription: "Professional PowerPoint and Canva presentation templates.", fullDescription: "10 beautiful annual report and business presentation templates in PowerPoint and Canva formats.", thumbnail: "", price: 1500, featured: false, downloadUrl: "", tags: ["Presentation", "PowerPoint", "Canva"] },
];

export const mockCourses: Course[] = [
  { id: 1, title: "Social Media Manager Pro", shortDescription: "Master social media management and grow brands online.", fullDescription: "A comprehensive course covering content strategy, platform algorithms, scheduling tools, analytics, and client management.", image: "", level: "Beginner", duration: "6 weeks", price: 8000, featured: true, learningPath: "Social Media Manager Path", ctaLink: "/academy" },
  { id: 2, title: "Meta & Google Ads Mastery", shortDescription: "Run profitable paid advertising campaigns.", fullDescription: "From campaign setup to scaling: Meta Ads, Google Ads, audience targeting, creative testing, and performance optimization.", image: "", level: "Intermediate", duration: "8 weeks", price: 12000, featured: true, learningPath: "Media Buyer Path", ctaLink: "/academy" },
  { id: 3, title: "Video Editing for Social Media", shortDescription: "Create viral videos with Premiere Pro and CapCut.", fullDescription: "Complete video editing course covering storytelling, color grading, motion graphics, and platform-specific formatting.", image: "", level: "Beginner", duration: "5 weeks", price: 6000, featured: false, learningPath: "Video Editor Path", ctaLink: "/academy" },
  { id: 4, title: "Freelance Digital Marketing", shortDescription: "Launch your freelance career in digital marketing.", fullDescription: "Everything you need to start freelancing: finding clients, pricing services, contracts, delivery, and building a portfolio.", image: "", level: "Beginner", duration: "4 weeks", price: 5000, featured: true, learningPath: "Freelancer Starter Path", ctaLink: "/academy" },
  { id: 5, title: "Content Creation & Photography", shortDescription: "Create stunning visual content for brands.", fullDescription: "Photography basics, phone photography, studio lighting, editing with Lightroom, and content planning.", image: "", level: "Beginner", duration: "4 weeks", price: 5500, featured: false, learningPath: "Social Media Manager Path", ctaLink: "/academy" },
  { id: 6, title: "Advanced Media Buying", shortDescription: "Scale ad campaigns and maximize ROAS.", fullDescription: "Advanced campaign structures, lookalike audiences, retargeting funnels, attribution, and agency-level reporting.", image: "", level: "Advanced", duration: "10 weeks", price: 18000, featured: false, learningPath: "Media Buyer Path", ctaLink: "/academy" },
];

export const mockTestimonials: Testimonial[] = [
  { id: 1, clientName: "Ahmed Benali", businessName: "Benali Fashion", text: "GAB Digital completely transformed our online presence. Our Instagram following tripled and our online sales increased by 200% in just 3 months.", image: "", rating: 5, serviceUsed: "Social Media Management" },
  { id: 2, clientName: "Fatima Zohra", businessName: "FZ Cosmetics", text: "The content they create is absolutely stunning. Every post feels professional and on-brand. Highly recommend their services.", image: "", rating: 5, serviceUsed: "Content Creation" },
  { id: 3, clientName: "Karim Mansouri", businessName: "Mansouri Construction", text: "Our new website and brand identity exceeded all expectations. Very professional team and great communication throughout.", image: "", rating: 5, serviceUsed: "Website Development & Branding" },
  { id: 4, clientName: "Sarah Hadj", businessName: "Sarah Beauty Studio", text: "The Meta Ads campaigns generated real results. We were fully booked for 2 months straight after launching the campaign!", image: "", rating: 4, serviceUsed: "Paid Ads" },
  { id: 5, clientName: "Omar Boudiaf", businessName: "TechStart Algeria", text: "Professional, punctual, and creative. The GAB Digital team delivered exactly what they promised and more.", image: "", rating: 5, serviceUsed: "Web Development" },
];

export const mockMessages: ContactMessage[] = [
  { id: 1, name: "Amina Khelif", email: "amina@example.com", phone: "0550123456", subject: "Social Media Services Inquiry", message: "Hello, I am interested in your social media management services for my restaurant. Can you send me a pricing list?", date: "2025-01-15", status: "Unread" },
  { id: 2, name: "Youcef Brahim", email: "youcef@example.com", phone: "0661234567", subject: "Website Development Quote", message: "We need a website for our construction company. Looking for something professional with a portfolio section and contact form.", date: "2025-01-14", status: "Read" },
  { id: 3, name: "Nadia Tlemcani", email: "nadia.design@example.com", phone: "0770987654", subject: "Brand Identity Package", message: "I am launching a new cosmetics brand and need a complete brand identity. Logo, colors, and some initial templates.", date: "2025-01-13", status: "Unread" },
  { id: 4, name: "Hicham Ouali", email: "hicham.ouali@example.com", phone: "0555432198", subject: "Digital Products", message: "Do you have any content calendar templates available for purchase? Looking for something for 2025.", date: "2025-01-12", status: "Read" },
  { id: 5, name: "Meriem Aissaoui", email: "meriem@example.com", phone: "0662345678", subject: "Academy Course Information", message: "I want to join the Social Media Manager course. When is the next session starting? What are the requirements?", date: "2025-01-11", status: "Unread" },
];

export const mockProjectRequests: ProjectRequest[] = [
  { id: 1, fullName: "Tarek Belhadj", email: "tarek@fashionstore.dz", phone: "0550111222", businessType: "Fashion Retail", requestedService: "E-commerce Website Development", budget: "150,000 - 300,000 DZD", description: "We need a complete e-commerce store for our fashion brand. We sell men and women clothing. We want product catalog, shopping cart, and online payment.", websiteLink: "https://instagram.com/fashionstore.dz", preferredStartDate: "2025-02-01", date: "2025-01-15", status: "New" },
  { id: 2, fullName: "Soumia Chaib", email: "soumia@beautyalgeria.com", phone: "0661999888", businessType: "Beauty & Cosmetics", requestedService: "Social Media Management & Content Creation", budget: "50,000 - 100,000 DZD / month", description: "Looking for a full social media management package for my beauty salon. We want daily posts, stories, reels, and community management.", websiteLink: "", preferredStartDate: "2025-01-20", date: "2025-01-14", status: "Reviewed" },
  { id: 3, fullName: "Rachid Meziani", email: "rmeziani@techcorp.dz", phone: "0770555444", businessType: "Technology / SaaS", requestedService: "Paid Ads & Digital Marketing Strategy", budget: "200,000+ DZD / month", description: "We are a tech startup launching a new SaaS product in Algeria. We need Meta Ads and Google Ads campaigns plus a full digital marketing strategy.", websiteLink: "https://techcorp.dz", preferredStartDate: "2025-02-15", date: "2025-01-13", status: "New" },
];

export const mockFAQs: FAQ[] = [
  { id: 1, question: "How long does it take to build a website?", answer: "A standard business website takes 2-4 weeks depending on complexity. E-commerce stores may take 4-8 weeks. We always provide a clear timeline before starting.", category: "Web Development" },
  { id: 2, question: "What is included in your social media management package?", answer: "Our packages include content creation, scheduling, community management, monthly reporting, and strategy sessions. The exact deliverables depend on the package you choose.", category: "Social Media" },
  { id: 3, question: "Do you offer free consultations?", answer: "Yes, we offer a free 30-minute consultation to understand your business needs and recommend the best solutions.", category: "General" },
  { id: 4, question: "What is the minimum budget for Meta Ads?", answer: "We recommend a minimum ad spend of 20,000 DZD/month to see meaningful results. Our management fee is separate from the ad budget.", category: "Paid Ads" },
  { id: 5, question: "Can I join the academy courses online?", answer: "Yes, most of our courses are available both in-person and online. We offer live sessions with recordings available for review.", category: "Academy" },
];
