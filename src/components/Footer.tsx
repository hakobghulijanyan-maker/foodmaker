import { Link } from 'react-router-dom';
import { ChefHat, Instagram, Twitter, Facebook, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Github, label: 'GitHub' },
];

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.discover, to: '/recipes' },
    { label: t.nav.generate, to: '/generate' },
    { label: t.nav.favorites, to: '/favorites' },
    { label: t.about.badge, to: '/about' },
  ];

  return (
    <footer className="mt-20 border-t border-ink-100 bg-cream-100/60">
      <div className="section py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft">
                <ChefHat className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-ink-900">
                Chefly
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">{t.footer.explore}</h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ink-500 hover:text-primary-700 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">{t.footer.connect}</h4>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-500 shadow-soft hover:text-primary-700 hover:scale-105 transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink-100 pt-6">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="text-xs text-ink-400">
            {t.footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
