import React, { useState } from "react";

const ItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState([]);
  const [destination, setDestination] = useState("");

  const addToItinerary = () => {
    setItinerary([...itinerary, destination]);
    setDestination("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Itinerary</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Add a destination..."
        />
        <button
          onClick={addToItinerary}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {itinerary.map((item, index) => (
          <li key={index} className="p-2 border-b">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryPlanner;
