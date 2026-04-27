"use client";

import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { t, locale, dynamic } = useLocale();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data.about);
      });
  }, []);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-32">
          <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
            {t("about.title")}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase">
            {t("about.subtitle")}
          </h1>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className=" group"
          >
            <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-3xl shadow-xl border border-slate-200">
              <Image
                src={settings?.image || "/images/hero-bg.png"}
                alt={t("about.title")}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply group-hover:bg-transparent transition-colors duration-1000" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-6">
              <div className="w-12 h-[2px] bg-[#00AEEF]" />
              {dynamic("about", locale === "ar" ? "story" : "storyEn", "about.story")}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              {dynamic("about", locale === "ar" ? "storyText" : "storyTextEn", "about.story.text")}
            </p>
          </motion.div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-12 border border-slate-100 rounded-3xl shadow-lg flex flex-col items-start hover:border-[#00AEEF] transition-colors duration-500 group "
          >
            <div className="text-slate-200 group-hover:text-[#00AEEF] transition-colors duration-500 mb-8">
              <Eye className="w-16 h-16" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-tight">
              {dynamic("about", locale === "ar" ? "vision" : "visionEn", "about.vision")}
            </h3>
            <p className="text-slate-500 leading-relaxed font-light text-lg">
              {dynamic("about", locale === "ar" ? "visionText" : "visionTextEn", "about.vision.text")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-12 border border-slate-100 rounded-3xl shadow-lg flex flex-col items-start hover:border-[#00AEEF] transition-colors duration-500 group "
          >
            <div className="text-slate-200 group-hover:text-[#00AEEF] transition-colors duration-500 mb-8">
              <Target className="w-16 h-16" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-tight">
              {locale === "ar" ? "لماذا نحن؟" : "Why Us?"}
            </h3>
            <p className="text-slate-500 leading-relaxed font-light text-lg">
              {locale === "ar" 
                ? "نتميز بالمصداقية العالية، سرعة الإنتاج، الجودة الاستثنائية، وسرعة التوريد، مما يجعلنا الخيار الأمثل لمشاريعك." 
                : "We stand out with high credibility, fast production, exceptional quality, and fast delivery, making us the perfect choice for your projects."}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
