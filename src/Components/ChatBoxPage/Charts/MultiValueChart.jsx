import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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

const MultiValueChart = ({ chartResponse, chartType }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!chartResponse?.labels || !chartResponse?.data) {
      console.warn("Invalid chart response.");
      return;
    }

    const { labels, data, keys } = chartResponse;
    const colorPalette = ["#2caffe", "#544fc5", "rgb(255, 183, 15)"];

    const datasets = data.map((values, index) => ({
      label: keys[index]
        ?.replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      data: values,
      backgroundColor: colorPalette[index % colorPalette.length],
      borderColor: colorPalette[index % colorPalette.length],
      borderWidth: 1,
      pointBackgroundColor: colorPalette[index % colorPalette.length],
      pointRadius: 5,
      pointHoverRadius: 8,
      borderRadius: 5,
    }));

    setChartData({ labels, datasets });
  }, [chartResponse, chartType]);

  const maxDataValue = Math.max(...(chartResponse?.data?.flat?.() || [0]));

  const getDynamicYAxisScale = (data, minSteps = 4, maxSteps = 8) => {
    const maxVal = Math.max(...(Array.isArray(data) ? data.flat() : [0]));
    if (maxVal === 0) return { adjustedMax: 100, stepSize: 20 };

    const rawStep = Math.pow(8, Math.floor(Math.log10(maxVal)));
    let stepSize = rawStep;

    for (let factor of [1, 2, 5, 10]) {
      const candidateStep = rawStep * factor;
      const steps = Math.ceil(maxVal / candidateStep);
      if (steps >= minSteps && steps <= maxSteps) {
        stepSize = candidateStep;
        break;
      }
    }

    const adjustedMax = Math.ceil(maxVal / stepSize) * stepSize + stepSize;

    return { adjustedMax };
  };

  const { adjustedMax } = getDynamicYAxisScale(chartResponse?.data);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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

          const dataPoint = tooltip.dataPoints?.[0];
          if (dataPoint) {
            const title = tooltip.title?.[0] || "";
            const label = dataPoint.dataset.label;
            const rawValue = dataPoint.raw;
            const formattedValue = new Intl.NumberFormat("en-US").format(
              rawValue
            );

            tooltipEl.innerHTML = `
              <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">${title}</div>
              <div>${label}: ${formattedValue}</div>
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
            canvasRect.left + window.scrollX + tooltip.caretX + "px";
          tooltipEl.style.top =
            canvasRect.top + window.scrollY + tooltip.caretY + 10 + "px";
          tooltipEl.style.transform = "translateX(-50%)";
        },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#1e293b",
        font: { size: 12, weight: "bold" },
        formatter: (value) =>
          value >= 1000 ? (value / 1000).toFixed(1) + "K" : value,
      },
    },
  };

  const chartOptions = {
    bar: {
      ...commonOptions,
      scales: {
        x: {
          categoryPercentage: 0.4,
          barPercentage: 0.2,
          ticks: {
            color: "#1e293b",
            font: { size: 14 },
            maxRotation: 20,
            minRotation: 20,
            autoSkip: false,
          },
          grid: { color: "#e2e8f0" },
        },
        y: {
          ticks: {
            color: "#1e293b",
            font: { size: 12 },
            callback: (value) => (value >= 1000 ? value / 1000 + "K" : value),
          },
          grid: { color: "#e2e8f0" },
          beginAtZero: true,
          suggestedMax: adjustedMax,
          grace: "20%",
        },
      },
    },
    line: {
      ...commonOptions,
      elements: {
        line: { tension: 0.4, borderWidth: 4 },
        point: { radius: 4, hoverRadius: 8 },
      },
      scales: {
        x: {
          ticks: {
            color: "#1e293b",
            font: { size: 14 },
            maxRotation: 20,
            minRotation: 20,
            autoSkip: false,
          },
          grid: { color: "#e2e8f0" },
          offset: true,
        },
        y: {
          ticks: {
            color: "#1e293b",
            font: { size: 12 },
            callback: (value) => (value >= 1000 ? value / 1000 + "K" : value),
          },
          grid: { color: "#e2e8f0" },
          beginAtZero: true,
          suggestedMax: adjustedMax,
          grace: "20%",
        },
      },
    },
  };

  const ChartComponent = chartType === "bar" ? Bar : Line;

  return (
    <div className="relative w-full bg-white shadow-lg rounded-md px-2">
      <div className="overflow-x-auto">
        <div
          style={{
            width: `${Math.max(1000, chartData.labels.length * 120)}px`,
            height: "260px",
          }}
          className="mb-2"
        >
          {chartData.labels.length > 0 && (
            <ChartComponent
              key={chartType}
              data={chartData}
              options={chartOptions[chartType]}
            />
          )}
        </div>
      </div>

      {chartData.datasets && chartData.datasets.length > 0 && (
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white mb-3 flex gap-2"
          style={{ zIndex: 10 }}
        >
          {chartData.datasets.map((dataset, index) => (
            <span
              key={index}
              className="flex items-center gap-1 top-1 px-3 text-sm font-medium text-gray-700"
            >
              <span className="relative w-4 h-2 flex items-center justify-center pt-1">
                <span
                  className="absolute top-1.5 left-0 right-0 h-0.5 transform -translate-y-1/2 rounded"
                  style={{
                    backgroundColor:
                      dataset.borderColor === "transparent"
                        ? dataset.backgroundColor
                        : dataset.borderColor || dataset.backgroundColor,
                  }}
                ></span>
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

export default MultiValueChart;
