interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
}

export default function GenreFilter({ genres, selectedGenre, onSelect }: GenreFilterProps) {
  return (
    <div className="px-4 md:px-12 pb-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-30">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          className={`whitespace-nowrap px-5 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
            selectedGenre === genre
              ? 'bg-white text-black'
              : 'bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
