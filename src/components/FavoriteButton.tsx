import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  recipeId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withLabel?: boolean;
}

export default function FavoriteButton({
  recipeId,
  size = 'md',
  className = '',
  withLabel = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(recipeId);

  const sizes = {
    sm: { btn: 'h-8 w-8', icon: 'h-4 w-4' },
    md: { btn: 'h-10 w-10', icon: 'h-5 w-5' },
    lg: { btn: 'h-12 w-12', icon: 'h-6 w-6' },
  } as const;
  const s = sizes[size];

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(recipeId);
        }}
        className={`btn ${active ? 'btn-accent' : 'btn-secondary'} ${className}`}
        aria-pressed={active}
        aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
      >
        <Heart className={`h-5 w-5 ${active ? 'fill-white' : ''}`} />
        {active ? 'Saved' : 'Save'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
      className={`flex ${s.btn} items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-soft transition-all hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${className}`}
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
    >
      <Heart
        className={`${s.icon} transition-all ${
          active
            ? 'fill-accent-500 text-accent-500 animate-pop'
            : 'text-ink-500'
        }`}
      />
    </button>
  );
}
