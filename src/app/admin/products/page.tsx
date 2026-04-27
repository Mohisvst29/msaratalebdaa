"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Upload, Check, Loader2 } from "lucide-react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: string;
  categoryEn: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    description: "",
    descriptionEn: "",
    image: "",
    category: "",
    categoryEn: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) setProducts(data.data);
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
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct ? `/api/products/${editingProduct._id}` : "/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({ name: "", nameEn: "", description: "", descriptionEn: "", image: "", category: "", categoryEn: "" });
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      } else {
        alert("فشل الحذف من قاعدة البيانات");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء محاولة الحذف");
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      nameEn: product.nameEn,
      description: product.description,
      descriptionEn: product.descriptionEn,
      image: product.image,
      category: product.category,
      categoryEn: product.categoryEn,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">مخزون المنتجات</h3>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: "", nameEn: "", description: "", descriptionEn: "", image: "", category: "", categoryEn: "" });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-cyan-500 text-white font-black px-6 py-3 rounded-2xl text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all"
        >
          <Plus className="w-5 h-5" />
          إضافة منتج جديد
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              layout
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="relative aspect-video w-full bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-2 block">{product.category}</span>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">{product.name}</h4>
                <p className="text-slate-400 text-xs font-bold line-clamp-2 mb-6">{product.description}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => openEdit(product)}
                    className="flex-1 bg-gray-50 hover:bg-cyan-500 hover:text-white text-slate-600 p-3 rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
                  >
                    <Edit2 className="w-4 h-4" />
                    تعديل
                  </button>
                  <button 
                    onClick={() => deleteProduct(product._id)}
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
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">صورة المنتج</label>
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
                        {uploading ? (
                          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
                        ) : (
                          <Upload className="w-10 h-10 text-slate-200 mb-4" />
                        )}
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                          {uploading ? "جاري الرفع..." : "اضغط لرفع صورة المنتج"}
                        </span>
                        <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الاسم بالعربية</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
                      placeholder="مثال: مناهل الصرف الصحي"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الاسم بالإنجليزية</label>
                    <input
                      required
                      value={formData.nameEn}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
                      placeholder="Product Name in English"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">التصنيف بالعربية</label>
                    <input
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
                      placeholder="مثال: خرسانة"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">التصنيف بالإنجليزية</label>
                    <input
                      required
                      value={formData.categoryEn}
                      onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors"
                      placeholder="Category in English"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الوصف بالعربية</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[100px]"
                    placeholder="اكتب وصفاً للمنتج..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-4">الوصف بالإنجليزية</label>
                  <textarea
                    required
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-slate-900 focus:border-cyan-500 outline-none transition-colors min-h-[100px]"
                    placeholder="Product Description in English"
                    dir="ltr"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-cyan-500 text-white font-black py-6 rounded-2xl uppercase tracking-widest hover:shadow-xl hover:shadow-cyan-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {editingProduct ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  {editingProduct ? "تحديث المنتج" : "نشر المنتج"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
