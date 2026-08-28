import { Search, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange, activeTab, onTabChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (searchQuery === '') {
      setSearchOpen(false);
    }
  };

  const clearSearch = () => {
    onSearchChange('');
    setSearchOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled || searchOpen ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-5">
        <div className="flex items-center gap-8">
          <h1 className="text-[#E50914] font-black text-3xl tracking-tighter cursor-pointer" onClick={clearSearch}>
            CINENEST
          </h1>
          <ul className="hidden md:flex gap-5 text-sm font-light text-gray-200">
            <li 
              className={`cursor-pointer transition ${activeTab === 'home' ? 'font-medium text-white' : 'hover:text-gray-300'}`} 
              onClick={() => { clearSearch(); onTabChange('home'); }}
            >
              Home
            </li>
            <li 
              className={`cursor-pointer transition ${activeTab === 'shows' ? 'font-medium text-white' : 'hover:text-gray-300'}`} 
              onClick={() => { clearSearch(); onTabChange('shows'); }}
            >
              TV Shows
            </li>
            <li 
              className={`cursor-pointer transition ${activeTab === 'movies' ? 'font-medium text-white' : 'hover:text-gray-300'}`} 
              onClick={() => { clearSearch(); onTabChange('movies'); }}
            >
              Movies
            </li>
            <li 
              className={`cursor-pointer transition ${activeTab === 'new' ? 'font-medium text-white' : 'hover:text-gray-300'}`} 
              onClick={() => { clearSearch(); onTabChange('new'); }}
            >
              New & Popular
            </li>
            <li 
              className={`cursor-pointer transition ${activeTab === 'mylist' ? 'font-medium text-white' : 'hover:text-gray-300'}`} 
              onClick={() => { clearSearch(); onTabChange('mylist'); }}
            >
              My List
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5 text-white">
          <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'border border-white/80 bg-black/50' : 'border border-transparent bg-transparent'}`}>
            <Search 
              className={`w-5 h-5 cursor-pointer transition ${searchOpen ? 'mx-2' : 'hover:text-gray-300'}`} 
              onClick={toggleSearch}
            />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onBlur={() => {
                if (searchQuery === '') setSearchOpen(false);
              }}
              placeholder="Titles, people, genres"
              className={`bg-transparent outline-none text-sm text-white transition-all duration-300 ${searchOpen ? 'w-32 md:w-56 py-1 opacity-100' : 'w-0 py-0 opacity-0'}`}
            />
            {searchQuery && (
              <X 
                className="w-4 h-4 mx-2 cursor-pointer text-gray-300 hover:text-white" 
                onClick={clearSearch} 
              />
            )}
          </div>
          <span className="hidden md:block text-sm font-light cursor-pointer hover:text-gray-300 transition">Kids</span>
          <button 
            className="bg-[#E50914] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-red-700 transition"
            onClick={() => onTabChange('login')}
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
