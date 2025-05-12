import { TextareaAutosize } from "@mui/material";
import { Paperclip, ArrowUp } from "lucide-react";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import { Menu, MenuItem } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import { useState } from "react";

import InsightsIcon from "@mui/icons-material/Insights";
import { VscPreview } from "react-icons/vsc";

import BarChartIcon from "@mui/icons-material/BarChart";
import Tooltip from "@mui/material/Tooltip";
import Scatter from "../../assets/icons/Scatter.svg";
import Area from "../../assets/icons/Area.svg";
import GroupedLine from "../../assets/icons/GroupedLine.svg";
import GroupedBar from "../../assets/icons/GroupedBar.svg";

const TextAreaBox = ({
  query,
  setQuery,
  sendMessage,
  openAddDataPopup,
  isSliderVisible,
  setByDataPreview,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePreviewDataButton = () => {
    setByDataPreview(true);
    openAddDataPopup();
  };

  return (
    <div
      className={`w-full mt-2 mx-auto p-3 bg-white rounded-2xl  shadow-md resize-none transition-all duration-200
      ${
        isFocused
          ? "border-[#3f2675] ring-1 ring-[#43287e]"
          : "border-[#5298f4] ring-1 ring-[#5298f4]"
      }
      ${isSliderVisible ? "max-w-[75vw]" : "max-w-[95%]"}`}
    >
      <TextareaAutosize
        minRows={1}
        maxRows={2}
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
        className="w-full ml-2 text-label resize-none min-h-[30px] bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 border-none"
      ></TextareaAutosize>
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2">
          <button
            onClick={openAddDataPopup}
            className="flex items-center gap-2 px-6 py-2 bg-[#3a2565] text-sm font-medium text-gray-50 rounded-xl border border-gray-300 hover:bg-[#43287a] transition-shadow shadow-sm"
          >
            <Paperclip className="w-4 h-4" />
            Add data
          </button>

          <button
            onClick={handlePreviewDataButton}
            className="flex items-center gap-2 px-6 py-2 bg-white text-sm font-medium text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-200 transition-shadow shadow-sm"
          >
            <VscPreview className="w-4 h-4" />
            Data Preview
          </button>
        </div>

        <button
          onClick={sendMessage}
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
        >
          <ArrowUp className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default TextAreaBox;
