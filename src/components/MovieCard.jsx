// URL base para las imágenes de TMDB
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  const imageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
      <img 
        src={imageUrl} 
        alt={movie.title} 
        className="w-full h-auto object-cover"
        // Añadimos un placeholder en caso de que la imagen no cargue
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x750/1f2937/ffffff?text=No+Image'; }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;