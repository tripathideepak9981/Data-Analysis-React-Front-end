import { motion } from "framer-motion";
import { TextareaAutosize } from "@mui/material";
import { Paperclip, Send, X } from "lucide-react";
import { VscPreview } from "react-icons/vsc";
import { useState } from "react";
import { TbArrowsJoin2 } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaStop } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const TextAreaBox = ({
  query,
  setQuery,
  sendMessage,
  openAddDataPopup,
  isSliderVisible,
  suggestionQuery,
  openedPopupJoin,
  queryRunning,
  stopExecution,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleCreateJoin = () => openedPopupJoin();
  const handlePreviewDataButton = () => openAddDataPopup();
  const containerWidth = isSliderVisible ? "" : "";

  return (
    <motion.div
      className={`w-full transition-all duration-200 ${containerWidth}`}
      animate="visible"
      initial="hidden"
      variants={containerVariants}
    >
      {suggestionQuery?.suggested_questions?.length > 0 && (
        <>
          {showSuggestions ? (
            <div className="border border-[#d3eaff] rounded-xl bg-white p-3 mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-semibold text-gray-700">
                  Suggested questions based on your Data
                </span>
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <MdKeyboardArrowDown className="h-5 w-5" />
                </button>
              </div>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {suggestionQuery.suggested_questions.map((text, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setQuery(text);
                      sendMessage();
                    }}
                    className="px-3 py-1 rounded-full text-sm border border-[#a8d3ff] bg-white text-[#515253] hover:bg-[#eff6fd] transition hover:text-blue-500"
                    variants={itemVariants}
                  >
                    {text}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-4 py-2 mb-4 rounded-md bg-white border border-[#d3eaff]">
              <div className="text-sm font-semibold text-gray-600">
                Suggested Query
              </div>
              <button
                onClick={() => setShowSuggestions(true)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      <div className="sticky bottom-0 bg-white/60 backdrop-blur-xl border-t border-white/20 p-5 shadow-2xl ">
        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={openAddDataPopup}
            className="flex items-center gap-2 bg-white/50 text-purple-700 border border-purple-200/50 hover:bg-purple-50 hover:border-purple-300 rounded-xl text-sm font-medium px-3 py-2 shadow-sm transition-all duration-200 backdrop-blur-sm"
          >
            <Paperclip className="w-4 h-4" />
            Add Data
          </button>
          <button
            onClick={handlePreviewDataButton}
            className="flex items-center gap-2 bg-white/50 text-blue-700 border border-blue-200/50 hover:bg-blue-50 hover:border-blue-300 rounded-xl text-sm font-medium px-3 py-2 shadow-sm transition-all duration-200 backdrop-blur-sm"
          >
            <VscPreview className="w-4 h-4" />
            Data Preview
          </button>
          <button
            onClick={handleCreateJoin}
            className="flex items-center gap-2 bg-white/50 text-emerald-700 border border-emerald-200/50 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl text-sm font-medium px-3 py-2 shadow-sm transition-all duration-200 backdrop-blur-sm"
          >
            <TbArrowsJoin2 className="w-4 h-4" />
            Create Join
          </button>
        </div>

        {/* Input and Send */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <TextareaAutosize
              minRows={1}
              maxRows={3}
              placeholder="Ask anything or drop a file…"
              value={query}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="w-full resize-none text-base text-gray-800 placeholder-gray-500 bg-white/70 backdrop-blur-sm border border-white/30 focus:border-purple-400 focus:ring-purple-400/30 rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 focus:shadow-md outline-none"
            />
          </div>

          {!queryRunning ? (
            <button
              onClick={sendMessage}
              disabled={!query.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-12 h-12 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={stopExecution}
              className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-md transition"
            >
              <FaStop className="w-4 h-4 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TextAreaBox;
