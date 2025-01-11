import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import DestinationDetails from "./components/DestinationDetails";
import { searchDestinations } from "./api/apiServices";
import { ItineraryProvider } from "./context/ItineraryContext";
import ItineraryPlanner from "./components/ItineraryPlanner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

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
    <ThemeProvider>
    <ItineraryProvider>

      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <SearchBar onSearch={handleSearch} />
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
            }
          />
          <Route
            path="/destination/:id"
            element={<DestinationDetails origin={origin} departureDate={departureDate} />}
          />
          <Route path="/itinerary" element={<ItineraryPlanner />} />
        </Routes>
      </Router>
    </ItineraryProvider>
    </ThemeProvider>
  );
};

export default App;
