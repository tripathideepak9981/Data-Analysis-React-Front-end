import { useState, useRef, useEffect } from "react";
import { FaDatabase } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

import "../../../CoustomCss/LoadingButton.css";
import { suggestedQueryResponse } from "../../../Api";
import {
  Database,
  Server,
  Eye,
  Shield,
  Network,
  ExternalLink,
  Info,
} from "lucide-react";
import { SiMysql } from "react-icons/si";
import clsx from "clsx";
import { IoEye } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import {
  uploadFilesAPI,
  cleanFile,
  cancel_clean_file,
  deleteTable,
} from "../../../Api";
import Swal from "sweetalert2";
import PopupForm from "../PopupForm/PopupForm";
import DbDataPreviewPopup from "../PopupForm/DbDataPreviewPopup";
import CustomNotificationCard from "../../Card/CustomNotificationCard";
import ConfirmCleanModal from "../../Card/ConfirmCleanModal";
import { CheckCircle, Loader2 } from "lucide-react";
import excel from "../../../assets/excel.svg";
import { X } from "lucide-react";

const steps = [
  "Execution is in Progress",
  "Collecting data",
  "Cleaning data",
  "Storing data",
];

const mockFiles = [
  {
    name: "Coffee_Sales.csv",
    type: "excel",
  },
  {
    name: "Bitcoin_Whitepaper.pdf",
    type: "pdf",
  },
];

const AddDataPopup = ({
  setShowChatNotification,
  setSuggestionQuery,
  closeAddDataPopup,
}) => {
  // ... keep existing code (all state variables and hooks remain the same)
  const [isLoading, setIsLoading] = useState();
  const [isCleaning, setIsCleaning] = useState();
  const [activeTab, setActiveTab] = useState("static");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [fileCleaning, setFileCleaning] = useState();
  const [responseData, setResponseData] = useState(null);
  const [showEyeHint, setShowEyeHint] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [DbResponse, setDbResponse] = useState(() => {
    const stored = sessionStorage.getItem("DbResponse");
    return stored ? JSON.parse(stored) : {};
  });

  const showNotifications = (title, text) => {
    setNotification({
      visible: true,
      title,
      text,
    });
  };
  const [dbType, setDbType] = useState(() => {
    const stored = sessionStorage.getItem("DbType");
    return stored ? JSON.parse(stored) : {};
  });

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
  const [isDataPreviewPopupOpen, setIsDataPreviewPopupOpen] = useState(false);
  const [card, setCard] = useState();
  const [notification, setNotification] = useState({
    visible: false,
    title: "",
    text: "",
  });

  const DataProcessingLoader = () => {
    const dynamicSteps = fileCleaning
      ? steps
      : steps.filter((step) => step !== "Cleaning data");
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);

    useEffect(() => {
      if (currentStep < dynamicSteps.length) {
        const timer = setTimeout(() => {
          setCompletedSteps((prev) => [...prev, currentStep]);
          setCurrentStep((prev) => prev + 1);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [currentStep, dynamicSteps.length]);

    const allStepsDone = completedSteps.length === dynamicSteps.length;

    return (
      <div className="w-full max-w-md mx-auto mt-10 px-8 py-8 bg-gradient-to-br from-white via-blue-50 to-indigo-100 border border-blue-200/50 shadow-2xl rounded-3xl">
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-6">
          {dynamicSteps.map((step, index) => {
            const isCurrent = currentStep === index;
            const isCompleted = completedSteps.includes(index);
            const isLast = index === dynamicSteps.length - 1;

            return (
              <div key={index} className="relative flex items-center gap-5">
                {/* Connector Line */}
                {!isLast && (
                  <div className="absolute left-5 top-12 w-0.5 h-8 bg-gradient-to-b from-blue-300 to-indigo-400" />
                )}

                {/* Step Icon */}
                <div className="relative z-10">
                  {isCompleted ? (
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg">
                      <CheckCircle className="text-white" size={20} />
                    </div>
                  ) : isCurrent ? (
                    <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                      <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" />
                      <Loader2
                        className="text-white animate-spin z-10"
                        size={20}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full border-4 border-gray-100 shadow-inner" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <p
                    className={clsx(
                      "text-base font-semibold transition-all duration-500",
                      isCompleted
                        ? "text-green-700"
                        : isCurrent
                        ? "text-blue-700"
                        : "text-gray-500"
                    )}
                  >
                    {step}
                  </p>
                  {isCurrent && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full animate-pulse"
                        style={{ width: "60%" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allStepsDone && (
          <div className="mt-8 text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="inline-flex items-center gap-2 text-blue-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <p className="font-semibold">Finishing up... please wait</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ... keep existing code (all useEffect hooks and other functions remain the same)
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
        setShowChatNotification(true);
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
    sessionStorage.setItem("DbResponse", JSON.stringify(DbResponse));
  }, [DbResponse]);

  useEffect(() => {
    sessionStorage.setItem("DbType", JSON.stringify(dbType));
  }, [dbType]);

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
      Swal.fire("Error", error.message, "error");
    } finally {
      setSelectedFiles([]);
      setIsCleaning(false);
      setShowModal(false);
    }
  };

  const handleCancel = async () => {
    setIsCleaning(true);
    setFileCleaning(false);
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
      Swal.fire("Error", error.message, "error");
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
    if (uploadedFiles.length >= 3) {
      setNotification({
        visible: true,
        title: "error",
        text: "Only 3 files can be uploaded.",
      });
      return;
    }

    const oversizedFile = files.find((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFile) {
      showNotifications("Error", "File size exceeded the limit of 10 MB.");
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
      const uploadedTableName = data.files[0].table_name;

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
      showNotifications("Error", "Something wrong on server, try again later.");
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

  const UploadingLoadingEffect = () => {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 max-w-sm w-full mx-4">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin h-8 w-8 text-white relative z-10"
              >
                <circle
                  strokeWidth="3"
                  stroke="currentColor"
                  r="10"
                  cy="12"
                  cx="12"
                  className="opacity-25"
                ></circle>
                <path
                  d="M4 12a8 8 0 018-8v8H4z"
                  fill="currentColor"
                  className="opacity-75"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Uploading Files
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we process your files...
            </p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-pulse"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DeletingLoadingEffect = () => {
    return (
      <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 max-w-sm w-full mx-4">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-full animate-pulse"></div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin h-8 w-8 text-white relative z-10"
              >
                <circle
                  strokeWidth="3"
                  stroke="currentColor"
                  r="10"
                  cy="12"
                  cx="12"
                  className="opacity-25"
                ></circle>
                <path
                  d="M4 12a8 8 0 018-8v8H4z"
                  fill="currentColor"
                  className="opacity-75"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Removing File
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we remove the file...
            </p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full animate-pulse"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-y-scroll bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-2xl border border-gray-200/50 shadow-xl scrollbar-hide">
      {/* Enhanced Header with Tabs */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200/80 backdrop-blur-sm">
        <div className="flex flex-row px-6 py-1">
          {/* ❌ Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
            onClick={closeAddDataPopup}
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab("static")}
            className={`relative px-6 py-4 font-semibold text-sm transition-all duration-300 ${
              activeTab === "static"
                ? "text-blue-700 border-b-3 border-blue-500 bg-blue-50/50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              My Static Files
            </div>
          </button>
          <button
            onClick={() => setActiveTab("connected")}
            className={`relative px-6 py-4 font-semibold text-sm transition-all duration-300 ${
              activeTab === "connected"
                ? "text-blue-700 border-b-3 border-blue-500 bg-blue-50/50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <FaDatabase className="w-4 h-4" />
              Connected Data Sources
            </div>
          </button>
        </div>
      </div>

      {/* Static Files Tab Content */}
      {activeTab === "static" && (
        <div className="py-3 px-8 space-y-3">
          {/* Upload Section */}
          <div className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              multiple
              className="hidden"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
            />

            <div
              onClick={handleDropBoxClick}
              className="relative group max-w-lg mx-auto p-2 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:from-blue-100/60 hover:to-indigo-100/60 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Upload icon */}
              <div className="relative z-10 mb-2">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
              </div>

              {/* Upload text */}
              <div className="relative z-10 space-y-2">
                <p className="text-base font-semibold text-gray-800">
                  <span className="text-blue-600 underline hover:text-blue-700">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-gray-600">
                  Supports multiple files: CSV, XLSX, XLS
                </p>
                <p className="text-sm text-gray-500">
                  Maximum file size: 10 MB
                </p>
              </div>

              {/* Visual enhancements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-lg"></div>
            </div>
          </div>

          {/* Files Section */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100/80 px-6 py-3 border-b border-gray-200/60">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Available Files
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {uploadedFiles.length} files
                  </span>
                </div>
              </div>
            </div>

            {/* Loading States */}
            {isCleaning && (
              <div className="fixed inset-0 bg-black/50 flex justify-center -top-20 items-center z-50">
                <DataProcessingLoader fileCleaning={fileCleaning} />
              </div>
            )}
            {isLoading && <UploadingLoadingEffect />}
            {isDeleting && <DeletingLoadingEffect />}

            {/* Files Table */}
            <div className="min-h-[20vh]">
              {uploadedFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-start py-8 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    No files uploaded yet
                  </h4>
                  <p className="text-base text-gray-500">
                    Start by uploading your first file above
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div
                    className={`${
                      uploadedFiles.filter((file) =>
                        file?.name
                          ?.toLowerCase()
                          .includes((searchTerm || "").toLowerCase())
                      ).length > 3
                        ? "max-h-[40vh] overflow-y-auto"
                        : ""
                    }`}
                  >
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200/80 border-b border-gray-200 sticky top-0 z-10">
                        <tr>
                          <th className="px-8 py-2 text-left text-sm font-bold text-gray-800 tracking-wide">
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              File Name
                            </div>
                          </th>
                          <th className="px-6 py-2 text-left text-sm font-bold text-gray-800 tracking-wide">
                            <div className="flex items-center gap-2">
                              {/* <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3a2 2 0 012-2h6l2 2h6a2 2 0 012 2v4M8 7l4 8 4-8M8 7h16"
                                />
                              </svg> */}
                              Upload Date
                            </div>
                          </th>
                          <th className="px-6 py-2 text-left text-sm font-bold text-gray-800 tracking-wide">
                            <div className="flex items-center gap-2">
                              Actions
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {uploadedFiles
                          .filter((file) =>
                            file?.name
                              ?.toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((file, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200"
                            >
                              <td className="px-8 py-2">
                                <div className="flex items-center gap-4">
                                  <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                                      <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900 break-words max-w-xs">
                                      {file.name}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                  {/* <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3a2 2 0 012-2h6l2 2h6a2 2 0 012 2v4M8 7l4 8 4-8M8 7h16"
                                    />
                                  </svg> */}
                                  <span className="text-sm text-gray-700 font-medium">
                                    {file.createdDate}
                                  </span>
                                </div>
                              </td>

                              <td className="px-6 py-5">
                                <div className="flex items-center gap-4">
                                  <div className="relative group">
                                    {showEyeHint && (
                                      <div className="absolute left-[-152px] top-[8px] -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap z-20 animate-bounce">
                                        Click here to Preview
                                        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rotate-45"></div>
                                      </div>
                                    )}
                                    <button
                                      onClick={() =>
                                        getPreviewByFileName(file.name)
                                      }
                                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group-hover:scale-110"
                                      title="Preview file"
                                    >
                                      <IoEye className="w-5 h-5" />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                    title="Delete file"
                                  >
                                    <MdDeleteForever className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modals and Notifications - keeping existing functionality */}
          <ConfirmCleanModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            cleaningSummary={cleaningSummary}
          />

          {notification.visible && (
            <CustomNotificationCard
              title={notification.title}
              text={notification.text}
              onClose={() =>
                setNotification({ visible: false, title: "", text: "" })
              }
            />
          )}

          {showNotification &&
            (card === "clean" ? (
              <CustomNotificationCard
                title="Data Cleaned!"
                text="Your Data has been cleaned and stored, Successfully"
                onClose={() => setShowNotification(false)}
              />
            ) : (
              <CustomNotificationCard
                title="You choose Skip! now"
                text="Your data has been stored, Successfully"
                onClose={() => setShowNotification(false)}
              />
            ))}
        </div>
      )}
      {activeTab === "connected" && (
        <div className="px-6 py-4 overflow-y-scroll scrollbar-hide bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Database Connection Cards */}
            <div className="lg:col-span-2 space-y-2">
              <div className="mb-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  Connect Database
                </h2>
                <p className="text-gray-600">
                  Choose your database provider to establish a connection
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* PostgreSQL Card */}
                <div className="group bg-white border border-gray-200 rounded-2xl px-6 py-3 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10  bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Database className="h-7 w-7 text-emerald-600  " />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          PostgreSQL
                        </h3>
                        <p className="text-sm text-gray-500">
                          Advanced open source database
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setDbType("postgresql");
                        setIsPopupOpen(true);
                      }}
                      className="w-10 h-10  transition-all duration-200 flex items-center justify-center   "
                      title="Connect PostgreSQL"
                    >
                      <CiCirclePlus className="w-8 h-8 text-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 hover:scale-110  hover:from-emerald-600 hover:to-teal-700" />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsDataPreviewPopupOpen(true)}
                    disabled={dbType !== "postgresql" && DbResponse !== null}
                    className={`w-full px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      dbType === "postgresql"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow-lg hover:shadow-xl"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Data Preview
                  </button>
                </div>

                {/* MySQL Card */}
                <div className="group bg-white border border-gray-200 rounded-2xl px-6 py-3 hover:shadow-xl hover:border-rose-300 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Server className="h-7 w-7 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          MySQL
                        </h3>
                        <p className="text-sm text-gray-500">
                          Popular relational database
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setDbType("mysql");
                        setIsPopupOpen(true);
                      }}
                      className="w-10 h-10  transition-all duration-200 flex items-center justify-center hover:scale-110 focus:outline-none "
                      title="Connect MySQL"
                    >
                      <CiCirclePlus className="w-8 h-8 hover:from-rose-600 hover:to-pink-700 text-pink-600 focus:ring-2 focus:ring-offset-2  focus:ring-rose-500" />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsDataPreviewPopupOpen(true)}
                    disabled={dbType !== "mysql" && DbResponse !== null}
                    className={`w-full px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      dbType === "mysql"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow-lg hover:shadow-xl"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Data Preview
                  </button>
                </div>
              </div>

              {/* No Connections State */}
              <div className="bg-white border border-gray-200 rounded-2xl px-8 py-4 pb-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Database className="w-9 h-9 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Active Connections
                </h3>

                <div className="inline-flex items-center gap-2 text-sm text-blue-600">
                  <Info className="w-4 h-4" />
                  Select a database provider to begin
                </div>
              </div>
            </div>

            {/* Information Panel */}
            <div className="lg:col-span-1 ">
              <div className="bg-white border border-gray-200 rounded-2xl px-6 py-6 pb-[75px] space-y-5">
                {/* <div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A connection lets you and your team pull outside data into
                    your sheets seamlessly.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium"
                  >
                    View documentation
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div> */}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-800">
                      Security & Privacy
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your data and credentials are encrypted and stored securely
                    with enterprise-grade protection.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium"
                  >
                    Trust center
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Network className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-gray-800">IP Allow-list</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Add both of our IPs to your network allow-list for secure
                    access.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1">
                    <div className="font-mono text-sm text-gray-800 bg-white px-2 py-1 rounded border">
                      44.240.255.40
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium"
                  >
                    Learn more
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Popups */}
          {isPopupOpen && (
            <PopupForm
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              setDbResponse={setDbResponse}
              dbType={dbType}
            />
          )}
          {isDataPreviewPopupOpen && (
            <DbDataPreviewPopup
              DbResponse={DbResponse}
              dbType={dbType}
              onClose={() => setIsDataPreviewPopupOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AddDataPopup;
