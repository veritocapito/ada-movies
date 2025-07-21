import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Si hay algo en localStorage, lo parseamos. Si no, usamos el valor inicial.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay un error (ej. JSON mal formado), usamos el valor inicial.
      console.error(error);
      return initialValue;
    }
  });

  // useEffect que se ejecuta cada vez que 'storedValue' cambia.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;