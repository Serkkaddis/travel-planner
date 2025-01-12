import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import DestinationCard from "./DestinationCard";
import { searchDestinations } from "../api/apiServices";

const Home = () => {
  const { currentUser, logout } = useAuth(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const handleSearch = async () => {
    try {
      setError("");
      const results = await searchDestinations(searchQuery);
      if (results.length === 0) {
        setError("No destinations found.");
      } else {
        setDestinations(results);
      }
    } catch (error) {
      setError("Failed to fetch destinations.");
      console.error("Error during search:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-textColor to-background text-white">
      <div className="bg-gray-800 p-2 mt-12 rounded-lg shadow-lg w-full max-w-3x2">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#FFD166]">
          Welcome to Travel Planner
        </h1>

       

        <div className="flex flex-col items-center space-y-4 mb-8 mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-[#FFD166] focus:outline-none placeholder-gray-400"
            placeholder="Search destinations..."
          />
          <button
            onClick={handleSearch}
            className="w-full p-3 bg-[#FFD166] text-gray-900 font-semibold rounded hover:bg-[#FFA726] transition"
          >
            Search
          </button>
        </div>

        {error && (
          <div className="text-center text-red-500 mb-6">{error}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-textColor">
          {destinations.length > 0 ? (
            destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))
          ) : (
            <p className="text-gray-400 text-center">
              Start by searching for a destination above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
