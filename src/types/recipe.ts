export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten Free' | 'Dairy Free' | 'High Protein';

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface InstructionStep {
  step: number;
  title: string;
  text: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  cookingTime: number; // minutes
  prepTime: number; // minutes
  difficulty: Difficulty;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  rating: number;
  reviews: number;
  category: string;
  mealType: MealType;
  dietaryTags: DietaryTag[];
  servings: number;
  createdAt: string; // ISO date for "newest" sorting
}

export interface RecipeMatch {
  recipe: Recipe;
  matchPercentage: number;
  matchedIngredients: number;
  totalIngredients: number;
  missingIngredients: string[];
}

export type CookingTimeFilter = 'under-15' | '15-30' | '30-60' | '60-plus';
export type SortOption = 'popular' | 'highest-rated' | 'quickest' | 'newest';

export interface Filters {
  mealType: MealType | null;
  dietaryTags: DietaryTag[];
  cookingTime: CookingTimeFilter | null;
  difficulty: Difficulty | null;
  maxCalories: number | null;
}
