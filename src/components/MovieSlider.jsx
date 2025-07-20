import Slider from 'react-slick';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MovieSlider = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="w-full mb-12 rounded-b-lg overflow-hidden">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="relative">
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
              <p className="text-lg hidden sm:block max-w-2xl">{movie.overview}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlider;
