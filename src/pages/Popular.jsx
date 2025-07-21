import useFetchMovies from '../hooks/useFetchMovies';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import Layout from '../components/Layout';

const Popular = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  // Llamamos al custom hook useFetchMovies con la URL de las películas populares
  const { movies, isLoading } = useFetchMovies(url);

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
