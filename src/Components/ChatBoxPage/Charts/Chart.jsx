import React, { useEffect, useState, useRef } from "react";
import SingleValueChart from "./SingleValueChart";
import PieChart from "./PieChart";
import MultiValueChart from "./MultiValueChart";
import html2canvas from "html2canvas";
import { AreaChart } from "lucide-react";
import DoughnutChart from "./DoughnutChart";
import ScatterChart from "./ScatterChart";
import Loader from "./Loader";

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
      <div ref={chartRef}>
        {isLoading ? (
          <Loader />
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
