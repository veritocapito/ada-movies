import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchMovieDetail = (movieId) => {
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        // Si no hay movieId, no hacemos nada.
        if (!movieId) return;

        // Reseteamos los estados antes de cada nueva llamada
        setIsLoading(true);
        setError(null);
        setMovie(null);

        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos`;

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [movieId, apiKey]);

    return { movie, isLoading, error };
};

export default useFetchMovieDetail;