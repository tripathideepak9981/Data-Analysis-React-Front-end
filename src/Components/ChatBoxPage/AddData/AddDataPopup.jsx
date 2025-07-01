import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import {
  Database,
  Plus,
  Shield,
  Globe,
  ArrowRight,
  Check,
  AlertCircle,
} from "lucide-react";

import { FaDatabase } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import HelpTooltip from "./HelpTooltip";
import "../../../CoustomCss/LoadingButton.css";
import { suggestedQueryResponse } from "../../../Api";
import { FileText } from "lucide-react";
import { Server, Eye, Network, ExternalLink, Info } from "lucide-react";
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
import { X } from "lucide-react";

const steps = [
  "Execution is in Progress",
  "Collecting data",
  "Cleaning data",
  "Storing data",
];

const AddDataPopup = ({
  setShowChatNotification,
  setSuggestionQuery,
  closeAddDataPopup,
}) => {
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
        <div className="flex items-center px-8 pt-4">
          <h1 className="text-3xl font-bold text-gray-900 pr-4 pt-1">
            Data Sources
          </h1>
          <HelpTooltip content="Connect external data sources to pull data directly into your analysis. You can connect to databases, APIs, and other data sources." />
        </div>
        <div className="flex flex-row px-6 py-1">
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
              className={`relative max-w-lg mx-auto px-8 py-3 border-2 border-dashed rounded-xl text-center transition-all duration-200
      border-gray-300 hover:border-blue-400 hover:bg-gray-50 cursor-pointer`}
            >
              {/* Hidden full-area click */}
              <div className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

              {/* Upload icon */}
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 transition-all duration-200">
                  <svg
                    className="w-7 h-7"
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
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Click to upload or drag and drop
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Supports multiple files: CSV, XLSX, XLS
                </p>
                <p className="text-sm text-gray-500">Max file size: 10 MB</p>
              </div>

              {/* File type icons (CSV, XLSX, XLS) */}
              <div className="mt-3 flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
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
                      d="M9 12h6M9 16h6M9 8h6M5 8h.01M5 16h.01M4 4h16v16H4V4z"
                    />
                  </svg>
                  <span>CSV</span>
                </div>
                <div className="flex items-center space-x-1">
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
                      d="M9 12h6M9 16h6M9 8h6M5 8h.01M5 16h.01M4 4h16v16H4V4z"
                    />
                  </svg>
                  <span>XLSX</span>
                </div>
                <div className="flex items-center space-x-1">
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
                      d="M9 12h6M9 16h6M9 8h6M5 8h.01M5 16h.01M4 4h16v16H4V4z"
                    />
                  </svg>
                  <span>XLS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Files Section */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-gray-200 to-gray-300/80 px-6 py-3 border-b border-gray-200/60">
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
                  <span className="px-3 py-1.5 bg-white border border-gray-400 text-blue-700 rounded-full text-sm font-medium">
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
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-7 h-7 text-gray-400"
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
                  <h4 className="text-lg font-semibold text-gray-700 mb-1">
                    No files uploaded yet
                  </h4>
                  <p className="text-sm text-gray-500">
                    Start by uploading your first file above
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div
                    className={`rounded-lg shadow border border-gray-200 bg-white ${
                      uploadedFiles.filter((file) =>
                        file?.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ).length > 3
                        ? "max-h-[40vh] overflow-y-auto"
                        : ""
                    }`}
                  >
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left font-semibold text-gray-700">
                            File Name
                          </th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-700">
                            Upload Date
                          </th>
                          <th className="px-6 py-3 text-left font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadedFiles
                          .filter((file) =>
                            file?.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((file, index) => (
                            <tr
                              key={index}
                              className="border-b hover:bg-gray-50 transition-colors duration-150"
                            >
                              {/* File Name */}
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10  flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <span className="font-medium text-gray-900 break-all max-w-xs">
                                    {file.name}
                                  </span>
                                </div>
                              </td>

                              {/* Upload Date */}
                              <td className="px-6 py-4">
                                <span className="text-gray-700">
                                  {file.createdDate}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                  <div className="relative group">
                                    {showEyeHint && (
                                      <div className="absolute left-[-152px] top-[8px] -translate-y-1/2 bg-blue-600 text-white text-xs px-4 py-2 rounded shadow-lg whitespace-nowrap z-20 animate-bounce">
                                        Click here to Preview
                                        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rotate-45"></div>
                                      </div>
                                    )}
                                    <button
                                      onClick={() =>
                                        getPreviewByFileName(file.name)
                                      }
                                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-all duration-200 group-hover:scale-110"
                                      title="Preview file"
                                    >
                                      <IoEye className="w-5 h-5" />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-all duration-200 hover:scale-110"
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
        <div className="px-6 py-4 overflow-y-scroll scrollbar-hide bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 text-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900  mb-2">
                Connect Database
              </h2>
              <p className="text-gray-600 ">
                Choose your database provider to establish a connection.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2">
            {/* PostgreSQL Card */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-emerald-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="text-3xl mr-3">🐘</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">PostgreSQL</CardTitle>
                  <CardDescription>
                    Advanced open-source database
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDbType("postgresql");
                    setIsPopupOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setIsDataPreviewPopupOpen(true)}
                  disabled={dbType !== "postgresql" && DbResponse !== null}
                  className={`w-full mt-2 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    dbType === "postgresql"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Data Preview
                </Button>
              </CardContent>
            </Card>

            {/* MySQL Card */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-rose-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="text-3xl mr-3">🐬</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">MySQL</CardTitle>
                  <CardDescription>Popular relational database</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDbType("mysql");
                    setIsPopupOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setIsDataPreviewPopupOpen(true)}
                  disabled={dbType !== "mysql" && DbResponse !== null}
                  className={`w-full mt-2 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    dbType === "mysql"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Data Preview
                </Button>
              </CardContent>
            </Card>

            {/* MongoDB Card */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-green-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="text-3xl mr-3">🍃</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">MongoDB</CardTitle>
                  <CardDescription>NoSQL document database</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDbType("mongodb");
                    setIsPopupOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setIsDataPreviewPopupOpen(true)}
                  disabled={dbType !== "mongodb" && DbResponse !== null}
                  className={`w-full mt-2 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    dbType === "mongodb"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Data Preview
                </Button>
              </CardContent>
            </Card>

            {/* SQLite Card */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-gray-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="text-3xl mr-3">💾</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">SQLite</CardTitle>
                  <CardDescription>
                    Lightweight file-based database
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDbType("sqlite");
                    setIsPopupOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setIsDataPreviewPopupOpen(true)}
                  disabled={dbType !== "sqlite" && DbResponse !== null}
                  className={`w-full mt-2 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    dbType === "sqlite"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Data Preview
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* No Connections */}
          <div className="text-center py-12 mt-10 bg-gray-50  rounded-lg border-2 border-dashed border-gray-300 ">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900  mb-2">
              No Active Connections
            </h3>
            <p className="text-gray-600 ">
              Select a database provider to begin.
            </p>
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
