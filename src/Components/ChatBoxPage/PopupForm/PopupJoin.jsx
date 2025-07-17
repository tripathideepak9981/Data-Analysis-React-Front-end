import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import {
  MdJoinLeft,
  MdJoinRight,
  MdJoinInner,
  MdJoinFull,
} from "react-icons/md";
import { avilableTables, joinTables } from "../../../Api";

const PopupJoin = ({ closeOpenedPopupJoin }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [leftTable, setLeftTable] = useState("");
  const [leftColumn, setLeftColumn] = useState("");
  const [rightTable, setRightTable] = useState("");
  const [rightColumn, setRightColumn] = useState("");
  const [joinType, setJoinType] = useState("INNER");
  const [newTableName, setNewTableName] = useState("");
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState({});
  const newTableNameRef = useRef(null);
  const leftTableRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightTableRef = useRef(null);
  const rightColumnRef = useRef(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await avilableTables();
        if (Array.isArray(response)) {
          setTables(response);
        }
      } catch {
        console.error("Failed to load table data.");
      }
    };
    fetchTables();
  }, []);

  // useEffect(() => {
  //   if (message || typeof errors === "string") {
  //     const timer = setTimeout(() => {
  //       setMessage(null);
  //       if (typeof errors === "string") setErrors({});
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [message, errors]);

  const validateFields = () => {
    const newErrors = {};
    if (!newTableName.trim())
      newErrors.newTableName = "Joined table name is required.";
    if (!leftTable) newErrors.leftTable = "Left table is required.";
    if (!leftColumn) newErrors.leftColumn = "Left column is required.";
    if (!rightTable) newErrors.rightTable = "Right table is required.";
    if (!rightColumn) newErrors.rightColumn = "Right column is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField === "newTableName") newTableNameRef.current?.focus();
      else if (firstErrorField === "leftTable") leftTableRef.current?.focus();
      else if (firstErrorField === "leftColumn") leftColumnRef.current?.focus();
      else if (firstErrorField === "rightTable") rightTableRef.current?.focus();
      else if (firstErrorField === "rightColumn")
        rightColumnRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleCreateJoin = async () => {
    if (!validateFields()) return;

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

      if (response) {
        const newFile = {
          name: response.joined_table_name?.trim(),
          createdDate: new Date().toISOString().split("T")[0],
        };
        setMessage(response.message);
        const storedUploadedFile = localStorage.getItem("uploadedFiles");
        const storedTablePreview = localStorage.getItem("tablePreview");

        const updatedFile = storedUploadedFile
          ? [...JSON.parse(storedUploadedFile), newFile]
          : [newFile];

        const existingPreview = storedTablePreview
          ? JSON.parse(storedTablePreview)
          : {};
        existingPreview[response.joined_table_name.trim()] = response.preview;

        localStorage.setItem("uploadedFiles", JSON.stringify(updatedFile));
        localStorage.setItem("tablePreview", JSON.stringify(existingPreview));
      } else {
        console.error("Join failed");
        setErrors("Something went wrong on server, Join failed!");
      }
    } catch {
      setErrors("Something went wrong on server, Join failed!");
      console.error("Join failed!");
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
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

        {/* 🌟 Global Messages */}
        {(message || typeof errors === "string") && (
          <div
            className={`w-full px-4 py-2 rounded-md text-sm font-medium text-center ${
              message
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message || errors}
          </div>
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
            ref={newTableNameRef}
            type="text"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            placeholder="e.g., orders_customers"
            className={`w-full border rounded-md py-2 px-3 focus:ring-2 text-sm ${
              errors.newTableName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          {errors.newTableName && (
            <p className="text-red-500 text-xs mt-1">{errors.newTableName}</p>
          )}
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
            tableRef={leftTableRef}
            columnRef={leftColumnRef}
            errors={errors}
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
            tableRef={rightTableRef}
            columnRef={rightColumnRef}
            errors={errors}
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

const DropdownSelector = ({
  title,
  tables,
  selectedTable,
  selectedColumn,
  setSelectedTable,
  setSelectedColumn,
  tableRef,
  columnRef,
  errors,
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
          ref={tableRef}
          className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 ${
            errors[`${title.toLowerCase().split(" ")[0]}Table`]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
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
        {errors[`${title.toLowerCase().split(" ")[0]}Table`] && (
          <p className="text-red-500 text-xs mt-1">
            {errors[`${title.toLowerCase().split(" ")[0]}Table`]}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Column
        </label>
        <select
          ref={columnRef}
          className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 ${
            errors[`${title.toLowerCase().split(" ")[0]}Column`]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
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
        {errors[`${title.toLowerCase().split(" ")[0]}Column`] && (
          <p className="text-red-500 text-xs mt-1">
            {errors[`${title.toLowerCase().split(" ")[0]}Column`]}
          </p>
        )}
      </div>
    </div>
  );
};

export default PopupJoin;
