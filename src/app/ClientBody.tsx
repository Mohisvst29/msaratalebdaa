"use client";

import { LocaleProvider } from "@/hooks/useLocale";
import { useEffect, useState } from "react";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState("Tajawal");
  const [primaryColor, setPrimaryColor] = useState("#00AEEF");

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
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <body 
      className="antialiased bg-[#050505] text-[#f5f5f5] overflow-x-hidden selection:bg-cyan-500 selection:text-white"
      style={{ 
        fontFamily: `${font}, sans-serif`,
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
        }
        .text-cyan-500 { color: ${primaryColor} !important; }
        .bg-cyan-500 { background-color: ${primaryColor} !important; }
        .border-cyan-500 { border-color: ${primaryColor} !important; }
        
        /* Smooth typography for all headings */
        h1, h2, h3, h4, h5, h6 {
          line-height: 1.2;
          margin-bottom: 0.5em;
        }
        p {
          margin-bottom: 1.5em;
        }
      `}</style>
    </body>
  );
}
