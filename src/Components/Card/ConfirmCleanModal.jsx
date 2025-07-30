import {
  X,
  XCircle,
  ShieldCheck,
  FileCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

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
      <div
        key={index}
        className="group relative flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 transition scrollbar-hide"
      >
        <div className="flex-shrink-0 mt-0.5">
          {line.startsWith("!") ? (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-600">
              <AlertTriangle size={14} />
            </div>
          ) : (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={14} />
            </div>
          )}
        </div>
        <p className="text-sm text-gray-800 font-medium leading-relaxed">
          {line.trim()}
        </p>
      </div>
    ));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-2 -top-10 bg-black/40">
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl border border-gray-200 transition-transform duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white shadow-md">
              <FileCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Data Review Complete
              </h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 font-medium">
                <Sparkles size={16} className="text-indigo-500" />
                Ready to optimize your data
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="px-2 py-2 max-h-48 overflow-y-auto  bg-gray-100 rounded-xl mx-4 my-2 border border-gray-300 scrollbar-hide">
          <div className="">{formattedSummary}</div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 pb-3 pt-2 border-t border-gray-100 bg-white rounded-b-2xl">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-5 py-1.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium border border-gray-200"
          >
            <XCircle size={18} />
            Skip for now
          </button>
          <button
            onClick={onConfirm}
            className="relative group flex items-center gap-2 px-6 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
          >
            <ShieldCheck size={18} />
            Clean File
            {/* Shine animation */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCleanModal;
