import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';
import { Box, Typography, Chip, Button, Rating } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

import { FavoritesContext } from '../context/FavoritesContext';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Contexto de favoritos
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const isMovieFavorite = isFavorite(parseInt(id));

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`;
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

  const handleToggleFavorite = () => {
    if (isMovieFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const handlePlayTrailer = () => {
    // 1. Buscamos el tráiler oficial en YouTube
    const trailer = movie.videos?.results?.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );

    if (trailer) {
      // 2. Si se encuentra, abrimos el modal EN MODO CARGA
      const loaderHtml = `
      <div id="trailer-loader" style="height: 315px; display: flex; align-items: center; justify-content: center;">
        <span class="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate" role="progressbar" style="width: 50px; height: 50px; color: #22d3ee;">
          <svg class="MuiCircularProgress-svg" viewBox="22 22 44 44">
            <circle class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
          </svg>
        </span>
      </div>
    `;

      // 3. HTML para el iframe (como string)
      // Añadimos ?autoplay=1 para que se reproduzca al cargar
      const iframeHtml = `
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/${trailer.key}?autoplay=1"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;

      // 4. Abrimos el modal con el loader centrado
      Swal.fire({
        title: 'Loading Trailer...',
        html: loaderHtml, 
        background: '#1f2937',
        color: '#ffffff',
        showConfirmButton: false,
        width: '800px',
        showCloseButton: true,
        allowOutsideClick: false,
      });

      // 5. Creamos un iframe en memoria (oculto) SÓLO para detectar la carga
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
      document.body.appendChild(iframe);

      // 6. Cuando el iframe termine de cargar...
      iframe.onload = () => {
        // 7. Actualizamos el modal
        Swal.update({
          title: `${movie.title} - Trailer`,
          html: iframeHtml
        });
        document.body.removeChild(iframe); // Limpiamos el iframe oculto
      };

      // (Opcional) Fallback por si 'onload' no se dispara en < 4 seg
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          Swal.update({
            title: `${movie.title} - Trailer`,
            html: iframeHtml,
          });
          document.body.removeChild(iframe);
        }
      }, 4000);

    } else {
      // 7. Si no hay tráiler, mostramos el aviso
      Swal.fire({
        icon: 'info',
        title: 'No Trailer Found',
        text: 'Sorry, we couldn\'t find an official trailer for this movie.',
        background: '#1f2937',
        color: '#ffffff'
      });
    }
  };

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

            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 2,
              width: '100%',
              justifyContent: 'flex-start' // Alineación para desktop
            }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(-1)} // Vuelve a la página anterior
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Go Back
                </Button>
                {/* Botón de Reproducir Tráiler */}
                <Button
                  variant="contained"
                  startIcon={<PlayCircleOutlineIcon />}
                  onClick={handlePlayTrailer}
                  sx={{
                    backgroundColor: '#e50914',
                    color: 'white',
                    '&:hover': { backgroundColor: '#f40612' }
                  }}
                >
                  Watch Trailer
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                {/* Botón de favoritos dinámico */}
                <Button
                  variant="contained"
                  startIcon={isMovieFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={handleToggleFavorite}
                  sx={{ backgroundColor: '#22d3ee', color: 'black', '&:hover': { backgroundColor: '#67e8f9' } }}
                >
                  {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MovieDetail;
