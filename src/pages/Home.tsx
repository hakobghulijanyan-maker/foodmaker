import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, Heart, ChefHat, TrendingUp } from 'lucide-react';
import IngredientInput from '@/components/IngredientInput';
import RecipeCard from '@/components/RecipeCard';
import { useIngredients } from '@/hooks/useIngredients';
import { recipes } from '@/data/recipes';

export default function Home() {
  const navigate = useNavigate();
  const { ingredients, addIngredient, removeIngredient, setAll } = useIngredients();

  const handleFind = () => {
    navigate('/generate');
  };

  const popular = [...recipes].sort((a, b) => b.reviews - a.reviews).slice(0, 6);

  const features = [
    { icon: ChefHat, title: 'Use What You Have', text: 'Reduce food waste by discovering recipes from ingredients already in your kitchen.', color: 'text-primary-600', bg: 'bg-primary-50' },
    { icon: Clock, title: 'Cook Smarter', text: 'Find meals based on your time, difficulty, and dietary preferences in seconds.', color: 'text-accent-600', bg: 'bg-accent-50' },
    { icon: Heart, title: 'Discover More', text: 'Explore new recipes and save your favorites to come back to anytime.', color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="section pt-8 pb-12 lg:pt-16 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700">
              <Sparkles className="h-3.5 w-3.5" />
              Smart Recipe Generator
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Turn Your Ingredients Into Delicious Meals
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
              Tell us what's in your kitchen and discover delicious recipes you can make right now.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate('/generate')} className="btn-primary text-base">
                <ChefHat className="h-5 w-5" />
                Create My Recipe
              </button>
              <button onClick={() => navigate('/recipes')} className="btn-secondary text-base">
                Explore Recipes
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-ink-400">
              <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-primary-500" /> {recipes.length}+ recipes</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary-500" /> Under 30 min meals</span>
              <span className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-primary-500" /> Save favorites</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-fade-in">
            <div className="relative grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <img
                  src={recipes[0].image}
                  alt={recipes[0].imageAlt}
                  className="w-full rounded-3xl object-cover aspect-[3/4] shadow-card"
                />
                <img
                  src={recipes[8].image}
                  alt={recipes[8].imageAlt}
                  className="w-full rounded-3xl object-cover aspect-square shadow-card"
                />
              </div>
              <div className="space-y-3 pt-8">
                <img
                  src={recipes[2].image}
                  alt={recipes[2].imageAlt}
                  className="w-full rounded-3xl object-cover aspect-square shadow-card"
                />
                <img
                  src={recipes[12].image}
                  alt={recipes[12].imageAlt}
                  className="w-full rounded-3xl object-cover aspect-[3/4] shadow-card"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">92% Match</p>
                <p className="text-xs text-ink-400">Smart ingredient matching</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick ingredient input */}
      <section className="section py-12">
        <div className="card p-6 sm:p-10 bg-gradient-to-br from-primary-50/60 to-cream-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">
              What's in your kitchen?
            </h2>
            <p className="mt-2 text-ink-500">
              Enter a few ingredients and we'll find recipes you can make right now.
            </p>
          </div>
          <div className="mt-8 max-w-3xl mx-auto">
            <IngredientInput
              ingredients={ingredients}
              onAdd={addIngredient}
              onRemove={removeIngredient}
              onFind={handleFind}
              findLabel="Find Recipes"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section py-12">
        <div className="grid gap-6 md:grid-cols-3">
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

      {/* Popular recipes */}
      <section className="section py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">
              Popular Right Now
            </h2>
            <p className="mt-1 text-ink-500">Most-loved recipes from the Chefly community</p>
          </div>
          <button onClick={() => navigate('/recipes')} className="btn-ghost hidden sm:inline-flex">
            View all
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
