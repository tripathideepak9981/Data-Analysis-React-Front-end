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
        className="group relative flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-all duration-200"
      >
        <div className="flex-shrink-0 mt-0.5">
          {line.startsWith("!") ? (
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-600">
              <AlertTriangle size={12} />
            </div>
          ) : (
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={12} />
            </div>
          )}
        </div>
        <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
          {line.trim()}
        </p>
      </div>
    ));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-2 bg-black/50 -top-5 transition-all duration-300">
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200/50 
                   transform transition-all duration-300 scale-100 hover:scale-[1.01]
                   animate-[fadeIn_0.3s_ease-out,slideUp_0.3s_ease-out]"
        style={{
          animation: "fadeIn 0.3s ease-out, slideUp 0.3s ease-out",
        }}
      >
        {/* Decorative gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-gray-400 hover:text-gray-600 
                     hover:bg-gray-100 transition-all duration-200 group"
        >
          <X
            size={18}
            className="group-hover:rotate-90 transition-transform duration-200"
          />
        </button>

        {/* Header */}
        <div className="relative px-4 sm:px-8 pt-4 sm:pt-6 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <FileCheck className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Data Review Complete
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="text-blue-500" size={16} />
                <p className="text-sm text-gray-600 font-medium">
                  Ready to optimize your data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="px-4 sm:px-6 pb-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/60 rounded-xl shadow-inner">
            <div className="p-3 max-h-64 overflow-y-auto scrollbar-xy scrollbar-thumb-gray-300/60 scrollbar-track-transparent">
              <div className="space-y-1">{formattedSummary}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-b-2xl border-t border-gray-100">
          <button
            onClick={onCancel}
            className="group relative flex items-center justify-center gap-2 px-6 py-2 rounded-xl 
                       text-gray-700 bg-white border border-gray-200 hover:border-gray-300
                       shadow-sm hover:shadow-md transition-all duration-300
                       hover:bg-gray-50 hover:-translate-y-0.5 font-medium
                       focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            <XCircle
              size={18}
              className="group-hover:rotate-12 transition-transform duration-200"
            />
            <span>Skip for now</span>
            <div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-100/0 via-gray-100/50 to-gray-100/0 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>

          <button
            onClick={onConfirm}
            className="group relative flex items-center justify-center gap-2 px-8 py-2 rounded-xl 
                       font-semibold text-white overflow-hidden
                       bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600
                       hover:from-blue-600 hover:via-indigo-700 hover:to-blue-700
                       shadow-lg hover:shadow-xl transform hover:-translate-y-1
                       transition-all duration-300 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 min-w-[140px]"
          >
            {/* Animated background effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform 
                           duration-700 ease-in-out"
            ></div>

            <ShieldCheck
              size={18}
              className="relative z-10 group-hover:scale-110 transition-transform duration-200"
            />
            <span className="relative z-10">Clean File</span>

            {/* Pulse effect on hover */}
            <div
              className="absolute inset-0 rounded-xl bg-blue-400/30 scale-0 group-hover:scale-100 
                           group-hover:animate-pulse transition-transform duration-300"
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCleanModal;
