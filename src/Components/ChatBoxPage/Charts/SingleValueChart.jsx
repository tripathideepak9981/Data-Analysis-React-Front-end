import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "../../../CoustomCss/Scrollbar.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const SingleValueChart = ({ chartResponse, chartType }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!chartResponse?.labels || !chartResponse?.data) {
      console.warn("Invalid chart response.");
      return;
    }
    console.log("From singleValue Chart");

    setChartData(() => {
      let { labels, data } = chartResponse;

      // Sort data for both bar and line charts
      const sortedData = labels
        .map((label, index) => ({ label, value: data[index] }))
        .sort((a, b) => b.value - a.value);

      labels = sortedData.map((item) => item.label);
      data = sortedData.map((item) => item.value);

      return {
        labels,
        datasets: [
          {
            label: "Total Admission",
            data: data || [],
            backgroundColor: "#2caffe",
            borderColor: chartType === "line" ? "#2caffe" : "transparent",
            borderWidth: chartType === "line" ? 2 : 0,
            barThickness: 40,
            pointBackgroundColor: "#2caffe",
            pointRadius: 5,
            pointHoverRadius: 8,
            borderRadius: 5,
          },
        ],
      };
    });
  }, [chartResponse, chartType]);

  useEffect(() => {
    return () => {
      const el = document.getElementById("chartjs-tooltip");
      if (el) el.remove();
    };
  }, []);
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          let tooltipEl = document.getElementById("chartjs-tooltip");

          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.background = "#ffffff";
            tooltipEl.style.color = "#000000";
            tooltipEl.style.border = "0.5px solid #cbd5e1";
            tooltipEl.style.borderRadius = "6px";
            tooltipEl.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
            tooltipEl.style.padding = "10px 15px";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.transition = "all 0.2s ease";
            tooltipEl.style.font = "12px sans-serif";
            tooltipEl.style.zIndex = 100;
            tooltipEl.style.whiteSpace = "nowrap";
            tooltipEl.style.textAlign = "left";
            document.body.appendChild(tooltipEl);
          }

          const { chart, tooltip } = context;

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          if (tooltip.body) {
            const title = tooltip.title[0] || "";
            const body = tooltip.body[0]?.lines[0] || "";

            tooltipEl.innerHTML = `
              <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">${title}</div>
              <div>${body}</div>
              <div id="tooltip-arrow" style="
                position: absolute;
                top: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 6px solid #ffffff;
              "></div>
            `;
          }

          const canvasRect = chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left =
            canvasRect.left +
            window.scrollX +
            tooltip.caretX +
            tooltip.width / 22 +
            "px";
          tooltipEl.style.top =
            canvasRect.top + window.scrollY + tooltip.caretY + 10 + "px";
          tooltipEl.style.transform = "translateX(-50%)";
        },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        color: "#f8fafc",
        font: { size: 14, weight: "bold" },
      },
    },
  };

  // const maxDataValue = Math.max(...(chartResponse?.data || []));
  const maxDataValue = Math.max(
    ...(Array.isArray(chartResponse?.data) ? chartResponse.data : [0])
  );
  const stepSize = 1000;
  const adjustedMax = Math.ceil(maxDataValue / stepSize) * stepSize + stepSize;

  const chartOptions = {
    bar: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        datalabels: {
          display: true,
          color: "#1e293b",
          font: { size: 12, weight: "bold" },
          anchor: "end",
          align: "top",
          formatter: (value) =>
            value >= 1000 ? (value / 1000).toFixed(1) + "K" : value,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            font: { size: 14, weight: "bold" },
            color: "#1e293b",
          },
          ticks: { color: "#1e293b", font: { size: 14 } },
          grid: { color: "#e2e8f0" },
          offset: true,
        },
        y: {
          title: {
            display: true,
            font: { size: 14, weight: "bold" },
            color: "#1e293b",
          },
          ticks: {
            color: "#1e293b",
            font: { size: 12 },
            callback: (value) => (value >= 1000 ? value / 1000 + "K" : value),
          },
          grid: { color: "#e2e8f0" },
          suggestedMax: adjustedMax,
        },
      },
    },
    line: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        legend: {
          display: false,
        },
        datalabels: {
          display: chartResponse.multi_value ? false : true,
          color: "#333",
          font: { size: 12, weight: "bold" },
          anchor: "end",
          align: "top",
          formatter: (value) =>
            value >= 1000 ? (value / 1000).toFixed(1) + "K" : value,
        },
      },
      elements: {
        line: { tension: 0.4, borderWidth: 2 },
        point: { radius: 5, hoverRadius: 8 },
      },
      scales: {
        x: {
          title: {
            display: true,
            font: { size: 14, weight: "bold" },
            color: "#1e293b",
          },
          ticks: { color: "#1e293b", font: { size: 14 } },
          grid: { color: "#e2e8f0" },
          offset: true,
        },
        y: {
          title: {
            display: true,
            font: { size: 14, weight: "bold" },
            color: "#1e293b",
          },
          ticks: {
            color: "#1e293b",
            font: { size: 12 },
            callback: (value) => (value >= 1000 ? value / 1000 + "K" : value),
          },
          grid: { color: "#e2e8f0" },
          suggestedMax: adjustedMax,
        },
      },
    },
  };

  const ChartComponent = chartType === "bar" ? Bar : Line;

  return (
    <div className="w-full overflow-x-auto scrollbar-xy  bg-white">
      <div
        style={{
          width: `${Math.max(1000, chartData.labels.length * 100)}px`,
          height: "300px",
        }}
        className="mb-2"
      >
        {chartData.labels.length && (
          <ChartComponent
            key={chartType}
            data={chartData}
            options={chartOptions[chartType]}
          />
        )}
      </div>

      {/* Fixed Dynamic Legend (Does Not Scroll) */}
      {chartData.datasets && chartData.datasets.length >= 0 && (
        <div
          className="absolute bottom-0 left-1/2  transform -translate-x-1/2 bg-white mb-5 flex gap-2"
          style={{ zIndex: 10 }}
        >
          {chartData.datasets.map((dataset, index) => (
            <span
              key={index}
              className="flex items-center gap-1 top-1 px-3 text-sm font-medium text-gray-700"
            >
              {/* Line with centered circle */}
              <span className="relative w-4 h-2 flex items-center justify-center pt-1">
                {/* Horizontal Line */}
                <span
                  className="absolute top-1.5 left-0 right-0 h-0.5 transform -translate-y-1/2 rounded"
                  style={{
                    backgroundColor:
                      dataset.borderColor === "transparent"
                        ? dataset.backgroundColor
                        : dataset.borderColor || dataset.backgroundColor,
                  }}
                ></span>
                {/* Center Circle */}
                <span
                  className="w-2 h-2 rounded-full z-10"
                  style={{
                    backgroundColor:
                      dataset.borderColor === "transparent"
                        ? dataset.backgroundColor
                        : dataset.borderColor || dataset.backgroundColor,
                  }}
                ></span>
              </span>
              {dataset.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleValueChart;
