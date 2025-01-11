import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
  
    const handleSearch = () => {
      if (query.trim()) {
        onSearch(query);
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && query.trim()) {
        onSearch(query);
      }
    };
  
    return (
      <div className="flex gap-2 p-4">
        <input
          type="text"
          className="border p-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          placeholder="Search for destinations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <button
        className="bg-blue-500 !important text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={handleSearch}
      >
        Search
      </button>
      </div>
     
);
  };
  
  export default SearchBar;