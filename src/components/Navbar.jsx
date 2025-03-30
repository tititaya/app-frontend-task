import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  // Basculer le mode sombre
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const baseNavLinkClasses =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700";

  const activeNavLinkClasses = "block py-2 px-3 text-white bg-blue-700 rounded";

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Gestion-Tasks
          </span>
        </a>

        {/* Bouton mode sombre */}
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-300"
        >
          {isDarkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
        </button>

        {/* Bouton pour le menu mobile */}
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Liens de navigation */}
        <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeNavLinkClasses : baseNavLinkClasses
                }
              >
                Tâches
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/task-termine"
                className={({ isActive }) =>
                  isActive ? activeNavLinkClasses : baseNavLinkClasses
                }
              >
                Tâches Terminées
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/task-pending"
                className={({ isActive }) =>
                  isActive ? activeNavLinkClasses : baseNavLinkClasses
                }
              >
                Tâches en Cours
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/task-ferme"
                className={({ isActive }) =>
                  isActive ? activeNavLinkClasses : baseNavLinkClasses
                }
              >
                Tâches Fermées
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
