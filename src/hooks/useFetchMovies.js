import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchMovies = (baseUrl, page) => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${baseUrl}&page=${page}`;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 700));

      try {
        const [response] = await Promise.all([
          axios.get(url),
          minLoadingTime
        ]);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, page]);

  return { movies, isLoading, totalPages, error };
};

export default useFetchMovies;
