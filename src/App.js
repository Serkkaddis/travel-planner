import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DestinationDetails from "./components/DestinationDetails";
import ItineraryPlanner from "./components/ItineraryPlanner";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow p-4">
          <Routes>
            {/* Home/Search Page */}
            <Route path="/" element={<SearchBar />} />

            {/* Destination Details Page */}
            <Route
              path="/destination/:id"
              element={<DestinationDetails />}
            />

            {/* Itinerary Planner Page */}
            <Route path="/itinerary" element={<ItineraryPlanner />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

