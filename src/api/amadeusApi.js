const API_BASE_URL = "https://test.api.amadeus.com";
const API_KEY = "qXeyDTcrqpyjs8BoKLLzKjLA6FdNFxVB"; 

export const fetchDestinations = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/reference-data/locations?keyword=${query}&subType=CITY`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch destinations");
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return null;
  }
};
