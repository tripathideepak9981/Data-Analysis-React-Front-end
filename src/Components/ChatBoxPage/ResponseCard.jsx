import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BarChartIcon from "@mui/icons-material/BarChart";
import { FaChartPie } from "react-icons/fa";
import { FaTable } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Bot from "../../assets/typed.svg";
import user1 from "../../assets/user1.png";
import { Loader2 } from "lucide-react";
import Chart from "./Charts/Chart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Menu } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupedLine from "../../assets/icons/GroupedLine.svg";
import GroupedBar from "../../assets/icons/GroupedBar.svg";
import { BsFiletypeSql } from "react-icons/bs";
import { MdPieChartOutline } from "react-icons/md";
import { PiFileSql } from "react-icons/pi";
import { validateSQLQuery } from "../../Api";
import TypeWriter from "./TypeWriter";
import { TypeWriterProvider } from "./TypeWriterContext";

const ResponseCard = ({ response, onUpdateSQL, showInterruptMessage }) => {
  const [showSQL, setShowSQL] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const responseEndRef = useRef(null);
  const [showResult, setShowResult] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    text: "View your SQL. You can edit or validate the query.",
    type: "info",
  });

  const closeDropdown = () => setAnchorEl(null);

  const openDropdown = (event) => setAnchorEl(event.currentTarget);

  const [validateResponse, setValidateResponse] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editableSQL, setEditableSQL] = useState(
    response?.aiResponse?.sql_query
  );
  const [downloadMenuAnchorEl, setDownloadMenuAnchorEl] = useState(null);
  const isDownloadMenuOpen = Boolean(downloadMenuAnchorEl);

  const handleDownloadClick = (event) => {
    setDownloadMenuAnchorEl(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadMenuAnchorEl(null);
  };

  const handleDownload = (format) => {
    // Replace this with actual download logic
    console.log(`Download as ${format}`);
    handleDownloadClose();
  };

  const handleChange = (e) => {
    setEditableSQL(e.target.value);
  };

  useEffect(() => {
    if (response.chart == null) {
      setShowResult(false);
    }
  }, []);

  function formatSummary(summaryObj) {
    if (!summaryObj) return null;

    const formatText = (text) => {
      // Wrap quoted text (single, double quotes or backticks)
      text = text.replace(
        /(["'])([^"']+?)\1/g,
        '<span class="font-bold">"$2"</span>'
      );

      // Wrap percentages in bold
      text = text.replace(
        /(\d+(\.\d+)?%)/g,
        '<span class="font-bold">$1</span>'
      );

      // Highlight numeric values
      text = text.replace(
        /(?<![a-zA-Z])(\d+(\.\d+)?)(?![%\w])/g,
        '<span class="font-roboto font-bold">$1</span>'
      );

      return text;
    };

    const summary = summaryObj.trim();
    const paragraphs = summary.split("\n").filter((para) => para.trim() !== "");

    return (
      <TypeWriterProvider>
        <div className="bg-white chat-ui py-2 px-4 space-y-3 text-gray-900">
          {paragraphs.map((para, index) => {
            let className = " leading-relaxed text-gray-800 ";

            if (/^# /.test(para)) {
              className = " border-b pb-1 text-gray-900";
              para = para.replace(/^# /, "");
            } else if (/^## /.test(para)) {
              className = " mt-3 text-gray-900";
              para = para.replace(/^## /, "");
            } else if (/^\* /.test(para)) {
              className = "ml-6 list-disc  text-gray-800 ";
            }

            const formattedText = formatText(para);

            return (
              <TypeWriter
                key={index}
                index={index}
                text={formattedText}
                className={className}
                as="p"
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            );
          })}
        </div>
      </TypeWriterProvider>
    );
  }

  useEffect(() => {
    const hasStartedRendering =
      response?.aiResponse?.sql_query ||
      response?.aiResponse?.result ||
      response?.aiResponse?.response ||
      response?.aiResponse?.error ||
      response?.interrupted;

    if (hasStartedRendering) {
      setShowLoading(false);
    }
  }, [
    response?.aiResponse?.sql_query,
    response?.aiResponse?.result,
    response?.aiResponse?.response,
    response?.aiResponse?.error,
    response?.interrupted,
  ]);

  useEffect(() => {
    responseEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response?.aiResponse?.sql_query, response?.aiResponse?.result]);

  const loaderMessages = [
    "AI is Analyzing your data...",
    "AI is generating a response...",
  ];

  const [loaderIndex, setLoaderIndex] = useState(0);
  const loaderMessage = loaderMessages[loaderIndex];

  const chartTypes = [
    {
      title: "Bar Chart",
      icon: <BarChartIcon className="text-blue-500" />,
      onClick: () => {
        setShowResult(false);
        response.chartType = "bar";
        closeDropdown();
      },
      isEnabled: response.chart?.multi_value === false,
      isActive: response.chartType === "bar",
    },
    {
      title: "Line Chart",
      icon: <InsightsIcon className="text-green-500" />,
      onClick: () => {
        setShowResult(false);
        response.chartType = "line";
        closeDropdown();
      },
      isEnabled: response.chart?.multi_value === false,
      isActive: response.chartType === "line",
    },
    {
      title: "Pie Chart",
      icon: <PieChartIcon className="text-pink-500" />,
      onClick: () => {
        setShowResult(false);
        response.chartType = "pie";
        closeDropdown();
      },
      isEnabled:
        response.chart?.multi_value === false &&
        response.chart?.labels?.length <= 10,
      isActive: response.chartType === "pie",
    },
    {
      title: "Doughnut Chart",
      icon: <DonutLargeIcon className="text-yellow-600" />,
      onClick: () => {
        setShowResult(false);
        response.chartType = "doughnut";
        closeDropdown();
      },
      isEnabled:
        response.chart?.multi_value === false &&
        response.chart?.labels?.length <= 10,
      isActive: response.chartType === "doughnut",
    },
    {
      title: "Multi Bar Chart",
      icon: <img src={GroupedBar} alt="GroupedBar" />,
      onClick: () => {
        setShowResult(false);
        response.chartType = "bar";
        closeDropdown();
      },
      isEnabled: response.chart?.multi_value === true,
      isActive: response.chartType === "bar" && response.chart?.multi_value,
    },
    {
      title: "Multi Line Chart",
      icon: <img src={GroupedLine} alt="GroupedLine" />,
      onClick: () => {
        setShowResult(false);
        response.chartType = "line";
        closeDropdown();
      },
      isEnabled: response.chart?.multi_value === true,
      isActive: response.chartType === "line" && response.chart?.multi_value,
    },
  ];

  useEffect(() => {
    if (
      showSQL &&
      response?.aiResponse?.sql_query &&
      validateResponse?.status === "error"
    ) {
      setEditableSQL(response.aiResponse.sql_query);
    }
  }, [showSQL]);

  const handleValidate = async () => {
    console.log("Editable : ", editableSQL);
    setIsValidating(true);
    try {
      const response = await validateSQLQuery(editableSQL);
      if (response.status === "error") {
        setStatusMessage({
          text: `${response.message}`,
          type: "error",
        });
      } else {
        setEditableSQL(editableSQL);
        setValidateResponse(response);
        setStatusMessage({
          text: "Calculation is correct",
          type: "success",
        });
        if (onUpdateSQL) {
          onUpdateSQL(editableSQL);
        }
      }
      setShowResult(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    if (!showLoading) return;

    const timeout = setTimeout(() => {
      setLoaderIndex(1);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showLoading]);

  useEffect(() => {
    setStatusMessage({
      text: "View your SQL. You can edit or validate the query.",
      type: "info",
    });
    return () => {
      setStatusMessage({
        text: "", // or any default/fallback message
        type: "info",
      });
    };
  }, [setStatusMessage]);

  useEffect(() => {
    if (showSQL && response?.aiResponse?.sql_query) {
      setEditableSQL(response.aiResponse.sql_query);
    }
  }, [showSQL, response?.aiResponse?.sql_query]);

  return (
    <div className="z-20 chat-ui w-full space-y-3 bg-[#f0f1f9]">
      <div className="flex justify-end px-3 py-2 mt-3 ">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start space-x-3"
        >
          {/* User message box */}
          <div
            className="relative bg-[#dbeafe] border border-[#e0e3f3] right-10
      px-2 py-2 max-w-[30vw] rounded-tr-sm rounded-xl shadow-lg text-left
      transition-all duration-300 "
          >
            <p className="text-gray-900 chat-ui font-semibold rounded-xl  leading-snug break-words whitespace-pre-wrap font-sans">
              {response?.userQuery}
            </p>

            {/* User avatar positioned top-right inside the box */}
            <div className="absolute top-0 -right-11 ">
              <img
                src={user1}
                alt="User Avatar"
                className="h-8 w-8 rounded-full bg-white border border-gray-300 shadow"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-row items-start space-x-3">
        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg">
          <img src={Bot} className="h-5 w-5 text-[rgb(244,242,250)]" />
        </div>
        {showLoading && (
          <div className="flex absolute left-12 mt-2 w-[90%] items-center  space-x-3 animate-blink bg-[#f0f1f9]">
            <Loader2 className="w-5 h-5 text-gray-700 animate-spin" />
            <span className="text-sm font-medium text-gray-700">
              {loaderMessage}
            </span>
          </div>
        )}

        <div className="flex flex-col w-full max-w-[78%]   rounded-md shadow-md bg-white">
          <>
            {!showLoading && (
              <div className="flex justify-between mt-0 py-1 px-4 z-20 bg-gray-100 ">
                <div className=" text-gray-900 text-base font-semibold">
                  AI Response :
                </div>
                <div className="flex justify-end">
                  <div className="flex relative bg-gray-100 text-message text-gray-700 z-10">
                    {/* SQL Icon */}
                    <div
                      className="relative group flex flex-col items-center justify-center rounded-full hover:bg-blue-50 w-7 h-7"
                      onClick={() => setShowSQL(true)}
                    >
                      <PiFileSql className="w-5 h-5 hover:scale-105 text-blue-600" />
                      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center">
                        <div className="relative z-10 p-2 text-xs w-[8vw] flex justify-center leading-none text-white whitespace-no-wrap bg-gray-600 rounded shadow-lg">
                          SQL Query
                        </div>
                        <div className="w-2 h-2 -mt-1 rotate-45 bg-gray-600"></div>
                      </div>
                    </div>

                    {/* Pie Chart Icon */}
                    <div
                      className="relative group flex flex-col items-center justify-center rounded-full hover:bg-blue-50 w-7 h-7"
                      onClick={openDropdown}
                    >
                      <MdPieChartOutline className="w-5 h-5 hover:scale-105  text-blue-600" />
                      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center">
                        <div className="relative z-10 p-2 w-[10vw] flex justify-center text-xs leading-none text-white whitespace-no-wrap bg-gray-600 rounded shadow-lg">
                          change Chart Type
                        </div>
                        <div className="w-2 h-2 -mt-1 rotate-45 bg-gray-600"></div>
                      </div>
                    </div>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={closeDropdown}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      PaperProps={{
                        sx: {
                          overflow: "visible",
                          borderRadius: "8px",
                          boxShadow: 4,
                          width: 200,
                          backgroundColor: "white",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -6,
                            right: 5,
                            width: 12,
                            height: 12,
                            backgroundColor: "white", // Tailwind's bg-blue-50
                            transform: "rotate(45deg)",
                            zIndex: 1,
                            boxShadow: "-2px -2px 3px rgba(0,0,0,0.1)",
                            borderTop: "1px solid #e5e7eb",
                            borderLeft: "1px solid #e5e7eb",
                          },
                        },
                      }}
                    >
                      {/* Header with blue background */}
                      <div className="border-b flex items-center justify-between px-2 pb-1 rounded-t-md">
                        <span className="font-semibold text-gray-800 text-sm">
                          Change chart type
                        </span>
                        <button
                          onClick={closeDropdown}
                          className="text-gray-400 hover:text-black"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Rest of dropdown (default white) */}
                      <div className="grid grid-cols-3 gap-1 px-1 py-1">
                        {chartTypes.map(
                          ({ title, icon, onClick, isEnabled }, idx) => (
                            <Tooltip key={idx} title={title} placement="top">
                              <div
                                onClick={() => isEnabled && onClick()}
                                className={`rounded-lg transition-all duration-200 hover:bg-gray-100 px-4 py-1 items-center ${
                                  isEnabled ? "cursor-pointer" : "opacity-40"
                                }`}
                              >
                                {icon}
                              </div>
                            </Tooltip>
                          )
                        )}
                      </div>

                      <div className="px-6 pb-1 flex flex-col items-start">
                        <div
                          className="grid grid-cols-1 py-1"
                          onClick={() => {
                            setShowResult(true);
                            closeDropdown();
                          }}
                        >
                          <FaTable className="w-5 h-5 hover:scale-105 text-blue-500" />
                        </div>
                      </div>
                    </Menu>

                    {/* Download Icon */}
                    <button
                      onClick={handleDownloadClick}
                      className="relative group flex flex-col items-center justify-center rounded-full hover:bg-blue-50 w-7 h-7 text-gray-900 focus:outline-none"
                    >
                      <BsThreeDotsVertical className="w-4 h-4 text-gray-600" />
                      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center">
                        <div className="relative z-10 p-2 w-[10vw] flex justify-center text-xs leading-none text-white whitespace-no-wrap bg-gray-600 rounded shadow-lg">
                          Download Chart
                        </div>
                        <div className="w-2 h-2 -mt-1 rotate-45 bg-gray-600"></div>
                      </div>
                    </button>

                    <Menu
                      anchorEl={downloadMenuAnchorEl}
                      open={isDownloadMenuOpen}
                      onClose={handleDownloadClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      PaperProps={{
                        sx: {
                          overflow: "visible",
                          borderRadius: "8px",
                          boxShadow: 4,
                          width: 180,
                          backgroundColor: "white",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -6,
                            right: 12,
                            width: 12,
                            height: 12,
                            backgroundColor: "white",
                            transform: "rotate(45deg)",
                            zIndex: 1,
                            boxShadow: "-2px -2px 3px rgba(0,0,0,0.1)",
                            borderTop: "1px solid #e5e7eb",
                            borderLeft: "1px solid #e5e7eb",
                          },
                        },
                      }}
                    >
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleDownload("png")}
                          disabled={
                            !response.aiResponse.chart &&
                            !response.aiResponse.chartType
                          }
                          className={`text-left w-full px-4 py-2 text-sm ${
                            !response.aiResponse.chart &&
                            !response.aiResponse.chartType
                              ? "text-gray-400 cursor-not-allowed bg-gray-50"
                              : "hover:bg-gray-100 text-gray-800"
                          }`}
                        >
                          Download as PNG
                        </button>
                        <button
                          onClick={() => handleDownload("jpg")}
                          disabled={
                            !response.aiResponse.chart &&
                            !response.aiResponse.chartType
                          }
                          className={`text-left w-full px-4 py-2 text-sm ${
                            !response.aiResponse.chart &&
                            !response.aiResponse.chartType
                              ? "text-gray-400 cursor-not-allowed bg-gray-50"
                              : "hover:bg-gray-100 text-gray-800"
                          }`}
                        >
                          Download as JPG
                        </button>
                      </div>
                    </Menu>
                  </div>
                </div>
              </div>
            )}

            {showInterruptMessage ? (
              <p className="text-gray-700 text-label px-3 py-3 chat-ui">
                Query execution was cancelled as requested. Let me know if you'd
                like to try again or modify your query.
              </p>
            ) : (
              <>
                {/* Show error if present */}
                {response?.aiResponse?.error && (
                  <p className="text-gray-700 text-label chat-ui px-3 py-3">
                    {response?.aiResponse?.message}
                  </p>
                )}

                {/* Validate Result Takes Priority */}
                {!response?.aiResponse?.error && validateResponse?.result ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-white rounded-tl-sm font-sans"
                  >
                    {Array.isArray(validateResponse.result) &&
                    typeof validateResponse.result[0] === "object" ? (
                      <div className="max-h-[300px] chat-ui overflow-auto scrollbar-xy max-w-full border rounded space-y-2 my-2 mx-2">
                        <table className="min-w-full text-left border-collapse text-message text-gray-800">
                          <thead className="bg-gray-200 text-gray-800 sticky top-0 z-10">
                            <tr>
                              {Object.keys(validateResponse.result[0]).map(
                                (key, index) => (
                                  <th
                                    key={index}
                                    className="px-4 py-2 border border-gray-400 whitespace-nowrap text-query bg-gray-200"
                                  >
                                    {key}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {validateResponse.result.map((row, rowIndex) => (
                              <tr
                                key={rowIndex}
                                className="odd:bg-white even:bg-gray-50"
                              >
                                {Object.values(row).map((value, colIndex) => (
                                  <td
                                    key={colIndex}
                                    className="text-message px-4 py-2 border border-gray-300 whitespace-nowrap"
                                  >
                                    {value}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-label chat-ui text-gray-800 px-4 pb-2 pt-2">
                        {validateResponse.result}
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <>
                    {/* AI Response Summary */}
                    {response?.aiResponse?.response && (
                      <typeWriterProvider>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="bg-white rounded-tl-sm font-sans"
                        >
                          <p className="text-label chat-ui text-gray-800 px-4 mt-1">
                            {formatSummary(response.aiResponse.response)}
                          </p>
                        </motion.div>
                      </typeWriterProvider>
                    )}

                    {/* Chart */}
                    {/* Show Result when chart is null */}
                    {!response?.chart && response?.aiResponse?.result && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="bg-white rounded-tl-sm font-sans"
                      >
                        {Array.isArray(response.aiResponse.result) &&
                        typeof response.aiResponse.result[0] === "object" ? (
                          <div className="max-h-[250px] overflow-auto scrollbar-xy max-w-full border rounded space-y-2 my-2 mx-2">
                            <table className="min-w-full chat-ui text-left border-collapse text-message text-gray-800">
                              <thead className="bg-gray-200 text-gray-800 sticky top-0 z-10">
                                <tr>
                                  {Object.keys(
                                    response.aiResponse.result[0]
                                  ).map((key, index) => (
                                    <th
                                      key={index}
                                      className="px-4 py-2 border border-gray-400 whitespace-nowrap text-query bg-gray-200"
                                    >
                                      {key}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {response.aiResponse.result.map(
                                  (row, rowIndex) => (
                                    <tr
                                      key={rowIndex}
                                      className="odd:bg-white even:bg-gray-50"
                                    >
                                      {Object.values(row).map(
                                        (value, colIndex) => (
                                          <td
                                            key={colIndex}
                                            className="text-message px-4 py-2 border border-gray-300 whitespace-nowrap"
                                          >
                                            {value}
                                          </td>
                                        )
                                      )}
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <typeWriterProvider>
                            <p className="text-label chat-ui text-gray-800 px-2 pb-2">
                              {response.aiResponse.result}
                            </p>
                          </typeWriterProvider>
                        )}
                      </motion.div>
                    )}

                    {/* Show Chart when chart exists and showResult is false */}
                    {response?.chart && !showResult && (
                      <div className="w-full bg-white sm:px-2 sm:py-2 animate-fadeIn px-4">
                        <Chart
                          chartResponse={response.chart}
                          chartType={response.chartType}
                        />
                      </div>
                    )}

                    {/* Show Result when chart exists and showResult is true */}
                    {response?.chart &&
                      showResult &&
                      response?.aiResponse?.result && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="bg-white rounded-tl-sm font-sans"
                        >
                          {Array.isArray(response.aiResponse.result) &&
                          typeof response.aiResponse.result[0] === "object" ? (
                            <div className="max-h-[250px] overflow-auto scrollbar-xy max-w-full border rounded space-y-2 my-2 mx-2">
                              <table className="min-w-full chat-ui text-left border-collapse text-message text-gray-800">
                                <thead className="bg-gray-200 text-gray-800 sticky top-0 z-10">
                                  <tr>
                                    {Object.keys(
                                      response.aiResponse.result[0]
                                    ).map((key, index) => (
                                      <th
                                        key={index}
                                        className="px-4 py-2 border border-gray-400 whitespace-nowrap text-query bg-gray-200"
                                      >
                                        {key}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {response.aiResponse.result.map(
                                    (row, rowIndex) => (
                                      <tr
                                        key={rowIndex}
                                        className="odd:bg-white even:bg-gray-50"
                                      >
                                        {Object.values(row).map(
                                          (value, colIndex) => (
                                            <td
                                              key={colIndex}
                                              className="text-message px-4 py-2 border border-gray-300 whitespace-nowrap"
                                            >
                                              {value}
                                            </td>
                                          )
                                        )}
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <typeWriterProvider>
                              <p className="text-label chat-ui text-gray-800 px-2 pb-2">
                                {response.aiResponse.result}
                              </p>
                            </typeWriterProvider>
                          )}
                        </motion.div>
                      )}
                  </>
                )}

                {/* SQL Modal */}
                {response?.aiResponse?.sql_query && showSQL && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="fixed -top-16 justify-items-center -inset-[10px] z-50 flex items-center justify-center bg-black/50 opacity-40"
                  >
                    <div className="bg-white w-[46%] max-w-2xl h-[60vh] rounded-2xl shadow-2xl border border-blue-500 flex flex-col relative">
                      <button
                        onClick={() => {
                          setShowSQL(false);
                          setIsEditing(false);
                        }}
                        className="absolute top-4 right-5 text-gray-400 hover:text-gray-800 text-xl font-bold transition"
                      >
                        &times;
                      </button>

                      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
                        <BsFiletypeSql className="text-2xl text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">
                          SQL Query Viewer
                        </h2>
                      </div>

                      <div className="flex-1 chat-ui overflow-hidden px-4 py-2 bg-gray-50">
                        {isEditing ? (
                          <textarea
                            value={editableSQL}
                            onChange={handleChange}
                            className="w-full h-full p-2 chat-ui text-gray-800 bg-white border border-blue-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Edit your SQL here..."
                          />
                        ) : (
                          <pre className="w-full chat-ui h-full p-3 overflow-auto font-mono text-sm text-gray-800 bg-white border border-gray-300 rounded-md whitespace-pre-wrap">
                            {editableSQL}
                          </pre>
                        )}
                      </div>

                      <div className="px-6 py-3 bg-[#e6f0ff] border-t border-blue-400 rounded-b-2xl flex justify-between items-center">
                        <p
                          className={`text-sm chat-ui whitespace-pre-line ${
                            statusMessage.type === "error"
                              ? "text-red-600"
                              : statusMessage.type === "success"
                              ? "text-green-600"
                              : "text-gray-700"
                          }`}
                        >
                          {statusMessage.text}
                        </p>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setIsEditing(!isEditing);
                              setStatusMessage({
                                text: "Now you're in Editing Mode, edit SQL query and click on Validate",
                                type: "info",
                              });
                            }}
                            className="bg-white text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 border border-blue-700 transition shadow"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleValidate(editableSQL)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition shadow ${
                              isValidating
                                ? "bg-blue-100 text-blue-700 cursor-not-allowed"
                                : "bg-blue-700 text-white hover:bg-blue-800"
                            }`}
                            disabled={isValidating}
                          >
                            {isValidating ? "Validating..." : "Validate"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </>
        </div>

        <div ref={responseEndRef}></div>
      </div>
    </div>
  );
};

export default ResponseCard;
