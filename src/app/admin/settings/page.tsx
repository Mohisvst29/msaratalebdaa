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

  const updateSettings = async (dataToSave: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        alert("تم حفظ جميع الإعدادات بنجاح!");
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("فشل الحفظ: " + (data.error || "خطأ غير معروف"));
      }
    } catch (err: any) {
      console.error(err);
      alert("حدث خطأ أثناء الاتصال بالقاعدة: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = () => {
    const batch = [
      { key: "logo", value: settings.logo },
      { key: "hero_bg", value: settings.hero_bg },
      { key: "services_bg", value: settings.services_bg },
      { key: "products_bg", value: settings.products_bg },
      { key: "contact_bg", value: settings.contact_bg },
    ];
    updateSettings(batch);
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            0.7
          );
        };
        img.onerror = () => resolve(file);
        img.src = event.target?.result as string;
      };
      reader.onerror = () => resolve(file);
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalFile = e.target.files?.[0];
    if (!originalFile) return;

    setUploading(true);
    
    try {
      const file = await compressImage(originalFile);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (result.success && result.url) {
        const logoData = { ...(settings.logo || {}), url: result.url };
        setSettings({ ...settings, logo: logoData });
        alert("تم رفع الشعار بنجاح! لا تنسى الضغط على حفظ الكل.");
      } else {
        alert("فشل رفع الشعار: " + (result.error || "تأكد من إعدادات Cloudinary"));
      }
    } catch (err: any) {
      console.error(err);
      alert("حدث خطأ أثناء الرفع: " + err.message);
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

  const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const originalFile = e.target.files?.[0];
    if (!originalFile) return;

    setUploading(true);
    try {
      const file = await compressImage(originalFile);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (result.success && result.url) {
        setSettings({ ...settings, [key]: result.url });
        alert(`تم رفع خلفية ${key} بنجاح! لا تنسى الضغط على حفظ الكل.`);
      } else {
        alert("فشل الرفع: " + (result.error || "خطأ في السيرفر"));
      }
    } catch (err: any) {
      console.error(err);
      alert("حدث خطأ أثناء الرفع: " + err.message);
    } finally {
      setUploading(false);
    }
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
          onClick={handleSaveAll}
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
 
      {/* Section Backgrounds */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm p-8 md:p-12"
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-900">خلفيات الأقسام</h4>
          </div>
          <div className="flex gap-4">
             <button 
                onClick={handleSaveAll}
                className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-purple-200 transition-all"
              >
                حفظ الخلفيات
              </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "خلفية الرئيسية", key: "hero_bg" },
            { label: "خلفية الخدمات", key: "services_bg" },
            { label: "خلفية المنتجات", key: "products_bg" },
            { label: "خلفية التواصل", key: "contact_bg" },
          ].map((item) => (
            <div key={item.key} className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-center">{item.label}</label>
              <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden group">
                {settings[item.key] ? (
                  <>
                    <Image src={settings[item.key]} alt={item.label} fill className="object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white text-slate-900 px-4 py-2 rounded-full text-[10px] font-bold cursor-pointer">
                        تغيير
                        <input type="file" onChange={(e) => handleBackgroundUpload(e, item.key)} className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload className="w-6 h-6 text-slate-200 mb-2" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">رفع صورة</span>
                    <input type="file" onChange={(e) => handleBackgroundUpload(e, item.key)} className="hidden" accept="image/*" />
                  </label>
                )}
              </div>
            </div>
          ))}
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
            onClick={() => updateSettings({ key: "admin_creds", value: settings.admin_creds })}
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
