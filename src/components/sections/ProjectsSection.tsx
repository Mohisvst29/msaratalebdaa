"use client";

import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  titleEn: string;
  image: string;
  category?: string;
  categoryEn?: string;
}

export default function ProjectsSection() {
  const { t, locale, dynamic, settings } = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        if (data.success) setProjects(data.data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const projectsBg = settings?.projects_bg;

  if (loading) return (
    <div className="py-24 bg-white flex justify-center">
      <Loader2 className="w-10 h-10 text-[#00AEEF] animate-spin" />
    </div>
  );

  if (projects.length === 0) return null;

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-white border-t border-gray-100 overflow-hidden relative">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {projectsBg?.video ? (
          <video 
            src={projectsBg.video} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-10" 
          />
        ) : projectsBg?.image ? (
          <Image 
            src={projectsBg.image} 
            alt="Background" 
            fill 
            className="object-cover opacity-10" 
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-start relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-24">
          <div className="max-w-4xl">
            <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm mb-3 md:mb-6 block">
              {dynamic("headers", locale === "ar" ? "projects_title" : "projects_titleEn", "projects.title")}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-slate-500 leading-relaxed">
              {dynamic("headers", locale === "ar" ? "projects_subtitle" : "projects_subtitleEn", "projects.subtitle")}
            </h2>
          </div>
        </div>

        <motion.div style={{ y }} className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid  group"
            >
              <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-slate-100 transition-all duration-1000">
                <Image
                  src={project.image}
                  alt={locale === "ar" ? project.title : project.titleEn}
                  width={600}
                  height={index % 2 === 0 ? 800 : 500}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply group-hover:bg-transparent transition-colors duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
