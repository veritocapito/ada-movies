import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  // Agregar una película a favoritos
  const addFavorite = (movie) => {

    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  // Quitar una película de favoritos
  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
