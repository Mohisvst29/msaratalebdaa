"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Check, Loader2, PhoneCall, Mail, MessageCircle, Globe } from "lucide-react";

export default function AdminContact() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success) setSettings(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    const sectionData = settings[section] || {};
    setSettings({
      ...settings,
      [section]: {
        ...sectionData,
        [field]: value
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center py-24">
      <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12 pb-24" dir="rtl">
      <div className="flex justify-between items-center bg-white p-6 border border-gray-100 rounded-3xl sticky top-0 z-10 shadow-sm backdrop-blur-md bg-opacity-90">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">بيانات التواصل والروابط</h3>
        </div>
        <button 
          onClick={() => updateSetting("contact_info", settings.contact_info)}
          disabled={saving}
          className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          حفظ البيانات
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phone & WhatsApp */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-8"
        >
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-900">الهواتف والواتس آب</h4>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">رقم الواتس آب الأساسي</label>
              <input
                value={settings.contact_info?.whatsapp || ""}
                onChange={(e) => handleInputChange("contact_info", "whatsapp", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
                placeholder="مثال: 966500000000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">رقم الهاتف (1)</label>
              <input
                value={settings.contact_info?.phone1 || ""}
                onChange={(e) => handleInputChange("contact_info", "phone1", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">رقم الهاتف (2)</label>
              <input
                value={settings.contact_info?.phone2 || ""}
                onChange={(e) => handleInputChange("contact_info", "phone2", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان (بالعربية)</label>
              <input
                value={settings.contact_info?.addressAr || ""}
                onChange={(e) => handleInputChange("contact_info", "addressAr", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
                placeholder="مثال: الرياض، حي الملز، طريق صلاح الدين"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">Address (English)</label>
              <input
                value={settings.contact_info?.addressEn || ""}
                onChange={(e) => handleInputChange("contact_info", "addressEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
                placeholder="Example: Riyadh, Al Malaz, Salah Al Din Road"
              />
            </div>
          </div>
        </motion.section>

        {/* Social Media Links */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-8 md:col-span-2"
        >
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-900">منصات التواصل الاجتماعي</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "instagram", label: "إنستقرام", placeholder: "https://instagram.com/..." },
              { id: "twitter", label: "تويتر (X)", placeholder: "https://twitter.com/..." },
              { id: "linkedin", label: "لينكد إن", placeholder: "https://linkedin.com/in/..." },
              { id: "tiktok", label: "تيك توك", placeholder: "https://tiktok.com/@..." },
              { id: "snapchat", label: "سناب شات", placeholder: "https://snapchat.com/add/..." },
              { id: "facebook", label: "فيسبوك", placeholder: "https://facebook.com/..." },
              { id: "youtube", label: "يوتيوب", placeholder: "https://youtube.com/..." },
              { id: "website", label: "الموقع الإلكتروني", placeholder: "https://..." },
            ].map((platform) => (
              <div key={platform.id} className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">{platform.label}</label>
                <input
                  value={settings.contact_info?.[platform.id] || ""}
                  onChange={(e) => handleInputChange("contact_info", platform.id, e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                  dir="ltr"
                  placeholder={platform.placeholder}
                />
              </div>
            ))}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">البريد الإلكتروني</label>
              <input
                value={settings.contact_info?.email || ""}
                onChange={(e) => handleInputChange("contact_info", "email", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
