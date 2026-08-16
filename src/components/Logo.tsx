import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group" aria-label="Chefly home">
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft transition-transform group-hover:scale-105">
        <ChefHat className="h-5 w-5" strokeWidth={2.2} />
      </span>
      {!compact && (
        <span className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          Chefly
        </span>
      )}
    </Link>
  );
}
