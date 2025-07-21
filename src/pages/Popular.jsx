import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import Layout from '../components/Layout';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchPopularMovies = async () => {
      // El endpoint para películas populares es "popular"
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));

      try {
        const [response] = await Promise.all([
          axios.get(url),
          minLoadingTime
        ]);
        
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not fetch the popular movies. Please try again later.',
          background: '#1f2937',
          color: '#ffffff'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, [apiKey]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-white">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </Layout>
  );
};

export default Popular;
