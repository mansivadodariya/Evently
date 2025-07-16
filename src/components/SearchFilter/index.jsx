import React from "react";
import { FaSearch } from "react-icons/fa";
import { STRINGS } from "../../constant/strings";

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
}) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
      <div className="relative w-full md:w-1/3">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder={STRINGS.SEARCH_FILTER.PLACEHOLDER}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
        />
      </div>

      <div className="flex gap-2">
        {STRINGS.SEARCH_FILTER.FILTERS.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-medium transition 
    ${
      filterType === type
        ? "text-white bg-gradient-to-r from-[#8F87F1] via-[#C68EFD] to-[#E9A5F1]"
        : "text-gray-400 bg-[#F3ECFE] hover:bg-[#E9DAFD]"
    }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
