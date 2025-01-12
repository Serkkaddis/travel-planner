import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ItineraryProvider } from "./context/ItineraryContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ItineraryPlanner from "./components/ItineraryPlanner";
import ProtectedRoute from "./components/ProtectedRoute";
import DestinationDetails from "./components/DestinationDetails";
import DestinationCard from "./components/DestinationCard";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ItineraryProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/itinerary"
                element={
                  <ProtectedRoute>
                    <ItineraryPlanner />
                  </ProtectedRoute>
                }
              />
              <Route
  path="/destination/:id"
  element={<DestinationDetails />}
/>

            </Routes>
            <Footer />
          </Router>
        </ItineraryProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
