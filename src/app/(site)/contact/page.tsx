"use client";

import { useLocale } from "@/hooks/useLocale";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { t, locale } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data.contact_info);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.address.label"),
      value: locale === "ar" ? (settings?.addressAr || t("contact.address.value")) : (settings?.addressEn || settings?.addressAr || t("contact.address.value")),
    },
    {
      icon: Phone,
      title: t("contact.phone"),
      value: settings?.phone1 ? `${settings.phone1} \n ${settings.phone2 || ""}` : `${t("contact.phone1.value")} \n ${t("contact.phone2.value")}`,
      isLtr: true,
    },
    {
      icon: Mail,
      title: t("contact.email"),
      value: settings?.email || t("contact.email.value"),
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
            {t("contact.title")}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase">
            {t("contact.subtitle")}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-12">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-6 group "
              >
                <div className="text-slate-300 group-hover:text-[#00AEEF] transition-colors duration-500 shrink-0">
                  <item.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{item.title}</h3>
                  <p 
                    className="text-slate-700 text-xl font-light whitespace-pre-line group-hover:text-[#00AEEF] transition-colors" 
                    dir={item.isLtr ? "ltr" : "auto"}
                    style={{ textAlign: item.isLtr && locale === "ar" ? "right" : "start" }}
                  >
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pt-12 border-t border-slate-200"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                {locale === "ar" ? "استفسارات سريعة؟" : "Quick Inquiries?"}
              </h3>
              <a 
                href={`https://wa.me/${String(settings?.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966507655173").replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-4 bg-transparent border border-slate-200 text-slate-900 w-full py-6 rounded-full font-bold uppercase tracking-widest hover:border-[#00AEEF] hover:text-[#00AEEF] transition-colors duration-500 "
              >
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-8 md:p-16 border border-slate-100 shadow-xl rounded-3xl">
              <h3 className="text-3xl font-bold text-slate-900 mb-12 uppercase tracking-tight flex items-center gap-6">
                <div className="w-12 h-[2px] bg-[#00AEEF]" />
                {locale === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("contact.name")}</label>
                    <Input required placeholder={locale === "ar" ? "الاسم" : "Name"} className="bg-transparent border-0 border-b border-slate-200 rounded-none px-0 text-slate-900 focus-visible:ring-0 focus-visible:border-[#00AEEF] transition-colors h-14" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("contact.phone")}</label>
                    <Input required type="tel" placeholder={locale === "ar" ? "رقم الجوال" : "Phone number"} className="bg-transparent border-0 border-b border-slate-200 rounded-none px-0 text-slate-900 focus-visible:ring-0 focus-visible:border-[#00AEEF] transition-colors h-14 text-end" dir="ltr" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("contact.email")}</label>
                  <Input required type="email" placeholder="email@example.com" className="bg-transparent border-0 border-b border-slate-200 rounded-none px-0 text-slate-900 focus-visible:ring-0 focus-visible:border-[#00AEEF] transition-colors h-14 text-end" dir="ltr" />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("contact.message")}</label>
                  <Textarea 
                    required 
                    placeholder={locale === "ar" ? "الرسالة" : "Message"} 
                    className="min-h-[150px] bg-transparent border-0 border-b border-slate-200 rounded-none px-0 text-slate-900 focus-visible:ring-0 focus-visible:border-[#00AEEF] transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#00AEEF] hover:bg-[#008FBF] text-white font-bold py-6 rounded-2xl uppercase tracking-widest transition-colors duration-500  flex justify-center items-center gap-4 shadow-lg shadow-cyan-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-4">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("common.loading")}
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6" />
                      {locale === "ar" ? "تم الإرسال بنجاح!" : "Sent Successfully!"}
                    </span>
                  ) : (
                    <span className="flex items-center gap-4">
                      <Send className="w-6 h-6 rtl:rotate-180" />
                      {t("contact.send")}
                    </span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
