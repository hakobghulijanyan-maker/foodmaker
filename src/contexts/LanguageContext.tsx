import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Language, Locale } from '@/locales/types';
import en from '@/locales/en';
import hy from '@/locales/hy';

const locales: Record<Language, Locale> = { en, hy };
const STORAGE_KEY = 'chefly:language';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Locale;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'hy') return stored;
  } catch {
    // ignore
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === 'hy' ? 'hy' : 'en';
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: locales[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
