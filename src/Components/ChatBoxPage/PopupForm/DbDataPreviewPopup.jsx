import { useEffect, useState } from "react";
import TableDropdown from "../Dropdowns/TableDropDown";
import Swal from "sweetalert2";
import { X, FileText } from "lucide-react";
import CustomNotificationCard from "../../Card/CustomNotificationCard";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSelectTable,
  removeTable,
  fetchTables,
} from "../../../store/tablesSlice";

const DbDataPreviewPopup = ({ dbType, onClose, DbResponse }) => {
  const dispatch = useDispatch();

  const selectedTable = useSelector((state) => state.tables.selectedTable);
  const LoadedTable = useSelector((state) => state.tables.LoadedTable);
  const tablePreview = useSelector((state) => state.tables.tablePreview);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const [loadingTable, setLoadingTable] = useState(null);

  const handleTableSelection = (table) => {
    dispatch(toggleSelectTable(table));
  };

  // ⏰ Auto-hide notifications after 3 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
        setNotificationMessage("");
        setNotificationStatus("");
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

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
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-white",
        },
      });
      return;
    }

    const columnCount = Object.keys(previewData[0]).length;
    const minWidthPerColumn = 12;
    let modalWidth = Math.min(columnCount * minWidthPerColumn, 80);

    const tableHtml = `
      <div style="max-height: 400px; max-width: ${modalWidth}vw; overflow-x: auto; overflow-y: scroll; border-radius: 12px; padding: 8px; background: #f9fafb;">
        <table style="width: max-content; border-collapse: collapse; font-family: Inter, sans-serif; font-size: 14px;">
          <thead style="position: sticky; top: 0; background-color: #2563eb; color: white;">
            <tr>
              ${Object.keys(previewData[0])
                .map(
                  (key) =>
                    `<th style="padding: 10px 12px; border: 1px solid #ddd; font-weight: 600; text-transform: capitalize; min-width: 150px;">${key}</th>`
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
                }; ">
                  ${Object.values(row)
                    .map(
                      (value) =>
                        `<td style="padding: 8px 10px; border: 1px solid #ddd; min-width: 150px;">${value}</td>`
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
      width: `${modalWidth}vw`,
      confirmButtonText: "Close",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        title: "text-lg font-semibold text-blue-700",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 transition",
      },
    });
  };

  const handleRemoveTable = (indexToRemove) => {
    Swal.fire({
      title: "Remove Table",
      text: "Are you sure you want to remove this table?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTable(indexToRemove));
      }
    });
  };

  useEffect(() => {
    if (!selectedTable || selectedTable.length === 0) return;

    const alreadyFetched = tablePreview[selectedTable];
    if (alreadyFetched && alreadyFetched.length > 0) return;

    // 🌀 Show loading animation
    setLoadingTable(selectedTable);

    dispatch(fetchTables(selectedTable))
      .unwrap()
      .then(() => {
        setLoadingTable(null); // ✅ stop loading
        setNotificationStatus("Success");
        setNotificationMessage(`${selectedTable} table loaded successfully`);
        setShowNotification(true);
      })
      .catch(() => {
        setLoadingTable(null);
        setNotificationStatus("Error");
        setNotificationMessage(`Error loading ${selectedTable} table`);
        setShowNotification(true);
      });
  }, [selectedTable, tablePreview]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadeIn pl-[7vw]">
      <div className="bg-white/100 rounded-2xl shadow-2xl border border-gray-200 p-6 w-[72vw] max-w-4xl h-[60vh] relative flex flex-col transition-all duration-500">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center active:scale-95 transition-all"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        {/* Dynamic DB Icon and Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center gap-2">
          <span>
            {dbType === "mysql"
              ? "🐬"
              : dbType === "postgresql"
              ? "🐘"
              : dbType === "mongodb"
              ? "🍃"
              : dbType === "vertica"
              ? "💾"
              : "💻"}
          </span>
          <span className="capitalize">{dbType}</span> Connected Successfully
        </h2>

        <div className="w-full text-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-blue-700 border border-blue-100 rounded-lg py-2 mb-4 shadow-sm">
          <p className="text-sm sm:text-base font-medium">
            {selectedTable && selectedTable.length > 0 ? (
              <>
                ✅ Table is selected — now you can{" "}
                <span className="font-semibold">start analysis</span>.
              </>
            ) : (
              <>📊 First, select a table for analysis.</>
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 flex-grow overflow-hidden">
          {/* Left Panel */}
          <div className="sm:w-1/3 bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-xl border border-gray-200 p-4 shadow-inner">
            <TableDropdown
              DbResponse={DbResponse}
              handleTableSelection={handleTableSelection}
              selectedTable={selectedTable}
            />
          </div>

          {/* Notification */}
          {showNotification && (
            <CustomNotificationCard
              title={notificationStatus}
              text={notificationMessage}
              onClose={() => {
                setShowNotification(false);
                setNotificationMessage("");
                setNotificationStatus("");
              }}
            />
          )}

          {/* Right Panel */}
          <div className="sm:w-2/3 bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-inner flex flex-col gap-3 overflow-y-auto scrollbar-hide">
            {loadingTable ? (
              // 🌀 Loading animation
              <div className="flex flex-col items-center justify-center h-full text-gray-700">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mb-3"></div>
                <p className="text-base sm:text-lg font-medium">
                  "{selectedTable}" is loading, please wait...
                </p>
              </div>
            ) : LoadedTable.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FileText className="w-10 h-10 mb-2 opacity-50 animate-bounce" />
                <p className="text-base sm:text-lg font-medium text-center">
                  No Tables Loaded Yet
                </p>
              </div>
            ) : (
              <table className="w-full border border-gray-200 rounded-lg text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="text-left px-4 py-2 text-gray-700 font-medium">
                      Table Name
                    </th>
                    <th className="text-left px-4 py-2 text-gray-700 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {LoadedTable.map((table, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-blue-50 transition-all"
                    >
                      <td className="px-4 py-2 text-gray-800 font-medium truncate max-w-[200px]">
                        {table}
                      </td>
                      <td className="px-4 py-2 flex items-center gap-4">
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          onClick={() => getPreviewByFileName(table)}
                        >
                          <FileText className="w-5 h-5" />
                        </button>
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
