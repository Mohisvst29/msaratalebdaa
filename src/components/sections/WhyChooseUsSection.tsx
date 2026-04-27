"use client";

import { useLocale } from "@/hooks/useLocale";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  { key: "credibility", number: "01" },
  { key: "speed_production", number: "02" },
  { key: "quality", number: "03" },
  { key: "speed_delivery", number: "04" },
] as const;

export default function WhyChooseUsSection() {
  const { t, locale, dynamic, settings } = useLocale();
  const whyBg = settings?.why_bg;

  return (
    <section className="py-16 md:py-32 bg-white border-t border-gray-100 overflow-hidden relative">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {whyBg?.video ? (
          <video 
            src={whyBg.video} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-10" 
          />
        ) : whyBg?.image ? (
          <Image 
            src={whyBg.image} 
            alt="Background" 
            fill 
            className="object-cover opacity-10" 
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-32">
          <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm mb-3 md:mb-6 block">
            {dynamic("why_choose_us", locale === "ar" ? "title" : "titleEn", "why.title")}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight uppercase">
            {dynamic("why_choose_us", locale === "ar" ? "subtitle" : "subtitleEn", "why.subtitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group "
            >
              <div className="absolute -top-12 md:-top-16 -left-4 md:-left-8 text-[8rem] md:text-[12rem] font-black text-slate-100 group-hover:text-[#00AEEF]/5 transition-colors duration-700 z-0 pointer-events-none select-none leading-none">
                {feature.number}
              </div>
              
              <div className="relative z-10 text-start pt-12 border-t-2 border-gray-100 group-hover:border-[#00AEEF] transition-colors duration-500">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 uppercase tracking-tight group-hover:text-[#00AEEF] transition-colors duration-500">
                  {dynamic("why_choose_us", locale === "ar" ? feature.key : `${feature.key}En`, `why.${feature.key}` as any)}
                </h3>
                
                <p className="text-slate-500 leading-relaxed font-light text-base md:text-lg max-w-sm">
                  {dynamic("why_choose_us", locale === "ar" ? `${feature.key}Desc` : `${feature.key}DescEn`, `why.${feature.key}.desc` as any)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

