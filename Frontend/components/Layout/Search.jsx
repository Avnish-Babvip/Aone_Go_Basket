import React from 'react';
import { FiSearch } from "react-icons/fi";

function Search() {
  return (
    <div className="relative w-full group">
      {/* Input Field */}
      <input 
        type="text" 
        placeholder="Search for products..." 
        className="w-full h-10 bg-gray-100 rounded-full px-5 pr-10 text-sm outline-none 
                   border border-transparent focus:bg-white focus:border-emerald-500 
                   focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300" 
      />
      
      {/* Search Icon */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                      group-focus-within:text-emerald-500 transition-colors duration-300 pointer-events-none">
        <FiSearch size={18} />
      </div>
    </div>
  );
}

export default Search;