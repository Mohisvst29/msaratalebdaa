"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Upload, Check, Loader2, Users } from "lucide-react";
import Image from "next/image";

interface Partner {
  _id: string;
  name: string;
  logo: string;
}

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      if (data.success) setPartners(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
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
        setFormData({ ...formData, logo: result.url });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setFormData({ name: "", logo: "" });
        fetchPartners();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePartner = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الشريك؟")) return;
    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchPartners();
      } else {
        alert("فشل الحذف");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ");
    }
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-400">قائمة شركاء النجاح</h3>
        <button
          onClick={() => {
            setFormData({ name: "", logo: "" });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-cyan-500 text-white font-black px-6 py-3 rounded-2xl text-sm uppercase tracking-widest hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          إضافة شريك جديد
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <motion.div
              key={partner._id}
              layout
              className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center relative group hover:shadow-lg transition-all"
            >
              <div className="relative w-full aspect-square group-hover:scale-110 transition-all">
                <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
              </div>
              <p className="mt-4 text-xs font-bold text-slate-900 text-center">{partner.name}</p>
              
              <button 
                onClick={() => deletePartner(partner._id)}
                className="absolute top-2 right-2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
              dir="rtl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900">شريك نجاح جديد</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 mr-4">شعار الشريك</label>
                  <div className="relative aspect-square w-32 mx-auto bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden flex flex-col items-center justify-center group">
                    {formData.logo ? (
                      <>
                        <Image src={formData.logo} alt="Preview" fill className="object-contain p-2" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="bg-white text-slate-900 p-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                            <Upload className="w-4 h-4" />
                            <input type="file" onChange={handleLogoUpload} className="hidden" accept="image/*" />
                          </label>
                        </div>
                      </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                        {uploading ? <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" /> : <Upload className="w-8 h-8 text-slate-200" />}
                        <input type="file" onChange={handleLogoUpload} className="hidden" accept="image/*" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 mr-4">اسم الشريك</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
                    placeholder="مثال: شركة أرامكو السعودية"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading || !formData.logo}
                  className="w-full bg-cyan-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                  إضافة الشريك
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
