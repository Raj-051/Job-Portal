import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./dashboard.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

// 🔥 CHART IMPORT
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {

  const [data, setData] = useState({});

  // 🔥 API CALL
  useEffect(() => {

    Axios.get("http://localhost:1337/api/adminDashboard")
      .then((res) => {
        console.log("Dashboard Data:", res.data);
        setData(res.data);
      })
      .catch(() => alert("Error loading dashboard"));

  }, []);

  // 🔥 CHART DATA
 const chartData = {
  labels: ["Companies", "Jobs", "Applications", "Interviews"],
  datasets: [
    {
      label: "System Data",
      data: [
        data.totalCompanies || 0,
        data.totalJobs || 0,
        data.totalApplications || 0,
        data.totalInterviews || 0
      ],

      // 🔥 Soft professional colors
      backgroundColor: [
        "#4e73df", // blue
        "#1cc88a", // green
        "#f6c23e", // yellow
        "#e74a3b"  // red
      ],

      borderRadius: 8,   // rounded bars
      barThickness: 40   // width of bars
    }
  ]
};
  const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: "#333",
      titleColor: "#fff",
      bodyColor: "#fff"
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#eee"
      }
    }
  }
};

  return (
    <>
      <Header />
      <Sidebar />

      <div className="page-content">

        <div className="page-header">
          <div className="container-fluid">
            <h2 className="h5 no-margin-bottom">Admin Dashboard</h2>
          </div>
        </div>

        {/* 🔥 STAT CARDS */}
        <section className="no-padding-top no-padding-bottom">
          <div className="container-fluid">
            <div className="dashboard-cards">

  <div className="statistic-block block">
    <div className="title"><strong>Total Companies</strong></div>
    <div className="number dashtext-1">
      {data.totalCompanies || 0}
    </div>
  </div>

  <div className="statistic-block block">
    <div className="title"><strong>Total Jobs</strong></div>
    <div className="number dashtext-2">
      {data.totalJobs || 0}
    </div>
  </div>

  <div className="statistic-block block">
    <div className="title"><strong>Total Applications</strong></div>
    <div className="number dashtext-3">
      {data.totalApplications || 0}
    </div>
  </div>

  <div className="statistic-block block">
    <div className="title"><strong>Total Interviews</strong></div>
    <div className="number dashtext-4">
      {data.totalInterviews || 0}
    </div>
  </div>

</div>
          </div>
        </section>

        {/* 🔥 CHART SECTION */}
        <section style={{ marginTop: "20px" }}>
          <div className="container-fluid">
            <div className="row">

              <div className="col-lg-12">
                <div className="block chart-container">
  <h3>System Overview</h3>
  <div className="chart-box">
    <Bar data={chartData} options={chartOptions} />
  </div>
</div>
              </div>

            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;