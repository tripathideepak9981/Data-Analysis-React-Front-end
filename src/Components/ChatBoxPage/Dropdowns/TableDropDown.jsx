import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

const TableDropdown = ({ DbResponse, selectedTable, handleTableSelection }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  const filteredTables = (DbResponse?.tables || [])
    .filter((table) => table.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const aSelected = selectedTable.includes(a);
      const bSelected = selectedTable.includes(b);
      return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
    });

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <div className="flex items-center border border-gray-300 bg-white rounded-xl shadow-sm sm:p-3">
        <Search className="text-gray-500 mr-2 w-4 h-4 sm:w-6 sm:h-6" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search table..."
          className="w-full outline-none text-gray-800 text-sm sm:text-base placeholder-gray-500 bg-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Dropdown Always Visible */}
      <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-[7.5rem] overflow-y-auto z-50">
        {filteredTables.length > 0 ? (
          filteredTables.map((table) => (
            <label
              key={table}
              className="flex items-center justify-between gap-2 px-3 py-2 border-b last:border-none hover:bg-blue-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTable.includes(table)}
                onChange={() => handleTableSelection(table)}
                className="accent-blue-600"
              />
              <span className="text-sm sm:text-base text-gray-800 truncate w-full">
                {table}
              </span>
            </label>
          ))
        ) : (
          <p className="px-3 py-2 text-sm sm:text-base text-gray-500 text-center italic">
            No tables found
          </p>
        )}
      </div>
    </div>
  );
};

export default TableDropdown;
