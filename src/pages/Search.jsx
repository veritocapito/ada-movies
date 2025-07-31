import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialView, setIsInitialView] = useState(searchTerm === '');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchParams({ query: debouncedSearchTerm });
    } else {
      setSearchParams({});
    }

    const performSearch = async () => {
      // Si el campo de búsqueda está vacío, mostramos sugerencias
      if (debouncedSearchTerm.trim() === '') {
        setIsLoading(true);
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
        try {
          const response = await axios.get(url);
          setResults(response.data.results.slice(0, 6));
          setIsInitialView(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setIsInitialView(false);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${debouncedSearchTerm}`;
      try {
        const response = await axios.get(url);
        setResults(response.data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm, setSearchParams, apiKey]);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6 text-white">Search Movies</h2>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'gray' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: '#22d3ee' },
            color: 'white',
          },
        }}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isInitialView && (
            <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
              Or check out these top-rated movies...
            </Typography>
          )}

          {!isInitialView && results.length === 0 && debouncedSearchTerm && (
             <Typography variant="h6" sx={{ color: 'gray', mt: 4, textAlign: 'center' }}>
              No results found for "{debouncedSearchTerm}".
            </Typography>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Search;