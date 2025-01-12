import React, { useState } from "react";
import { useItinerary } from "../context/ItineraryContext";

const ItineraryPlanner = () => {
  const { itinerary, addToItinerary, removeFromItinerary } = useItinerary();
  const [newItem, setNewItem] = useState({
    type: "destination", // Default type
    name: "",
    date: "",
    time: "",
    departure: "",
    arrival: "",
    nights: "",
  });

  const handleAdd = () => {
    if (!newItem.name || !newItem.date || (newItem.type === "flight" && (!newItem.departure || !newItem.arrival))) {
      alert("Please fill all required fields.");
      return;
    }

    addToItinerary(newItem);

    // Reset the form
    setNewItem({
      type: "destination",
      name: "",
      date: "",
      time: "",
      departure: "",
      arrival: "",
      nights: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-textColor to-background dark:from-black dark:to-gray-900 text-white">
      <div className="max-w-4xl mt-12 mx-auto bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          Itinerary Planner
        </h2>

        {/* Form to Add New Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <label className="block">
            <span className="block text-sm font-medium mb-2">Type:</span>
            <select
              value={newItem.type}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  type: e.target.value,
                  departure: "",
                  arrival: "",
                  nights: "",
                })
              }
              className="w-full p-3 rounded bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
            >
              <option value="destination">Destination</option>
              <option value="flight">Flight</option>
              <option value="accommodation">Accommodation</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Name:</span>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder={
                newItem.type === "flight"
                  ? "Flight #123"
                  : newItem.type === "accommodation"
                  ? "Hotel Name"
                  : "Destination Name"
              }
              className="w-full p-3 rounded bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Date:</span>
            <input
              type="date"
              value={newItem.date}
              onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Time:</span>
            <input
              type="time"
              value={newItem.time}
              onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
            />
          </label>

          {newItem.type === "flight" && (
            <>
              <label className="block">
                <span className="block text-sm font-medium mb-2">Departure:</span>
                <input
                  type="text"
                  value={newItem.departure}
                  onChange={(e) =>
                    setNewItem({ ...newItem, departure: e.target.value })
                  }
                  placeholder="Enter departure (e.g., LAX)"
                  className="w-full p-3 rounded bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium mb-2">Arrival:</span>
                <input
                  type="text"
                  value={newItem.arrival}
                  onChange={(e) =>
                    setNewItem({ ...newItem, arrival: e.target.value })
                  }
                  placeholder="Enter arrival (e.g., JFK)"
                  className="w-full p-3 rounded bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
                />
              </label>
            </>
          )}

          {newItem.type === "accommodation" && (
            <label className="block">
              <span className="block text-sm font-medium mb-2">Nights:</span>
              <input
                type="number"
                value={newItem.nights}
                onChange={(e) =>
                  setNewItem({ ...newItem, nights: e.target.value })
                }
                placeholder="Enter number of nights"
                className="w-full p-3 rounded bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
              />
            </label>
          )}

          <div className="flex items-end">
            <button
              onClick={handleAdd}
              className="w-full bg-yellow-500 text-gray-900 px-4 py-3 rounded font-semibold hover:bg-yellow-600 transition"
            >
              Add to Itinerary
            </button>
          </div>
        </div>

        {/* Display Itinerary */}
        <h3 className="text-xl font-bold text-yellow-400 mb-4">My Itinerary</h3>
        {itinerary.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-center">
            No items in the itinerary.
          </p>
        ) : (
          <ul className="space-y-4">
            {itinerary.map((item, index) => (
              <li
                key={index}
                className="bg-gray-700 dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="text-sm">
                  <span className="font-bold text-yellow-400">Type:</span>{" "}
                  {item.type}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-yellow-400">Name:</span>{" "}
                  {item.name}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-yellow-400">Date:</span>{" "}
                  {item.date}
                </div>
                {item.time && (
                  <div className="text-sm">
                    <span className="font-bold text-yellow-400">Time:</span>{" "}
                    {item.time}
                  </div>
                )}
                {item.type === "flight" && (
                  <>
                    <div className="text-sm">
                      <span className="font-bold text-yellow-400">Departure:</span>{" "}
                      {item.departure}
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-yellow-400">Arrival:</span>{" "}
                      {item.arrival}
                    </div>
                  </>
                )}
                {item.type === "accommodation" && (
                  <div className="text-sm">
                    <span className="font-bold text-yellow-400">Nights:</span>{" "}
                    {item.nights}
                  </div>
                )}
                <button
                  onClick={() => removeFromItinerary(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItineraryPlanner;
