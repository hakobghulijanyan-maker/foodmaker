import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChefHat } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.discover, to: '/recipes' },
    { label: t.nav.generate, to: '/generate' },
    { label: t.nav.favorites, to: '/favorites' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/85 backdrop-blur-md shadow-soft border-b border-ink-100/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="section flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active =
              link.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ink-600 hover:bg-cream-100 hover:text-ink-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/recipes"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-ink-600 hover:bg-cream-100 hover:text-ink-900 transition-colors"
            aria-label={t.nav.searchRecipes}
          >
            <Search className="h-5 w-5" />
          </Link>
          <LanguageSwitcher />
          <Link to="/generate" className="btn-primary hidden sm:inline-flex">
            <ChefHat className="h-4 w-4" />
            {t.nav.getStarted}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-cream-100 transition-colors"
            aria-label={t.nav.toggleMenu}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-cream-50 animate-fade-in">
          <div className="section py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active =
                link.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                    active
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-ink-700 hover:bg-cream-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link to="/generate" className="btn-primary mt-3">
              <ChefHat className="h-4 w-4" />
              {t.nav.getStarted}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
