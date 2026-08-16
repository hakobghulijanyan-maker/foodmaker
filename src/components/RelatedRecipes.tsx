import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Recipe } from '@/types/recipe';
import FavoriteButton from './FavoriteButton';

interface RelatedRecipesProps {
  recipes: Recipe[];
}

export default function RelatedRecipes({ recipes }: RelatedRecipesProps) {
  if (recipes.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink-900">You Might Also Like</h2>
          <p className="text-sm text-ink-400 mt-1">Based on this recipe's flavors and category</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
            className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <FavoriteButton recipeId={recipe.id} size="sm" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-display text-sm font-semibold text-ink-900 leading-snug line-clamp-1">
                {recipe.title}
              </h3>
              <div className="mt-1 flex items-center justify-between text-xs text-ink-400">
                <span>{recipe.cookingTime + recipe.prepTime} min</span>
                <span className="inline-flex items-center gap-0.5 text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
