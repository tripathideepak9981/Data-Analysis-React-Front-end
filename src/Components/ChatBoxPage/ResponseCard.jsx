import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BarChartIcon from "@mui/icons-material/BarChart";
import { FaTable } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BarChart3 } from "lucide-react";
import { User } from "lucide-react";
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
import { TypeWriterProvider } from "./TypeWriterContext";
import formatSummary from "../../utils/formatSummary";
import CustomNotificationCard from "../Card/CustomNotificationCard";

const ResponseCard = ({ response, onUpdateSQL, showInterruptMessage }) => {
  const [showSQL, setShowSQL] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const responseEndRef = useRef(null);
  const [showResult, setShowResult] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [showError, setShowError] = useState(false);
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
  // function formatSummary(summaryObj, ref = null) {
  //   if (!summaryObj) return null;

  //   const formatText = (text) => {
  //     text = text.replace(
  //       /(["'])([^"']+?)\1/g,
  //       '<span class="font-bold">"$2"</span>'
  //     );
  //     text = text.replace(
  //       /(\d+(\.\d+)?%)/g,
  //       '<span class="font-bold">$1</span>'
  //     );
  //     text = text.replace(
  //       /(?<![a-zA-Z])(\d+(\.\d+)?)(?![%\w])/g,
  //       '<span class="font-roboto font-bold">$1</span>'
  //     );
  //     return text;
  //   };

  //   const summary = summaryObj.trim();
  //   const paragraphs = summary.split("\n").filter((para) => para.trim() !== "");

  //   return (
  //     <TypeWriterProvider>
  //       <div
  //         ref={ref} // ✅ Pass it from outside
  //         className="bg-white chat-ui py-2 px-4 space-y-3 text-gray-900"
  //       >
  //         {paragraphs.map((para, index) => {
  //           let className = " leading-relaxed text-gray-800 ";

  //           if (/^# /.test(para)) {
  //             className = " border-b pb-1 text-gray-900";
  //             para = para.replace(/^# /, "");
  //           } else if (/^## /.test(para)) {
  //             className = " mt-3 text-gray-900";
  //             para = para.replace(/^## /, "");
  //           } else if (/^\* /.test(para)) {
  //             className = "ml-6 list-disc  text-gray-800 ";
  //           }

  //           const formattedText = formatText(para);

  //           return (
  //             <TypeWriter
  //               key={index}
  //               index={index}
  //               text={formattedText}
  //               className={className}
  //               as="p"
  //               dangerouslySetInnerHTML={{ __html: formattedText }}
  //             />
  //           );
  //         })}
  //       </div>
  //     </TypeWriterProvider>
  //   );
  // }

  useEffect(() => {
    const hasStartedRendering =
      response?.aiResponse?.sql_query ||
      response?.aiResponse?.result ||
      response?.aiResponse?.response ||
      response?.interrupted;

    if (hasStartedRendering) {
      setShowLoading(false);
    }
  }, [
    response?.aiResponse?.sql_query,
    response?.aiResponse?.result,
    response?.aiResponse?.response,
    response?.interrupted,
  ]);
  useEffect(() => {
    if (response?.userQuery && responseEndRef.current) {
      responseEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [response?.userQuery]);

  const closeErrorAlert = () => {
    setShowError(false);
  };

  useEffect(() => {
    setShowError(true);
  }, [response?.aiResponse?.error]);

  // 2. Scroll again after response arrives to adjust for content shift
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        responseEndRef.current &&
        (response?.aiResponse?.response || response?.aiResponse?.result)
      ) {
        responseEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150); // small delay ensures layout is complete

    return () => clearTimeout(timeout);
  }, [response?.aiResponse?.response, response?.aiResponse?.result]);

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
    <div ref={responseEndRef} className="z-20 w-full space-y-3 ">
      <div className="flex justify-end px-3 py-2 mt-3 ">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start space-x-3"
        >
          {/* User message box with updated styling */}
          <div className="flex justify-end animate-fade-in">
            <div className="max-w-2xl flex items-start flex-row-reverse space-x-reverse space-x-3">
              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
                <User className="w-5 h-5 text-white" />
              </div>

              {/* User Message Bubble */}
              <div className="rounded-2xl px-6 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-tr-md">
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap font-sans font-semibold">
                  {response?.userQuery}
                </p>
                {/* <p className="text-xs time-stamp mt-2 text-white/70">
                  {new Date(response?.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-row items-start space-x-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 shadow-lg shadow-purple-400/30">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>

        {showLoading && (
          <div className="flex absolute left-12 mt-2 w-[90%] items-center  space-x-3 animate-blink">
            <Loader2 className="w-5 h-5 text-gray-700 animate-spin" />
            <span className="text-sm font-medium text-gray-700">
              {loaderMessage}
            </span>
          </div>
        )}

        <div
          ref={responseEndRef}
          className="flex flex-col w-full max-w-[78%]   rounded-md shadow-md bg-white"
        >
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
                {response?.aiResponse?.error && showError && (
                  // <p
                  //   ref={responseEndRef}
                  //   className="text-gray-700 text-label chat-ui px-3 py-3"
                  // >
                  //   {response?.aiResponse?.error}
                  // </p>
                  <CustomNotificationCard
                    title="Error"
                    text="Something wrong on server, Please relogin"
                    onClose={closeErrorAlert}
                  />
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
                      <TypeWriterProvider>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="bg-white rounded-tl-sm font-sans"
                        >
                          <p className="text-label chat-ui text-gray-800 px-4 mt-1">
                            {formatSummary(
                              response.aiResponse.response,
                              responseEndRef
                            )}
                          </p>
                        </motion.div>
                      </TypeWriterProvider>
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
                          response.aiResponse.result.length === 1 ? (
                            // ✅ Render plain text message for single object
                            <div className="px-4 mb-4 chat-ui text-left ml-5 text-gray-800 font-semibold">
                              {Object.entries(
                                response.aiResponse.result[0]
                              ).map(([key, value], idx) => (
                                <div key={idx}>
                                  {key.replace(/_/g, " ")} = {value}
                                </div>
                              ))}
                            </div>
                          ) : (
                            // ✅ Render full table for multi-row result
                            <div className="max-h-[250px] overflow-auto scrollbar-xy max-w-full border rounded space-y-2 my-2 mx-2">
                              <table className="min-w-full text-left border-collapse text-message text-gray-800">
                                <thead className="bg-gray-200 text-gray-800 sticky top-0 z-10">
                                  <tr>
                                    {Object.keys(
                                      response.aiResponse.result[0]
                                    ).map((key, index) => (
                                      <th
                                        key={index}
                                        className="px-4 py-2 border border-gray-400 whitespace-nowrap text-query bg-gray-200"
                                      >
                                        {key
                                          .replace(/_/g, " ") // Replace underscores with space
                                          .replace(/\b\w/g, (char) =>
                                            char.toUpperCase()
                                          )}{" "}
                                        {/* Capitalize each word */}
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
                          )
                        ) : (
                          // ✅ Fallback if result is not array or object
                          <TypeWriterProvider>
                            <p className="text-label chat-ui text-gray-800 px-2 pb-2">
                              {response.aiResponse.result}
                            </p>
                          </TypeWriterProvider>
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
                              <table className="min-w-full  text-left border-collapse text-message text-gray-800">
                                <thead className="bg-gray-200 text-gray-800 sticky top-0 z-10">
                                  <tr>
                                    {Object.keys(
                                      response.aiResponse.result[0]
                                    ).map((key, index) => (
                                      <th
                                        key={index}
                                        className="px-4 py-2 border chat-ui border-gray-400 whitespace-nowrap text-query bg-gray-200"
                                      >
                                        {key
                                          .replace(/_/g, " ") // Replace underscores with space
                                          .replace(/\b\w/g, (char) =>
                                            char.toUpperCase()
                                          )}
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
                            <TypeWriterProvider>
                              <p className="text-label chat-ui text-gray-800 px-2 pb-2">
                                {response.aiResponse.result}
                              </p>
                            </TypeWriterProvider>
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
                          setStatusMessage({
                            text: "View your SQL. You can edit or validate the query.",
                            type: "info",
                          });
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
                          className={`pr-10 text-sm chat-ui whitespace-pre-line ${
                            statusMessage.type === "error"
                              ? "text-red-600"
                              : statusMessage.type === "success"
                              ? "text-green-600"
                              : statusMessage.type === "info"
                              ? "text-blue-700"
                              : ""
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
                {/* {response?.timestamp && !showLoading && (
                  <p className="relative time-stamp p-2 px-6  text-xs text-gray-500 text-right">
                    {new Date(response.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p> */}
                {/* )} */}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
