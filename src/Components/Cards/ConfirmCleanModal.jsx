import React from "react";
import { XCircle, Sparkles, ShieldCheck } from "lucide-react";

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
        <div key={index} className="mb-3">
          {title && (
            <p className="text-[#2d1b54] font-semibold text-base mb-1 flex items-center gap-2">
              <Sparkles className="text-[#6c4fc3]" size={16} />
              <span className="tracking-wide">{title}</span>
            </p>
          )}
          <p className="text-sm text-gray-700 leading-relaxed pl-5 border-l-2 border-blue-200">
            {content}
          </p>
        </div>
      );
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  transition-all">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-6 py-5 overflow-y-auto scrollbar-hide max-h-[90vh] min-h-[70vh] animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-2xl font-extrabold text-[#2d1b54] mb-1 tracking-tight">
            Do you want to clean your data?
          </h2>
          <p className="text-sm text-gray-600">
            Review the summary below before proceeding.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-[#f8f9ff] border border-gray-300 rounded-2xl scrollbar-xy p-5 mb-6 max-h-[360px] ">
          {formattedSummary}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all shadow hover:shadow-md"
          >
            <XCircle size={16} />
            Skip for now
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-br from-blue-500 to-[#2d1b54] text-white hover:from-blue-600 hover:to-[#241346] transition-all duration-300 shadow-lg hover:shadow-xl"
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
