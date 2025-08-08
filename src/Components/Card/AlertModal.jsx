import React from "react";

const AlertModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50 pt-2 transition-all">
      <div className="bg-white shadow-lg rounded-lg px-4 py-3 max-w-sm w-full text-start animate-slideDown relative">
        <div className="text-blue-600 text-2xl font-semibold mb-1">
          ⚠️ Session expired!
        </div>
        <p className="text-gray-700 mb-3 px-2 pt-1">{message}</p>

        {/* Button aligned bottom-right inside the modal */}
        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
