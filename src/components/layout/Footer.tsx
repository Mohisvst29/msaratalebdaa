"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import { 
  Building2, Mail, Phone, Globe
} from "lucide-react";

// Social Media SVGs
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.218.562-.478.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07s-3.585-.015-4.859-.074c-1.17-.061-1.816-.256-2.237-.421-.569-.218-.967-.478-1.382-.897-.419-.419-.679-.824-.896-1.38-.164-.42-.36-1.065-.413-2.235-.057-1.274-.07-1.649-.07-4.859s.015-3.585.074-4.859c.061-1.17.256-1.816.421-2.237.218-.569.478-.967.897-1.382.419-.419.824-.679 1.38-.896.42-.164 1.065-.36 2.235-.413 1.274-.057 1.649-.07 4.859-.07ZM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.261 2.913-.558.788-.306 1.459-.717 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.277.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.261-2.149-.558-2.913-.306-.789-.717-1.459-1.384-2.126C21.333 1.335 20.665.935 19.874.63c-.765-.296-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.2225 0z"/></svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

export default function Footer() {
  const { locale, t, dir, settings } = useLocale();
  const currentYear = new Date().getFullYear();
  const contactInfo = settings?.contact_info;

  const socialLinks = [
    { id: "instagram", Icon: InstagramIcon },
    { id: "twitter", Icon: TwitterIcon },
    { id: "linkedin", Icon: LinkedinIcon },
    { id: "facebook", Icon: FacebookIcon },
    { id: "youtube", Icon: YoutubeIcon },
  ];

  const logoSettings = settings?.logo;

  return (
    <footer className="bg-white text-slate-900 pt-32 pb-12 relative overflow-hidden border-t border-gray-100" dir={dir}>
      {/* Massive Background Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none select-none opacity-[0.03] z-0">
        <span className="text-[25vw] font-black text-slate-900 leading-none uppercase">
          {locale === "ar" ? "مسارات" : "MASARAT"}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16 md:mb-32">
          {/* Logo & Description */}
          <div className="lg:col-span-1 text-start">
            <Link href="/" className="flex items-center gap-3 mb-6 md:mb-8 group ">
              {logoSettings?.url ? (
                <div className="relative h-12 w-40 md:h-16 md:w-56">
                  <Image 
                    src={logoSettings.url} 
                    alt={logoSettings.companyName || "Logo"} 
                    fill 
                    className="object-contain object-right"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center text-[#00AEEF] transition-colors">
                    <Building2 className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black uppercase tracking-tight text-slate-900 transition-colors">
                      {logoSettings?.companyName || (locale === "ar" ? "مسارات الإبداع" : "Masarat")}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#00AEEF] font-bold mt-1">
                      {locale === "ar" ? "الرائدة" : "Al Raida"}
                    </span>
                  </div>
                </div>
              )}
            </Link>
            <p className="text-slate-500 font-light leading-relaxed text-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-start">
            <h4 className="text-sm font-bold mb-6 md:mb-8 text-slate-900 uppercase tracking-[0.2em]">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3 md:space-y-4">
              {["home", "about", "services", "products", "projects", "contact"].map((key) => (
                <li key={key}>
                  <Link 
                    href={key === "home" ? "/" : `/${key}`}
                    className="text-slate-500 hover:text-[#00AEEF] transition-colors text-sm uppercase tracking-widest font-medium"
                  >
                    {t(`nav.${key}` as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Socials */}
          <div className="lg:col-span-2 text-start">
            <h4 className="text-sm font-bold mb-6 md:mb-8 text-slate-900 uppercase tracking-[0.2em]">{t("footer.contactInfo")}</h4>
            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-[#00AEEF] shrink-0" />
                  <div className="flex flex-col gap-1 text-slate-600 text-sm font-medium" dir="ltr">
                    <span>{contactInfo?.phone1 || t("contact.phone1.value")}</span>
                    <span>{contactInfo?.phone2 || t("contact.phone2.value")}</span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-[#00AEEF] shrink-0" />
                  <span className="text-slate-600 text-sm font-medium">
                    {contactInfo?.email || t("contact.email.value")}
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Globe className="w-6 h-6 text-[#00AEEF] shrink-0" />
                  <span className="text-slate-600 text-sm font-medium" dir="ltr">
                    {contactInfo?.website || t("contact.website.value")}
                  </span>
                </li>
              </ul>

              <div className="space-y-4 md:space-y-6">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("footer.followUs") || "تابعنا على"}</h5>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map(({ id, Icon }) => {
                    const url = contactInfo?.[id];
                    if (!url) return null;
                    return (
                      <a 
                        key={id}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#00AEEF] hover:text-white hover:border-[#00AEEF] transition-all duration-300"
                        title={id}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-light tracking-widest uppercase">
            © {currentYear} MASARAT AL IBDAA AL RAIDA. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
