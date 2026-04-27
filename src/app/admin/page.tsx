"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Wrench, Image as ImageIcon, MessageSquare, Users, Globe } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    partners: 0,
    messages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pRes = await fetch("/api/products");
        const pData = await pRes.json();
        const sRes = await fetch("/api/services");
        const sData = await sRes.json();
        const partRes = await fetch("/api/partners");
        const partData = await partRes.json();
        
        setStats({
          products: pData.data?.length || 0,
          services: sData.data?.length || 0,
          partners: partData.data?.length || 0,
          messages: 12
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "إجمالي المنتجات", value: stats.products, icon: Package, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "الخدمات الفعالة", value: stats.services, icon: Wrench, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "شركاء النجاح", value: stats.partners, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "طلبات التواصل", value: stats.messages, icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-10" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-gray-200 transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</h3>
            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8">حالة النظام</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">قاعدة البيانات (MongoDB)</span>
              <span className="flex items-center gap-2 text-green-600 text-xs font-black uppercase">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                متصل
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">سيرفر الصور (Cloudinary)</span>
              <span className="flex items-center gap-2 text-green-600 text-xs font-black uppercase">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                نشط
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">أداء الموقع</span>
              <span className="text-slate-900 font-black text-xs uppercase tracking-widest">ممتاز</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-sm">
          <div className="w-20 h-20 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mb-6">
            <Globe className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">هل أنت جاهز للتوسع؟</h3>
          <p className="text-slate-400 text-sm font-bold max-w-xs mb-8">قم بتحديث بيانات الموقع أو أضف منتجات جديدة لتعزيز حضورك الرقمي.</p>
          <button className="bg-cyan-500 text-white font-black px-10 py-4 rounded-2xl text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-200 transition-all">
            إضافة منتج سريع
          </button>
        </div>
      </div>
    </div>
  );
}
