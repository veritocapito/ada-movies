import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-white">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;