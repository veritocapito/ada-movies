import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MovieList from '../components/MovieList';
import MovieSlider from '../components/MovieSlider'; 

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
      const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;

      try {
        const [popularResponse, topRatedResponse] = await Promise.all([
          axios.get(popularUrl),
          axios.get(topRatedUrl)
        ]);
        
        setPopularMovies(popularResponse.data.results);
        setTopRatedMovies(topRatedResponse.data.results);

      } catch (error) {
        console.error("Error fetching movies for home page:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while fetching the movies!',
          background: '#1f2937',
          color: '#ffffff'
        });
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
    <>
      <MovieSlider movies={popularMovies.slice(0, 5)} />
      <MovieList title="Popular Movies" movies={popularMovies.slice(0, 12)} />
      <MovieList title="Top Rated Movies" movies={topRatedMovies.slice(0, 12)} />
    </>
  );
};

export default Home;