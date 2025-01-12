import React, { useState } from "react";
import axios from "axios";

const DestinationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  
  const fetchDestinations = async () => {
    const API_URL = `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${searchQuery}&subType=CITY`;
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${AMADEUS_API_KEY}`,
        },
      });
      setDestinations(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch destinations. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchDestinations}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <div key={destination.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{destination.name}</h2>
            <p>{destination.address?.countryName}</p>
            <img
              src={`https://api.teleport.org/api/cities/`} 
              alt={destination.name}
              className="rounded w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationList;
