import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Importamos nuestros componentes
import Header from './components/Header';
import Footer from './components/Footer';

// Importamos nuestras páginas
import Home from './pages/Home';
import Latest from './pages/Latest';
import Popular from './pages/Popular';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Header />

        {/* El contenido principal ahora tiene un ancho máximo y está centrado */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
