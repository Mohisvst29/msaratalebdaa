"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Upload, Check, Loader2 } from "lucide-react";
import Image from "next/image";

interface Service {
  _id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    image: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success) setServices(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (result.url) {
        setFormData({ ...formData, image: result.url });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingService ? "PUT" : "POST";
    const url = editingService ? `/api/services/${editingService._id}` : "/api/services";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingService(null);
        setFormData({ title: "", titleEn: "", description: "", descriptionEn: "", image: "" });
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchServices();
      } else {
        alert("فشل الحذف");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ");
    }
  };

  const openEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      titleEn: service.titleEn,
      description: service.description,
      descriptionEn: service.descriptionEn,
      image: service.image,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-400">قائمة الخدمات</h3>
        <button
          onClick={() => {
            setEditingService(null);
            setFormData({ title: "", titleEn: "", description: "", descriptionEn: "", image: "" });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-purple-600 text-white font-black px-6 py-3 rounded-2xl text-sm uppercase tracking-widest hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          إضافة خدمة جديدة
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <motion.div
              key={service._id}
              layout
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video md:aspect-square w-full md:w-48 shrink-0 bg-gray-100">
                <Image src={service.image} alt={service.title} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-center">
                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">{service.title}</h4>
                <p className="text-slate-400 text-xs font-bold line-clamp-2 mb-6">{service.description}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => openEdit(service)}
                    className="bg-gray-50 hover:bg-purple-600 hover:text-white text-slate-600 px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
                  >
                    <Edit2 className="w-4 h-4" />
                    تعديل
                  </button>
                  <button 
                    onClick={() => deleteService(service._id)}
                    className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
              className="relative w-full max-w-4xl bg-white rounded-3xl p-8 md:p-12 max-h-[90vh] overflow-y-auto shadow-2xl"
              dir="rtl"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-black text-slate-900">
                  {editingService ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 mr-4">صورة الخدمة</label>
                  <div className="relative aspect-video w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center group">
                    {formData.image ? (
                      <>
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform">
                            تغيير الصورة
                            <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                          </label>
                        </div>
                      </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                        {uploading ? <Loader2 className="w-10 h-10 text-purple-600 animate-spin" /> : <Upload className="w-10 h-10 text-slate-200" />}
                        <span className="text-slate-400 font-bold text-sm">اضغط لرفع الصورة</span>
                        <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 mr-4">العنوان بالعربية</label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-purple-600 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 mr-4">العنوان بالإنجليزية</label>
                    <input
                      required
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-purple-600 outline-none text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 mr-4">الوصف بالعربية</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-purple-600 outline-none min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 mr-4">الوصف بالإنجليزية</label>
                  <textarea
                    required
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-purple-600 outline-none min-h-[100px] text-left"
                    dir="ltr"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-purple-600 text-white font-black py-6 rounded-2xl uppercase tracking-widest hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {editingService ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  {editingService ? "تحديث الخدمة" : "نشر الخدمة"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
