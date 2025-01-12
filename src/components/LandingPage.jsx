import React, { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";
import { FaSearch } from "react-icons/fa";

Modal.setAppElement("#root"); // Required for accessibility

const LandingPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  const handleSearch = () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    console.log("Searching for:", searchQuery);
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/src/assets/background-images.jpg')" }}
    >
      {/* Transparent Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center text-white text-center px-4 md:px-16 lg:px-32 mt-20">
        

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Explore the World with Ease
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Plan your trips, save itineraries, and discover your next adventure
          with our Travel Planner.
        </p>
        {/* Search Bar Section */}
        <div className="flex flex-col mt-6 mb-8">
          <div className="flex items-center w-full max-w-3xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow p-3 rounded-l-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent border border-gray-500"
              placeholder="Search destinations..."
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-[#276764] text-white rounded-r-md hover:bg-[#1f5654] transition"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-textColor text-white rounded border-2 border-textColor hover:bg-yellow-600 transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-transparent text-white border-2 border-white hover:bg-white hover:text-textColor rounded transition duration-300"
          >
            Log In
          </Link>
        </div>
      </main>

      {/* Modal Popup */}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 relative"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
>
  <button
    onClick={closeModal}
    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
    aria-label="Close Modal"
  >
    &times;
  </button>
  <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
    Sign Up to Continue
  </h2>
  <p className="text-gray-600 mb-6 text-center">
    To access this feature, please sign up or log in to your account.
  </p>
  <div className="flex justify-center space-x-4">
    <Link
      to="/signup"
      onClick={closeModal}
      className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
    >
      Sign Up
    </Link>
    <Link
      to="/login"
      onClick={closeModal}
      className="px-6 py-2 bg-transparent border border-blue-500 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition duration-300"
    >
      Log In
    </Link>
  </div>
</Modal>

    </div>
  );
};

export default LandingPage;
