import {
  MonitorSmartphone, Video, Layers, Megaphone, TrendingUp, PenTool,
  BookOpen, Share2, Camera, Globe, BarChart2, Target, Zap, Award,
  Users, ShoppingCart, Layout, Smartphone, Search, Mail, Palette,
  Play, Star, Brush, FileText, Printer, GraduationCap, Pencil,
  ImageIcon, Film, Music, Settings, Package, Tag, Lightbulb,
  type LucideIcon
} from "lucide-react";

export const SERVICE_PALETTES = [
  { visualGradient: "from-blue-900 via-indigo-900 to-purple-900", glowColor: "rgba(99,102,241,0.4)", accentColor: "#818CF8", gradient: "from-blue-600 to-indigo-700", glow: "rgba(99,102,241,0.3)", decorIcons: [Share2, BarChart2, Globe, Users] as LucideIcon[] },
  { visualGradient: "from-rose-900 via-pink-900 to-orange-900", glowColor: "rgba(251,113,133,0.4)", accentColor: "#FB7185", gradient: "from-rose-500 to-pink-700", glow: "rgba(244,63,94,0.3)", decorIcons: [Camera, Play, Star, Palette] as LucideIcon[] },
  { visualGradient: "from-cyan-900 via-teal-900 to-emerald-900", glowColor: "rgba(20,184,166,0.4)", accentColor: "#2DD4BF", gradient: "from-teal-500 to-cyan-700", glow: "rgba(20,184,166,0.3)", decorIcons: [Globe, Layout, ShoppingCart, Smartphone] as LucideIcon[] },
  { visualGradient: "from-orange-900 via-amber-900 to-yellow-900", glowColor: "rgba(249,115,22,0.4)", accentColor: "#FB923C", gradient: "from-orange-500 to-amber-600", glow: "rgba(249,115,22,0.3)", decorIcons: [Target, BarChart2, Zap, Award] as LucideIcon[] },
  { visualGradient: "from-green-900 via-teal-900 to-cyan-900", glowColor: "rgba(34,197,94,0.4)", accentColor: "#4ADE80", gradient: "from-green-500 to-emerald-700", glow: "rgba(34,197,94,0.3)", decorIcons: [Search, Mail, BarChart2, Globe] as LucideIcon[] },
  { visualGradient: "from-purple-900 via-violet-900 to-indigo-900", glowColor: "rgba(167,139,250,0.4)", accentColor: "#A78BFA", gradient: "from-purple-600 to-violet-700", glow: "rgba(139,92,246,0.3)", decorIcons: [Brush, Palette, FileText, Printer] as LucideIcon[] },
  { visualGradient: "from-yellow-900 via-amber-900 to-orange-900", glowColor: "rgba(251,191,36,0.4)", accentColor: "#FCD34D", gradient: "from-yellow-500 to-orange-600", glow: "rgba(234,179,8,0.3)", decorIcons: [GraduationCap, Star, Award, Users] as LucideIcon[] },
  { visualGradient: "from-sky-900 via-blue-900 to-indigo-900", glowColor: "rgba(56,189,248,0.4)", accentColor: "#38BDF8", gradient: "from-sky-500 to-blue-700", glow: "rgba(56,189,248,0.3)", decorIcons: [Film, Music, Settings, Package] as LucideIcon[] },
];

export const PORTFOLIO_ACCENTS = [
  "#6366F1", "#F97316", "#EC4899", "#10B981", "#8B5CF6", "#0EA5E9", "#14B8A6", "#F59E0B",
  "#EF4444", "#06B6D4", "#84CC16", "#F43F5E"
];

export const ICON_MAP: Record<string, LucideIcon> = {
  "share-2": Share2,
  "camera": Camera,
  "globe": Globe,
  "trending-up": TrendingUp,
  "search": Search,
  "printer": Printer,
  "graduation-cap": GraduationCap,
  "monitor-smartphone": MonitorSmartphone,
  "video": Video,
  "layers": Layers,
  "megaphone": Megaphone,
  "pen-tool": PenTool,
  "book-open": BookOpen,
  "bar-chart-2": BarChart2,
  "target": Target,
  "zap": Zap,
  "award": Award,
  "users": Users,
  "shopping-cart": ShoppingCart,
  "layout": Layout,
  "smartphone": Smartphone,
  "mail": Mail,
  "palette": Palette,
  "play": Play,
  "star": Star,
  "brush": Brush,
  "file-text": FileText,
  "image": ImageIcon,
  "film": Film,
  "package": Package,
  "tag": Tag,
  "lightbulb": Lightbulb,
  "settings": Settings,
  "pencil": Pencil,
};

export function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] || Zap;
}

export function getPalette(index: number) {
  return SERVICE_PALETTES[index % SERVICE_PALETTES.length];
}

export function getAccent(index: number): string {
  return PORTFOLIO_ACCENTS[index % PORTFOLIO_ACCENTS.length];
}

export function parseFeatures(fullDescription: string): string[] {
  if (!fullDescription) return [];
  const byNewline = fullDescription.split("\n").map(s => s.trim()).filter(Boolean);
  if (byNewline.length > 1) return byNewline.slice(0, 6);
  const byPeriod = fullDescription.split(/[.،]/).map(s => s.trim()).filter(s => s.length > 5);
  if (byPeriod.length > 1) return byPeriod.slice(0, 6);
  return [fullDescription.slice(0, 80)];
}
