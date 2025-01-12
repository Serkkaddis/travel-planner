import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchLocationDetails,
  fetchWeather,
  fetchFlightOffers,
  fetchTopAttractions,
  fetchHotels,
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
  const [hotels, setHotels] = useState([]);
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
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-textColor to-background dark:from-black dark:to-gray-900 text-white">
    <div className="max-w-4xl mt-12 mx-auto bg-gray-800 dark:bg-gray-900 p-8 rounded-lg shadow-lg space-y-8">
      <h2 className="text-3xl font-bold text-center text-[#FFD166]">Destination Details</h2>
  
      {/* Origin Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="flex flex-col text-sm font-medium">
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            placeholder="Enter origin (e.g., LAX)"
            className="mt-2 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-[#FFD166] focus:outline-none"
          />
        </label>
        <label className="flex flex-col text-sm font-medium">
          Departure Date:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="mt-2 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-[#FFD166] focus:outline-none"
          />
        </label>
      </div>
  
      {error && <div className="text-red-500 text-center">{error}</div>}
  
      {/* Flight Offers */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Flight Offers</h3>
        {flights.length === 0 ? (
          <p className="text-gray-400 text-sm">No flight offers available.</p>
        ) : (
          <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((flight, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
              >
                <h4 className="font-semibold text-lg">Airline: {flight.validatingAirlineCodes[0]}</h4>
                <p className="text-sm mt-2">Price: <strong>${flight.price.total}</strong></p>
                <p className="text-sm">Departure: {flight.itineraries[0].segments[0].departure.at}</p>
                <p className="text-sm">Arrival: {flight.itineraries[0].segments.slice(-1)[0].arrival.at}</p>
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Weather */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Weather</h3>
        {weather ? (
          <div className="flex items-center justify-between bg-blue-50 text-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center">
              {weather.weather[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-16 h-16"
                />
              )}
              <div className="ml-4">
                <p className="text-2xl font-bold">{weather.main.temp}°C</p>
                <p className="capitalize">{weather.weather[0].description}</p>
              </div>
            </div>
            <div>
              <p className="text-sm">Humidity: {weather.main.humidity}%</p>
              <p className="text-sm">Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No weather information available.</p>
        )}
      </div>
  {/* Hotels */}
  <div>
          <h3 className="text-2xl font-bold mb-4">Hotel Accommodations</h3>
          {hotels.length === 0 ? (
            <p className="text-gray-400 text-sm">No hotels found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
                >
                  {hotel.media && hotel.media[0]?.uri && (
                    <img
                      src={hotel.media[0].uri}
                      alt={hotel.name}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{hotel.name}</h4>
                    <p className="text-sm mt-2 text-gray-600">
                      {hotel.address?.lines?.join(", ") || "Address not available"}
                    </p>
                    <p className="text-sm mt-2 text-gray-600">
                      Rating: {hotel.rating || "N/A"}
                    </p>
                    <a
                      href={hotel.bookingLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mt-4 block text-sm"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      {/* Top Attractions */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Top Attractions</h3>
        {topAttractions.length === 0 ? (
          <p className="text-gray-400 text-sm">No attractions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topAttractions.map((attraction, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
              >
                {attraction.picture && (
                  <img
                    src={attraction.picture}
                    alt={attraction.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{attraction.name}</h4>
                  <p className="text-sm mt-2">
                    {attraction.shortDescription || "Description not available."}
                  </p>
                  <a
                    href={attraction.bookingLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-4 block text-sm"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
    );
};

export default DestinationDetails;
