"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { useLocale } from "@/hooks/useLocale";

export default function WhatsAppButton() {
  const { settings } = useLocale();
  const whatsappNumber = String(settings?.contact_info?.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966507655173").replace(/\D/g, "");

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 start-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      {/* Pulse Effect */}
      <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-25" />
    </motion.a>
  );
}
