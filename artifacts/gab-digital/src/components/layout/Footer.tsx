import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted pt-16 pb-8 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <Link href="/">
              <span dir="ltr" className="text-2xl font-black text-foreground cursor-pointer flex items-center gap-1 mb-4">
                GAB <span className="text-primary">Digital</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              وكالة تسويق رقمي متخصصة تساعد الشركات والرياديين والمبدعين على النمو عبر الإنترنت. نجمع بين الإبداع والاحترافية في خدمات متكاملة تضمن نجاحك.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/digital.gab16" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">من نحن</span></Link></li>
              <li><Link href="/services"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">الخدمات</span></Link></li>
              <li><Link href="/our-work"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">أعمالنا</span></Link></li>
              <li><Link href="/digital-products"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">المنتجات الرقمية</span></Link></li>
              <li><Link href="/academy"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">الأكاديمية</span></Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 relative inline-block">
              خدماتنا
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">إدارة التواصل الاجتماعي</span></Link></li>
              <li><Link href="/services"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">تطوير المواقع</span></Link></li>
              <li><Link href="/services"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">الإنتاج الإبداعي</span></Link></li>
              <li><Link href="/services"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">الحملات الإعلانية</span></Link></li>
              <li><Link href="/services"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">الطباعة والهوية البصرية</span></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>الجزائر، الجزائر العاصمة</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="text-primary shrink-0" />
                <span dir="ltr">+213 555 55 55 55</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={18} className="text-primary shrink-0" />
                <span>contact@gabdigital.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-right">
            &copy; {new Date().getFullYear()} GAB Digital. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-primary transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
