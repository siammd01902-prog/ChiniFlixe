import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { useRef, useState } from 'react';

interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
}

interface RowProps {
  title: string;
  movies: Movie[];
  myListIds: string[];
  onToggleMyList: (id: string) => void;
  onPlay: (url: string, playlist?: string[], startIndex?: number) => void;
}

export default function Row({ title, movies, myListIds, onToggleMyList, onPlay }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
        
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="px-4 md:px-12 py-2 space-y-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center group cursor-pointer text-white">
        {title}
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs md:text-sm text-[#54b9c5]">Explore All &gt;</span>
      </h3>
      
      <div className="relative group">
        <button 
          className={`absolute left-0 top-0 bottom-0 w-12 bg-black/50 z-40 flex items-center justify-center hover:bg-black/70 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => handleScroll('left')}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        
        <div 
          ref={rowRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4"
        >
          {movies.map((movie) => {
            const isInList = myListIds.includes(movie.id);
            return (
              <div 
                key={movie.id}
                className="relative flex-none w-[160px] md:w-[240px] aspect-video rounded bg-zinc-800 overflow-hidden cursor-pointer border border-white/10 transition-all duration-300 hover:scale-110 hover:z-30 hover:shadow-xl group/card"
                onClick={() => {
                  if (movie.videoUrl) {
                    const playlist = movies.map(m => m.videoUrl).filter((url): url is string => !!url);
                    const index = playlist.indexOf(movie.videoUrl);
                    onPlay(movie.videoUrl, playlist, index !== -1 ? index : 0);
                  }
                }}
              >
                <img 
                  src={movie.thumbnail} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs md:text-sm font-bold text-white drop-shadow-md">
                  {movie.title}
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity z-20">
                  <button 
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/60 border border-white/50 flex items-center justify-center hover:border-white hover:bg-black/80 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMyList(movie.id);
                    }}
                    title={isInList ? "Remove from My List" : "Add to My List"}
                  >
                    {isInList ? <Check className="w-4 h-4 md:w-5 md:h-5 text-white" /> : <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          className={`absolute right-0 top-0 bottom-0 w-12 bg-black/50 z-40 flex items-center justify-center hover:bg-black/70 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => handleScroll('right')}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
