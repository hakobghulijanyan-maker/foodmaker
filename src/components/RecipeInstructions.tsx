import { useState } from 'react';
import { Check } from 'lucide-react';
import type { InstructionStep } from '@/types/recipe';

interface RecipeInstructionsProps {
  steps: InstructionStep[];
}

export default function RecipeInstructions({ steps }: RecipeInstructionsProps) {
  const [done, setDone] = useState<Set<number>>(new Set());

  const toggle = (n: number) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  return (
    <div className="card p-6">
      <h3 className="font-display text-lg font-semibold text-ink-900">Instructions</h3>
      <p className="text-sm text-ink-400 mt-0.5">{steps.length} steps · tap to check off</p>

      <ol className="mt-6 space-y-1">
        {steps.map((s) => {
          const checked = done.has(s.step);
          return (
            <li key={s.step}>
              <button
                type="button"
                onClick={() => toggle(s.step)}
                className="flex w-full items-start gap-4 rounded-2xl p-3 text-left transition-colors hover:bg-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    checked
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-50 text-primary-700'
                  }`}
                >
                  {checked ? <Check className="h-4 w-4" strokeWidth={3} /> : s.step}
                </span>
                <div className="flex-1">
                  <h4 className={`font-semibold ${checked ? 'text-ink-400 line-through' : 'text-ink-900'}`}>
                    {s.title}
                  </h4>
                  <p className={`mt-1 text-sm leading-relaxed ${checked ? 'text-ink-300' : 'text-ink-500'}`}>
                    {s.text}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
