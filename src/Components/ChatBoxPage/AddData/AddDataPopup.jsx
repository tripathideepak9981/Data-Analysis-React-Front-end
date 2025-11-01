import { useState, useRef, useEffect } from "react";
import HelpTooltip from "./HelpTooltip";
import "../../../CoustomCss/LoadingButton.css";
import { suggestedQueryResponse } from "../../../Api";
import {
  uploadFilesAPI,
  cleanFile,
  cancel_clean_file,
  deleteTable,
} from "../../../Api";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import ConnectDatabaseSection from "./ConnectDatabaseConnection";
import StaticFilesSection from "./StaticFilesSection";
import { FaLinesLeaning } from "react-icons/fa6";

const AddDataPopup = ({ setSuggestionQuery, closeAddDataPopup }) => {
  const [fileCleaning, setFileCleaning] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isCleaning, setIsCleaning] = useState();
  const [activeTab, setActiveTab] = useState("static");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showEyeHint, setShowEyeHint] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const showNotifications = (title, text) => {
    setNotification({
      visible: true,
      title,
      text,
    });
  };

  const [tablePreview, setTablePreview] = useState(() => {
    const stored = localStorage.getItem("previews");
    return stored ? JSON.parse(stored) : {};
  });

  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const stored = localStorage.getItem("uploadedFiles");
    return stored ? JSON.parse(stored) : [];
  });

  const [cleaningSummary, setCleaningSummary] = useState(null);

  const fileInputRef = useRef(null);
  const [card, setCard] = useState();
  const [notification, setNotification] = useState({
    visible: false,
    title: "",
    text: "",
  });

  // ... keep existing code (all useEffect hooks and other functions remain the same)
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    setShowEyeHint(true);
    const timeout = setTimeout(() => setShowEyeHint(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    localStorage.setItem("previews", JSON.stringify(tablePreview));
  }, [tablePreview]);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const ShowAlert = () => {
    if (!responseData?.files[0]?.table_name) {
      console.error("Invalid responseData:", responseData);
      Swal.fire("Error", "Invalid table data. Please try again.", "error");
      return;
    }

    setShowModal(true);
  };
  const handleConfirm = async () => {
    setFileCleaning(true);
    setIsCleaning(true);
    setShowModal(false);
    try {
      queueMicrotask(() => setIsCleaning(true));
      const cleanTableResponse = await cleanFile(
        responseData.files[0].table_name
      );
      setIsCleaning(false);
      if (cleanTableResponse.status === "cleaned") {
        setShowNotification(true);
        setCard("clean");
        storeFilePreviews(cleanTableResponse);
        setUploadedFiles((prev) => [
          ...prev,
          {
            name: responseData.files[0].table_name,
            createdDate: new Date().toISOString().split("T")[0],
          },
        ]);
      } else {
        throw new Error(cleanTableResponse.message || "Cleaning File failed");
      }
    } catch (error) {
      console.error(error);
      showNotifications("Error", "Error in cleaning File, Try again Later!");
    } finally {
      setSelectedFiles([]);
      setIsCleaning(false);
      setShowModal(false);
    }
  };

  const handleCancel = async () => {
    setFileCleaning(false);
    setIsCleaning(true);
    setShowModal(false);
    try {
      queueMicrotask(() => setIsCleaning(true));
      const cancelResponse = await cancel_clean_file(
        responseData.files[0].table_name
      );
      setIsCleaning(false);
      if (cancelResponse.status === "saved raw") {
        storeFilePreviews(cancelResponse);
        setUploadedFiles((prev) => [
          ...prev,
          {
            name: responseData.files[0].table_name,
            createdDate: new Date().toISOString().split("T")[0],
          },
        ]);
        setShowNotification(true);
        setCard("cancel");
      } else {
        setSelectedFiles([]);
        throw new Error(cancelResponse.message || "Cancellation failed");
      }
    } catch (error) {
      console.error(error);
      showNotifications("Error", "Error in saving file, Try again Later!");
    } finally {
      setSelectedFiles([]);
      setIsCleaning(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (cleaningSummary) {
      ShowAlert();
    }
  }, [cleaningSummary]);

  const storeFilePreviews = (data) => {
    setTablePreview((prev) => ({
      ...prev,
      [data.table_name]: data.preview,
    }));
  };

  const handleRemoveFile = (indexToRemove) => {
    const fileToRemove = uploadedFiles[indexToRemove].name;
    Swal.fire({
      title:
        '<p class="text-lg font-semibold text-gray-800">Remove this file?</p>',
      html: '<p class="text-sm text-gray-600">Are you sure you want to remove the file.</p>',
      icon: "warning",
      showCancelButton: true,
      width: "22rem",
      padding: "1rem",
      background: "#fff",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl shadow-md",
        title: "text-center",
        htmlContainer: "text-center",
        confirmButton:
          "bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 focus:outline-none",
        cancelButton:
          "bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-300 focus:outline-none ml-2",
        actions: "flex justify-center gap-2 mt-4",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsDeleting(true);

          await deleteTable(fileToRemove);

          const updatedUploadedFiles = uploadedFiles.filter(
            (_, i) => i !== indexToRemove
          );
          setUploadedFiles(updatedUploadedFiles);

          const updatedSelectedFiles = selectedFiles.filter(
            (_, i) => i !== indexToRemove
          );
          setSelectedFiles(updatedSelectedFiles);

          setTablePreview((prevPreview) => {
            const newPreview = { ...prevPreview };
            delete newPreview[fileToRemove];
            return newPreview;
          });

          const storedUploadedFiles = JSON.parse(
            localStorage.getItem("uploadedFiles") || "[]"
          );
          const newStoredFiles = storedUploadedFiles.filter(
            (file) => file.name !== fileToRemove
          );
          localStorage.setItem("uploadedFiles", JSON.stringify(newStoredFiles));

          const storedPreviews = JSON.parse(
            localStorage.getItem("previews") || "{}"
          );
          delete storedPreviews[fileToRemove];
          localStorage.setItem("previews", JSON.stringify(storedPreviews));

          Swal.fire({
            icon: "success",
            title:
              '<p class="text-base font-medium text-green-700">Removed!</p>',
            html: `<p class="text-sm text-gray-600">"${fileToRemove}" was removed successfully.</p>`,
            timer: 3000,
            width: "22rem",
            showConfirmButton: false,
            background: "#f0fdf4",
            customClass: {
              popup: "rounded-xl shadow-md p-4",
              title: "text-center",
              htmlContainer: "text-center",
            },
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title:
              '<p class="text-base font-medium text-red-700">Failed to delete</p>',
            html: `<p class="text-sm text-gray-600">${
              err.message || "Something went wrong."
            }</p>`,
            width: "22rem",
            background: "#fef2f2",
            confirmButtonText: "Okay",
            customClass: {
              popup: "rounded-xl shadow-md p-4",
              title: "text-center",
              htmlContainer: "text-center",
              confirmButton:
                "bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 focus:outline-none",
            },
          });
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };
  const handleFileUpload = async (event) => {
    const input = event.target;
    const files = Array.from(input.files || event.dataTransfer.files);
    input.value = null;

    if (uploadedFiles.length + files.length > 3) {
      setNotification({
        visible: true,
        title: "error",
        text: "Only 3 files can be uploaded.",
      });
      return;
    }

    const allowedExtensions = [".csv", ".xlsx", ".xls"];
    const invalidFiles = [];

    // Basic file checks before API call
    for (const file of files) {
      const fileExtension = file.name
        .slice(file.name.lastIndexOf("."))
        .toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        invalidFiles.push(`Unsupported file type: ${file.name}`);
        continue;
      }

      if (file.name.length > 40) {
        invalidFiles.push(`Filename too long (MAX: 20 charcter): ${file.name}`);
        continue;
      }

      if (file.size === 0) {
        invalidFiles.push(`Empty file selected: ${file.name}`);
        continue;
      }

      if (file.size > 20 * 1024 * 1024) {
        invalidFiles.push(`File size exceeds 20 MB: ${file.name}`);
        continue;
      }

      // Try reading file to detect corruption (basic)
      try {
        await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve();
          reader.onerror = () => reject(new Error("Corrupted file"));
          reader.readAsArrayBuffer(file);
        });
      } catch (e) {
        invalidFiles.push(`Corrupted file: ${file.name}`);
      }
    }

    if (invalidFiles.length > 0) {
      showNotifications("Error", invalidFiles.join("\n"));
      return;
    }

    const newFiles = files.filter(
      (file) =>
        !uploadedFiles.some((fileObj) => fileObj.name === file.name) &&
        !selectedFiles.some((selected) => selected.name === file.name)
    );

    if (newFiles.length === 0) {
      showNotifications("Error", "Duplicate files are not allowed.");
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    queueMicrotask(() => {
      setIsLoading(true);
    });

    try {
      const data = await uploadFilesAPI(newFiles);
      const uploadedTableName = data.files[0]?.table_name;

      const isDuplicate = uploadedFiles.some(
        (f) => f.name === uploadedTableName
      );

      if (isDuplicate) {
        showNotifications("Error", "This file has already been uploaded.");
        return;
      }

      const response = await suggestedQueryResponse();
      if (response) {
        console.log("From add Data ", response);
        setSuggestionQuery(response);
      }

      setResponseData(data);
      setTablePreview((prevPreview) => ({
        ...prevPreview,
        ...data,
      }));
      setSelectedFiles([]);

      if (data.files.length !== newFiles.length) {
        showNotifications(
          "Error",
          "Some files were not uploaded successfully."
        );
      }
    } catch (error) {
      setSelectedFiles([]);
      showNotifications(
        "Error",
        "Something went wrong on the server, try again later."
      );
    } finally {
      input.value = null;
      setSelectedFiles([]);
      setIsLoading(false);
    }
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

    const columnCount = Object.keys(previewData[0]).length;
    const minWidthPerColumnVW = 1;
    let modalWidth = columnCount * minWidthPerColumnVW;

    modalWidth = Math.max(modalWidth, 40);
    modalWidth = Math.min(modalWidth, 50);
    const modalHeight = "calc(100vh - 80px)";

    const tableHtml = `
      <style>
        .swal2-popup {
          margin: 0;
          position: fixed !important;
          top: 0px;
          right: 0px;
          left: auto;
          transform: none !important;
          padding: 0;
        }
        .custom-header {
          display: flex;
          align-items: start;
          background: #fff;
          padding: 16px 20px 12px 20px;
          border-bottom: 1px solid #ddd;
          position: relative;
        }
        .custom-header .close-icon {
          font-size: 20px;
          color: #555;
          cursor: pointer;
          margin-right: 16px;
        }
        .custom-header .close-icon:hover {
          color: #2d1b54;
        }
        .custom-header .title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .custom-header .flex-grow {
          flex-grow: 1;
        }
        .custom-header .stats {
          margin-top: 4px;
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          white-space: nowrap;
        }
      </style>
  
      <div class="custom-header">
        <div id="custom-close-icon" class="close-icon">&#10005;</div>
        <div class="title">Data preview</div>
        <div class="flex-grow"></div>
        <div class="stats">Total Rows = ${
          previewData.length
        } , Total Columns =  ${columnCount}</div>
      </div>
  
      <div class="scrollbar-xy rounded-xl bg-[#f3f4fb] overflow-auto" style="height:${modalHeight};">
        <table class="border-collapse text-sm font-sans w-max min-w-full">
          <thead class="sticky top-0 z-10">
            <tr>
              ${Object.keys(previewData[0])
                .map(
                  (key) => `
                  <th class="bg-gray-400 text-gray-800 font-semibold text-left capitalize border border-gray-300 px-4 py-3 min-w-[150px] whitespace-nowrap">
                    <i class="fa fa-tag mr-1"></i>${key}
                  </th>`
                )
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${previewData
              .map(
                (row, rowIndex) => `
                <tr class="${
                  rowIndex % 2 === 0 ? "bg-[#f9fafb]" : "bg-white"
                } hover:bg-indigo-100">
                  ${Object.values(row)
                    .map(
                      (value) => `
                      <td class="border border-gray-300 px-4 py-2 min-w-[150px] whitespace-nowrap transition-colors">
                        ${value}
                      </td>`
                    )
                    .join("")}
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    Swal.fire({
      html: tableHtml,
      width: "60vw",
      showConfirmButton: false,
      customClass: {
        popup: "rounded-xl shadow-2xl relative",
      },
      backdrop: false,
      didOpen: () => {
        const closeIcon = document.getElementById("custom-close-icon");
        if (closeIcon) {
          closeIcon.addEventListener("click", () => Swal.close());
        }
      },
    });
  };

  useEffect(() => {
    if (responseData?.files?.[0]?.cleaning_summary) {
      setCleaningSummary(responseData.files[0].cleaning_summary);
    }
  }, [responseData, setCleaningSummary]);

  const handleDropBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 border border-gray-200/50 shadow-xl rounded-sm">
      {/* ✅ Fixed Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200/80 backdrop-blur-sm">
        <div className="flex items-center px-8 pt-4">
          <h1 className="text-3xl font-bold text-gray-900 pr-4 pt-1">
            Data Sources
          </h1>
          <HelpTooltip content="Connect external data sources to pull data directly into your analysis. You can connect to databases, APIs, and other data sources." />
        </div>

        <div className="flex flex-row px-6 py-1">
          <button
            onClick={() => setActiveTab("static")}
            className={`relative px-6 py-4 font-semibold text-sm transition-all duration-300 ${
              activeTab === "static"
                ? "text-blue-700 border-b-2 border-blue-500 bg-blue-50/50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>📁</span>
              My Static Files
            </div>
          </button>

          <button
            onClick={() => setActiveTab("connected")}
            className={`relative px-6 py-4 font-semibold text-sm transition-all duration-300 ${
              activeTab === "connected"
                ? "text-blue-700 border-b-2 border-blue-500 bg-blue-50/50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>🗄️</span>
              Connected Data Sources
            </div>
          </button>
        </div>
      </div>

      {/* ✅ Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-3 scrollbar-hide">
        {activeTab === "static" && (
          <StaticFilesSection
            setShowNotification={setShowNotification}
            fileCleaning={fileCleaning}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            handleDropBoxClick={handleDropBoxClick}
            uploadedFiles={uploadedFiles}
            handleRemoveFile={handleRemoveFile}
            getPreviewByFileName={getPreviewByFileName}
            isCleaning={isCleaning}
            isLoading={isLoading}
            isDeleting={isDeleting}
            showEyeHint={showEyeHint}
            searchTerm={searchTerm}
            showModal={showModal}
            setShowModal={setShowModal}
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
            cleaningSummary={cleaningSummary}
            notification={notification}
            setNotification={setNotification}
            showNotification={showNotification}
            card={card}
          />
        )}

        {activeTab === "connected" && (
          <ConnectDatabaseSection
            setIsPopupOpen={setIsPopupOpen}
            isPopupOpen={isPopupOpen}
          />
        )}
      </div>

      {/* ✅ Fixed Bottom Button */}
      <div className="flex justify-end px-8 py-4 border-t bg-white sticky bottom-0">
        <button
          onClick={closeAddDataPopup}
          className="flex items-center gap-2 px-5 py-1.5 rounded-lg 
         bg-gradient-to-r from-blue-400 via-sky-500 to-blue-400
         text-white font-semibold shadow-md
         hover:from-blue-600 hover:via-sky-600 hover:to-blue-700
         hover:shadow-lg hover:-translate-y-0.5
         active:scale-95 active:shadow-inner
         transition-all duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddDataPopup;
