import { useCallback, useEffect, useState } from 'react';
import { storage } from '@/utils/storage';

export function useIngredients() {
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    setIngredients(storage.getIngredients());
  }, []);

  const addIngredient = useCallback((item: string) => {
    const trimmed = item.trim();
    if (!trimmed) return;
    setIngredients((prev) => {
      if (prev.some((x) => x.toLowerCase() === trimmed.toLowerCase())) return prev;
      const next = [...prev, trimmed];
      storage.setIngredients(next);
      return next;
    });
  }, []);

  const removeIngredient = useCallback((item: string) => {
    setIngredients((prev) => {
      const next = prev.filter((x) => x !== item);
      storage.setIngredients(next);
      return next;
    });
  }, []);

  const clearIngredients = useCallback(() => {
    setIngredients([]);
    storage.setIngredients([]);
  }, []);

  const setAll = useCallback((items: string[]) => {
    const deduped = Array.from(
      new Map(items.map((i) => [i.toLowerCase(), i])).values()
    );
    setIngredients(deduped);
    storage.setIngredients(deduped);
  }, []);

  return {
    ingredients,
    addIngredient,
    removeIngredient,
    clearIngredients,
    setAll,
  };
}
