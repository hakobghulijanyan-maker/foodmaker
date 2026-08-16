import { Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: 'search' | 'heart' | 'default';
}

export default function EmptyState({ title, description, actionLabel, onAction, icon = 'default' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-100">
        {icon === 'search' && <Search className="h-9 w-9 text-ink-300" />}
        {icon === 'heart' && (
          <svg className="h-9 w-9 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}
        {icon === 'default' && <Search className="h-9 w-9 text-ink-300" />}
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold text-ink-900">{title}</h3>
      {description && <p className="mt-2 max-w-md text-ink-500">{description}</p>}
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="btn-primary mt-6">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
