import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useAuth } from "../context/AuthContext";

Modal.setAppElement("#root");

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [clicked, setClicked] = useState({ logout: false, darkMode: false });

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
    setClicked((prev) => ({ ...prev, darkMode: true }));
    setTimeout(() => setClicked((prev) => ({ ...prev, darkMode: false })), 300); // Reset after 300ms
  };

  return (
    <header className="bg-transparent text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="/src/assets/logo.png"
            alt="App Logo"
            className="h-16 w-auto"
          />
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none text-white"
        >
          ☰
        </button>

        <nav className="hidden md:flex items-center space-x-6">
          {currentUser ? (
            <>
              <Link to="/home" className="hover:text-yellow-500 transition">
                Home
              </Link>
              <Link to="/itinerary" className="hover:text-yellow-500 transition">
                My Itinerary
              </Link>
              <div className="relative">
                <button
                  className="hover:text-yellow-500 transition"
                  onClick={toggleDropdown}
                >
                  {currentUser.email}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 bg-gray-700 text-white rounded shadow-md p-4 mt-2">
                    <div className="flex items-center justify-between mb-4">
                      <span>Dark Mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={darkMode}
                          onChange={toggleDarkMode}
                        />
                        <div
                          className={`w-11 h-6 ${
                            clicked.darkMode
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                          } rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500`}
                        ></div>
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        setClicked((prev) => ({ ...prev, logout: true }));
                        handleLogout();
                        setTimeout(() => {
                          setClicked((prev) => ({ ...prev, logout: false }));
                        }, 300); 
                      }}
                      className={`block w-full text-left px-4 py-2 rounded ${
                        clicked.logout
                          ? "bg-yellow-500 text-gray-800"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="mt-4 md:hidden bg-gray-800 text-white p-4 rounded shadow-md">
          {currentUser ? (
            <>
              <Link
                to="/home"
                className="block hover:text-yellow-500 transition mb-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/itinerary"
                className="block hover:text-yellow-500 transition mb-2"
                onClick={toggleMenu}
              >
                My Itinerary
              </Link>
              <div className="relative">
                <button
                  className="block text-white hover:text-yellow-500 transition mb-2"
                  onClick={toggleDropdown}
                >
                  {currentUser.email}
                </button>
                {isDropdownOpen && (
                  <div className="absolute bg-gray-800 text-white rounded shadow-md p-4 mt-2">
                    <div className="flex items-center justify-between mb-4">
                      <span>Dark Mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={darkMode}
                          onChange={toggleDarkMode}
                        />
                        <div
                          className={`w-11 h-6 ${
                            clicked.darkMode
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                          } rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500`}
                        ></div>
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        setClicked((prev) => ({ ...prev, logout: true }));
                        handleLogout();
                        setTimeout(() => {
                          setClicked((prev) => ({ ...prev, logout: false }));
                        }, 300); 
                      }}
                      className={`block w-full text-left px-4 py-2 rounded ${
                        clicked.logout
                          ? "bg-yellow-500 text-gray-800"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </nav>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white rounded p-6 shadow-lg max-w-sm mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Sign Up to Continue</h2>
        <p className="mb-6">You need to sign up or log in to access this feature.</p>
        <div className="flex space-x-4">
          <Link
            to="/signup"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Log In
          </Link>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
