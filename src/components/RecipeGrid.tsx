import type { Recipe, RecipeMatch } from '@/types/recipe';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  matches?: Map<string, RecipeMatch>;
  onRemoveFavorite?: (id: string) => void;
}

export default function RecipeGrid({ recipes, matches, onRemoveFavorite }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          match={matches?.get(recipe.id)}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
    </div>
  );
}
