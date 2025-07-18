import './index.css';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-cyan-400 tracking-wider">
          Ada Movies
        </h1>
      </header>

      <main className="p-8 flex-grow">
        <h2 className="text-2xl font-semibold mb-4">Coming soon...</h2>
        <p className="text-gray-300">Here I will build my amazing movie application.</p>
      </main>

      <footer className="bg-gray-800 p-4 mt-auto">
        <p className="text-center text-gray-500">
          Ada Movies Project &copy; 2025 - VeroDev
        </p>
      </footer>
    </div>
  );
}

export default App;
