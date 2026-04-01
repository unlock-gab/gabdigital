import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  Image as ImageIcon,
  ShoppingBag,
  GraduationCap,
  Star,
  MessageSquare,
  ClipboardList,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "تصنيفات الخدمات", path: "/admin/service-categories", icon: Layers },
  { label: "الخدمات", path: "/admin/services", icon: Briefcase },
  { label: "Portfolio", path: "/admin/portfolio", icon: ImageIcon },
  { label: "Products", path: "/admin/products", icon: ShoppingBag },
  { label: "Courses", path: "/admin/courses", icon: GraduationCap },
  { label: "Testimonials", path: "/admin/testimonials", icon: Star },
  { label: "Messages", path: "/admin/messages", icon: MessageSquare },
  { label: "Project Requests", path: "/admin/project-requests", icon: ClipboardList },
  { label: "FAQ", path: "/admin/faq", icon: HelpCircle },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    setLocation("/admin/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <Link href="/admin">
            <span className="text-xl font-bold text-white flex items-center gap-2 cursor-pointer">
              GAB <span className="text-orange-500">Admin</span>
            </span>
          </Link>
          <button className="lg:hidden text-slate-400" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <span className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${isActive ? "bg-orange-500/10 text-orange-500" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"}`}>
                    <Icon size={18} />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
