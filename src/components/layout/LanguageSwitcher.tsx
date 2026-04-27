"use client";

import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  return (
    <motion.button
      onClick={toggleLocale}
      className="fixed bottom-24 start-6 z-50 w-14 h-14 bg-white border border-slate-200 text-slate-900 rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 group lg:hidden"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Language"
    >
      <Globe className="w-5 h-5 text-[#00AEEF] mb-0.5" />
      <span className="text-[10px] font-black uppercase">
        {locale === "ar" ? "EN" : "AR"}
      </span>
    </motion.button>
  );
}
