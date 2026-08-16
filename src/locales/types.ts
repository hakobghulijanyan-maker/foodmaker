export type Language = 'en' | 'hy';

export interface Locale {
  // Navigation
  nav: {
    home: string;
    discover: string;
    generate: string;
    favorites: string;
    getStarted: string;
    searchRecipes: string;
    toggleMenu: string;
  };
  // Language switcher
  language: {
    label: string;
    english: string;
    armenian: string;
  };
  // Home page
  home: {
    badge: string;
    heroTitle: string;
    heroSubtitle: string;
    createRecipe: string;
    exploreRecipes: string;
    recipesCount: string;
    under30: string;
    saveFavorites: string;
    matchBadge: string;
    matchBadgeDesc: string;
    kitchenTitle: string;
    kitchenSubtitle: string;
    feature1Title: string;
    feature1Text: string;
    feature2Title: string;
    feature2Text: string;
    feature3Title: string;
    feature3Text: string;
    popularTitle: string;
    popularSubtitle: string;
    viewAll: string;
  };
  // Ingredient input
  ingredientInput: {
    placeholder: string;
    addAnother: string;
    popularIngredients: string;
    findRecipes: string;
    addIngredient: string;
  };
  // Recipe card
  recipeCard: {
    match: string;
    ingredientsAvailable: string;
    min: string;
    kcal: string;
    viewRecipe: string;
    remove: string;
  };
  // Generate page
  generate: {
    badge: string;
    title: string;
    subtitle: string;
    yourIngredients: string;
    clearAll: string;
    mealType: string;
    dietaryPreferences: string;
    cookingTime: string;
    difficulty: string;
    resetFilters: string;
    generateRecipes: string;
    generating: string;
    addIngredientsTitle: string;
    addIngredientsDesc: string;
    noMatchTitle: string;
    noMatchDesc: string;
    resultsForYou: string;
    sortedByMatch: string;
    recipe: string;
    recipes: string;
  };
  // Filter options
  filters: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
    dessert: string;
    vegetarian: string;
    vegan: string;
    glutenFree: string;
    dairyFree: string;
    highProtein: string;
    under15: string;
    time15to30: string;
    time30to60: string;
    time60plus: string;
    easy: string;
    medium: string;
    hard: string;
  };
  // Discover page
  discover: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filters: string;
    recipesFound: string;
    recipeFound: string;
    sortBy: string;
    popular: string;
    highestRated: string;
    quickest: string;
    newest: string;
    noResultsTitle: string;
    noResultsDesc: string;
    clearSearch: string;
    showResults: string;
    maxCalories: string;
    any: string;
  };
  // Recipe details
  recipeDetails: {
    backToRecipes: string;
    cook: string;
    prep: string;
    calories: string;
    servings: string;
    rating: string;
    startCooking: string;
    ingredients: string;
    ingredientsCount: string;
    instructions: string;
    stepsCount: string;
    nutritionFacts: string;
    perServing: string;
    macrosDistribution: string;
    fiber: string;
    protein: string;
    carbs: string;
    fat: string;
    notFoundTitle: string;
    notFoundDesc: string;
    discoverRecipes: string;
    youMightLike: string;
    relatedDesc: string;
    view: string;
  };
  // Favorites
  favorites: {
    title: string;
    hasSaved: string;
    hasSavedPlural: string;
    emptyTitle: string;
    emptyDesc: string;
    discoverRecipes: string;
  };
  // About page
  about: {
    badge: string;
    heroTitle: string;
    heroText: string;
    whatIsTitle: string;
    whatIsText1: string;
    whatIsText2: string;
    recipes: string;
    mealTypes: string;
    combinations: string;
    howItWorks: string;
    step1Title: string;
    step1Text: string;
    step2Title: string;
    step2Text: string;
    step3Title: string;
    step3Text: string;
    step4Title: string;
    step4Text: string;
    whyChefly: string;
    feature1Title: string;
    feature1Text: string;
    feature2Title: string;
    feature2Text: string;
    feature3Title: string;
    feature3Text: string;
    ctaTitle: string;
    ctaText: string;
    startCooking: string;
  };
  // Footer
  footer: {
    description: string;
    explore: string;
    connect: string;
    copyright: string;
    madeWith: string;
  };
  // Loading & empty states
  loading: {
    message: string;
    subtext: string;
  };
  // Favorite button
  favoriteButton: {
    save: string;
    saved: string;
    saveAria: string;
    removeAria: string;
  };
  // Recipe data (titles, descriptions, ingredients, instructions, categories, meal types, dietary tags)
  recipes: Record<string, {
    title: string;
    description: string;
    category: string;
    ingredients: Record<string, string>;
    instructions: { title: string; text: string }[];
  }>;
  // Popular ingredients
  popularIngredients: string[];
  // Categories for search
  categories: Record<string, string>;
}
