import { X, XCircle, ShieldCheck } from "lucide-react";

const ConfirmCleanModal = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  cleaningSummary,
}) => {
  if (!open) return null;

  const formattedSummary = cleaningSummary
    .replace(/\*/g, "")
    .replace(/(?<!^)\s*(?=\d+\.\s)/g, "\n")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line, index) => (
      <p
        key={index}
        className="text-sm text-gray-700 leading-relaxed mb-2 pl-5 border-l-2 border-blue-200"
      >
        {line.trim()}
      </p>
    ));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all">
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-3 py-3 overflow-y-auto scrollbar-hide animate-fadeIn">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-xl font-semibold text-[#2d1b54] mb-1 tracking-tight">
            Data review finished. Ready to clean?
          </h2>
        </div>

        {/* Summary */}
        <div className="bg-[#f8f9ff] border text-gray-800 border-gray-300 rounded-2xl scrollbar-xy p-5 mb-4 max-h-[200px]">
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
            className="flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-xl bg-gradient-to-br from-blue-500 to-[#2d1b54] text-white hover:from-blue-600 hover:to-[#241346] transition-all duration-300 shadow-lg hover:shadow-xl"
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
