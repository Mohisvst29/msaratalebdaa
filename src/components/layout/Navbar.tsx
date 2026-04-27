"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { Menu, X, Globe, Building2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Service {
  _id: string;
  title: string;
  titleEn: string;
}

const navLinks = [
  { key: "nav.home" as const, href: "/" },
  { key: "nav.about" as const, href: "/about" },
  { key: "nav.services" as const, href: "/services", hasDropdown: true },
  { key: "nav.products" as const, href: "/products" },
  { key: "nav.projects" as const, href: "/projects" },
  { key: "nav.contact" as const, href: "/contact" },
];

export default function Navbar() {
  const { locale, setLocale, t, dir, settings } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const pathname = usePathname();

  const logoSettings = settings?.logo;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Fetch dynamic services
    fetch("/api/services").then(res => res.json()).then(data => { if (data.success) setServices(data.data); });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === "ar" ? "en" : "ar");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-slate-100 py-3 shadow-sm"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group z-50">
              {logoSettings?.url ? (
                <div className="relative h-20 w-64 md:h-24 md:w-72">
                  <Image 
                    src={logoSettings.url} 
                    alt={logoSettings.companyName || "Logo"} 
                    fill 
                    className="object-contain object-right"
                    priority
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[#00AEEF] transition-colors">
                    <Building2 className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                      {logoSettings?.companyName || (locale === "ar" ? "مسارات الإبداع" : "Masarat")}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#00AEEF] font-bold">
                      {locale === "ar" ? "الرائدة" : "Al Raida"}
                    </span>
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div 
                  key={link.key} 
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.key)}
                  onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-bold tracking-widest uppercase transition-colors hover:text-[#00AEEF] py-4 ${
                      pathname === link.href 
                        ? "text-[#00AEEF]" 
                        : isScrolled ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {t(link.key)}
                    {link.hasDropdown && services.length > 0 && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Desktop Dropdown */}
                  {link.hasDropdown && services.length > 0 && (
                    <AnimatePresence>
                      {activeDropdown === link.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} w-72 bg-white border border-slate-100 rounded-2xl shadow-xl py-4 overflow-hidden`}
                        >
                          {services.map((service) => (
                            <Link
                              key={service._id}
                              href={`/services#${service._id}`}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-6 py-3 text-sm font-bold text-slate-700 hover:text-[#00AEEF] hover:bg-slate-50 transition-colors uppercase tracking-wide"
                            >
                              {locale === "ar" ? service.title : service.titleEn}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={toggleLocale}
                className={`flex items-center gap-2 text-sm font-medium transition-colors px-3 py-2 ${isScrolled ? 'text-slate-900' : 'text-white/80'} hover:text-[#00AEEF]`}
              >
                <Globe className="w-4 h-4" />
                <span>{locale === "ar" ? "EN" : "عربي"}</span>
              </button>

            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 transition-colors ${isOpen || isScrolled ? 'text-slate-900' : 'text-white'}`}
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 pb-8 px-4 flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 mt-4">
              {navLinks.map((link) => (
                <div key={link.key} className="flex flex-col border-b border-slate-50 pb-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => !link.hasDropdown && setIsOpen(false)}
                      className="text-3xl font-black text-slate-900 tracking-tight hover:text-[#00AEEF] transition-colors uppercase"
                    >
                      {t(link.key)}
                    </Link>
                    {link.hasDropdown && services.length > 0 && (
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === link.key ? null : link.key)}
                        className="p-2 text-slate-400"
                      >
                        <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === link.key ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {link.hasDropdown && services.length > 0 && (
                    <AnimatePresence>
                      {activeDropdown === link.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4 pl-4 rtl:pr-4 rtl:pl-0 border-l-2 rtl:border-r-2 rtl:border-l-0 border-[#00AEEF]"
                        >
                          <div className="flex flex-col gap-4 py-2">
                            {services.map((service) => (
                              <Link
                                key={service._id}
                                href={`/services#${service._id}`}
                                onClick={() => setIsOpen(false)}
                                className="text-xl font-bold text-slate-400 hover:text-[#00AEEF] transition-colors uppercase tracking-wide"
                              >
                                {locale === "ar" ? service.title : service.titleEn}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-8 flex flex-col gap-4">
              <button
                onClick={() => {
                  toggleLocale();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-slate-900 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors border border-slate-100"
              >
                <Globe className="w-5 h-5" />
                <span>{locale === "ar" ? "Switch to English" : "التبديل للعربية"}</span>
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
