import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      // URLs para las peticiones a la API
      const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
      const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;

      try {
        const [popularResponse, topRatedResponse] = await Promise.all([
          axios.get(popularUrl),
          axios.get(topRatedUrl)
        ]);

        setPopularMovies(popularResponse.data.results.slice(0, 12));
        setTopRatedMovies(topRatedResponse.data.results.slice(0, 12));
        
      } catch (error) {
        console.error("Error fetching movies for home page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey]); 

  if (isLoading) {
    return <div className="text-center p-8 text-xl">Loading movies...</div>;
  }

  return (
    <main className="p-4 sm:p-8">
      {/* Aquí irá el slider de películas más adelante */}
      
      <MovieList title="Popular Movies" movies={popularMovies} />
      <MovieList title="Top Rated Movies" movies={topRatedMovies} />
    </main>
  );
};

export default Home;