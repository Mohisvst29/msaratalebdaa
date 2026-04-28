"use client";

import { LocaleProvider } from "@/hooks/useLocale";
import { useEffect, useState } from "react";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState("Tajawal");
  const [primaryColor, setPrimaryColor] = useState("#00AEEF");
  const [headingColor, setHeadingColor] = useState("#0f172a");
  const [subHeadingColor, setSubHeadingColor] = useState("#64748b");
  const [textColor, setTextColor] = useState("#475569");
  const [mutedColor, setMutedColor] = useState("#94a3b8");
  const [shadowColor, setShadowColor] = useState("transparent");
  const [shadowBlur, setShadowBlur] = useState(0);

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
          if (l.headingColor) setHeadingColor(l.headingColor);
          if (l.subHeadingColor) setSubHeadingColor(l.subHeadingColor);
          if (l.textColor) setTextColor(l.textColor);
          if (l.mutedColor) setMutedColor(l.mutedColor);
          if (l.shadowColor) setShadowColor(l.shadowColor);
          if (l.shadowBlur !== undefined) setShadowBlur(l.shadowBlur);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const textShadowValue = shadowBlur > 0 ? `1px 1px ${shadowBlur}px ${shadowColor}` : 'none';

  return (
    <body 
      className="antialiased bg-white overflow-x-hidden selection:bg-cyan-500 selection:text-white"
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
        
        /* Apply dynamic colors and shadow to headings */
        h1, h2, .text-heading {
          color: ${headingColor} !important;
          text-shadow: ${textShadowValue} !important;
        }
        
        h3, h4, h5, h6, .text-subheading {
          color: ${subHeadingColor} !important;
          text-shadow: ${textShadowValue} !important;
        }
        
        /* Apply dynamic colors and shadow to paragraphs and general text */
        p, li, blockquote, .text-body {
          color: ${textColor} !important;
          text-shadow: ${textShadowValue} !important;
        }
        
        /* Apply dynamic colors to muted/secondary text */
        .text-muted, .text-slate-400, .text-slate-500, .text-gray-400, .text-gray-500 {
          color: ${mutedColor} !important;
        }

        /* Specific overrides for common Tailwind classes used for headings/titles in this project */
        .text-slate-900, .text-gray-900, .text-black {
          color: ${headingColor} !important;
        }
        
        .text-slate-600, .text-slate-700, .text-gray-600 {
          color: ${subHeadingColor} !important;
        }

        /* Exceptions for components that should keep the primary color */
        .text-cyan-500, .text-primary, [class*="text-[#00AEEF]"] {
          color: ${primaryColor} !important;
        }
        
        .bg-cyan-500, .bg-primary, [class*="bg-[#00AEEF]"] {
          background-color: ${primaryColor} !important;
        }
        
        .border-cyan-500, .border-primary, [class*="border-[#00AEEF]"] {
          border-color: ${primaryColor} !important;
        }
        
        /* Smooth typography */
        h1, h2, h3, h4, h5, h6 {
          line-height: 1.2 !important;
          margin-bottom: 0.5em !important;
        }
        
        p {
          margin-bottom: 1.5em !important;
        }
        
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
