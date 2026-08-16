import { Link } from 'react-router-dom';
import { Clock, Flame, Star, ChevronRight } from 'lucide-react';
import type { Recipe, RecipeMatch } from '@/types/recipe';
import FavoriteButton from './FavoriteButton';
import Rating from './Rating';

interface RecipeCardProps {
  recipe: Recipe;
  match?: RecipeMatch;
  onRemoveFavorite?: (id: string) => void;
}

export default function RecipeCard({ recipe, match, onRemoveFavorite }: RecipeCardProps) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="group card overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <FavoriteButton recipeId={recipe.id} />
        </div>
        {match && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-600/95 backdrop-blur px-3 py-1.5 text-sm font-semibold text-white shadow-soft">
              <span className="flex h-2 w-2 rounded-full bg-accent-400" />
              {match.matchPercentage}% Match
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium text-ink-700">
            {recipe.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink-900 leading-snug">
          {recipe.title}
        </h3>
        <p className="mt-1.5 text-sm text-ink-500 line-clamp-2 flex-1">
          {recipe.description}
        </p>

        {match && (
          <p className="mt-2 text-xs font-medium text-primary-600">
            {match.matchedIngredients} of {match.totalIngredients} ingredients available
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {recipe.cookingTime + recipe.prepTime} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" />
            {recipe.calories} kcal
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
            {recipe.rating.toFixed(1)}
          </span>
          <span className="rounded-full bg-cream-100 px-2 py-0.5 text-ink-600 font-medium">
            {recipe.difficulty}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
          <Rating rating={recipe.rating} reviews={recipe.reviews} />
          {onRemoveFavorite ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onRemoveFavorite(recipe.id);
              }}
              className="text-sm font-medium text-ink-400 hover:text-accent-600 transition-colors"
            >
              Remove
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 group-hover:gap-2 transition-all">
              View Recipe
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
