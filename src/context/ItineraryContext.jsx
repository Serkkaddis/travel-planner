import React, { createContext, useContext, useState, useEffect } from "react";

const ItineraryContext = createContext();

export const ItineraryProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([]);

  // Load itinerary from local storage on component mount
  useEffect(() => {
    try {
      const savedItinerary = JSON.parse(localStorage.getItem("itinerary"));
      if (Array.isArray(savedItinerary)) {
        setItinerary(savedItinerary);
      }
    } catch (error) {
      console.error("Error loading itinerary from local storage:", error);
      localStorage.removeItem("itinerary"); // Clear corrupted data
    }
  }, []);

  // Save itinerary to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
  }, [itinerary]);

  // Add items to the itinerary
  const addToItinerary = (item) => {
    const newItem = { ...item };

    // Handle additional fields for flights
    if (item.type === "flight") {
      newItem.departure = item.departure || "Unknown Departure";
      newItem.arrival = item.arrival || "Unknown Arrival";
    }

    // Handle additional fields for accommodations
    if (item.type === "accommodation") {
      newItem.nights = item.nights || "1";
    }

    setItinerary((prev) => [...prev, newItem]);
  };

  // Remove items from the itinerary
  const removeFromItinerary = (index) => {
    setItinerary((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ItineraryContext.Provider
      value={{ itinerary, addToItinerary, removeFromItinerary }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => useContext(ItineraryContext);
