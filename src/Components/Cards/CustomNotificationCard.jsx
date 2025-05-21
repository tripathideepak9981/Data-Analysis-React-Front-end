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
      <div className="relative flex flex-col items-center space-y-2 py-3 gap-2 bg-white rounded-lg shadow-2xl border border-gray-300 px-6 w-[350px] h-[180px]">
        {/* Icon */}
        <div className={`mt-3 ${isError ? "text-red-600" : "text-green-600"}`}>
          {isError ? <AlertCircle size={40} /> : <CheckCircle size={40} />}
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center items-center space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {title.toUpperCase()}
          </h2>
          <p className="text-sm text-gray-600">{text}</p>
        </div>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default CustomNotificationCard;
