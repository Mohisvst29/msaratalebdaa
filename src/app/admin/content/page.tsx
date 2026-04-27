"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Check, Loader2, Globe, Upload, Trash2, Video, ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AdminContent() {
  const [settings, setSettings] = useState<any>({
    hero: { images: [], video: "" },
    services_bg: { image: "", video: "" },
    products_bg: { image: "", video: "" },
    projects_bg: { image: "", video: "" },
    why_bg: { image: "", video: "" },
    clients_bg: { image: "", video: "" },
    contact_bg: { image: "", video: "" },
    about: { storyText: "", visionText: "", image: "" },
    why_choose_us: { 
      title: "", titleEn: "", 
      subtitle: "", subtitleEn: "", 
      credibility: "", credibilityEn: "", 
      speed_production: "", speed_productionEn: "", 
      quality: "", qualityEn: "", 
      speed_delivery: "", speed_deliveryEn: "" 
    },
    contact_cta: { 
      title: "", titleEn: "", 
      ctaTitle: "", ctaTitleEn: "", 
      ctaSubtitle: "", ctaSubtitleEn: "" 
    },
    headers: {
      services_title: "", services_titleEn: "", services_subtitle: "", services_subtitleEn: "",
      products_title: "", products_titleEn: "", products_subtitle: "", products_subtitleEn: "",
      projects_title: "", projects_titleEn: "", projects_subtitle: "", projects_subtitleEn: "",
      clients_title: "", clients_titleEn: "", clients_subtitle: "", clients_subtitleEn: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success) {
        setSettings((prev: any) => ({
          ...prev,
          ...data.data
        }));
      }
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
    setSettings((prev: any) => {
      const sectionData = prev[section] || {};
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value
        }
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: string, field: string, isArray: boolean = false, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(`${section}-${field}-${index ?? ""}`);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (result.url) {
        if (isArray && typeof index === "number") {
          setSettings((prev: any) => {
            const currentArray = [...(prev[section]?.[field] || [])];
            currentArray[index] = result.url;
            return {
              ...prev,
              [section]: {
                ...prev[section],
                [field]: currentArray
              }
            };
          });
        } else {
          handleInputChange(section, field, result.url);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingField(null);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-24">
      <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12 pb-24" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 border border-gray-100 rounded-3xl sticky top-0 z-10 shadow-sm backdrop-blur-md bg-opacity-90">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-widest text-slate-900">إدارة محتوى الموقع</h3>
        </div>
        {success && (
          <div className="flex items-center gap-2 text-green-600 font-bold animate-in fade-in slide-in-from-left-4">
            <Check className="w-5 h-5" />
            تم الحفظ بنجاح
          </div>
        )}
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">قسم الاستقبال (Hero Section)</h4>
          <button 
            onClick={() => updateSetting("hero", settings.hero)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ التغييرات
          </button>
        </div>
        
        <div className="p-8 md:p-12 space-y-12">
          {/* Texts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الرئيسي (AR)</label>
              <input
                value={settings.hero?.title || ""}
                onChange={(e) => handleInputChange("hero", "title", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الرئيسي (EN)</label>
              <input
                value={settings.hero?.titleEn || ""}
                onChange={(e) => handleInputChange("hero", "titleEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الوصف (AR)</label>
              <textarea
                value={settings.hero?.description || ""}
                onChange={(e) => handleInputChange("hero", "description", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[100px]"
              />
            </div>
          </div>

          {/* Media */}
          <div className="space-y-6">
            <h5 className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-cyan-500" />
              الصور الرئيسية (3 صور كحد أقصى)
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="relative aspect-[4/5] bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
                    {settings.hero?.images?.[i] ? (
                      <>
                        <Image src={settings.hero.images[i]} alt={`Slide ${i}`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                            تغيير
                            <input type="file" onChange={(e) => handleFileUpload(e, "hero", "images", true, i)} className="hidden" accept="image/*" />
                          </label>
                        </div>
                      </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                        {uploadingField === `hero-images-${i}` ? <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" /> : <Upload className="w-8 h-8 text-slate-200" />}
                        <input type="file" onChange={(e) => handleFileUpload(e, "hero", "images", true, i)} className="hidden" accept="image/*" />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <Video className="w-5 h-5 text-cyan-500" />
              فيديو الهيرو
            </h5>
            <div className="relative aspect-video w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group max-w-2xl">
              {settings.hero?.video ? (
                <>
                  <video src={settings.hero.video} className="w-full h-full object-cover" controls />
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={() => handleInputChange("hero", "video", "")}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "hero-video-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">ارفع الفيديو هنا</span>
                  <input type="file" onChange={(e) => handleFileUpload(e, "hero", "video")} className="hidden" accept="video/*" />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">من نحن (About Section)</h4>
          <button 
            onClick={() => updateSetting("about", settings.about)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ التغييرات
          </button>
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">قصتنا (AR)</label>
              <textarea
                value={settings.about?.storyText || ""}
                onChange={(e) => handleInputChange("about", "storyText", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">رؤيتنا (AR)</label>
              <textarea
                value={settings.about?.visionText || ""}
                onChange={(e) => handleInputChange("about", "visionText", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[100px]"
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">صورة القسم</label>
            <div className="relative aspect-[4/5] bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.about?.image ? (
                <>
                  <Image src={settings.about.image} alt="About" fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                      تغيير الصورة
                      <input type="file" onChange={(e) => handleFileUpload(e, "about", "image")} className="hidden" accept="image/*" />
                    </label>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "about-image-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <input type="file" onChange={(e) => handleFileUpload(e, "about", "image")} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section Background */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">خلفية قسم الخدمات</h4>
          <button 
            onClick={() => updateSetting("services_bg", settings.services_bg)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ الخلفية
          </button>
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">صورة الخلفية</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.services_bg?.image ? (
                <>
                  <Image src={settings.services_bg.image} alt="Services BG" fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                      تغيير الصورة
                      <input type="file" onChange={(e) => handleFileUpload(e, "services_bg", "image")} className="hidden" accept="image/*" />
                    </label>
                    <button onClick={() => handleInputChange("services_bg", "image", "")} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "services_bg-image-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <input type="file" onChange={(e) => handleFileUpload(e, "services_bg", "image")} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">فيديو الخلفية (اختياري)</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.services_bg?.video ? (
                <>
                  <video src={settings.services_bg.video} className="w-full h-full object-cover" controls />
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={() => handleInputChange("services_bg", "video", "")}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "services_bg-video-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">ارفع الفيديو هنا (سيعرض بدلاً من الصورة)</span>
                  <input type="file" onChange={(e) => handleFileUpload(e, "services_bg", "video")} className="hidden" accept="video/*" />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Products Section Background */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">خلفية قسم المنتجات</h4>
          <button 
            onClick={() => updateSetting("products_bg", settings.products_bg)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ الخلفية
          </button>
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">صورة الخلفية</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.products_bg?.image ? (
                <>
                  <Image src={settings.products_bg.image} alt="Products BG" fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                      تغيير الصورة
                      <input type="file" onChange={(e) => handleFileUpload(e, "products_bg", "image")} className="hidden" accept="image/*" />
                    </label>
                    <button onClick={() => handleInputChange("products_bg", "image", "")} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "products_bg-image-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <input type="file" onChange={(e) => handleFileUpload(e, "products_bg", "image")} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">فيديو الخلفية (اختياري)</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.products_bg?.video ? (
                <>
                  <video src={settings.products_bg.video} className="w-full h-full object-cover" controls />
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={() => handleInputChange("products_bg", "video", "")}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "products_bg-video-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">ارفع الفيديو هنا</span>
                  <input type="file" onChange={(e) => handleFileUpload(e, "products_bg", "video")} className="hidden" accept="video/*" />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section Background */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">خلفية قسم المشاريع</h4>
          <button 
            onClick={() => updateSetting("projects_bg", settings.projects_bg)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ الخلفية
          </button>
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">صورة الخلفية</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.projects_bg?.image ? (
                <>
                  <Image src={settings.projects_bg.image} alt="Projects BG" fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                      تغيير الصورة
                      <input type="file" onChange={(e) => handleFileUpload(e, "projects_bg", "image")} className="hidden" accept="image/*" />
                    </label>
                    <button onClick={() => handleInputChange("projects_bg", "image", "")} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "projects_bg-image-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <input type="file" onChange={(e) => handleFileUpload(e, "projects_bg", "image")} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">فيديو الخلفية (اختياري)</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.projects_bg?.video ? (
                <>
                  <video src={settings.projects_bg.video} className="w-full h-full object-cover" controls />
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={() => handleInputChange("projects_bg", "video", "")}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "projects_bg-video-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">ارفع الفيديو هنا</span>
                  <input type="file" onChange={(e) => handleFileUpload(e, "projects_bg", "video")} className="hidden" accept="video/*" />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section Background */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">خلفية قسم "لماذا تختارنا"</h4>
          <button 
            onClick={() => updateSetting("why_bg", settings.why_bg)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ الخلفية
          </button>
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">صورة الخلفية</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.why_bg?.image ? (
                <>
                  <Image src={settings.why_bg.image} alt="Why BG" fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                      تغيير الصورة
                      <input type="file" onChange={(e) => handleFileUpload(e, "why_bg", "image")} className="hidden" accept="image/*" />
                    </label>
                    <button onClick={() => handleInputChange("why_bg", "image", "")} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "why_bg-image-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <input type="file" onChange={(e) => handleFileUpload(e, "why_bg", "image")} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">فيديو الخلفية (اختياري)</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.why_bg?.video ? (
                <>
                  <video src={settings.why_bg.video} className="w-full h-full object-cover" controls />
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={() => handleInputChange("why_bg", "video", "")}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "why_bg-video-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">ارفع الفيديو هنا</span>
                  <input type="file" onChange={(e) => handleFileUpload(e, "why_bg", "video")} className="hidden" accept="video/*" />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Clients Section Background */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">خلفية قسم "عملاؤنا"</h4>
          <button 
            onClick={() => updateSetting("clients_bg", settings.clients_bg)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ الخلفية
          </button>
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">صورة الخلفية</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.clients_bg?.image ? (
                <>
                  <Image src={settings.clients_bg.image} alt="Clients BG" fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                      تغيير الصورة
                      <input type="file" onChange={(e) => handleFileUpload(e, "clients_bg", "image")} className="hidden" accept="image/*" />
                    </label>
                    <button onClick={() => handleInputChange("clients_bg", "image", "")} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "clients_bg-image-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <input type="file" onChange={(e) => handleFileUpload(e, "clients_bg", "image")} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">فيديو الخلفية (اختياري)</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.clients_bg?.video ? (
                <>
                  <video src={settings.clients_bg.video} className="w-full h-full object-cover" controls />
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={() => handleInputChange("clients_bg", "video", "")}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "clients_bg-video-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">ارفع الفيديو هنا</span>
                  <input type="file" onChange={(e) => handleFileUpload(e, "clients_bg", "video")} className="hidden" accept="video/*" />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section Content */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">لماذا تختارنا (Why Choose Us)</h4>
          <button 
            onClick={() => updateSetting("why_choose_us", settings.why_choose_us)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ القسم
          </button>
        </div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الصغير (AR)</label>
              <input
                value={settings.why_choose_us?.title || ""}
                onChange={(e) => handleInputChange("why_choose_us", "title", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الصغير (EN)</label>
              <input
                value={settings.why_choose_us?.titleEn || ""}
                onChange={(e) => handleInputChange("why_choose_us", "titleEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الرئيسي (AR)</label>
              <input
                value={settings.why_choose_us?.subtitle || ""}
                onChange={(e) => handleInputChange("why_choose_us", "subtitle", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الرئيسي (EN)</label>
              <input
                value={settings.why_choose_us?.subtitleEn || ""}
                onChange={(e) => handleInputChange("why_choose_us", "subtitleEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">المصداقية العالية (AR)</label>
              <textarea
                value={settings.why_choose_us?.credibility || ""}
                onChange={(e) => handleInputChange("why_choose_us", "credibility", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">المصداقية العالية (EN)</label>
              <textarea
                value={settings.why_choose_us?.credibilityEn || ""}
                onChange={(e) => handleInputChange("why_choose_us", "credibilityEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[80px] text-left"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">سرعة الإنتاج (AR)</label>
              <textarea
                value={settings.why_choose_us?.speed_production || ""}
                onChange={(e) => handleInputChange("why_choose_us", "speed_production", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">سرعة الإنتاج (EN)</label>
              <textarea
                value={settings.why_choose_us?.speed_productionEn || ""}
                onChange={(e) => handleInputChange("why_choose_us", "speed_productionEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[80px] text-left"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الجودة الاستثنائية (AR)</label>
              <textarea
                value={settings.why_choose_us?.quality || ""}
                onChange={(e) => handleInputChange("why_choose_us", "quality", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الجودة الاستثنائية (EN)</label>
              <textarea
                value={settings.why_choose_us?.qualityEn || ""}
                onChange={(e) => handleInputChange("why_choose_us", "qualityEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[80px] text-left"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">سرعة التوريد (AR)</label>
              <textarea
                value={settings.why_choose_us?.speed_delivery || ""}
                onChange={(e) => handleInputChange("why_choose_us", "speed_delivery", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">سرعة التوريد (EN)</label>
              <textarea
                value={settings.why_choose_us?.speed_deliveryEn || ""}
                onChange={(e) => handleInputChange("why_choose_us", "speed_deliveryEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[80px] text-left"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">دعوة للتواصل (Contact CTA)</h4>
          <button 
            onClick={() => updateSetting("contact_cta", settings.contact_cta)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ القسم
          </button>
        </div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الصغير (AR)</label>
              <input
                value={settings.contact_cta?.title || ""}
                onChange={(e) => handleInputChange("contact_cta", "title", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الصغير (EN)</label>
              <input
                value={settings.contact_cta?.titleEn || ""}
                onChange={(e) => handleInputChange("contact_cta", "titleEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الرئيسي (AR)</label>
              <input
                value={settings.contact_cta?.ctaTitle || ""}
                onChange={(e) => handleInputChange("contact_cta", "ctaTitle", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">العنوان الرئيسي (EN)</label>
              <input
                value={settings.contact_cta?.ctaTitleEn || ""}
                onChange={(e) => handleInputChange("contact_cta", "ctaTitleEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors text-left"
                dir="ltr"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الوصف (AR)</label>
              <textarea
                value={settings.contact_cta?.ctaSubtitle || ""}
                onChange={(e) => handleInputChange("contact_cta", "ctaSubtitle", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الوصف (EN)</label>
              <textarea
                value={settings.contact_cta?.ctaSubtitleEn || ""}
                onChange={(e) => handleInputChange("contact_cta", "ctaSubtitleEn", e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[100px] text-left"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact CTA Section Background */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">خلفية قسم "تواصل معنا"</h4>
          <button 
            onClick={() => updateSetting("contact_bg", settings.contact_bg)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ الخلفية
          </button>
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">صورة الخلفية</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.contact_bg?.image ? (
                <>
                  <Image src={settings.contact_bg.image} alt="Contact BG" fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                      تغيير الصورة
                      <input type="file" onChange={(e) => handleFileUpload(e, "contact_bg", "image")} className="hidden" accept="image/*" />
                    </label>
                    <button onClick={() => handleInputChange("contact_bg", "image", "")} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "contact_bg-image-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <input type="file" onChange={(e) => handleFileUpload(e, "contact_bg", "image")} className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">فيديو الخلفية (اختياري)</label>
            <div className="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
              {settings.contact_bg?.video ? (
                <>
                  <video src={settings.contact_bg.video} className="w-full h-full object-cover" controls />
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={() => handleInputChange("contact_bg", "video", "")}
                      className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  {uploadingField === "contact_bg-video-" ? <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" /> : <Upload className="w-10 h-10 text-slate-200 mb-4" />}
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center px-4">ارفع الفيديو هنا</span>
                  <input type="file" onChange={(e) => handleFileUpload(e, "contact_bg", "video")} className="hidden" accept="video/*" />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section Headers */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm mt-12"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">عناوين الأقسام (Section Headers)</h4>
          <button 
            onClick={() => updateSetting("headers", settings.headers)}
            disabled={saving}
            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ العناوين
          </button>
        </div>
        
        <div className="p-8 md:p-12 space-y-12">
          {["services", "products", "projects", "clients"].map((sec) => (
            <div key={sec} className="space-y-6 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
              <h5 className="font-bold text-cyan-600 uppercase tracking-widest text-sm">قسم {sec === "services" ? "الخدمات" : sec === "products" ? "المنتجات" : sec === "projects" ? "المشاريع" : "العملاء"}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">العنوان الصغير (AR)</label>
                  <input
                    value={settings.headers?.[`${sec}_title`] || ""}
                    onChange={(e) => {
                      const newHeaders = { ...settings.headers, [`${sec}_title`]: e.target.value };
                      setSettings({ ...settings, headers: newHeaders });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">العنوان الصغير (EN)</label>
                  <input
                    value={settings.headers?.[`${sec}_titleEn`] || ""}
                    onChange={(e) => {
                      const newHeaders = { ...settings.headers, [`${sec}_titleEn`]: e.target.value };
                      setSettings({ ...settings, headers: newHeaders });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none text-left"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">العنوان الرئيسي (AR)</label>
                  <input
                    value={settings.headers?.[`${sec}_subtitle`] || ""}
                    onChange={(e) => {
                      const newHeaders = { ...settings.headers, [`${sec}_subtitle`]: e.target.value };
                      setSettings({ ...settings, headers: newHeaders });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">العنوان الرئيسي (EN)</label>
                  <input
                    value={settings.headers?.[`${sec}_subtitleEn`] || ""}
                    onChange={(e) => {
                      const newHeaders = { ...settings.headers, [`${sec}_subtitleEn`]: e.target.value };
                      setSettings({ ...settings, headers: newHeaders });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
