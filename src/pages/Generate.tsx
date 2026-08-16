import { useEffect, useMemo, useState } from 'react';
import { Sparkles, Clock, Flame, Gauge, ChefHat, RotateCcw, Check } from 'lucide-react';
import IngredientInput from '@/components/IngredientInput';
import RecipeCard from '@/components/RecipeCard';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import { useIngredients } from '@/hooks/useIngredients';
import { rankRecipes } from '@/utils/matching';
import { recipes } from '@/data/recipes';
import type { MealType, Difficulty, DietaryTag, CookingTimeFilter, RecipeMatch } from '@/types/recipe';

const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
const dietaryOptions: DietaryTag[] = ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'High Protein'];
const timeOptions: { value: CookingTimeFilter; label: string }[] = [
  { value: 'under-15', label: 'Under 15 min' },
  { value: '15-30', label: '15–30 min' },
  { value: '30-60', label: '30–60 min' },
  { value: '60-plus', label: '60+ min' },
];
const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export default function Generate() {
  const { ingredients, addIngredient, removeIngredient, clearIngredients } = useIngredients();
  const [mealType, setMealType] = useState<MealType | null>(null);
  const [dietary, setDietary] = useState<DietaryTag[]>([]);
  const [cookingTime, setCookingTime] = useState<CookingTimeFilter | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [results, setResults] = useState<RecipeMatch[]>([]);

  const toggleDietary = (tag: DietaryTag) => {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setMealType(null);
    setDietary([]);
    setCookingTime(null);
    setDifficulty(null);
  };

  const handleGenerate = () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      let pool = [...recipes];
      if (mealType) pool = pool.filter((r) => r.mealType === mealType);
      if (dietary.length > 0) pool = pool.filter((r) => dietary.every((d) => r.dietaryTags.includes(d)));
      if (difficulty) pool = pool.filter((r) => r.difficulty === difficulty);
      if (cookingTime) {
        pool = pool.filter((r) => {
          const t = r.cookingTime + r.prepTime;
          switch (cookingTime) {
            case 'under-15': return t < 15;
            case '15-30': return t >= 15 && t <= 30;
            case '30-60': return t > 30 && t <= 60;
            case '60-plus': return t > 60;
          }
        });
      }
      const ranked = rankRecipes(ingredients, pool);
      setResults(ranked);
      setLoading(false);
      setGenerated(true);
    }, 900);
  };

  useEffect(() => {
    if (ingredients.length > 0 && !generated) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchesMap = useMemo(() => {
    const m = new Map<string, RecipeMatch>();
    results.forEach((r) => m.set(r.recipe.id, r));
    return m;
  }, [results]);

  const hasFilters = mealType || dietary.length > 0 || cookingTime || difficulty;

  return (
    <div className="section py-8 lg:py-12">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700">
          <Sparkles className="h-3.5 w-3.5" />
          Recipe Generator
        </span>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-900">
          What can you cook today?
        </h1>
        <p className="mt-2 text-ink-500 max-w-xl mx-auto">
          Enter your ingredients, set your preferences, and we'll match you with recipes you can make right now.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* Left: inputs & filters */}
        <aside className="lg:sticky lg:top-20 lg:self-start space-y-6">
          <div className="card p-5">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">Your Ingredients</h2>
            <IngredientInput
              ingredients={ingredients}
              onAdd={addIngredient}
              onRemove={removeIngredient}
              showSuggestions
            />
            {ingredients.length > 0 && (
              <button
                onClick={clearIngredients}
                className="mt-3 inline-flex items-center gap-1 text-xs text-ink-400 hover:text-accent-600 transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> Clear all
              </button>
            )}
          </div>

          {/* Meal type */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-ink-900 mb-3">Meal Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {mealTypes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMealType(mealType === m ? null : m)}
                  className={`pill justify-center ${
                    mealType === m
                      ? 'border-primary-500 bg-primary-600 text-white'
                      : 'border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-ink-900 mb-3">Dietary Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((d) => {
                const active = dietary.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDietary(d)}
                    className={`pill ${
                      active
                        ? 'border-primary-500 bg-primary-600 text-white'
                        : 'border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cooking time */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-ink-900 mb-3 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-ink-400" /> Cooking Time
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {timeOptions.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setCookingTime(cookingTime === t.value ? null : t.value)}
                  className={`pill justify-center ${
                    cookingTime === t.value
                      ? 'border-primary-500 bg-primary-600 text-white'
                      : 'border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-ink-900 mb-3 flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-ink-400" /> Difficulty
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(difficulty === d ? null : d)}
                  className={`pill justify-center ${
                    difficulty === d
                      ? 'border-primary-500 bg-primary-600 text-white'
                      : 'border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button onClick={resetFilters} className="btn-ghost w-full">
              <RotateCcw className="h-4 w-4" /> Reset filters
            </button>
          )}

          <button
            onClick={handleGenerate}
            disabled={ingredients.length === 0 || loading}
            className="btn-primary w-full text-base py-4"
          >
            {loading ? (
              <>
                <RotateCcw className="h-5 w-5 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" /> Generate Recipes
              </>
            )}
          </button>
        </aside>

        {/* Right: results */}
        <main>
          {loading && <LoadingState />}

          {!loading && !generated && (
            <EmptyState
              icon="default"
              title="Add ingredients to get started"
              description="Type a few ingredients you have on hand, then tap Generate Recipes to see what you can cook."
            />
          )}

          {!loading && generated && results.length === 0 && (
            <EmptyState
              icon="search"
              title="No recipes match your filters"
              description="Try removing some filters or adding more ingredients to broaden your results."
              actionLabel="Reset filters"
              onAction={resetFilters}
            />
          )}

          {!loading && generated && results.length > 0 && (
            <div className="animate-fade-in">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink-900">
                    {results.length} recipe{results.length !== 1 ? 's' : ''} for you
                  </h2>
                  <p className="text-sm text-ink-400 mt-0.5">
                    Sorted by ingredient match
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((match) => (
                  <RecipeCard key={match.recipe.id} recipe={match.recipe} match={match} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
