import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Generate from '@/pages/Generate';
import Recipes from '@/pages/Recipes';
import RecipeDetails from '@/pages/RecipeDetails';
import Favorites from '@/pages/Favorites';
import About from '@/pages/About';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-cream-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
