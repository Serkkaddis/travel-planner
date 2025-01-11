import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import DestinationDetails from "./components/DestinationDetails";
import { searchDestinations } from "./api/apiServices";

const App = () => {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");
  const [origin, setOrigin] = useState("LON"); // Default origin (London)
  const [departureDate] = useState(new Date().toISOString().split("T")[0]); // Today's date

  const handleSearch = async (query) => {
    try {
      setError("");
      const results = await searchDestinations(query);
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

  return (
    <Router>
      <div>
        <SearchBar onSearch={handleSearch} />
        <div>
          {error && <div>{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                origin={origin}
                departureDate={departureDate}
              />
            ))}
          </div>
        </div>
        <Routes>
          <Route
            path="/destination/:id"
            element={<DestinationDetails origin={origin} departureDate={departureDate} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
