import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Clock, Timer, Gauge, Flame, Users, Star, Check, ShoppingBasket,
} from 'lucide-react';
import { getRecipeById, getRelatedRecipes } from '@/data/recipes';
import FavoriteButton from '@/components/FavoriteButton';
import Rating from '@/components/Rating';
import NutritionCard from '@/components/NutritionCard';
import RecipeInstructions from '@/components/RecipeInstructions';
import RelatedRecipes from '@/components/RelatedRecipes';
import EmptyState from '@/components/EmptyState';

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = id ? getRecipeById(id) : undefined;
  const [checked, setChecked] = useState<Set<number>>(new Set());

  if (!recipe) {
    return (
      <div className="section py-20">
        <EmptyState
          icon="default"
          title="Recipe not found"
          description="The recipe you're looking for doesn't exist or may have been removed."
          actionLabel="Discover Recipes"
          onAction={() => navigate('/recipes')}
        />
      </div>
    );
  }

  const related = getRelatedRecipes(recipe, 4);
  const totalTime = recipe.cookingTime + recipe.prepTime;

  const toggleIngredient = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="section py-8 lg:py-10">
      <Link to="/recipes" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-primary-700 transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to recipes
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-card">
            <img
              src={recipe.image}
              alt={recipe.imageAlt}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-sm font-medium text-ink-700">
                {recipe.category}
              </span>
              <span className="rounded-full bg-primary-600/90 backdrop-blur px-3 py-1.5 text-sm font-medium text-white">
                {recipe.mealType}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-ink-900">
                {recipe.title}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <Rating rating={recipe.rating} reviews={recipe.reviews} size="md" />
              </div>
            </div>
            <FavoriteButton recipeId={recipe.id} size="lg" />
          </div>

          <p className="mt-4 text-ink-500 leading-relaxed">{recipe.description}</p>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { icon: Clock, label: 'Cook', value: `${recipe.cookingTime} min` },
              { icon: Timer, label: 'Prep', value: `${recipe.prepTime} min` },
              { icon: Gauge, label: 'Difficulty', value: recipe.difficulty },
              { icon: Flame, label: 'Calories', value: `${recipe.calories} kcal` },
              { icon: Users, label: 'Servings', value: `${recipe.servings}` },
              { icon: Star, label: 'Rating', value: recipe.rating.toFixed(1) },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-cream-50 p-3">
                <s.icon className="h-4 w-4 text-primary-500" />
                <p className="mt-1.5 text-lg font-bold text-ink-900">{s.value}</p>
                <p className="text-xs text-ink-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Dietary tags */}
          {recipe.dietaryTags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {recipe.dietaryTags.map((tag) => (
                <span key={tag} className="chip bg-primary-50 text-primary-700 border border-primary-100">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <FavoriteButton recipeId={recipe.id} withLabel className="flex-1 sm:flex-none" />
            <a
              href="#instructions"
              className="btn-secondary flex-1 sm:flex-none"
            >
              <ShoppingBasket className="h-5 w-5" />
              Start Cooking
            </a>
          </div>
        </div>
      </div>

      {/* Ingredients + Instructions */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2" id="instructions">
        {/* Ingredients */}
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink-900">Ingredients</h3>
          <p className="text-sm text-ink-400 mt-0.5">
            {recipe.ingredients.length} ingredients · for {recipe.servings} servings
          </p>
          <ul className="mt-5 space-y-1">
            {recipe.ingredients.map((ing, idx) => {
              const isChecked = checked.has(idx);
              return (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => toggleIngredient(idx)}
                    className="flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors hover:bg-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                        isChecked
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-ink-200 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="h-4 w-4" strokeWidth={3} />}
                    </span>
                    <span className="flex-1">
                      <span className={`font-medium ${isChecked ? 'text-ink-400 line-through' : 'text-ink-800'}`}>
                        {ing.name}
                      </span>
                      <span className={`ml-2 text-sm ${isChecked ? 'text-ink-300' : 'text-ink-400'}`}>
                        {ing.quantity}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Instructions */}
        <RecipeInstructions steps={recipe.instructions} />
      </div>

      {/* Nutrition */}
      <div className="mt-6">
        <NutritionCard recipe={recipe} />
      </div>

      {/* Related */}
      <RelatedRecipes recipes={related} />
    </div>
  );
}
