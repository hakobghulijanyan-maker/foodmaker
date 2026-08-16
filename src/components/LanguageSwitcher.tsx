import { useState, useRef, useEffect } from 'react';
import { Check, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/locales/types';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const options: { value: Language; label: string; short: string }[] = [
    { value: 'en', label: 'English', short: t.language.english },
    { value: 'hy', label: 'Հայերեն', short: t.language.armenian },
  ];

  const current = options.find((o) => o.value === language)!;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-ink-100 bg-white px-3 py-2 text-sm font-semibold text-ink-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        aria-label={t.language.label}
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 text-ink-400" />
        <span className="hidden sm:inline">{current.short}</span>
        <span className="sm:hidden">{current.short}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-ink-100 bg-white p-1.5 shadow-lift animate-fade-in z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setLanguage(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                language === opt.value
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-ink-600 hover:bg-cream-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="font-bold text-xs w-6">{opt.short}</span>
                {opt.label}
              </span>
              {language === opt.value && <Check className="h-4 w-4 text-primary-600" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
