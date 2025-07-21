import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useFetchMovies = (url) => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 700));

      try {
        const [response] = await Promise.all([
          axios.get(url),
          minLoadingTime
        ]);
        setMovies(response.data.results);
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
  }, [url]);

  return { movies, isLoading };
};

export default useFetchMovies;
