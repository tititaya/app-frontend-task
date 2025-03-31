import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Initialiser le mode sombre si déjà activé
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const baseLink =
    'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700';
  const activeLink =
    'block py-2 px-3 text-white bg-blue-700 rounded';

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 fixed w-full z-30 top-0 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Gestion-Tasks</span>
        </a>

        {/* Bouton dark mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 text-sm rounded-lg text-gray-800 dark:text-gray-200 transition"
        >
          {isDarkMode ? '☀️ Clair' : '🌙 Sombre'}
        </button>

        {/* Bouton menu mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menu navigation */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto`} id="navbar-default">
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-sm font-medium">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? activeLink : baseLink}>Tâches</NavLink>
            </li>
            <li>
              <NavLink to="/task-termine" className={({ isActive }) => isActive ? activeLink : baseLink}>Tâches Terminées</NavLink>
            </li>
            <li>
              <NavLink to="/task-pending" className={({ isActive }) => isActive ? activeLink : baseLink}>Tâches en Cours</NavLink>
            </li>
            <li>
              <NavLink to="/task-ferme" className={({ isActive }) => isActive ? activeLink : baseLink}>Tâches Fermées</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
