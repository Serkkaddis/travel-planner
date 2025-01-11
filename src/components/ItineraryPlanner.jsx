import React, { useState } from "react";
import { useItinerary } from "../context/ItineraryContext";

const ItineraryPlanner = () => {
  const { itinerary, addToItinerary } = useItinerary(); // Access itinerary and functions from context
  const [newItem, setNewItem] = useState({
    type: "destination", // "destination", "flight", or "accommodation"
    name: "",
    date: "",
    time: "",
  });

  const handleAdd = () => {
    if (!newItem.name || !newItem.date) return alert("Please fill all fields.");
    addToItinerary(newItem);
    setNewItem({ type: "destination", name: "", date: "", time: "" });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Itinerary Planner</h2>

      {/* Form to Add New Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <label className="block mb-2">
          Type:
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="border rounded p-2 ml-2"
          >
            <option value="destination">Destination</option>
            <option value="flight">Flight</option>
            <option value="accommodation">Accommodation</option>
          </select>
        </label>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Enter name (e.g., Paris, Flight #123)"
            className="border rounded p-2 ml-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Date:
          <input
            type="date"
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
            className="border rounded p-2 ml-2"
          />
        </label>
        <label className="block mb-4">
          Time:
          <input
            type="time"
            value={newItem.time}
            onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
            className="border rounded p-2 ml-2"
          />
        </label>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Itinerary
        </button>
      </div>

      {/* Display Itinerary */}
      <h3 className="text-lg font-bold mb-2">My Itinerary</h3>
      {itinerary.length === 0 ? (
        <p>No items in the itinerary.</p>
      ) : (
        <ul className="list-disc pl-5">
          {itinerary.map((item, index) => (
            <li key={index}>
              <div>
                <strong>{item.type}:</strong> {item.name} <br />
                <strong>Date:</strong> {item.date} <br />
                {item.time && <><strong>Time:</strong> {item.time}</>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItineraryPlanner;
