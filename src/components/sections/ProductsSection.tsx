"use client";

import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingCart, Loader2 } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: string;
  categoryEn: string;
}

interface ProductsSectionProps {
  bgImage?: string;
}

export default function ProductsSection({ bgImage }: ProductsSectionProps) {
  const { locale, t, dir, dynamic, settings } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const whatsappNumber = String(settings?.contact_info?.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966507655173").replace(/\D/g, "");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderProduct = (productName: string) => {
    const message = encodeURIComponent(
      locale === "ar"
        ? `مرحبًا، أرغب في طلب المنتج: ${productName}`
        : `Hello, I would like to order the product: ${productName}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };



  if (loading) return (
    <div className="py-24 bg-white flex justify-center">
      <Loader2 className="w-10 h-10 text-[#00AEEF] animate-spin" />
    </div>
  );

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-32 bg-white border-t border-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {typeof bgImage === "string" && (bgImage.includes("/video/upload/") || bgImage.endsWith(".mp4")) ? (
          <video 
            src={bgImage} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-10" 
          />
        ) : typeof bgImage === "string" ? (
          <Image 
            src={bgImage} 
            alt="Background" 
            fill 
            className="object-cover opacity-10" 
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="max-w-3xl text-start">
            <span className="text-[#00AEEF] font-bold tracking-[0.2em] uppercase text-sm mb-3 md:mb-6 block">
              {dynamic("headers", locale === "ar" ? "products_title" : "products_titleEn", "products.title")}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight uppercase">
              {dynamic("headers", locale === "ar" ? "products_subtitle" : "products_subtitleEn", "products.subtitle")}
            </h2>
          </div>
          <Link 
            href="/products"
            className="group flex items-center gap-4 text-slate-900 hover:text-[#00AEEF] transition-colors w-fit"
          >
            <span className="uppercase tracking-widest text-sm font-bold">{t("products.viewAll")}</span>
            <Arrow className="w-6 h-6 transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col "
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden mb-4 md:mb-8 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                <Image
                  src={product.image || "/images/hero-bg.png"}
                  alt={locale === "ar" ? product.name : product.nameEn || product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col text-start px-1 md:px-2">
                <div className="flex items-center justify-between mb-1 md:mb-4">
                  <span className="text-[#00AEEF] font-light text-sm tracking-widest uppercase">
                    {locale === "ar" ? product.category : product.categoryEn || product.category}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight mb-2 md:mb-4 group-hover:text-[#00AEEF] transition-colors">
                  {locale === "ar" ? product.name : product.nameEn || product.name}
                </h3>
                
                <p className="text-slate-500 font-light text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl">
                  {locale === "ar" ? product.description : product.descriptionEn || product.description}
                </p>

                <button
                  onClick={() => handleOrderProduct(
                    locale === "ar" ? product.name : product.nameEn || product.name
                  )}
                  className="inline-flex items-center gap-4 bg-slate-50 border border-slate-200 text-slate-900 px-6 py-3 md:px-8 md:py-4 w-fit rounded-full font-bold uppercase tracking-widest hover:bg-[#00AEEF] hover:border-[#00AEEF] hover:text-white transition-all duration-300 "
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{t("products.order")}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
