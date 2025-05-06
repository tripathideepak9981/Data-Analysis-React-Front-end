import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const ScatterChart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/patients/districtWise")
      .then((res) => {
        const data = res.data;

        const districts = Object.keys(data);
        const admissionsData = [];
        const treatedData = [];

        districts.forEach((district, index) => {
          const { admissionCount, treatedCount } = data[district];
          admissionsData.push({ x: index + 1, y: admissionCount });
          treatedData.push({ x: index + 1, y: treatedCount });
        });

        setChartData({
          datasets: [
            {
              label: "Admissions",
              data: admissionsData,
              borderColor: "#3b82f6",
              backgroundColor: "#3b82f680",
              pointRadius: 6,
              pointHoverRadius: 8,
            },
            {
              label: "Treated",
              data: treatedData,
              borderColor: "#10b981",
              backgroundColor: "#10b98180",
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const { x, y } = context.raw;
            return `District Index: ${x}, Value: ${y}`;
          },
        },
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#f1f5f9",
        padding: 12,
        cornerRadius: 8,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "District Index",
          color: "#1e293b",
          font: { weight: "bold" },
        },
        ticks: {
          stepSize: 1,
          color: "#1e293b",
        },
        grid: {
          color: "#e2e8f0",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
          color: "#1e293b",
          font: { weight: "bold" },
        },
        ticks: {
          color: "#1e293b",
        },
        grid: {
          color: "#e2e8f0",
        },
      },
    },
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-md p-5">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">
        District-wise Admissions and Treated
      </h2>

      <div className="w-full h-[500px]">
        <Scatter data={chartData} options={options} />
      </div>

      {/* Legend below chart */}
      <div className="flex justify-center items-center mt-4 space-x-6">
        {chartData.datasets.map((dataset, index) => (
          <span
            key={index}
            className="font-medium text-sm"
            style={{ color: dataset.borderColor }}
          >
            ⬤ {dataset.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScatterChart;
