"use client";

import { LocaleProvider } from "@/hooks/useLocale";
import { useEffect, useState } from "react";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState("Tajawal");
  const [primaryColor, setPrimaryColor] = useState("#00AEEF");
  const [textColor, setTextColor] = useState("#f5f5f5");

  useEffect(() => {
    // Fetch settings to get the font and color
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.data.logo) {
          const l = data.data.logo;
          if (l.fontFamily) setFont(l.fontFamily);
          if (l.primaryColor) setPrimaryColor(l.primaryColor);
          if (l.textColor) setTextColor(l.textColor);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <body 
      className="antialiased bg-[#050505] overflow-x-hidden selection:bg-cyan-500 selection:text-white"
      style={{ 
        fontFamily: `${font}, sans-serif`,
        color: textColor,
        lineHeight: "1.8", // Optimized for Arabic readability
        wordSpacing: "0.05em", // Better spacing between words
      }}
    >
      <LocaleProvider>
        {children}
      </LocaleProvider>
      
      <style jsx global>{`
        ::selection {
          background-color: ${primaryColor};
          color: white;
        }
        .text-cyan-500 { color: ${primaryColor} !important; }
        .bg-cyan-500 { background-color: ${primaryColor} !important; }
        .border-cyan-500 { border-color: ${primaryColor} !important; }
        
        /* Smooth typography for all headings */
        h1, h2, h3, h4, h5, h6 {
          line-height: 1.2 !important;
          margin-bottom: 0.5em !important;
          color: ${textColor} !important;
        }
        p, li, blockquote {
          color: ${textColor} !important;
        }
        
        /* Links should usually stay as primary color or inherit */
        a {
          transition: color 0.3s ease;
        }
        p a {
          color: ${primaryColor};
          text-decoration: underline;
        }
      `}</style>
    </body>
  );
}
