import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./AdminDashboard.css";

// ChartJS registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);

        // Generate chart data based on fetched stats
        const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
        const salesData = labels.map(
          (_, idx) => Math.floor(res.data.totalSales / 8 + Math.random() * 1000)
        );
        const ordersData = labels.map(
          (_, idx) => Math.floor(res.data.totalOrders / 8 + Math.random() * 50)
        );
        const usersData = labels.map(
          (_, idx) => Math.floor(res.data.totalUsers / 8 + Math.random() * 20)
        );
        const productsData = labels.map(
          (_, idx) => Math.floor(res.data.totalProducts / 8 + Math.random() * 10)
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Sales (₹)",
              data: salesData,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Orders",
              data: ordersData,
              borderColor: "#ef4444",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Users",
              data: usersData,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Products",
              data: productsData,
              borderColor: "#f97316",
              backgroundColor: "rgba(249, 115, 22, 0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="card-grid">
        <div className="card blue">
          <h4>Total Sales</h4>
          <h2>₹{stats.totalSales}</h2>
        </div>

        <div className="card red">
          <h4>Total Orders</h4>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div className="card green">
          <h4>Total Users</h4>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="card orange">
          <h4>Total Products</h4>
          <h2>{stats.totalProducts}</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        {chartData && <Line data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false },
          },
          interaction: { mode: 'nearest', axis: 'x', intersect: false },
          scales: {
            y: { beginAtZero: true },
          },
        }} />}
      </div>
    </div>
  );
};

export default AdminDashboard;