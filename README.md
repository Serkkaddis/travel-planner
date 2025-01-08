# Travel Planner

A web application that helps users plan their travel itineraries by providing information on destinations, flights, hotels, and more. Built with React, integrated with the Amadeus API, and styled with TailwindCSS.  This project is a capstone project for ALX's Front End Development Course.

## Features

- **Search for Destinations:** Users can search for cities and countries using the Amadeus API and get a list of matching locations.
- **Flight Offers:** Users can find available flight offers between specified origin and destination cities.
- **Hotel Accommodations:** Users can view available hotel offers in a selected destination city.
- **Itinerary Planner:** Users can plan their travel itinerary by adding destinations, flights, and accommodations to a visual itinerary.
- **Responsive Design:** The app is fully responsive and works well on both desktop and mobile devices.
- **User Authentication (Stretch Goal):** Allows users to log in and save their itineraries for future reference.
- **Social Sharing (Stretch Goal):** Users can share their itineraries via social media or shareable links.

## Technologies Used

- **Frontend:**
  - React (with React Hooks)
  - TailwindCSS for styling
  - Amadeus API for fetching travel data
- **State Management:** React's `useState` and `useEffect` hooks (and optional state management tools like Zustand)
- **Deployment:** The app will be deployed on a free hosting platform such as Netlify or Vercel.

## Installation

To set up the project locally, follow these steps:
Clone the repository:
git clone https://github.com/<serkkaddis>/travel-planner.git
cd travel-planner
Install dependencies:
npm install
Start the development server:
npm run dev
Open the app in your browser at http://localhost:5173.

## Features
Search for Destinations: Find destinations by city or country using the Amadeus API.
Flight Offers: View available flight options with prices and airlines.
Hotel Accommodations: Explore hotels and their amenities in the desired city.
Itinerary Planning: Save and organize travel plans in a visually appealing format.
Responsive Design: A fully responsive UI for seamless experience across devices.

## API Configuration
Sign up for an Amadeus API key: Amadeus Developer Portal.
Create a .env file in the project root and add your API credentials:
env
VITE_AMADEUS_API_KEY=your_api_key
VITE_AMADEUS_API_SECRET=your_api_secret

## Project Structure
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

## Planned Enhancements
User Authentication: Allow users to save and revisit their itineraries.
Budget Planning: Set a travel budget and track estimated expenses.
Route Optimization: Suggest the most efficient travel routes.
Dark Mode: Provide an option for dark mode to improve usability.

##  Deployment
The application will be deployed on Netlify/Vercel. You can access it here: Travel Planner Live.

## Contact
For questions or feedback, reach out to @Serkkaddis.
