import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-gray-900 text-white border-t border-gray-600 shadow-md flex items-center justify-center">
      <span className="text-sm text-center">
        © {currentYear}{" "}
        <a
          href="https://flowbite.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-green-400"
        >
          Diffo Ornel et Stephane&trade;
        </a>
        . Tous droits réservés.
      </span>
    </footer>
  );
};

export default Footer;
