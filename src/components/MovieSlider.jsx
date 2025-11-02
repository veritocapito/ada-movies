import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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
    draggable: false,
  };

  return (
    <div className="w-full mb-12 rounded-b-lg overflow-hidden movie-slider-container">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="relative">
            <Link to={`/movie/${movie.id}`}>
              <Box
                sx={{
                  height: { xs: '80vh', sm: '80svh' },
                  maxHeight: { xs: '80vh', sm: '80svh' },
                  width: '100%',
                  backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                }}
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 text-white">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-8">
                <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                <p className="text-lg hidden sm:block max-w-2xl">{movie.overview}</p>
                <Button
                  component={Link}
                  to={`/movie/${movie.id}`}
                  variant="contained"
                  startIcon={<PlayCircleOutlineIcon />}
                  sx={{
                    backgroundColor: '#22d3ee',
                    color: 'black',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#67e8f9',
                    },
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlider;
