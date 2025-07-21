import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MovieList from '../components/MovieList';
import MovieSlider from '../components/MovieSlider';
import Loader from '../components/Loader';
import Layout from '../components/Layout';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isLoadingLists, setIsLoadingLists] = useState(true); 

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchAllMovies = async () => {
      const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
      const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500)); 

      try {
        const popularResponse = await axios.get(popularUrl);
        setPopularMovies(popularResponse.data.results);

        const [topRatedResponse] = await Promise.all([
          axios.get(topRatedUrl),
          minLoadingTime
        ]);
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
        // Esto hará que el Loader sea reemplazado por las listas de películas
        setIsLoadingLists(false);
      }
    };

    fetchAllMovies();
  }, [apiKey]);

  return (
    <>
      {/* El slider se renderiza tan pronto como 'popularMovies' tiene datos */}
      <MovieSlider movies={popularMovies.slice(0, 5)} />
      
      <Layout>
        {/* El Loader ahora solo se muestra si las listas están cargando */}
        {isLoadingLists ? (
          <Loader />
        ) : (
          <>
            <MovieList title="Popular Movies" movies={popularMovies.slice(0, 12)} />
            <MovieList title="Top Rated Movies" movies={topRatedMovies.slice(0, 12)} />
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;