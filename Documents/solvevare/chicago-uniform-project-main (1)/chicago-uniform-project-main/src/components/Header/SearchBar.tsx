import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search for brand, color, etc."
        className="w-full py-2 pl-10 pr-4 rounded-full bg-[#333333] text-white border border-[#444444] focus:outline-none focus:border-green-500 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;