import React from "react";
import { XCircle, Sparkles } from "lucide-react";
import { ShieldCheck } from "lucide-react";

const ConfirmCleanModal = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  cleaningSummary,
}) => {
  if (!open) return null;

  const formattedSummary = cleaningSummary
    .split("\n\n")
    .map((section, index) => {
      const titleMatch = section.match(/^\*\*(.*?)\*\*/);
      const title = titleMatch ? titleMatch[1] : "";
      const content = section.replace(/\*{1,2}/g, "").trim();

      return (
        <div key={index} className="mb-4">
          {title && (
            <p className="text-[#2d1b54] font-semibold text-base mb-1 flex items-center gap-2">
              <Sparkles className="text-[#2d1b54]" size={18} />
              {title}
            </p>
          )}
          <p className="text-sm text-gray-800 leading-relaxed">{content}</p>
        </div>
      );
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl px-6 py-4 transition-all duration-300 overflow-y-auto max-h-[90vh] min-h-[70vh]">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d1b54] mb-1">
            Do you want to clean your data?
          </h2>
          <p className="text-sm text-gray-600">
            Review the summary below before proceeding.
          </p>
        </div>

        {/* Summary Content */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 mb-4 max-h-[360px] overflow-y-auto scrollbar-hide text-left">
          {formattedSummary}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-300 shadow hover:shadow-md"
          >
            <XCircle size={18} />
            Skip for now
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <ShieldCheck size={18} />
            Clean File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCleanModal;
