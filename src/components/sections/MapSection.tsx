"use client";

import { useLocale } from "@/hooks/useLocale";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function MapSection() {
  const { locale, settings } = useLocale();
  const mapUrl = settings?.contact_info?.mapUrl;

  if (!mapUrl) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-cyan-50 text-[#00AEEF] rounded-2xl flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            {locale === "ar" ? "موقعنا" : "Our Location"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            {locale === "ar" ? "تفضل بزيارتنا في المقر الرئيسي" : "Visit Us at Our Headquarters"}
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
        >
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          
          {/* Decorative Overlay */}
          <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10 rounded-[3rem]"></div>
        </motion.div>
      </div>
    </section>
  );
}
