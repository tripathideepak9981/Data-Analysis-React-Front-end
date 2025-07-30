import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BarChartIcon from "@mui/icons-material/BarChart";
import { FaTable } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  X,
  Edit3,
  CheckCircle,
  AlertCircle,
  Database,
  Code2,
  Play,
} from "lucide-react";
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
import { transformChartData, loaderMessages } from "./utilFunctions";

const ResponseCard = ({
  response,
  showInterruptMessage,
  index,
  setChatMessages,
}) => {
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

  const [loaderIndex, setLoaderIndex] = useState(0);
  const loaderMessage = loaderMessages[loaderIndex];

  useEffect(() => {
    if (showSQL && response?.aiResponse?.sql_query) {
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
        console.log("Validated Response: ", response);

        // Determine if chart should be added
        const hasNumericData =
          Array.isArray(response.result) &&
          response.result.some((obj) =>
            Object.values(obj).some((value) => typeof value === "number")
          );

        // 🔥 Update the chatMessages for this ResponseCard
        setChatMessages((prevMessages) =>
          prevMessages.map((msg, i) => {
            if (i !== index) return msg; // Only update this ResponseCard's message

            return {
              ...msg,
              aiResponse: response, // Replace with validated response
              ...(response?.result?.length > 3 &&
                hasNumericData && {
                  chart: transformChartData(response.result),
                  chartType: "bar",
                }),
              interrupted: false,
            };
          })
        );

        setEditableSQL(editableSQL); // Update local state too
        setStatusMessage({
          text: "Calculation is correct",
          type: "success",
        });
      }

      setShowResult(false);
    } catch (error) {
      console.error("Validation error:", error);
      setStatusMessage({
        text: "Error validating query.",
        type: "error",
      });
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
              <div className="rounded-2xl px-6 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl bg-white text-gray-800 rounded-tr-md">
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap font-sans font-semibold">
                  {response?.userQuery}
                </p>
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
              <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 shadow-sm">
                {/* Left: Icon + Title */}
                <div className="flex items-center space-x-2">
                  <div>
                    <h2 className="text-gray-900 text-lg font-semibold">
                      AI Response
                    </h2>
                  </div>
                </div>

                {/* Right: Buttons */}
                <div className="flex items-center space-x-2">
                  {/* Chart Type Button */}
                  <button
                    onClick={openDropdown}
                    className="flex items-center space-x-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <MdPieChartOutline className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Chart Type</span>
                  </button>

                  {/* SQL Button */}
                  <div
                    onClick={() => {
                      console.log("Here");
                      setShowSQL(!showSQL);
                    }}
                    className="flex items-center justify-center w-9 h-9 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
                  >
                    <PiFileSql className="w-4 h-4 text-gray-600" />
                  </div>
                  {/* Download Button */}
                  <button
                    onClick={handleDownloadClick}
                    className="flex items-center justify-center w-9 h-9 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
                  >
                    <BsThreeDotsVertical className="w-4 h-4 text-gray-600" />
                  </button>

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
            )}

            {showInterruptMessage ? (
              <p className="text-gray-700 text-label px-3 py-3 chat-ui">
                Query execution was cancelled as requested. Let me know if you'd
                like to try again or modify your query.
              </p>
            ) : (
              <>
                {response?.aiResponse?.error && showError && (
                  <CustomNotificationCard
                    title="Error"
                    text="Something wrong on server, Please relogin"
                    onClose={closeErrorAlert}
                  />
                )}
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
                            {Object.entries(response.aiResponse.result[0]).map(
                              ([key, value], idx) => (
                                <div key={idx}>
                                  {key.replace(/_/g, " ")} = {value}
                                </div>
                              )
                            )}
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
                {showSQL && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                  >
                    <div className="bg-white w-full max-w-3xl h-[65vh] rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
                      {/* Header */}
                      <div className="flex items-center justify-between bg-gray-200 px-5 py-3 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <BsFiletypeSql className="w-6 h-6 text-indigo-600" />
                          <h2 className="text-lg font-semibold text-slate-800">
                            SQL Query Editor
                          </h2>
                        </div>
                        <button
                          onClick={() => {
                            setStatusMessage({
                              text: "View your SQL. You can edit or validate the query.",
                              type: "info",
                            });
                            setShowSQL(false);
                            setIsEditing(false);
                          }}
                          className="text-slate-500 hover:text-gray-600 hover:bg-indigo-100 p-1.5 rounded-lg transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Editor Section */}
                      <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
                        {/* <div className="px-5 py-3 border-b border-slate-200 flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-green-600 bg-indigo-100 p-1 rounded-lg" />
                          <span className="text-sm font-semibold text-slate-800">
                            SQL Query
                          </span>
                          {isEditing && (
                            <span className="ml-2 px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-green-700 text-xs font-medium rounded-full">
                              ✏️ Editing Mode
                            </span>
                          )}
                        </div> */}

                        <div className="flex-1 px-5 py-4 overflow-y-auto">
                          <div className="h-[38vh] relative">
                            {isEditing ? (
                              <div className="h-full relative">
                                <textarea
                                  value={editableSQL}
                                  onChange={handleChange}
                                  className="w-full h-full p-4 px-6 font-mono text-lg text-gray-800 bg-white border-2 border-indigo-300 rounded-xl resize-none focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow"
                                  placeholder="Edit your SQL query here..."
                                />
                                <div className="absolute top-3 right-3 bg-yellow-200 text-black p-2 rounded-lg shadow">
                                  <Edit3 className="w-4 h-4" />
                                </div>
                              </div>
                            ) : (
                              <div className="h-full relative">
                                <pre className="w-full h-full overflow-auto p-4 font-mono text-lg text-slate-800 bg-white border-2 border-slate-200 rounded-xl shadow whitespace-pre-wrap">
                                  {editableSQL}
                                </pre>
                                <div className="absolute top-3 right-3 bg-amber-200 p-2 rounded-lg shadow">
                                  <Database className="w-4 h-4 text-gray-900" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div
                        className={`mx-5 my-2 px-4 py-2.5 rounded-xl border-l-4 text-sm font-medium shadow-sm ${
                          statusMessage.type === "error"
                            ? "bg-red-50 border-red-400 text-red-800"
                            : statusMessage.type === "success"
                            ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                            : "bg-gray-200 border-gray-400 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {statusMessage.type === "error" ? (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          ) : statusMessage.type === "success" ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Code2 className="w-4 h-4 text-gray-600" />
                          )}
                          <span className="leading-relaxed">
                            {statusMessage.text}
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-slate-200 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                          <span>
                            Tip: Edit your query then click Validate to check
                            syntax.
                          </span>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                          <button
                            onClick={() => {
                              const newEditingState = !isEditing;
                              setIsEditing(newEditingState);

                              if (newEditingState) {
                                setStatusMessage({
                                  text: "Now you're in Editing Mode, edit SQL query and click on Validate",
                                  type: "info",
                                });
                              } else {
                                setStatusMessage({
                                  text: "View your SQL. You can edit or validate the query.",
                                  type: "info",
                                });
                              }
                            }}
                            className="px-4 py-2 text-indigo-700 font-semibold border-2 border-indigo-400 rounded-xl hover:bg-indigo-50 hover:border-indigo-500 transition-all text-sm flex items-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            {isEditing ? "View Mode" : "Edit Query"}
                          </button>

                          <button
                            onClick={() => handleValidate(editableSQL)}
                            disabled={isValidating}
                            className="px-6 py-2 text-white bg-gradient-to-r from-indigo-700 to-blue-800 hover:from-indigo-800 hover:to-blue-900 font-semibold rounded-xl transition shadow-lg text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isValidating ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Validating...
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                Validate Query
                              </>
                            )}
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
      </div>
    </div>
  );
};

export default ResponseCard;
