import React, { useState, useEffect } from "react";
import TableDropdown from "../Dropdowns/TableDropDown";
import { loadTablesApi } from "../../../Api";
import Swal from "sweetalert2";
import { Database, X, FileText } from "lucide-react";

const DbDataPreviewPopup = ({ dbType, onClose, DbResponse }) => {
  const [selectedTable, setSelectedTable] = useState([]);
  const [LoadedTable, setLoadedTable] = useState([]);
  const [tablePreview, setTablePreview] = useState({});

  const handleTableSelection = (table) => {
    setSelectedTable((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
    );
  };

  const getPreviewByFileName = (fileName) => {
    const previewData = tablePreview[fileName] || [];

    if (previewData.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No Preview Available",
        text: `No preview data found for ${fileName}.`,
        confirmButtonText: "OK",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2",
        },
      });
      return;
    }

    // Calculate the number of columns
    const columnCount = Object.keys(previewData[0]).length;

    // Dynamic width calculation
    const minWidthPerColumn = 12; // Minimum width per column in vw
    let modalWidth = columnCount * minWidthPerColumn; // Adjust based on number of columns
    modalWidth = Math.min(modalWidth, 80); // Ensure it doesn't exceed 80vw

    const tableHtml = `
        <div style="max-height: 400px; max-width: ${modalWidth}vw; overflow-x: auto; overflow-y-scroll scrollbar-hide; border-radius: 12px; padding: 5px; background: #f8f9fa;">
          <table style="width: max-content; border-collapse: collapse; text-align: left; font-family: Arial, sans-serif; font-size: 14px;">
            <thead style="position: sticky; top: 0; background-color: #2563eb; color: white; z-index: 1;">
              <tr>
                ${Object.keys(previewData[0])
                  .map(
                    (key) =>
                      `<th style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-transform: capitalize; min-width: 150px; white-space: nowrap;">${key}</th>`
                  )
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${previewData
                .map(
                  (row, index) => `
                    <tr style="background-color: ${
                      index % 2 === 0 ? "#ffffff" : "#f3f4f6"
                    }; transition: background 0.3s;">
                      ${Object.values(row)
                        .map(
                          (value) =>
                            `<td style="padding: 10px; border: 1px solid #ddd; min-width: 150px; white-space: nowrap;">${value}</td>`
                        )
                        .join("")}
                    </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>`;

    Swal.fire({
      title: `Preview of ${fileName}`,
      html: tableHtml,
      width: `${modalWidth}vw`, // Dynamically set width
      confirmButtonText: "Close",
      customClass: {
        popup: "rounded-xl shadow-2xl",
        title: "text-xl font-bold text-blue-700",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-colors",
      },
    });
  };

  const handleRemoveTable = (indexToRemove) => {
    const fileToRemove = LoadedTable[indexToRemove];

    Swal.fire({
      title: "Remove Table",
      text: "Are you sure you want to remove this table?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      width: "400px", // consistent fixed width
      customClass: {
        popup: "rounded-2xl h-[300px] w-[400px] shadow-lg", // height can be controlled with Tailwind-like utility
        title: "text-lg font-semibold text-gray-800",
        htmlContainer: "text-sm text-gray-600",
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white rounded-lg px-5 py-2",
        cancelButton:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg px-5 py-2",
        actions: "flex justify-center gap-3 mt-3",
      },
      didOpen: () => {
        // Optional: custom CSS-in-JS adjustments if needed
        const popup = Swal.getPopup();
        popup.style.maxHeight = "320px"; // control max height
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadedTable((prev) =>
          prev.filter((_, index) => index !== indexToRemove)
        );
        setSelectedTable((prev) =>
          prev.filter((_, index) => index !== indexToRemove)
        );
        setTablePreview((prev) => {
          const updatedPreview = { ...prev };
          delete updatedPreview[fileToRemove];
          return updatedPreview;
        });
      }
    });
  };

  useEffect(() => {
    const loadTables = async () => {
      if (Array.isArray(selectedTable) && selectedTable.length > 0) {
        const response = await loadTablesApi(selectedTable);
        if (response) {
          setLoadedTable(response.tables || []);
          setTablePreview((prev) => ({
            ...prev,
            ...response.previews,
          }));
        }
      } else {
        setLoadedTable([]);
      }
    };
    loadTables();
  }, [selectedTable]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[70vw] max-w-3xl h-[50vh] relative flex flex-col">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          <span className="capitalize">{dbType}</span> is connected
          successfully.
        </h2>

        {/* Flex row for dropdown + loaded tables */}
        <div className="flex gap-6 flex-grow overflow-hidden">
          <div className="w-1/3">
            <TableDropdown
              DbResponse={DbResponse}
              handleTableSelection={handleTableSelection}
              selectedTable={selectedTable}
            />
          </div>

          {/* Loaded Tables */}
          <div
            className="w-2/3 bg-white shadow-inner rounded-xl border border-gray-200 px-4 flex flex-col gap-3 overflow-y-auto"
            style={{ fontSize: "clamp(10px, 2vw, 16px)" }}
          >
            {LoadedTable.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full py-4 text-gray-500">
                <FileText className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-base sm:text-lg font-medium text-center">
                  No Tables Loaded
                </p>
              </div>
            ) : (
              <table className="w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-300 sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-2 text-gray-700 text-sm sm:text-base">
                      Table Name
                    </th>
                    <th className="text-left px-4 py-2 text-gray-700 text-sm sm:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {LoadedTable.map((table, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-2 text-gray-800 font-medium truncate max-w-[200px]">
                        {table}
                      </td>
                      <td className="px-4 py-2 flex items-center gap-4">
                        {/* Preview icon */}
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          onClick={() => {
                            console.log("Table : ", table);
                            console.log("Data Preview : ", tablePreview);
                            getPreviewByFileName(table);
                          }}
                        >
                          <FileText className="w-5 h-5" />
                        </button>

                        {/* Delete icon */}
                        <button
                          onClick={() => handleRemoveTable(index)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DbDataPreviewPopup;
