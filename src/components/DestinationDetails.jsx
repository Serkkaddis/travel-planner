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
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Destination Details</h2>

      {/* Origin Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <div className="max-w-7xl mx-auto p-4">
      <h3 className="text-lg font-bold mb-4">Flight Offers</h3>
      {flights.length === 0 ? (
        <p className="text-gray-500">No flight offers available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {flights.map((flight, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
      >
        <h4 className="text-md font-semibold mb-2">
          Airline: {flight.validatingAirlineCodes[0]}
        </h4>
        <p className="text-sm text-gray-700">
          <strong>Price:</strong> ${flight.price.total}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Departure Time:</strong> {flight.itineraries[0].segments[0].departure.at}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Arrival Time:</strong> {flight.itineraries[0].segments.slice(-1)[0].arrival.at}
        </p>
      </div>
    ))}
  </div>
)}
</div>
      {/* Weather */}
      <div className="max-w-7xl mx-auto p-4">
      <h3 className="text-lg font-bold mb-4">Weather</h3>
      {weather ? (
        <div className="bg-blue-50 rounded-lg shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center">
      {weather.weather[0].icon && (
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-16 h-16"
        />
      )}
      <div className="ml-4">
        <p className="text-xl font-semibold">{weather.main.temp}°C</p>
        <p className="text-gray-500 capitalize">{weather.weather[0].description}</p>
      </div>
    </div>

    {/* Additional Details */}
    <div>
      <p className="text-sm text-gray-700">Humidity: {weather.main.humidity}%</p>
      <p className="text-sm text-gray-700">Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  </div>
) : (
  <p className="text-gray-500">No weather information available.</p>
)}
</div>
      {/* Top Attractions */}
      <div className="max-w-7xl mx-auto p-4"> 
      <h3 className="text-lg font-bold mb-4">Top Attractions</h3>
      {topAttractions.length === 0 ? (
        <p className="text-gray-500">No attractions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topAttractions.map((attraction, index) => (
            <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            {/* Image */}
            {attraction.picture && (
              <img
                src={attraction.picture}
                alt={attraction.name}
                className="w-full h-40 object-cover"
              />
            )}
    
            {/* Details */}
            <div className="p-4">
              <h4 className="text-md font-semibold mb-2">{attraction.name}</h4>
              <p className="text-sm text-gray-600 mb-4">
                {attraction.shortDescription || "Description not available."}
              </p>
    
              {/* Learn More Link */}
              <a
                href={attraction.bookingLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Learn more
              </a>
            </div>
          </div>
        ))}
        </div>
      )}</div>
    </div>
  );
};

export default DestinationDetails;
