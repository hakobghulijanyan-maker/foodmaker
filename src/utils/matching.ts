import type { Recipe, RecipeMatch, Filters, SortOption } from '@/types/recipe';

export function calculateMatch(userIngredients: string[], recipe: Recipe): RecipeMatch {
  const normalizedUser = userIngredients.map((i) => i.toLowerCase().trim()).filter(Boolean);
  const recipeIngredientNames = recipe.ingredients.map((i) => i.name.toLowerCase().trim());

  const matched = recipeIngredientNames.filter((ri) =>
    normalizedUser.some((ui) => ri.includes(ui) || ui.includes(ri))
  );

  const matchedCount = matched.length;
  const totalCount = recipeIngredientNames.length;
  const matchPercentage =
    totalCount === 0 ? 0 : Math.round((matchedCount / totalCount) * 100);

  const missing = recipe.ingredients
    .filter((i) => !matched.includes(i.name.toLowerCase().trim()))
    .map((i) => i.name);

  return {
    recipe,
    matchPercentage,
    matchedIngredients: matchedCount,
    totalIngredients: totalCount,
    missingIngredients: missing,
  };
}

export function rankRecipes(userIngredients: string[], recipeList: Recipe[]): RecipeMatch[] {
  if (userIngredients.length === 0) {
    return recipeList.map((recipe) => ({
      recipe,
      matchPercentage: 0,
      matchedIngredients: 0,
      totalIngredients: recipe.ingredients.length,
      missingIngredients: recipe.ingredients.map((i) => i.name),
    }));
  }

  return recipeList
    .map((recipe) => calculateMatch(userIngredients, recipe))
    .filter((match) => match.matchPercentage > 0)
    .sort((a, b) => {
      if (b.matchPercentage !== a.matchPercentage) return b.matchPercentage - a.matchPercentage;
      return b.recipe.rating - a.recipe.rating;
    });
}

export function matchesFilters(recipe: Recipe, filters: Filters, search: string): boolean {
  if (search.trim()) {
    const q = search.toLowerCase().trim();
    const inTitle = recipe.title.toLowerCase().includes(q);
    const inCategory = recipe.category.toLowerCase().includes(q);
    const inIngredients = recipe.ingredients.some((i) =>
      i.name.toLowerCase().includes(q)
    );
    if (!inTitle && !inCategory && !inIngredients) return false;
  }

  if (filters.mealType && recipe.mealType !== filters.mealType) return false;

  if (filters.dietaryTags.length > 0) {
    const hasAll = filters.dietaryTags.every((tag) => recipe.dietaryTags.includes(tag));
    if (!hasAll) return false;
  }

  if (filters.cookingTime) {
    const time = recipe.cookingTime + recipe.prepTime;
    switch (filters.cookingTime) {
      case 'under-15':
        if (time >= 15) return false;
        break;
      case '15-30':
        if (time < 15 || time > 30) return false;
        break;
      case '30-60':
        if (time < 30 || time > 60) return false;
        break;
      case '60-plus':
        if (time < 60) return false;
        break;
    }
  }

  if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;

  if (filters.maxCalories !== null && recipe.calories > filters.maxCalories) return false;

  return true;
}

export function sortRecipes(recipeList: Recipe[], sort: SortOption): Recipe[] {
  const sorted = [...recipeList];
  switch (sort) {
    case 'highest-rated':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'quickest':
      return sorted.sort((a, b) => a.cookingTime + a.prepTime - (b.cookingTime + b.prepTime));
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'popular':
    default:
      return sorted.sort((a, b) => b.reviews - a.reviews);
  }
}

export const popularIngredients = [
  'Chicken',
  'Pasta',
  'Rice',
  'Eggs',
  'Tomato',
  'Potato',
  'Cheese',
  'Avocado',
];
