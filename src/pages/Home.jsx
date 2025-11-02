import useFetchMovies from '../hooks/useFetchMovies';
import MovieList from '../components/MovieList';
import MovieSlider from '../components/MovieSlider';
import Loader from '../components/Loader';
import Layout from '../components/Layout';
import NotFound from './NotFound';

const Home = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

  const { 
    movies: popularMovies, 
    isLoading: isPopularLoading, 
    error: popularError 
  } = useFetchMovies(popularUrl);
  
  const { 
    movies: topRatedMovies, 
    isLoading: isTopRatedLoading, 
    error: topRatedError 
  } = useFetchMovies(topRatedUrl);

  const isLoadingLists = isPopularLoading || isTopRatedLoading;
  const fetchError = popularError || topRatedError;

  return (
    <>
      {!isPopularLoading && <MovieSlider movies={popularMovies.slice(0, 5)} />}
      
      <Layout>
        {isLoadingLists ? (
          <Loader />
        ) : fetchError ? (
          <NotFound />
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