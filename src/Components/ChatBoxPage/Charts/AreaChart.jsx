import { Line } from "react-chartjs-2";

const AreaChart = ({ chartResponse }) => {
  const data = {
    labels: chartResponse.labels,
    datasets: [
      {
        label: "Area Dataset",
        data: chartResponse.data,
        fill: true,
        backgroundColor: "rgba(79, 70, 229, 0.4)",
        borderColor: "#4F46E5",
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
};

export default AreaChart;
