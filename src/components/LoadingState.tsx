import { Loader2, ChefHat } from 'lucide-react';

export default function LoadingState({ message = 'Cooking up recommendations...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50">
          <ChefHat className="h-10 w-10 text-primary-500 animate-pulse" />
        </div>
        <Loader2 className="absolute -bottom-1 -right-1 h-7 w-7 animate-spin text-accent-500" />
      </div>
      <p className="mt-6 font-display text-lg font-semibold text-ink-800">{message}</p>
      <p className="mt-1 text-sm text-ink-400">Analyzing your ingredients and matching recipes</p>
    </div>
  );
}
