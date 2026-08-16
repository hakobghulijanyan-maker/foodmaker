import { X } from 'lucide-react';

interface IngredientChipProps {
  label: string;
  onRemove: (label: string) => void;
}

export default function IngredientChip({ label, onRemove }: IngredientChipProps) {
  return (
    <span className="chip bg-primary-50 text-primary-700 border border-primary-100 animate-fade-in">
      {label}
      <button
        type="button"
        onClick={() => onRemove(label)}
        className="flex h-4 w-4 items-center justify-center rounded-full text-primary-500 hover:bg-primary-200 hover:text-primary-800 transition-colors"
        aria-label={`Remove ${label}`}
      >
        <X className="h-3 w-3" strokeWidth={2.5} />
      </button>
    </span>
  );
}
