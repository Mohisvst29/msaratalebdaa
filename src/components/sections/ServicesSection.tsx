"use client";

import { useLocale } from "@/hooks/useLocale";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
}

interface ServicesSectionProps {
  bgImage?: string;
}

export default function ServicesSection({ bgImage }: ServicesSectionProps) {
  const { t, dir, locale, dynamic } = useLocale();
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success) setServices(data.data);
      } catch (err) {
        console.error("Error fetching services data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="py-24 bg-white flex justify-center">
      <Loader2 className="w-10 h-10 text-[#00AEEF] animate-spin" />
    </div>
  );

  if (services.length === 0) return null;

  const isVideo = bgImage && (bgImage.includes("/video/upload/") || bgImage.endsWith(".mp4"));

  return (
    <section className="py-16 md:py-32 relative overflow-hidden bg-white">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video 
            src={bgImage} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-10" 
          />
        ) : bgImage ? (
          <Image 
            src={bgImage} 
            alt="Background" 
            fill 
            className="object-cover opacity-10" 
          />
        ) : (
          <div className="absolute inset-0 bg-white" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
          <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm mb-3 md:mb-6 block">
            {dynamic("headers", locale === "ar" ? "services_title" : "services_titleEn", "services.title")}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight max-w-4xl mx-auto">
            {dynamic("headers", locale === "ar" ? "services_subtitle" : "services_subtitleEn", "services.subtitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-start">
          {/* Accordion List */}
          <div className="flex flex-col gap-0 border-t border-slate-100 backdrop-blur-md bg-white/50 rounded-3xl overflow-hidden shadow-sm">
            {services.map((service, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={service._id} 
                  className={`border-b border-slate-100 transition-colors duration-500 overflow-hidden ${isOpen ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                >
                  <button
                    onClick={() => setOpenIndex(index)}
                    className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex items-center justify-between focus:outline-none "
                    dir={dir}
                  >
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className={`text-sm font-light tracking-widest ${isOpen ? 'text-[#00AEEF]' : 'text-slate-300'}`}>
                        0{index + 1}
                      </span>
                      <span className={`text-xl md:text-3xl font-bold uppercase tracking-tight transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-400'}`}>
                        {locale === "ar" ? service.title : service.titleEn}
                      </span>
                    </div>
                    <div className={`text-3xl md:text-4xl font-light transition-transform duration-500 ${isOpen ? 'rotate-45 text-[#00AEEF]' : 'text-slate-300'}`}>
                      +
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 md:px-8 md:pb-10 text-slate-500 text-base md:text-lg leading-relaxed font-light">
                          <div className="lg:hidden relative aspect-video w-full mb-6 rounded-2xl overflow-hidden">
                            <Image src={service.image || "/images/hero-bg.png"} alt={service.title} fill className="object-cover" />
                          </div>
                          {locale === "ar" ? service.description : service.descriptionEn}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Dynamic Image Display */}
          <div className="hidden lg:block relative h-[600px] xl:h-[700px] w-full overflow-hidden rounded-3xl border border-slate-100 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={services[openIndex].image || "/images/hero-bg.png"}
                  alt={locale === "ar" ? services[openIndex].title : services[openIndex].titleEn}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
