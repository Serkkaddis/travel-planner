import axios from "axios";
const AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const AMADEUS_API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const AMADEUS_API_BASE_URL_V1 = "https://test.api.amadeus.com/v1";
const AMADEUS_API_BASE_URL_V2 = "https://test.api.amadeus.com/v2";

let cachedToken = null; 
let tokenExpiry = null;

export const getAccessToken = async () => {
  if (cachedToken && tokenExpiry > Date.now()) {
    return cachedToken;
  }
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", AMADEUS_API_KEY);
    params.append("client_secret", AMADEUS_API_SECRET);

    const response = await axios.post(AUTH_URL, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    cachedToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
    return cachedToken;
  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    throw new Error("Failed to fetch access token.");
  }
};

export const searchDestinations = async (keyword) => {
  const url = `${AMADEUS_API_BASE_URL_V1}/reference-data/locations?keyword=${keyword}&subType=CITY`;
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data.filter(item => 
      item.subType === "CITY" || item.subType === "AIRPORT"
    ) || [];
    
  } catch (error) {
    console.error("Error fetching destinations:", error.response?.data || error.message);
    throw new Error("Failed to fetch destinations.");
  }
};

export const fetchFlightOffers = async (origin, destination, departureDate) => {
  const url = `${AMADEUS_API_BASE_URL_V2}/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1`;

  console.log("Flight API URL:", url);
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data || [];
  } catch (error) {
  console.error("Error fetching flight offers:", error.response?.data || error.message);
    throw new Error("Failed to fetch flight offers.");
  }
};
export const fetchTopAttractions = async (latitude, longitude) => {
  const url = `${AMADEUS_API_BASE_URL_V1}/shopping/activities?latitude=${latitude}&longitude=${longitude}`;

  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching top attractions:", error.response?.data || error.message);
    throw new Error("Failed to fetch top attractions.");
  }
};

// Fetch hotel accommodations
export const fetchHotelOffers = async (cityCode) => {
  const url = `${AMADEUS_API_BASE_URL_V2}/shopping/hotel-offers?cityCode=${cityCode}`;

  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching hotel accommodations:", error.response?.data || error.message);
    throw new Error("Failed to fetch hotel accommodations.");
  }
};

// Fetch weather
export const fetchWeather = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather.");
  }
};

const retryWithDelay = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.response?.status === 429) {
      console.warn(`Retrying after ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
      return retryWithDelay(fn, retries - 1, delay);
    }
    throw error;
  }
};

// Use this function when making API requests:
export const fetchLocationDetails = async (locationCode) => {
  const url = `${AMADEUS_API_BASE_URL_V1}/reference-data/locations/${locationCode}`;
  return retryWithDelay(async () => {
    const accessToken = await getAccessToken();
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  });
};

export const fetchAttractions = async (latitude, longitude) => {
  const url = `${AMADEUS_API_BASE_URL_V1}/shopping/activities?latitude=${latitude}&longitude=${longitude}`;
  return retryWithDelay(async () => {
    const accessToken = await getAccessToken();
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data || [];
  });
};

