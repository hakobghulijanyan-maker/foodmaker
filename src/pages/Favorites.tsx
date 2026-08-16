import { useNavigate } from 'react-router-dom';
import RecipeGrid from '@/components/RecipeGrid';
import EmptyState from '@/components/EmptyState';
import { useFavorites } from '@/hooks/useFavorites';
import { recipes } from '@/data/recipes';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const saved = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="section py-8 lg:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">
          Your Favorite Recipes
        </h1>
        <p className="mt-2 text-ink-500 max-w-xl mx-auto">
          {saved.length > 0
            ? `You have ${saved.length} saved recipe${saved.length !== 1 ? 's' : ''}. They'll be here whenever you need them.`
            : 'Save recipes you love and find them here anytime.'}
        </p>
      </div>

      {saved.length === 0 ? (
        <EmptyState
          icon="heart"
          title="Your kitchen is waiting."
          description="Save recipes you love and find them here anytime."
          actionLabel="Discover Recipes"
          onAction={() => navigate('/recipes')}
        />
      ) : (
        <RecipeGrid recipes={saved} onRemoveFavorite={toggleFavorite} />
      )}
    </div>
  );
}
