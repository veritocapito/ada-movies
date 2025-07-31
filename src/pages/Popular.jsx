import { useState } from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import Layout from '../components/Layout';
import { Pagination, Box } from '@mui/material';

const Popular = () => {
  const [page, setPage] = useState(1);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

  // Construct the URL with the current page
  const { movies, isLoading, totalPages } = useFetchMovies(baseUrl, page);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-white">Popular Movies</h2>
{isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination Component */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages > 500 ? 500 : totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                },
              }}
            />
          </Box>
        </>
      )}
    </Layout>
  );
};

export default Popular;
