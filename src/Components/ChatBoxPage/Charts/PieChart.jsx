import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../../../CoustomCss/Scrollbar.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ chartResponse }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!chartResponse?.labels || !chartResponse?.data) {
      console.warn("Invalid chart response.");
      return;
    }

    const brightColors = [
      "#1e88e5", // blue
      "#8bc34a", // light green
      "#e53935", // red
      "#ffeb3b", // yellow
      "#5e35b1", // purple
      "#fb8c00", // orange
      "#263238", // dark blue-gray
      "#90caf9", // light blue
    ];

    const backgroundColors = chartResponse.labels.map(
      (_, i) => brightColors[i % brightColors.length]
    );

    setChartData({
      labels: chartResponse.labels,
      datasets: [
        {
          data: chartResponse.data,
          backgroundColor: backgroundColors,
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    });
  }, [chartResponse]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#f1f5f9",
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#000",
          font: {
            size: 12,
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-2 h-[330px]">
      <Pie ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
