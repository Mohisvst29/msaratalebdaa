"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = false, light = false }: SectionHeadingProps) {
  const { locale } = useLocale();

  return (
    <div className={cn("mb-20", centered && "text-center")}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "h-[2px] w-16 bg-orange-600 mb-8",
          centered && "mx-auto"
        )}
        style={{ transformOrigin: locale === "ar" ? "right" : "left" }}
      />
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "text-lg sm:text-xl max-w-2xl font-medium leading-relaxed",
            centered && "mx-auto",
            light ? "text-white/60" : "text-slate-500"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
