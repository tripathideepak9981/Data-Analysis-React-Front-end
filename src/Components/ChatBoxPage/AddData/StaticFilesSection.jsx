import React from "react";
import { IoEye } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { FileText } from "lucide-react";
import ConfirmCleanModal from "../../Card/ConfirmCleanModal";
import CustomNotificationCard from "../../Card/CustomNotificationCard";
import { Database } from "lucide-react";
import { Shield } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const StaticFilesSection = ({
  fileCleaning,
  setShowNotification,
  fileInputRef,
  handleFileUpload,
  handleDropBoxClick,
  uploadedFiles,
  handleRemoveFile,
  getPreviewByFileName,
  isCleaning,
  isLoading,
  isDeleting,
  showEyeHint,
  searchTerm,
  showModal,
  setShowModal,
  handleConfirm,
  handleCancel,
  cleaningSummary,
  notification,
  setNotification,
  showNotification,
  card,
}) => {
  const UploadingLoadingEffect = () => {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl px-6 py-5 shadow-lg border border-gray-200 w-80 mx-4">
          <div className="text-center">
            {/* Animated Icon */}
            <div className="relative inline-flex items-center justify-center w-12 h-12 mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 rounded-full animate-ping opacity-60"></div>
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin h-8 w-8 text-blue-600 relative z-10"
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

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Uploading Files
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-snug">
              Please wait while we process your files...
            </p>

            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-400  h-1.5 rounded-full animate-progress-bar"></div>
            </div>
          </div>
        </div>

        {/* Tailwind Custom Animation */}
        <style>
          {`
          @keyframes progressBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }

          .animate-progress-bar {
            animation: progressBar 3s ease-in-out forwards;
          }
        `}
        </style>
      </div>
    );
  };

  const DeletingLoadingEffect = () => {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 max-w-sm w-full mx-4">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            {/* Message */}
            <h3 className="text-xl font-semibold text-green-700">
              File Removed
            </h3>
          </div>
        </div>
      </div>
    );
  };

  const DataProcessingLoader = ({ fileCleaning }) => {
    const baseSteps = [
      {
        name: "Uploading file",
        icon: FileText,
        description: "Securely transferring your data",
      },
      {
        name: "Processing data",
        icon: Database,
        description: "Analyzing and structuring information",
      },
      {
        name: "Saving to server",
        icon: CheckCircle2,
        description: "Storing your processed data safely",
      },
    ];

    const cleaningStep = {
      name: "Cleaning data",
      icon: Shield,
      description: "Removing inconsistencies and errors",
    };

    const steps = fileCleaning
      ? [baseSteps[0], baseSteps[1], cleaningStep, baseSteps[2]]
      : baseSteps;

    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);

    useEffect(() => {
      if (currentStep < steps.length) {
        const timer = setTimeout(() => {
          setCompletedSteps((prev) => [...prev, currentStep]);
          setCurrentStep((prev) => prev + 1);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [currentStep, steps.length]);

    const allStepsDone = completedSteps.length === steps.length;

    const LoaderStep = ({ step, index, isLast }) => {
      const isCurrent = currentStep === index;
      const isCompleted = completedSteps.includes(index);
      const isPending = index > currentStep;

      const StepIcon = step.icon;

      return (
        <div className="relative flex items-start gap-3">
          {!isLast && (
            <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-300"></div>
          )}
          <div className="z-10 flex-shrink-0">
            {isCompleted ? (
              <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full shadow-md">
                <CheckCircle className="text-white w-5 h-5" />
              </div>
            ) : isCurrent ? (
              <div className="relative flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full shadow-md">
                <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-30" />
                <StepIcon className="text-white w-5 h-5 z-10 animate-pulse" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-300 rounded-full">
                <StepIcon className="text-gray-500 w-5 h-5" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h4
              className={`font-semibold text-lg ${
                isCompleted
                  ? "text-green-700"
                  : isCurrent
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
            >
              {step.name}
            </h4>
            <p
              className={`text-xs mt-0.5 leading-snug ${
                isCompleted
                  ? "text-green-600"
                  : isCurrent
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {step.description}
            </p>
          </div>
        </div>
      );
    };

    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
          <div className="space-y-5">
            {steps.map((step, index) => (
              <LoaderStep
                key={index}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 font-medium">
              {allStepsDone
                ? "Processing complete — finalizing data..."
                : `Step ${currentStep + 1} of ${steps.length} in progress`}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
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
          className="relative max-w-lg mx-auto px-8 py-3 border-2 border-dashed rounded-xl text-center transition-all duration-200
          border-gray-300 hover:border-blue-400 hover:bg-gray-50 cursor-pointer"
        >
          <div className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
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
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Click to upload or drag and drop
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Supports multiple files: CSV, XLSX, XLS
            </p>
            <p className="text-sm text-gray-500">Max file size: 10 MB</p>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300/80 px-6 py-3 border-b border-gray-200/60">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              Available Files
            </h3>
            <span className="px-3 py-1.5 bg-white border border-gray-400 text-blue-700 rounded-full text-sm font-medium">
              {uploadedFiles.length} files
            </span>
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
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Upload Date
                    </th>
                    <th className="px-8 py-3 text-left font-semibold text-gray-700">
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
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-900 break-all max-w-xs">
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {file.createdDate}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative group">
                              {showEyeHint && (
                                <div className="absolute left-[-152px] top-[8px] -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap z-20 animate-bounce">
                                  Click here to Preview
                                  <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rotate-45"></div>
                                </div>
                              )}
                              <button
                                onClick={() => getPreviewByFileName(file.name)}
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-all duration-200"
                                title="Preview file"
                              >
                                <IoEye className="w-5 h-5" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-all duration-200"
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
          )}
        </div>
      </div>

      {/* Modals and Notifications */}
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
      {showNotification && (
        <CustomNotificationCard
          title={card === "clean" ? "Data Cleaned!" : "You chose Skip!"}
          text={
            card === "clean"
              ? "Your data has been cleaned and stored successfully"
              : "Your data has been stored successfully"
          }
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default StaticFilesSection;
