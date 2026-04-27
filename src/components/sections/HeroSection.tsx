"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface HeroSectionProps {
  initialData?: any;
  bgImage?: string;
}

export default function HeroSection({ initialData, bgImage }: HeroSectionProps) {
  const { locale, t, dir, dynamic } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroData, setHeroData] = useState<any>(initialData || null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // If we already have initialData, we don't need to fetch immediately, 
    // but we can refresh it in the background if we want.
    if (!initialData) {
      fetch("/api/settings")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data.hero) {
            setHeroData(data.data.hero);
          }
        });
    }
  }, [initialData]);

  const rawImages = heroData?.images || [];
  const validImages = rawImages.filter((img: string) => img && img.length > 5);
  
  // Logic to use bgImage if no images in heroData
  const displayImages = validImages.length > 0 
    ? validImages 
    : [bgImage || "/images/hero-bg.png"];
  
  const heroImages = displayImages.filter(img => !img.includes("/video/upload/") && !img.endsWith(".mp4"));
  
  // Check for video
  const hasVideo = (heroData?.video && heroData.video.trim().length > 10) || 
                  (bgImage && (bgImage.includes("/video/upload/") || bgImage.endsWith(".mp4")));
  const videoUrl = hasVideo ? (bgImage?.includes("/video/upload/") ? bgImage : heroData?.video) : null;

  useEffect(() => {
    if (hasVideo || heroImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length, hasVideo]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // If heroData is null and no initialData, we can show a placeholder or nothing
  if (!heroData && !initialData) return <div className="h-screen bg-slate-50" />;

  return (
    <section className="relative h-[85vh] md:h-screen min-h-[600px] md:min-h-[800px] w-full overflow-hidden bg-slate-50">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {hasVideo ? (
          <div className="absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              src={videoUrl || ""}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center opacity-80"
            />
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            {heroImages.map((img: string, index: number) => (
              <motion.div
                key={`${img}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={img}
                  alt={`Hero ${index}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center opacity-80"
                  sizes="100vw"
                />
              </motion.div>
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-white/10 opacity-80" />
      </div>

      {/* Massive Background Text Marquee */}
      <div className="absolute top-1/4 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-[0.03] z-0">
        <div className="animate-marquee inline-block">
          <span className="text-[20vw] font-black text-slate-900 leading-none uppercase pr-8">
            {locale === "ar" ? "مسارات الإبداع الرائدة" : "MASARAT AL IBDAA AL RAIDA"}
          </span>
          <span className="text-[20vw] font-black text-slate-900 leading-none uppercase">
            {locale === "ar" ? "مسارات الإبداع الرائدة" : "MASARAT AL IBDAA AL RAIDA"}
          </span>
        </div>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end pb-24 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00AEEF]" />
            <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm">
              {dynamic("hero", locale === "ar" ? "subtitle" : "subtitleEn", "hero.subtitle", heroData)}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 max-w-5xl uppercase">
            {dynamic("hero", locale === "ar" ? "title" : "titleEn", "hero.title", heroData)}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:items-end justify-between max-w-7xl">
            <p className="text-lg md:text-2xl text-slate-600 max-w-xl font-light leading-relaxed">
              {dynamic("hero", locale === "ar" ? "description" : "descriptionEn", "hero.description", heroData)}
            </p>
            
            <div className="flex items-center gap-6">
              {hasVideo && (
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center hover:bg-[#00AEEF] hover:text-white transition-all text-slate-400"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
              )}
              <Link 
                href="/projects"
                className="group flex items-center justify-center w-32 h-32 rounded-full border border-slate-200 hover:border-[#00AEEF] transition-colors duration-500 "
              >
                <div className="text-slate-400 group-hover:text-[#00AEEF] flex flex-col items-center gap-2 transition-colors">
                  <span className="text-xs uppercase tracking-widest">{locale === "ar" ? "اكتشف" : "Explore"}</span>
                  <Arrow className="w-6 h-6 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-500" />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Carousel Indicators */}
        {!hasVideo && heroImages.length > 1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
            {heroImages.map((_: any, i: number) => (
              <button
                key={`indicator-${i}`}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 transition-all duration-500 ${currentSlide === i ? 'w-12 bg-[#00AEEF]' : 'w-6 bg-slate-200'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
