import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex flex-col items-center p-6 bg-background text-white relative">
      {/* Hamburger Button (Mobile) */}
      <div className="absolute left-4 top-6 md:hidden">
        <button
          onClick={toggleMenu}
          className="text-secondarybackground-300 hover:text-white transition duration-200 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Logo */}
      <Link to="/" className="mb-4">
        <img
          src="/src/assets/logo.png" // Adjust the path to your logo
          alt="Travel Planner Logo"
          className="h-20 w-auto object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6">
        <Link
          to="/"
          className="text-accent hover:text-white transition duration-200 font-medium"
        >
          Home
        </Link>
        <Link
          to="/itinerary"
          className="text-accent hover:text-white transition duration-200 font-medium"
        >
          My Itinerary
        </Link>
        <Link
          to="/faq"
          className="text-accent hover:text-white transition duration-200 font-medium"
        >
          FAQ
        </Link>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>

     {/* Mobile Navigation Menu */}
     {isMenuOpen && (
        <nav className="md:hidden flex flex-col items-center bg-secondaryBackground rounded shadow-md mt-4 p-4 w-4/5">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-accent hover:text-white transition duration-200 font-medium mb-2"
          >
            Home
          </Link>
          <Link
            to="/itinerary"
            onClick={toggleMenu}
            className="block text-accent hover:text-white transition duration-200 font-medium mb-2"
          >
            My Itinerary
          </Link>
          <Link
            to="/faq"
            onClick={toggleMenu}
            className="block text-accent hover:text-white transition duration-200 font-medium mb-2"
          >
            FAQ
          </Link>
          <button
            onClick={() => {
              toggleTheme();
              toggleMenu();
            }}
            className="w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded shadow-sm hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;