import { useNavigate } from 'react-router-dom';
import { ChefHat, Clock, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ChefHat,
      title: 'Use What You Have',
      text: 'Reduce food waste by discovering recipes from ingredients already available in your kitchen.',
      color: 'text-primary-600',
      bg: 'bg-primary-50',
    },
    {
      icon: Clock,
      title: 'Cook Smarter',
      text: 'Find meals based on time, difficulty and preferences — so you always cook something that fits your day.',
      color: 'text-accent-600',
      bg: 'bg-accent-50',
    },
    {
      icon: Heart,
      title: 'Discover More',
      text: 'Explore new recipes and save your favorites to build a personal collection you can return to.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
  ];

  const steps = [
    { n: 1, title: 'Add your ingredients', text: 'Type in what you already have — from chicken and rice to tomatoes and eggs.' },
    { n: 2, title: 'Set your preferences', text: 'Choose a meal type, dietary needs, cooking time, and difficulty that suit you.' },
    { n: 3, title: 'Get matched recipes', text: 'Our smart algorithm ranks recipes by how many of your ingredients they use.' },
    { n: 4, title: 'Cook and save', text: 'Follow step-by-step instructions and save the ones you love to your favorites.' },
  ];

  return (
    <div className="section py-8 lg:py-12">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto py-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700">
          <Sparkles className="h-3.5 w-3.5" />
          About Chefly
        </span>
        <h1 className="mt-5 font-display text-3xl sm:text-5xl font-semibold leading-tight text-ink-900">
          Cooking should start with what you already have.
        </h1>
        <p className="mt-5 text-lg text-ink-500 leading-relaxed">
          Chefly is a smart recipe generator that helps you turn the ingredients sitting in your kitchen into delicious meals — no fancy shopping trips required.
        </p>
      </section>

      {/* What is Chefly */}
      <section className="py-12">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">
              What is Chefly?
            </h2>
            <p className="mt-4 text-ink-500 leading-relaxed">
              Chefly is a food-tech app built around a simple idea: you rarely need to buy more — you just need to see what's possible. Enter the ingredients you have, and Chefly's matching engine finds recipes you can make right now, ranked by how well they fit your pantry.
            </p>
            <p className="mt-4 text-ink-500 leading-relaxed">
              It's designed for busy weeknights, last-minute lunches, and those moments when you stare into the fridge wondering what to cook. No more food waste, no more guesswork.
            </p>
          </div>
          <div className="card p-8 bg-gradient-to-br from-primary-50/50 to-cream-50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-3xl font-bold text-primary-600">15+</p>
                <p className="text-xs text-ink-400 mt-1">Recipes</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-accent-600">5</p>
                <p className="text-xs text-ink-400 mt-1">Meal types</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-rose-500">∞</p>
                <p className="text-xs text-ink-400 mt-1">Combinations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 text-center">
          How it works
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white font-bold">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-12">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 text-center">
          Why Chefly
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${f.bg} ${f.color}`}>
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="card p-10 sm:p-16 bg-gradient-to-br from-primary-600 to-primary-700">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
            Ready to cook smarter?
          </h2>
          <p className="mt-3 text-primary-100 max-w-md mx-auto">
            Start with what's in your kitchen and discover your next favorite meal.
          </p>
          <button onClick={() => navigate('/generate')} className="btn-accent mt-6 text-base">
            <ChefHat className="h-5 w-5" />
            Start Cooking
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
