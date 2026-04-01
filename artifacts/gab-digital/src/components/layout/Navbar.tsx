import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "الرئيسية", path: "/" },
    { label: "الخدمات", path: "/services" },
    { label: "أعمالنا", path: "/our-work" },
    { label: "المنتجات", path: "/digital-products" },
    { label: "الأكاديمية", path: "/academy" },
    { label: "من نحن", path: "/about" },
    { label: "تواصل معنا", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-black text-foreground cursor-pointer flex items-center gap-1 group" data-testid="link-logo">
              جاب <span className="text-primary transition-transform group-hover:scale-110 duration-300">ديجيتال</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span
                      className={`text-sm font-semibold transition-colors hover:text-primary cursor-pointer relative ${
                        location === link.path ? "text-primary" : "text-muted-foreground"
                      }`}
                      data-testid={`link-nav-${link.path}`}
                    >
                      {link.label}
                      {location === link.path && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/start-project">
              <Button className="font-bold rounded-full px-6" data-testid="button-nav-start-project">
                ابدأ مشروعك
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path}>
                      <span
                        className={`block text-lg font-semibold transition-colors ${
                          location === link.path ? "text-primary" : "text-foreground"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/start-project">
                <Button className="w-full font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                  ابدأ مشروعك
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
