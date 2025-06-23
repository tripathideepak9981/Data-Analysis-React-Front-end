import React from "react";
import { CheckCircle, X, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const CustomNotificationCard = ({
  title = "Success",
  text = "New analysis created.",
  onClose,
}) => {
  const isError = title?.toLowerCase() === "error";

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 20, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
      className="fixed top-0 left-1/2 z-50 transform -translate-x-1/2 w-full max-w-xl px-4"
    >
      <div
        className={`relative flex items-start px-6 py-5 gap-5 rounded-lg shadow-md transition-all duration-300 ${
          isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        }`}
      >
        {/* Icon */}
        <div className="mt-1">
          {isError ? (
            <AlertCircle size={28} className="text-red-500" />
          ) : (
            <CheckCircle size={28} className="text-green-500" />
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          <p className="text-sm leading-snug text-gray-800">{text}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CustomNotificationCard;
