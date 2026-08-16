import { Flame, Beef, Wheat, Droplet } from 'lucide-react';
import type { Recipe } from '@/types/recipe';

interface NutritionCardProps {
  recipe: Recipe;
}

export default function NutritionCard({ recipe }: NutritionCardProps) {
  const stats = [
    { label: 'Calories', value: recipe.calories, unit: 'kcal', icon: Flame, color: 'text-accent-500', bg: 'bg-accent-50' },
    { label: 'Protein', value: recipe.protein, unit: 'g', icon: Beef, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Carbs', value: recipe.carbs, unit: 'g', icon: Wheat, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Fat', value: recipe.fat, unit: 'g', icon: Droplet, color: 'text-sky-600', bg: 'bg-sky-50' },
  ];

  const total = recipe.protein + recipe.carbs + recipe.fat || 1;

  return (
    <div className="card p-6">
      <h3 className="font-display text-lg font-semibold text-ink-900">Nutrition Facts</h3>
      <p className="text-sm text-ink-400 mt-0.5">Per serving · {recipe.servings} servings</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-cream-50 p-4 text-center">
            <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="mt-2 text-xl font-bold text-ink-900">{s.value}<span className="text-sm font-medium text-ink-400">{s.unit}</span></p>
            <p className="text-xs text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
          <span>Macros distribution</span>
          <span className="font-medium">{recipe.fiber}g fiber</span>
        </div>
        <div className="flex h-2.5 overflow-hidden rounded-full bg-cream-100">
          <div className="bg-primary-500" style={{ width: `${(recipe.protein / total) * 100}%` }} />
          <div className="bg-amber-400" style={{ width: `${(recipe.carbs / total) * 100}%` }} />
          <div className="bg-sky-400" style={{ width: `${(recipe.fat / total) * 100}%` }} />
        </div>
        <div className="mt-2 flex gap-4 text-xs text-ink-500">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary-500" /> Protein</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Carbs</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-400" /> Fat</span>
        </div>
      </div>
    </div>
  );
}
