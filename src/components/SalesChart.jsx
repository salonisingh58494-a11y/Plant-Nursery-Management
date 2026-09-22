import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ salesData }) => {
  const data = {
    labels: salesData.map(item => item.date),
    datasets: [
      {
        label: "Sales (₹)",
        data: salesData.map(item => item.total),
        backgroundColor: "#388a31",
      },
    ],
  };

  return (
    <div style={{ width: "80%", height: "300px" }}>
      <Bar data={data} />
    </div>
  );
};

export default SalesChart;