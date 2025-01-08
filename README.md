🌍 # Travel Planner
Travel Planner is a web application designed to help users plan their trips efficiently by exploring destinations, booking flights, and organizing itineraries. Built with React and styled using TailwindCSS, the app integrates with the Amadeus API to provide real-time travel data. This project is a capstone project for ALX's Front End Development Course.

🚀 # Features
Search for Destinations: Find destinations by city or country using the Amadeus API.
Flight Offers: View available flight options with prices and airlines.
Hotel Accommodations: Explore hotels and their amenities in the desired city.
Itinerary Planning: Save and organize travel plans in a visually appealing format.
Responsive Design: A fully responsive UI for seamless experience across devices.
🛠️ # Technology Stack
Frontend: React, TailwindCSS
API Integration: Amadeus API
Deployment: Netlify/Vercel
State Management: React hooks (useState, useEffect), optionally Zustand or Redux
Tools: Vite, Axios
📦 # Installation
Clone the repository:
git clone https://github.com/<serkkaddis>/travel-planner.git
cd travel-planner
Install dependencies:
npm install
Start the development server:
npm run dev
Open the app in your browser at http://localhost:5173.

🔑 # API Configuration
Sign up for an Amadeus API key: Amadeus Developer Portal.
Create a .env file in the project root and add your API credentials:
env
VITE_AMADEUS_API_KEY=your_api_key
VITE_AMADEUS_API_SECRET=your_api_secret
🖼️ Project Structure
travel-planner/
│
├── src/
│   ├── components/           # Reusable UI components (e.g., SearchBar, DestinationCard)
│   ├── pages/                # Page components (e.g., Home, Itinerary)
│   ├── styles/               # Global styles and Tailwind configuration
│   ├── App.jsx               # Root component
│   ├── main.jsx              # React entry point
│
├── public/                   # Static assets
│
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation

🌟 # Planned Enhancements
User Authentication: Allow users to save and revisit their itineraries.
Budget Planning: Set a travel budget and track estimated expenses.
Route Optimization: Suggest the most efficient travel routes.
Dark Mode: Provide an option for dark mode to improve usability.
🎉 # Deployment
The application is deployed on Netlify/Vercel. You can access it here: Travel Planner Live.

# 📧 Contact
For questions or feedback, reach out to Serkkaddis.
