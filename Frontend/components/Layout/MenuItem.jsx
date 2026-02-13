import React from 'react';
import { FiChevronDown } from "react-icons/fi";

function MenuItem({ title, options = [] }) {
  return (
    <div className="relative group h-20 flex items-center">
      <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-emerald-600 text-sm font-semibold h-full relative 
                      after:absolute after:left-0 after:bottom-[-1px] after:h-[3px] after:w-0 group-hover:after:w-full after:bg-emerald-500 after:transition-all">
        <span>{title}</span>
        <FiChevronDown className="text-xs transition-transform group-hover:rotate-180" />
      </div>
      
      {/* Dropdown Menu */}
      <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-xl rounded-b-lg w-48 py-2 border border-gray-50 animate-in fade-in slide-in-from-top-2 duration-200">
        {options.map((opt, i) => (
          <a 
            key={i} 
            href="#" 
            className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
          >
            {opt}
          </a>
        ))}
      </div>
    </div>
  );
}

export default MenuItem;