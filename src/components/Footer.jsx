import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full p-4 bg-gray-900 text-white border-t border-gray-600 shadow-md mt-auto">
      <div className="text-center text-xs sm:text-sm">
        © {currentYear}{" "}
        <a
          href="https://flowbite.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-green-400"
        >
          Diffo Ornel et Stephane™
        </a>
        . Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
