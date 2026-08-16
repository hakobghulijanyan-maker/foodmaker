const KEYS = {
  favorites: 'chefly:favorites',
  ingredients: 'chefly:ingredients',
  recentSearches: 'chefly:recent-searches',
  preferences: 'chefly:preferences',
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / serialization errors
  }
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export const storage = {
  getFavorites: (): string[] => read<string[]>(KEYS.favorites, []),
  setFavorites: (ids: string[]): void => write(KEYS.favorites, ids),
  toggleFavorite: (id: string): string[] => {
    const current = read<string[]>(KEYS.favorites, []);
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    write(KEYS.favorites, next);
    return next;
  },
  isFavorite: (id: string): boolean => read<string[]>(KEYS.favorites, []).includes(id),

  getIngredients: (): string[] => read<string[]>(KEYS.ingredients, []),
  setIngredients: (items: string[]): void => write(KEYS.ingredients, items),

  getRecentSearches: (): string[] => read<string[]>(KEYS.recentSearches, []),
  addRecentSearch: (term: string): string[] => {
    const current = read<string[]>(KEYS.recentSearches, []);
    const trimmed = term.trim();
    if (!trimmed) return current;
    const next = [trimmed, ...current.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8);
    write(KEYS.recentSearches, next);
    return next;
  },
  clearRecentSearches: (): void => remove(KEYS.recentSearches),

  getPreferences: (): Record<string, unknown> => read<Record<string, unknown>>(KEYS.preferences, {}),
  setPreferences: (prefs: Record<string, unknown>): void => write(KEYS.preferences, prefs),
};
