import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: {
    default: "مسارات الإبداع الرائدة | حلول هندسية وإنشائية متكاملة",
    template: "%s | مسارات الإبداع الرائدة"
  },
  description: "شركة مسارات الإبداع الرائدة للمقاولات - متخصصون في حلول البناء الحديثة، الخرسانة الجاهزة، والمشاريع الإنشائية الكبرى في المملكة العربية السعودية. جودة وإبداع في كل خطوة.",
  keywords: ["مقاولات", "بناء", "خرسانة جاهزة", "هندسة", "المملكة العربية السعودية", "مسارات الإبداع", "مشاريع إنشائية", "Construction", "Concrete", "KSA", "Engineering"],
  authors: [{ name: "Masarat Al Ibdaa" }],
  creator: "Masarat Al Ibdaa",
  publisher: "Masarat Al Ibdaa",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "مسارات الإبداع الرائدة | حلول هندسية وإنشائية متكاملة",
    description: "متخصصون في حلول البناء الحديثة والخرسانة الجاهزة في المملكة العربية السعودية.",
    url: "https://masarat-alibdaa.com",
    siteName: "مسارات الإبداع الرائدة",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "مسارات الإبداع الرائدة",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مسارات الإبداع الرائدة",
    description: "حلول هندسية وإنشائية متكاملة في المملكة العربية السعودية.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#00AEEF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&family=Almarai:wght@300;400;700;800&family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
