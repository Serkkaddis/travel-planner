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
      <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 p-4">
        <input
          type="text"
          className="border p-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-secondaryBackground-400 focus:ring-offset-2"
          placeholder="Search for destinations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <button
        className="bg-accent text-white px-4 py-2 rounded hover:bg-grey-900 transition 200"
        onClick={handleSearch}
      >
        Search
      </button>
      </div>
     
);
  };
  
  export default SearchBar;