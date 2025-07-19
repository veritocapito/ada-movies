import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400 border-l-4 border-cyan-400 pl-2">
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