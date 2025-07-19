import { NavLink } from 'react-router-dom';

const Header = () => {

  const activeLinkStyle = {
    color: '#22d3ee',
    textDecoration: 'underline',
  };

  return (
    <header className="bg-gray-800 p-4 shadow-lg flex flex-col sm:flex-row justify-between items-center">
      <NavLink to="/" className="text-3xl font-bold text-cyan-400 tracking-wider mb-4 sm:mb-0">
        Ada Movies
      </NavLink>
      <nav>
        <ul className="flex space-x-4 md:space-x-6">
          <li>
            <NavLink 
              to="/latest" 
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Latest
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/popular" 
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/search" 
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;