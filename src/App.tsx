import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Row from './components/Row';
import VideoModal from './components/VideoModal';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import GenreFilter from './components/GenreFilter';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { featuredMovie, trendingMovies, actionMovies, comedyMovies, horrorMovies, sciFiMovies } from './data/movies';
import { Plus, Check } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<{ urls: string[], index: number } | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [activeTab, setActiveTab] = useState('home');
  const genres = ['All', 'Action', 'Sci-Fi', 'Comedy', 'Horror'];
  const [myListIds, setMyListIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('myList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myListIds));
  }, [myListIds]);

  const toggleMyList = (id: string) => {
    setMyListIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handlePlay = (url: string, playlist?: string[], startIndex?: number) => {
    setPlayingVideoUrl(url);
    if (playlist && startIndex !== undefined) {
      setCurrentPlaylist({ urls: playlist, index: startIndex });
    } else {
      setCurrentPlaylist(null);
    }
  };

  const handleVideoEnded = () => {
    if (currentPlaylist) {
      const nextIndex = currentPlaylist.index + 1;
      if (nextIndex < currentPlaylist.urls.length) {
        const nextUrl = currentPlaylist.urls[nextIndex];
        setPlayingVideoUrl(nextUrl);
        setCurrentPlaylist({ urls: currentPlaylist.urls, index: nextIndex });
      } else {
        setPlayingVideoUrl(null);
        setCurrentPlaylist(null);
      }
    } else {
      setPlayingVideoUrl(null);
    }
  };

  // Collect all movies for searching
  const allMoviesMap = new Map();
  [...trendingMovies, ...actionMovies, ...comedyMovies, ...horrorMovies, ...sciFiMovies].forEach(movie => {
    allMoviesMap.set(movie.id, movie);
  });
  const allMovies = Array.from(allMoviesMap.values());

  const searchResults = searchQuery 
    ? allMovies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const myListMovies = myListIds.map(id => allMoviesMap.get(id)).filter(Boolean);

  if (activeTab === 'login') {
    return <Login onBack={() => setActiveTab('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans overflow-x-hidden selection:bg-[#E50914] selection:text-white flex flex-col">
      <Navbar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      {activeTab === 'home' && (
        !searchQuery ? (
          <>
            <Banner movie={featuredMovie} onPlay={(url) => handlePlay(url, [url], 0)} />
            
            <main className="pb-24 -mt-24 md:-mt-32 relative z-20">
            <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
            
            <div className="space-y-6 md:space-y-10">
              {(selectedGenre === 'All') && myListMovies.length > 0 && (
                <Row title="My List" movies={myListMovies} myListIds={myListIds} onToggleMyList={toggleMyList} onPlay={handlePlay} />
              )}
              {(selectedGenre === 'All') && (
                <Row title="Trending Now" movies={trendingMovies} myListIds={myListIds} onToggleMyList={toggleMyList} onPlay={handlePlay} />
              )}
              {(selectedGenre === 'All' || selectedGenre === 'Action') && (
                <Row title="Action & Adventure" movies={actionMovies} myListIds={myListIds} onToggleMyList={toggleMyList} onPlay={handlePlay} />
              )}
              {(selectedGenre === 'All' || selectedGenre === 'Sci-Fi') && (
                <Row title="Sci-Fi & Fantasy" movies={sciFiMovies} myListIds={myListIds} onToggleMyList={toggleMyList} onPlay={handlePlay} />
              )}
              {(selectedGenre === 'All' || selectedGenre === 'Comedy') && (
                <Row title="Comedies" movies={comedyMovies} myListIds={myListIds} onToggleMyList={toggleMyList} onPlay={handlePlay} />
              )}
              {(selectedGenre === 'All' || selectedGenre === 'Horror') && (
                <Row title="Horror" movies={horrorMovies} myListIds={myListIds} onToggleMyList={toggleMyList} onPlay={handlePlay} />
              )}
            </div>
          </main>
        </>
      ) : (
        <main className="pt-28 px-4 md:px-12 pb-24 relative z-20 min-h-screen">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-400">
            Search results for "{searchQuery}"
          </h3>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
              {searchResults.map(movie => {
                const isInList = myListIds.includes(movie.id);
                return (
                  <div 
                    key={movie.id}
                    className="relative aspect-video rounded bg-zinc-800 overflow-hidden cursor-pointer border border-white/10 transition-all duration-300 hover:scale-110 hover:z-30 hover:shadow-xl group/card"
                    onClick={() => {
                      if (movie.videoUrl) {
                        const playlist = searchResults.map(m => m.videoUrl).filter((url): url is string => !!url);
                        const index = playlist.indexOf(movie.videoUrl);
                        handlePlay(movie.videoUrl, playlist, index !== -1 ? index : 0);
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
                          toggleMyList(movie.id);
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
          ) : (
             <div className="flex flex-col items-center justify-center pt-20 text-gray-400">
              <p className="text-xl text-center">Your search for "{searchQuery}" did not have any matches.</p>
              <div className="mt-8">
                <p className="text-sm mb-2">Suggestions:</p>
                <ul className="list-disc text-sm ml-6 space-y-1">
                  <li>Try different keywords</li>
                  <li>Looking for a movie or TV show?</li>
                  <li>Try using a movie, TV show title, an actor or director</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      ))}

      {activeTab === 'ondemand' && (
        <main className="flex-1 flex flex-col items-center justify-center pt-24 px-4 pb-24 text-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">On Demand Content</h2>
          <p className="text-gray-400">Premium movies and events available on demand will appear here.</p>
        </main>
      )}

      {activeTab === 'shows' && (
        <main className="flex-1 flex flex-col items-center justify-center pt-24 px-4 pb-24 text-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
          <p className="text-gray-400">Your favorite television series and episodes will appear here.</p>
        </main>
      )}

      {activeTab === 'discover' && (
        <main className="flex-1 flex flex-col items-center justify-center pt-24 px-4 pb-24 text-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Discover</h2>
          <p className="text-gray-400">Explore new genres, curated collections, and personalized recommendations.</p>
        </main>
      )}

      {activeTab === 'movies' && (
        <main className="flex-1 flex flex-col items-center justify-center pt-24 px-4 pb-24 text-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Movies</h2>
          <p className="text-gray-400">Discover top-rated blockbusters, indie gems, and classic films.</p>
        </main>
      )}

      {activeTab === 'new' && (
        <main className="flex-1 flex flex-col items-center justify-center pt-24 px-4 pb-24 text-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">New & Popular</h2>
          <p className="text-gray-400">See what's trending and recently added to Cinenest.</p>
        </main>
      )}

      {activeTab === 'mylist' && (
        <main className="flex-1 flex flex-col pt-24 px-4 md:px-12 pb-24 min-h-screen">
          <h2 className="text-2xl font-bold mb-6">My List</h2>
          {myListMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myListMovies.map(movie => (
                <div 
                  key={movie.id}
                  className="relative aspect-video rounded bg-zinc-800 overflow-hidden cursor-pointer border border-white/10 transition-all duration-300 hover:scale-110 hover:z-30 hover:shadow-xl group/card"
                  onClick={() => {
                    if (movie.videoUrl) {
                      const playlist = myListMovies.map(m => m.videoUrl).filter((url): url is string => !!url);
                      const index = playlist.indexOf(movie.videoUrl);
                      handlePlay(movie.videoUrl, playlist, index !== -1 ? index : 0);
                    }
                  }}
                >
                  <img 
                    src={movie.thumbnail} 
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-2 md:p-3">
                    <p className="font-bold text-xs md:text-sm truncate">{movie.title}</p>
                    <div className="flex items-center gap-2 mt-1 md:mt-2 text-[10px] md:text-xs text-gray-300">
                      <span className="text-green-500 font-medium">{movie.match} Match</span>
                      <span className="border border-gray-500 px-1">{movie.ageRating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-gray-400">You haven't added anything to your list yet.</p>
            </div>
          )}
        </main>
      )}

      {playingVideoUrl && (
        <VideoModal 
          videoUrl={playingVideoUrl} 
          onClose={() => {
            setPlayingVideoUrl(null);
            setCurrentPlaylist(null);
          }} 
          onEnded={handleVideoEnded}
        />
      )}
      <Footer />
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
