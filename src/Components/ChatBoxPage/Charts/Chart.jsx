import React, { useEffect, useState, useRef } from "react";
import SingleValueChart from "./SingleValueChart";
import PieChart from "./PieChart";
import MultiValueChart from "./MultiValueChart";
import html2canvas from "html2canvas";
import { AreaChart } from "lucide-react";
import DoughnutChart from "./DoughnutChart";
import ScatterChart from "./ScatterChart";
import SeachLoader2 from "../../../assets/searchloader.gif";
import { BsBarChartLine } from "react-icons/bs";

const Chart = ({ chartResponse, chartType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("chartType:", chartType);
  }, []);

  const Loader = () => {
    return (
      <div className="relative w-full h-[160px] mb-4 border border-gray-300 p-2 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-md">
        <div className="absolute inset-0 animate-gradientMove bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0)_60%,rgba(255,255,255,0)_100%)]" />

        <div className="relative w-full h-full flex flex-col justify-center gap-4">
          <div className="bg-gray-300 w-24 h-14 rounded-full mx-auto" />

          <div className="bg-gray-300 h-3 w-60 mx-auto rounded-md" />
          <div className="bg-gray-300 h-3 w-48 mx-auto rounded-md" />
          <div className="bg-gray-300 h-3 w-52 mx-auto rounded-md" />
          <div className="bg-gray-300 h-3 w-48 mx-auto rounded-md" />
        </div>
      </div>
    );
  };

  const downloadChart = async (format) => {
    if (!chartRef.current) return;

    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL(`image/${format}`);
    link.download = `chart.${format}`;
    link.click();

    setMenuOpen(false);
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide bg-white relative">
      {/* <div className="flex items-start justify-start">
        <h2
          className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-8"
          style={{ fontSize: "clamp(10px, 2vw, 17px)" }}
        >
          <BsBarChartLine className="text-gray-800 animate-spin-slow h-5 w-5" />
          Generated Chart
        </h2>
      </div> */}

      <div ref={chartRef}>
        {isLoading ? (
          <img src={SeachLoader2} className="ml-60 h-52 w-52" />
        ) : chartResponse?.multi_value ? (
          <MultiValueChart
            chartResponse={chartResponse}
            chartType={chartType}
          />
        ) : (
          <>
            {(chartType === "bar" || chartType === "line") && (
              <SingleValueChart
                chartResponse={chartResponse}
                chartType={chartType}
              />
            )}

            {chartType === "pie" && <PieChart chartResponse={chartResponse} />}
            {chartType === "doughnut" && (
              <DoughnutChart chartResponse={chartResponse} />
            )}
            {chartType === "scatter" && (
              <ScatterChart chartResponse={chartResponse} />
            )}
            {chartType === "area" && (
              <AreaChart chartResponse={chartResponse} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Chart;
