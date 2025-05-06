import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../../../CoustomCss/Scrollbar.css";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChart = ({ chartResponse }) => {
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
          hoverOffset: 10,
        },
      ],
    });
  }, [chartResponse]);

  const total = chartResponse?.data?.reduce((a, b) => a + b, 0) || 1;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%", // donut thickness
    plugins: {
      tooltip: {
        enabled: true, // ✅ Enable tooltip on hover
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
        display: false, // ❌ Completely hide labels from chart slices
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
      <Doughnut
        ref={chartRef}
        data={chartData}
        options={options}
        className=""
      />
    </div>
  );
};

export default DoughnutChart;
