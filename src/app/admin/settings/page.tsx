"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Check, Loader2, Building2, Upload, Type } from "lucide-react";
import Image from "next/image";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (result.url) {
        const logoData = { ...(settings.logo || {}), url: result.url };
        setSettings({ ...settings, logo: logoData });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
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
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">إعدادات الهوية والشعار</h3>
        </div>
        <button 
          onClick={() => updateSetting("logo", settings.logo)}
          disabled={saving}
          className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          حفظ الكل
        </button>
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm p-8 md:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h4 className="text-xl font-black text-slate-900">تحميل الشعار (Logo)</h4>
            <div className="relative aspect-video w-full max-w-sm bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.logo?.url ? (
                <>
                  <Image 
                    src={settings.logo.url} 
                    alt="Logo Preview" 
                    width={settings.logo?.size || 200} 
                    height={settings.logo?.size || 100} 
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                      تغيير الشعار
                      <input type="file" onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    </label>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploading ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">ارفع الشعار هنا</span>
                  <input type="file" onChange={handleLogoUpload} className="hidden" accept="image/*" />
                </label>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-900">حجم الشعار (عرض)</label>
                <span className="text-cyan-500 font-black">{settings.logo?.size || 150}px</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                value={settings.logo?.size || 150}
                onChange={(e) => handleInputChange("logo", "size", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-black text-slate-900">هوية الشركة</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">اسم الشركة (AR)</label>
                <input
                  value={settings.logo?.companyName || "مسارات الإبداع"}
                  onChange={(e) => handleInputChange("logo", "companyName", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">اسم الشركة (EN)</label>
                <input
                  value={settings.logo?.companyNameEn || "Masarat Al Ibdaa"}
                  onChange={(e) => handleInputChange("logo", "companyNameEn", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">نوع الخط المفضل</label>
                <div className="relative">
                  <select
                    value={settings.logo?.fontFamily || "Tajawal"}
                    onChange={(e) => handleInputChange("logo", "fontFamily", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none appearance-none cursor-pointer"
                  >
                    <option value="Tajawal">Tajawal (هندسي)</option>
                    <option value="Cairo">Cairo (رسمي)</option>
                    <option value="Almarai">Almarai (عصري)</option>
                    <option value="Inter">Inter (إنجليزي عالمي)</option>
                    <option value="Rubik">Rubik (ناعم)</option>
                  </select>
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">لون الهوية الأساسي</label>
                <div className="flex gap-4">
                  <input
                    type="color"
                    value={settings.logo?.primaryColor || "#00AEEF"}
                    onChange={(e) => handleInputChange("logo", "primaryColor", e.target.value)}
                    className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={settings.logo?.primaryColor || "#00AEEF"}
                    onChange={(e) => handleInputChange("logo", "primaryColor", e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Security & Login Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm p-8 md:p-12"
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
              <Save className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-900">إعدادات الحماية والدخول</h4>
          </div>
          <button 
            onClick={() => updateSetting("admin_creds", settings.admin_creds)}
            disabled={saving}
            className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-red-200 transition-all disabled:opacity-50"
          >
            تحديث بيانات الدخول
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">البريد الإلكتروني للمسؤول</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={settings.admin_creds?.email || ""}
              onChange={(e) => handleInputChange("admin_creds", "email", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-red-500 outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">كلمة المرور الجديدة</label>
            <input
              type="password"
              placeholder="••••••••"
              value={settings.admin_creds?.password || ""}
              onChange={(e) => handleInputChange("admin_creds", "password", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-red-500 outline-none transition-colors"
            />
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-400 italic">
          * ملاحظة: تغيير هذه البيانات سيؤثر على عملية تسجيل الدخول القادمة. يرجى حفظ البيانات في مكان آمن.
        </p>
      </motion.section>
    </div>
  );
}
