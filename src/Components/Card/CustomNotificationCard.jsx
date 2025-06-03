import React from "react";
import { CheckCircle, X, AlertCircle } from "lucide-react";

const CustomNotificationCard = ({
  title = "Success",
  text = "New analysis created.",
  onClose,
}) => {
  const isError = title?.toLowerCase() === "error";

  return (
    <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
      <div className="relative flex flex-col items-center px-6 py-5 gap-4 w-[360px] bg-white rounded-2xl shadow-lg border border-gray-200">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Icon Container */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full ${
            isError ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
          } shadow-inner`}
        >
          {isError ? <AlertCircle size={32} /> : <CheckCircle size={32} />}
        </div>

        {/* Text Content */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-gray-800 tracking-wide">
            {title.toUpperCase()}
          </h2>
          <p className="text-sm text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomNotificationCard;
