import { Play, Info } from 'lucide-react';

interface Movie {
  title: string;
  description: string;
  bannerImage: string;
  videoUrl?: string;
}

export default function Banner({ movie, onPlay }: { movie: Movie, onPlay: (url: string) => void }) {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full bg-black flex items-center">
      <div className="absolute inset-0">
        <img 
          src={movie.bannerImage} 
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10" />
      </div>
      
      <div className="relative z-20 max-w-2xl px-4 md:px-12 space-y-6 pt-20">
        <div className="flex items-center space-x-2">
          <div className="bg-red-600 text-[10px] font-bold px-1 py-0.5 rounded text-white">SERIES</div>
          <div className="text-sm font-medium tracking-[0.2em] text-gray-300">A STREAM ORIGINAL</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none text-white drop-shadow-lg">
          {movie.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm font-semibold">
          <span className="text-green-500">98% Match</span>
          <span className="text-gray-400">2024</span>
          <span className="border border-white/40 px-1.5 py-0.5 text-[10px] rounded-sm text-gray-300">18+</span>
          <span className="text-gray-400">2 Seasons</span>
          <span className="border border-white/40 px-1.5 py-0.5 text-[10px] rounded-sm text-gray-300">ULTRA 4K</span>
        </div>
        <p className="text-sm md:text-lg leading-snug text-gray-200 line-clamp-3">
          {movie.description}
        </p>
        <div className="flex items-center space-x-3">
          <button 
            className="flex items-center justify-center gap-2 bg-white text-black px-8 py-2.5 rounded font-bold hover:bg-white/90 transition-colors"
            onClick={() => movie.videoUrl && onPlay(movie.videoUrl)}
          >
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-black" />
            Play
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-500/50 text-white px-8 py-2.5 rounded font-bold backdrop-blur-md hover:bg-gray-500/70 transition-colors">
            <Info className="w-5 h-5 md:w-6 md:h-6" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
