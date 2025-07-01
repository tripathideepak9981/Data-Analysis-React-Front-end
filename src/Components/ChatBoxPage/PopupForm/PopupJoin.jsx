import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import {
  MdJoinLeft,
  MdJoinRight,
  MdJoinInner,
  MdJoinFull,
} from "react-icons/md";
import { avilableTables, joinTables } from "../../../Api";
import CustomNotificationCard from "../../Card/CustomNotificationCard";

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
        if (Array.isArray(response)) {
          setTables(response);
          if (response.length === 0) {
            setMessageTitle("error");
            setMessage("No data is available, first add data!");
          } else {
            setMessage("");
            setMessageTitle("");
          }
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
      if (response && response.preview?.length > 0) {
        const newFile = {
          name: response.joined_table_name?.trim(),
          createdDate: new Date().toISOString().split("T")[0],
        };

        const storedUploadedFile = localStorage.getItem("uploadedFile");
        const storedTablePreview = localStorage.getItem("tablePreview");

        const updatedFile = storedUploadedFile
          ? [...JSON.parse(storedUploadedFile), newFile]
          : [newFile];

        const existingPreview = storedTablePreview
          ? JSON.parse(storedTablePreview)
          : {};
        existingPreview[response.joined_table_name.trim()] = response.preview;

        localStorage.setItem("uploadedFile", JSON.stringify(updatedFile));
        localStorage.setItem("tablePreview", JSON.stringify(existingPreview));

        setTimeout(() => {
          setMessageTitle("success");
          setMessage(
            "Joined table created. You can now run cross-table queries."
          );
        }, 1500);
      } else {
        setMessageTitle("error");
        setMessage("Join failed");
      }
    } catch {
      setMessageTitle("error");
      setMessage("Join failed!");
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const JoinTypeIcon = {
    INNER: <MdJoinInner className="w-6 h-6 text-white" />,
    LEFT: <MdJoinLeft className="w-6 h-6 text-white" />,
    RIGHT: <MdJoinRight className="w-6 h-6 text-white" />,
    FULL: <MdJoinFull className="w-6 h-6 text-white" />,
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 w-[70vw] max-w-4xl rounded-xl shadow-2xl p-5 space-y-4 overflow-y-auto max-h-[95vh]">
        {/* ❌ Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          onClick={() => closeOpenedPopupJoin()}
        >
          <X className="w-6 h-6" />
        </button>

        {/* 🔔 Notification */}
        {message && (
          <CustomNotificationCard
            title={messageTitle}
            text={message}
            onClose={() => setMessage("")}
          />
        )}

        {/* 🔧 Header */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            {JoinTypeIcon[joinType]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Join</h2>
            <p className="text-sm text-gray-600">
              Combine data from multiple tables with join operations.
            </p>
          </div>
        </div>

        {/* 📛 New Table Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Joined Table Name
          </label>
          <input
            type="text"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            placeholder="e.g., orders_customers"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* 🔗 Join Builder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
          <DropdownSelector
            title="Left Table"
            tables={tables}
            selectedTable={leftTable}
            selectedColumn={leftColumn}
            setSelectedTable={setLeftTable}
            setSelectedColumn={setLeftColumn}
          />

          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md flex items-center justify-center">
              {JoinTypeIcon[joinType]}
            </div>
            <select
              value={joinType}
              onChange={(e) => setJoinType(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="INNER">INNER JOIN</option>
              <option value="LEFT">LEFT JOIN</option>
              <option value="RIGHT">RIGHT JOIN</option>
              <option value="FULL">FULL JOIN</option>
            </select>
          </div>

          <DropdownSelector
            title="Right Table"
            tables={tables}
            selectedTable={rightTable}
            selectedColumn={rightColumn}
            setSelectedTable={setRightTable}
            setSelectedColumn={setRightColumn}
          />
        </div>

        {/* 🚀 Submit Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleCreateJoin}
            disabled={isLoading}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg shadow-md transition text-sm font-medium ${
              isLoading ? "cursor-not-allowed opacity-70" : "hover:scale-105"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

// 🔽 Dropdown Selector Component
const DropdownSelector = ({
  title,
  tables,
  selectedTable,
  selectedColumn,
  setSelectedTable,
  setSelectedColumn,
}) => {
  const columns =
    tables.find((table) => table.table_name === selectedTable)?.columns || [];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 w-full space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {title}
        </label>
        <select
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500"
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Column
        </label>
        <select
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          disabled={!selectedTable}
        >
          <option value="">Select column</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PopupJoin;
