import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import { Box, Typography, Chip, Button, Rating } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 700));

      try {
        const [response] = await Promise.all([axios.get(url), minLoadingTime]);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not fetch the movie details.',
          background: '#1f2937',
          color: '#ffffff'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, apiKey]);

  if (isLoading) {
    return <Loader />;
  }

  if (!movie) {
    return <div className="text-center p-8">Movie not found.</div>;
  }

  return (
    <div>
      {/* Sección del fondo con la imagen de la película */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          backgroundImage: `url(${IMAGE_BASE_URL}original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': { 
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      />
      
      <Box className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" sx={{ mt: 10, mb: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flexShrink: 0, textAlign: { xs: 'center', md: 'left' } }}>
            <img
              src={`${IMAGE_BASE_URL}w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg w-64 mx-auto md:mx-0"
            />
          </Box>
          
          <Box sx={{ color: 'white' }}>
            <Typography variant="h3" component="h1" fontWeight="bold">
              {movie.title}
            </Typography>
            <Typography variant="h6" fontStyle="italic" color="text.info" sx={{ mb: 2 }}>
              {movie.tagline}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating name="read-only" value={movie.vote_average / 2} precision={0.5} readOnly />
              <Typography>({movie.vote_count} reviews)</Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {movie.overview}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} variant="outlined" sx={{ color: 'white', borderColor: 'gray' }} />
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)} // Vuelve a la página anterior
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                startIcon={<FavoriteBorderIcon />}
                sx={{ backgroundColor: '#22d3ee', color: 'black', '&:hover': { backgroundColor: '#67e8f9' } }}
              >
                Add to Favorites
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MovieDetail;
