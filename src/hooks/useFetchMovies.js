import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useFetchMovies = (baseUrl, page) => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const url = `${baseUrl}&page=${page}`;

    const fetchData = async () => {
      setIsLoading(true); // Reset loading state before fetching
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not fetch the movies. Please try again later.',
          background: '#1f2937',
          color: '#ffffff'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, page]);

  return { movies, isLoading, totalPages };
};

export default useFetchMovies;
