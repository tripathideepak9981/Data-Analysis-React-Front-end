import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { avilableTables, joinTables } from "../../../Api";
import CustomNotificationCard from "../../Card/CustomNotificationCard";
import { MdJoinLeft } from "react-icons/md";
import { MdJoinRight } from "react-icons/md";
import { MdJoinInner } from "react-icons/md";
import { MdJoinFull } from "react-icons/md";

const Dropdown = ({
  selectedTable,
  selectedColumn,
  setSelectedTable,
  setSelectedColumn,
  tables,
}) => (
  <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-[22vw] space-y-4">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Table
      </label>
      <select
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        value={selectedTable}
        onChange={(e) => {
          setSelectedTable(e.target.value);
          setSelectedColumn("");
        }}
      >
        <option value="">Select table</option>
        {tables.map((table) => (
          <option key={table.table_name} value={table.table_name}>
            {table.table_name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Column
      </label>
      <select
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
      >
        <option value="">Select column</option>
        {(
          tables.find((t) => t.table_name === selectedTable)?.columns || []
        ).map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const PopupJoin = ({ closeOpenedPopupJoin }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [leftTable, setLeftTable] = useState("");
  const [leftColumn, setLeftColumn] = useState("");
  const [rightTable, setRightTable] = useState("");
  const [rightColumn, setRightColumn] = useState("");
  const [joinType, setJoinType] = useState("INNER");
  const [newTableName, setNewTableName] = useState("");
  const [tables, setTables] = useState([]);
  const [message, setMessage] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await avilableTables();
        setTables(response);
        console.log(response);

        if (Array.isArray(response) && response.length === 0) {
          setMessageTitle("error");
          setMessage("No data is available, first add data!");
        } else {
          setMessageTitle("");
          setMessage("");
        }
      } catch (error) {
        setMessageTitle("error");
        setMessage("Failed to load table data.");
      }
    };

    fetchTables();
  }, []);

  const handleCreateJoin = async () => {
    if (
      !leftTable ||
      !leftColumn ||
      !rightTable ||
      !rightColumn ||
      !newTableName
    ) {
      setMessageTitle("error");
      setMessage("Please fill out all fields before creating join.");
      return;
    }

    const payload = {
      table1: leftTable,
      table2: rightTable,
      join_column1: leftColumn,
      join_column2: rightColumn,
      join_type: joinType,
      new_table_name: newTableName.trim(),
      select_columns: [],
      limit: 10,
    };
    setIsLoading(true);
    try {
      const response = await joinTables(payload);
      console.log(response);
      if (response && response.preview.length > 0) {
        const storedUploadedFile = localStorage.getItem("uploadedFile");
        const storedTablePreview = localStorage.getItem("tablePreview");
        const newFile = {
          name: response.joined_table_name?.trim(),
          createdDate: new Date().toISOString().split("T")[0],
        };
        const existingFile = storedUploadedFile
          ? JSON.parse(storedUploadedFile)
          : [];
        const updatedFile = [...existingFile, newFile];
        localStorage.setItem("uploadedFile", JSON.stringify(updatedFile));
        const existingPreview = storedTablePreview
          ? JSON.parse(storedTablePreview)
          : {};
        existingPreview[response.joined_table_name.trim()] = response.preview;
        localStorage.setItem("tablePreview", JSON.stringify(existingPreview));
        setTimeout(() => {
          setMessageTitle("success");
          setMessage(
            "Joined table created. You can now run cross-table queries."
          );
        }, 2000);
      } else {
        setMessageTitle("error");
        setMessage("Join failed");
      }
    } catch (error) {
      console.error("Join failed:", error);
      setMessageTitle("error");
      setMessage("Join failed!", error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed -top-20 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
    >
      <Dialog.Panel className="relative bg-white px-6 py-4 md:px-8 md:py-4 w-[95vw] max-w-[55vw] rounded-xl shadow-xl flex flex-col gap-3">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => closeOpenedPopupJoin()}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Message */}
        {message && (
          <CustomNotificationCard
            title={messageTitle}
            text={message}
            onClose={() => {
              setMessage(null);
            }}
          />
        )}

        {/* Joined Table Name Input */}
        <div className="mt-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter Joined Table Name:
          </label>
          <input
            type="text"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            placeholder="e.g., orders_customers"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* Dropdowns and Join Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Dropdown
            selectedTable={leftTable}
            selectedColumn={leftColumn}
            setSelectedTable={setLeftTable}
            setSelectedColumn={setLeftColumn}
            tables={tables}
          />

          {/* Join Type */}
          <div className="flex flex-col items-center gap-3 mt-4 md:mt-0">
            <div className="w-12 h-12 bg-white border-4 border-gray-500 rounded-full flex items-center justify-center">
              {joinType === "INNER" && (
                <MdJoinInner className="w-6 h-6 text-gray-700" />
              )}
              {joinType === "LEFT" && (
                <MdJoinLeft className="w-6 h-6 text-gray-700" />
              )}
              {joinType === "RIGHT" && (
                <MdJoinRight className="w-6 h-6 text-gray-700" />
              )}
              {joinType === "FULL" && (
                <MdJoinFull className="w-6 h-6 text-gray-700" />
              )}
            </div>

            <select
              className="text-sm border border-indigo-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={joinType}
              onChange={(e) => setJoinType(e.target.value)}
            >
              <option value="INNER">INNER JOIN</option>
              <option value="LEFT">LEFT JOIN</option>
              <option value="RIGHT">RIGHT JOIN</option>
              <option value="FULL">FULL JOIN</option>
            </select>
          </div>

          <Dropdown
            selectedTable={rightTable}
            selectedColumn={rightColumn}
            setSelectedTable={setRightTable}
            setSelectedColumn={setRightColumn}
            tables={tables}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-0">
          <button
            onClick={handleCreateJoin}
            disabled={isLoading}
            className={`bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md transition text-sm font-medium 
              ${
                isLoading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-indigo-700"
              }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
                Creating Join...
              </div>
            ) : (
              "Create Join"
            )}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default PopupJoin;
