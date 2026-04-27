"use client";

import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface ContactCTASectionProps {
  bgImage?: string;
}

export default function ContactCTASection({ bgImage }: ContactCTASectionProps) {
  const { t, dir, locale, dynamic } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const isVideo = bgImage && (bgImage.includes("/video/upload/") || bgImage.endsWith(".mp4"));

  return (
    <section className="py-24 md:py-32 bg-[#00AEEF] relative overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video 
            src={bgImage} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-20" 
          />
        ) : bgImage ? (
          <Image 
            src={bgImage} 
            alt="Background" 
            fill 
            className="object-cover opacity-20" 
          />
        ) : (
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #000 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        )}
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#050505]"
      >
        <span className="font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
          {dynamic("contact_cta", locale === "ar" ? "title" : "titleEn", "contact.title")}
        </span>
        
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-10 leading-tight tracking-tight max-w-4xl mx-auto">
          {dynamic("contact_cta", locale === "ar" ? "ctaTitle" : "ctaTitleEn", "contact.cta.title")}
        </h2>

        <p className="text-lg md:text-xl font-medium mb-16 max-w-2xl mx-auto opacity-80">
          {dynamic("contact_cta", locale === "ar" ? "ctaSubtitle" : "ctaSubtitleEn", "contact.cta.subtitle")}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/contact"
            className="group flex items-center justify-center gap-4 bg-[#050505] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#050505] transition-all duration-300 w-full sm:w-auto "
          >
            <span className="uppercase tracking-widest">{t("hero.cta.quote")}</span>
            <Arrow className="w-5 h-5 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
          </Link>
          
          <a 
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966507655173"}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-4 bg-transparent text-[#050505] border-2 border-[#050505] px-8 py-4 rounded-full font-bold hover:bg-[#050505] hover:text-white transition-all duration-300 w-full sm:w-auto "
          >
            <span className="uppercase tracking-widest">WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
