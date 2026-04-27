"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { type Locale, defaultLocale, localeDirection, t, type TranslationKey } from "@/lib/i18n";

interface LocaleContextType {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  dynamic: (section: string, key: string, fallbackKey: TranslationKey, overrideData?: any) => string;
  settings: any;
  isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

import LoadingScreen from "@/components/layout/LoadingScreen";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "ar" || saved === "en")) {
      setLocaleState(saved);
    }

    // Fetch site settings
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data);
      })
      .catch(err => console.error("Settings fetch error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDirection[locale];
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const translate = useCallback(
    (key: TranslationKey) => t(locale, key),
    [locale]
  );

  const getDynamic = useCallback(
    (section: string, key: string, fallbackKey: TranslationKey, overrideData?: any) => {
      // Use overrideData if provided (from SSR)
      if (overrideData && overrideData[key]) return overrideData[key];
      
      const value = settings[section]?.[key];
      if (value) return value;
      return t(locale, fallbackKey);
    },
    [settings, locale]
  );

  return (
    <LocaleContext.Provider value={{ 
      locale, 
      dir: localeDirection[locale], 
      setLocale, 
      t: translate, 
      dynamic: getDynamic,
      settings,
      isLoading
    }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
