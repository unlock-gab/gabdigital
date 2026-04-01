import { Menu } from "lucide-react";

export function AdminTopbar({ toggleSidebar, title }: { toggleSidebar: () => void; title: string }) {
  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden text-slate-400 hover:text-white"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <span className="text-sm font-medium text-slate-300">Admin User</span>
        </div>
      </div>
    </header>
  );
}