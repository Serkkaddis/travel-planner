import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchLocationDetails,
  fetchWeather,
  fetchFlightOffers,
  fetchTopAttractions,
} from "../api/apiServices";

const DestinationDetails = () => {
  const { id } = useParams(); // Destination ID (IATA Code or City Code)
  const [origin, setOrigin] = useState("LAX"); // Default origin
  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const [flights, setFlights] = useState([]);
  const [weather, setWeather] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [topAttractions, setTopAttractions] = useState([]);
  const [error, setError] = useState("");

  // Fetch destination details and set latitude/longitude
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const locationDetails = await fetchLocationDetails(id);
        setLatitude(locationDetails.geoCode.latitude);
        setLongitude(locationDetails.geoCode.longitude);
      } catch (err) {
        setError("Failed to fetch location details.");
        console.error(err.message);
      }
    };

    fetchDetails();
  }, [id]);

  // Fetch weather, attractions, and flight offers once latitude and longitude are available
  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchAdditionalDetails = async () => {
      try {
        setError("");

        // Fetch weather
        const weatherData = await fetchWeather(latitude, longitude);
        setWeather(weatherData);

        // Fetch top attractions
        const attractionsData = await fetchTopAttractions(latitude, longitude);
        setTopAttractions(attractionsData);

        // Fetch flight offers
        const flightOffers = await fetchFlightOffers(origin, id, departureDate);
        setFlights(flightOffers);
      } catch (err) {
        setError("Failed to fetch additional details.");
        console.error(err.message);
      }
    };

    fetchAdditionalDetails();
  }, [latitude, longitude, origin, departureDate, id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Destination Details</h2>

      {/* Origin Input */}
      <div className="mb-4">
        <label>
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            placeholder="Enter origin (e.g., LAX)"
            className="border rounded p-2 ml-2"
          />
        </label>
      </div>

      {/* Departure Date Input */}
      <div className="mb-4">
        <label>
          Departure Date:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="border rounded p-2 ml-2"
          />
        </label>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {/* Flight Offers */}
      <h3 className="text-lg font-bold mb-2">Flight Offers</h3>
      {flights.length === 0 ? (
        <p>No flight offers available.</p>
      ) : (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              <p>Price: ${flight.price.total}</p>
              <p>Airline: {flight.validatingAirlineCodes[0]}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Weather */}
      <h3 className="text-lg font-bold mb-2">Weather</h3>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>No weather information available.</p>
      )}

      {/* Top Attractions */}
      <h3 className="text-lg font-bold mb-2">Top Attractions</h3>
      {topAttractions.length === 0 ? (
        <p>No attractions found.</p>
      ) : (
        <ul>
          {topAttractions.map((attraction, index) => (
            <li key={index}>{attraction.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationDetails;
