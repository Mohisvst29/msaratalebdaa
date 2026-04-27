"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-100 rounded-full" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-16 h-16 border-4 border-[#00AEEF] border-t-transparent rounded-full"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-black text-slate-900 tracking-[0.3em] uppercase">
            Masarat
          </h2>
          <div className="flex gap-1">
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-[#00AEEF] rounded-full" 
            />
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-[#00AEEF] rounded-full" 
            />
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-[#00AEEF] rounded-full" 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
