import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Configura un temporizador que actualizará el valor "debounced" después del retraso.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpia el temporizador si el valor cambia (ej. el usuario sigue escribiendo).
    // Esto es crucial para que solo el último temporizador se ejecute.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Solo se vuelve a ejecutar si el valor o el retraso cambian.

  return debouncedValue;
}

export default useDebounce;
