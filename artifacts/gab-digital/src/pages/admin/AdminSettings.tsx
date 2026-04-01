import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface SiteSettings {
  websiteTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  brandTagline: string;
  contactEmail: string;
  phone: string;
  whatsappLink: string;
  instagramLink: string;
  aboutText: string;
  footerDescription: string;
  logoText: string;
}

const defaultSettings: SiteSettings = {
  websiteTitle: "GAB Digital – وكالة التسويق الرقمي",
  heroTitle: "نحوّل علامتك التجارية إلى تجربة رقمية استثنائية",
  heroSubtitle: "استراتيجيات تسويق رقمي متكاملة، إبداع بصري يترك أثراً، ونتائج حقيقية لعلامتك التجارية في الجزائر والعالم العربي.",
  brandTagline: "وكالة التسويق الرقمي الرائدة في الجزائر",
  contactEmail: "contact@gabdigital.com",
  phone: "+213 555 000 000",
  whatsappLink: "https://wa.me/213555000000",
  instagramLink: "https://www.instagram.com/digital.gab16",
  aboutText: "GAB Digital هي وكالة تسويق رقمي متكاملة متخصصة في مساعدة الشركات والعلامات التجارية على النمو في الفضاء الرقمي.",
  footerDescription: "وكالة تسويق رقمي متكاملة نساعدك على بناء حضورك الرقمي وتحقيق أهدافك التجارية.",
  logoText: "GAB Digital",
};

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <h3 className="text-white font-semibold text-base border-b border-slate-800 pb-3">{title}</h3>
      {children}
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-400 text-sm">{label}</Label>
      {children}
    </div>
  );
}

export default function AdminSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  function update(key: keyof SiteSettings, value: string) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    toast({ title: "Settings saved", description: "Your site settings have been updated." });
  }

  return (
    <AdminLayout title="Site Settings">
      <div className="space-y-6 max-w-2xl">
        <SettingsSection title="General">
          <FieldRow label="Website Title"><Input value={settings.websiteTitle} onChange={e => update("websiteTitle", e.target.value)} className="bg-slate-800 border-slate-700 text-white" /></FieldRow>
          <FieldRow label="Logo Text"><Input value={settings.logoText} onChange={e => update("logoText", e.target.value)} className="bg-slate-800 border-slate-700 text-white" /></FieldRow>
          <FieldRow label="Brand Tagline"><Input value={settings.brandTagline} onChange={e => update("brandTagline", e.target.value)} className="bg-slate-800 border-slate-700 text-white" /></FieldRow>
        </SettingsSection>

        <SettingsSection title="Hero Section">
          <FieldRow label="Hero Title"><Input value={settings.heroTitle} onChange={e => update("heroTitle", e.target.value)} className="bg-slate-800 border-slate-700 text-white" /></FieldRow>
          <FieldRow label="Hero Subtitle"><Textarea value={settings.heroSubtitle} onChange={e => update("heroSubtitle", e.target.value)} className="bg-slate-800 border-slate-700 text-white resize-none" rows={3} /></FieldRow>
        </SettingsSection>

        <SettingsSection title="Contact Information">
          <FieldRow label="Contact Email"><Input type="email" value={settings.contactEmail} onChange={e => update("contactEmail", e.target.value)} className="bg-slate-800 border-slate-700 text-white" /></FieldRow>
          <FieldRow label="Phone Number"><Input value={settings.phone} onChange={e => update("phone", e.target.value)} className="bg-slate-800 border-slate-700 text-white" /></FieldRow>
          <FieldRow label="WhatsApp Link"><Input value={settings.whatsappLink} onChange={e => update("whatsappLink", e.target.value)} className="bg-slate-800 border-slate-700 text-white" placeholder="https://wa.me/..." /></FieldRow>
          <FieldRow label="Instagram Link"><Input value={settings.instagramLink} onChange={e => update("instagramLink", e.target.value)} className="bg-slate-800 border-slate-700 text-white" /></FieldRow>
        </SettingsSection>

        <SettingsSection title="Content">
          <FieldRow label="About Section Text"><Textarea value={settings.aboutText} onChange={e => update("aboutText", e.target.value)} className="bg-slate-800 border-slate-700 text-white resize-none" rows={4} /></FieldRow>
          <FieldRow label="Footer Description"><Textarea value={settings.footerDescription} onChange={e => update("footerDescription", e.target.value)} className="bg-slate-800 border-slate-700 text-white resize-none" rows={3} /></FieldRow>
        </SettingsSection>

        <SettingsSection title="Appearance">
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-slate-300 text-sm font-medium">Primary Color</p>
                <p className="text-slate-500 text-xs mt-0.5">Orange – hsl(25, 95%, 53%)</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500 shrink-0" />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-slate-300 text-sm font-medium">Background Color</p>
                <p className="text-slate-500 text-xs mt-0.5">Dark Navy – hsl(222, 47%, 11%)</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[hsl(222,47%,11%)] border border-slate-700 shrink-0" />
            </div>
          </div>
        </SettingsSection>

        <div className="flex justify-end pt-2">
          <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 px-8"><Save size={16} /> Save Settings</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
