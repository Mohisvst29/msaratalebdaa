"use client";

import { useLocale } from "@/hooks/useLocale";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Partner {
  _id: string;
  name: string;
  logo: string;
}

export default function ClientsSection() {
  const { t, locale, dynamic, settings } = useLocale();
  const [partners, setPartners] = useState<Partner[]>([]);
  const clientsBg = settings?.clients_bg;

  useEffect(() => {
    fetch("/api/partners")
      .then(res => res.json())
      .then(data => {
        if (data.success) setPartners(data.data);
      });
  }, []);

  if (partners.length === 0) return null;

  // Duplicate partners to ensure seamless loop if there aren't many
  const doubledPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden relative">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {clientsBg?.video ? (
          <video 
            src={clientsBg.video} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-10" 
          />
        ) : clientsBg?.image ? (
          <Image 
            src={clientsBg.image} 
            alt="Background" 
            fill 
            className="object-cover opacity-10" 
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="text-center">
          <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
            {dynamic("headers", locale === "ar" ? "clients_title" : "clients_titleEn", "clients.title")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#050505] tracking-tight uppercase">
            {dynamic("headers", locale === "ar" ? "clients_subtitle" : "clients_subtitleEn", "clients.subtitle")}
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden z-10">
        <motion.div 
          className="flex gap-12 md:gap-24 items-center whitespace-nowrap py-10 px-6 md:px-12"
          animate={{
            x: dir === "rtl" ? ["50%", "0%"] : ["0%", "-50%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear"
            }
          }}
        >
          {/* Multiply partners to ensure it always fills the width and loops seamlessly */}
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner._id}-${index}`}
              className="relative w-24 h-12 md:w-48 md:h-24 shrink-0 transition-all duration-500 hover:scale-110 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 200px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
