import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t border-slate-800 mt-auto section-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <Link href="/">
              <span dir="ltr" className="text-2xl font-black text-white cursor-pointer flex items-center gap-1 mb-4">
                GAB <span className="text-orange-500">Digital</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              وكالة تسويق رقمي متخصصة تساعد الشركات والرياديين والمبدعين على النمو عبر الإنترنت. نجمع بين الإبداع والاحترافية في خدمات متكاملة تضمن نجاحك.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/digital.gab16" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-orange-500 rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">من نحن</span></Link></li>
              <li><Link href="/services"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">الخدمات</span></Link></li>
              <li><Link href="/our-work"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">أعمالنا</span></Link></li>
              <li><Link href="/digital-products"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">المنتجات الرقمية</span></Link></li>
              <li><Link href="/academy"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">الأكاديمية</span></Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              خدماتنا
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-orange-500 rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">إدارة التواصل الاجتماعي</span></Link></li>
              <li><Link href="/services"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">تطوير المواقع</span></Link></li>
              <li><Link href="/services"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">الإنتاج الإبداعي</span></Link></li>
              <li><Link href="/services"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">الحملات الإعلانية</span></Link></li>
              <li><Link href="/services"><span className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">الطباعة والهوية البصرية</span></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-orange-500 rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-0.5" />
                <span>الجزائر، الجزائر العاصمة</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span dir="ltr">+213 555 55 55 55</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>contact@gabdigital.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} GAB Digital. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
