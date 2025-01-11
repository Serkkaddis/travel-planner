import React, { createContext, useContext, useState } from "react";

// Create the context
const ItineraryContext = createContext();

// Provider component
export const ItineraryProvider = ({ children }) => {
  // State to hold the itinerary
  const [itinerary, setItinerary] = useState([]);

  // Function to add an item to the itinerary
  const addToItinerary = (item) => {
    setItinerary((prev) => [...prev, item]);
  };

  return (
    <ItineraryContext.Provider value={{ itinerary, addToItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
};

// Hook to use the context
export const useItinerary = () => {
  return useContext(ItineraryContext);
};
