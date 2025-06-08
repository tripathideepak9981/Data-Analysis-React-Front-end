import { motion } from "framer-motion";
import { TextareaAutosize } from "@mui/material";
import { Paperclip, ArrowUp, X } from "lucide-react";
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

  const handleCreateJoin = () => {
    openedPopupJoin();
  };

  const handlePreviewDataButton = () => {
    openAddDataPopup();
  };

  const containerWidth = isSliderVisible ? "max-w-[74vw]" : "max-w-[93%]";

  return (
    <motion.div
      className={`w-full mx-auto p-[8px] px-4  transition-all duration-200 ${containerWidth}`}
      animate="visible"
      initial="hidden"
      variants={containerVariants}
    >
      {suggestionQuery?.suggested_questions?.length > 0 && (
        <>
          {showSuggestions ? (
            <div className=" border border-[#d3eaff] rounded-xl bg-white p-3 mb-2">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <span className="text-base font-semibold">
                    Suggested questions based on your Data
                  </span>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowSuggestions(false)}
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
            // Collapsed bar shown when suggestions are hidden
            <div className="flex w-full  items-center justify-between px-4 py-2 mb-4 rounded-md bg-white border border-[#d3eaff]">
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

      {/* Textarea */}
      <div
        className={`w-full p-2 px-3 rounded-xl border ${
          isFocused
            ? "border-[#3f2675] ring-1 ring-[#3f2675]"
            : "border-[#5298f4] ring-1 ring-[#5298f4]"
        } transition-all bg-white user-query`}
      >
        <TextareaAutosize
          minRows={1}
          maxRows={3}
          placeholder="Add data or ask any question!"
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
          className="w-full resize-none text-gray-800 placeholder-gray-500 bg-transparent border-none focus:outline-none user-query"
        />

        {/* Buttons */}
        <div className="flex user-query justify-between items-center mt-2">
          <div className="flex gap-2">
            <button
              onClick={openAddDataPopup}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#3a2565] text-white text-sm font-medium rounded-lg hover:bg-[#43287a] transition"
            >
              <Paperclip className="w-4 h-4" />
              Add data
            </button>

            <button
              onClick={handlePreviewDataButton}
              className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-sm text-gray-800 rounded-lg border hover:bg-gray-200 transition"
            >
              <VscPreview className="w-4 h-4" />
              Data Preview
            </button>

            <button
              onClick={handleCreateJoin}
              className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-sm text-gray-800 rounded-lg border hover:bg-gray-200 transition"
            >
              <TbArrowsJoin2 className="w-4 h-4" />
              Create Join
            </button>
          </div>

          {!queryRunning ? (
            <button
              onClick={sendMessage}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
            >
              <ArrowUp className="w-5 h-5 text-gray-700" />
            </button>
          ) : (
            <button
              onClick={stopExecution}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
            >
              <FaStop className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TextAreaBox;
