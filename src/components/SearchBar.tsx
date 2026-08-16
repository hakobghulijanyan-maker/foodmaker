import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  large?: boolean;
}

export default function SearchBar({ value, onChange, placeholder = 'Search recipes...', onSearch, large = false }: SearchBarProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    } else {
      navigate(`/recipes?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 ${large ? 'h-5 w-5' : 'h-4 w-4'}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input pl-12 ${large ? 'py-4 text-base' : ''}`}
        aria-label="Search recipes"
      />
    </form>
  );
}
