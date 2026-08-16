import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw, Check } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import RecipeGrid from '@/components/RecipeGrid';
import EmptyState from '@/components/EmptyState';
import { recipes } from '@/data/recipes';
import { matchesFilters, sortRecipes } from '@/utils/matching';
import type { MealType, Difficulty, DietaryTag, CookingTimeFilter, SortOption, Filters } from '@/types/recipe';

const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
const dietaryOptions: DietaryTag[] = ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'High Protein'];
const timeOptions: { value: CookingTimeFilter; label: string }[] = [
  { value: 'under-15', label: 'Under 15 min' },
  { value: '15-30', label: '15–30 min' },
  { value: '30-60', label: '30–60 min' },
  { value: '60-plus', label: '60+ min' },
];
const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'highest-rated', label: 'Highest Rated' },
  { value: 'quickest', label: 'Quickest' },
  { value: 'newest', label: 'Newest' },
];

export default function Recipes() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [search, setSearch] = useState(initialQuery);
  const [mealType, setMealType] = useState<MealType | null>(null);
  const [dietary, setDietary] = useState<DietaryTag[]>([]);
  const [cookingTime, setCookingTime] = useState<CookingTimeFilter | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [maxCalories, setMaxCalories] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>('popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '');
  }, [searchParams]);

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
    setMaxCalories(null);
    setSearch('');
  };

  const filters: Filters = { mealType, dietaryTags: dietary, cookingTime, difficulty, maxCalories };

  const filtered = useMemo(() => {
    const result = recipes.filter((r) => matchesFilters(r, filters, search));
    return sortRecipes(result, sort);
  }, [search, mealType, dietary, cookingTime, difficulty, maxCalories, sort]);

  const hasFilters = mealType || dietary.length > 0 || cookingTime || difficulty || maxCalories !== null || search;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Meal type */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Meal Type</h3>
        <div className="flex flex-wrap gap-2">
          {mealTypes.map((m) => (
            <button
              key={m}
              onClick={() => setMealType(mealType === m ? null : m)}
              className={`pill ${mealType === m ? 'border-primary-500 bg-primary-600 text-white' : 'border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Dietary</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((d) => {
            const active = dietary.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDietary(d)}
                className={`pill ${active ? 'border-primary-500 bg-primary-600 text-white' : 'border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50'}`}
              >
                {active && <Check className="h-3.5 w-3.5" />}
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cooking time */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Cooking Time</h3>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => setCookingTime(cookingTime === t.value ? null : t.value)}
              className={`pill ${cookingTime === t.value ? 'border-primary-500 bg-primary-600 text-white' : 'border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(difficulty === d ? null : d)}
              className={`pill ${difficulty === d ? 'border-primary-500 bg-primary-600 text-white' : 'border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Calories */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Max Calories: {maxCalories ?? 'Any'}</h3>
        <input
          type="range"
          min={200}
          max={600}
          step={50}
          value={maxCalories ?? 600}
          onChange={(e) => setMaxCalories(Number(e.target.value) >= 600 ? null : Number(e.target.value))}
          className="w-full accent-primary-600"
          aria-label="Maximum calories"
        />
        <div className="flex justify-between text-xs text-ink-400 mt-1">
          <span>200</span>
          <span>600+</span>
        </div>
      </div>

      {hasFilters && (
        <button onClick={resetFilters} className="btn-ghost w-full">
          <RotateCcw className="h-4 w-4" /> Clear all
        </button>
      )}
    </div>
  );

  return (
    <div className="section py-8 lg:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">
          Discover Your Next Favorite Meal
        </h1>
        <p className="mt-2 text-ink-500 max-w-xl mx-auto">
          Explore delicious recipes for every mood and occasion.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar value={search} onChange={setSearch} large placeholder="Search recipes..." />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="h-4 w-4 text-ink-400" />
                <h2 className="font-display text-lg font-semibold text-ink-900">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </div>
        </aside>

        <main>
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="btn-secondary"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="input py-2 w-auto"
              aria-label="Sort recipes"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Sort + count */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <p className="text-sm text-ink-500">
              <span className="font-semibold text-ink-900">{filtered.length}</span> recipe{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-400">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-ink-100 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 focus:border-primary-400 focus:outline-none"
                aria-label="Sort recipes"
              >
                {sortOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="search"
              title="No recipes found"
              description="Try searching for chicken, pasta, rice, or another ingredient."
              actionLabel="Clear Search"
              onAction={resetFilters}
            />
          ) : (
            <RecipeGrid recipes={filtered} />
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-cream-50 shadow-lift overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-ink-100">
              <h2 className="font-display text-lg font-semibold text-ink-900">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <FilterContent />
            </div>
            <div className="sticky bottom-0 p-5 bg-cream-50 border-t border-ink-100">
              <button onClick={() => setMobileFiltersOpen(false)} className="btn-primary w-full">
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
