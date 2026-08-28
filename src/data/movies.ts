export const featuredMovie = {
  title: "DUNE: PART TWO",
  description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
  bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
  videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
};

const generateMovies = (category: string, count: number = 10) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${category.toLowerCase()}-${i}`,
    title: `${category} Movie ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/${category}${i}/800/450`,
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  }));
};

export const trendingMovies = generateMovies('Trending', 12);
export const actionMovies = generateMovies('Action', 12);
export const comedyMovies = generateMovies('Comedy', 12);
export const horrorMovies = generateMovies('Horror', 12);
export const sciFiMovies = generateMovies('SciFi', 12);
