import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
}

export default function Rating({ rating, reviews, size = 'sm', showCount = true }: RatingProps) {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center gap-1">
      <Star className={`${starSize} fill-accent-400 text-accent-400`} />
      <span className={`${textSize} font-semibold text-ink-800`}>{rating.toFixed(1)}</span>
      {showCount && reviews !== undefined && (
        <span className={`${textSize} text-ink-400`}>({reviews.toLocaleString()})</span>
      )}
    </div>
  );
}
