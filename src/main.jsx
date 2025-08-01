import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'animate.css'; 
import App from './App.jsx'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { FavoritesProvider } from './context/FavoritesContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
  </StrictMode>,
)
