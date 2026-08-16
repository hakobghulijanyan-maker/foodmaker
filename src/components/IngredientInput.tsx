import { useState, type KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import IngredientChip from './IngredientChip';
import { popularIngredients } from '@/utils/matching';

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  onClear?: () => void;
  placeholder?: string;
  showSuggestions?: boolean;
  onFind?: () => void;
  findLabel?: string;
  compact?: boolean;
}

export default function IngredientInput({
  ingredients,
  onAdd,
  onRemove,
  placeholder = 'What ingredients do you have?',
  showSuggestions = true,
  onFind,
  findLabel = 'Find Recipes',
  compact = false,
}: IngredientInputProps) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    } else if (e.key === 'Backspace' && value === '' && ingredients.length > 0) {
      onRemove(ingredients[ingredients.length - 1]);
    }
  };

  const suggestions = popularIngredients.filter(
    (p) => !ingredients.some((i) => i.toLowerCase() === p.toLowerCase())
  );

  return (
    <div className={`w-full ${compact ? '' : ''}`}>
      <div className="card p-3">
        <div className="flex flex-wrap items-center gap-2">
          {ingredients.map((ing) => (
            <IngredientChip key={ing} label={ing} onRemove={onRemove} />
          ))}
          <div className="flex flex-1 items-center gap-2 min-w-[180px]">
            <Plus className="h-5 w-5 text-ink-300 shrink-0" />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={ingredients.length === 0 ? placeholder : 'Add another...'}
              className="flex-1 bg-transparent text-ink-900 placeholder:text-ink-300 focus:outline-none py-1.5"
              aria-label="Add ingredient"
            />
          </div>
        </div>
      </div>

      {showSuggestions && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-2">
            Popular ingredients
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onAdd(s)}
                className="pill border-ink-100 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
              >
                <Plus className="h-3.5 w-3.5" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {onFind && (
        <button
          type="button"
          onClick={onFind}
          disabled={ingredients.length === 0}
          className="btn-primary mt-5 w-full sm:w-auto"
        >
          {findLabel}
        </button>
      )}
    </div>
  );
}
