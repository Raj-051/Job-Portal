import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);

  const company = JSON.parse(sessionStorage.getItem("mydata"));

  useEffect(() => {

    if (!company) return;

    // 🔥 Dashboard stats
    Axios.get(`http://localhost:1337/api/companyDashboard/${company.Company_id}`)
      .then((res) => {
        setStats(res.data);
      });

    // 🔥 Recent applications
    Axios.get(`http://localhost:1337/api/recentApplications/${company.Company_id}`)
      .then((res) => {
        setRecent(res.data);
      });

  }, [company]);

  return (
    <div className="container">

      <h1>Company Dashboard</h1>

      <div className="row">

        <div className="card">
          <h3>Total Jobs</h3>
          <p>{stats.totalJobs || 0}</p>
        </div>

        <div className="card">
          <h3>Total Applications</h3>
          <p>{stats.totalApplications || 0}</p>
        </div>

        <div className="card">
          <h3>Approved</h3>
          <p>{stats.approved || 0}</p>
        </div>

        <div className="card">
          <h3>Rejected</h3>
          <p>{stats.rejected || 0}</p>
        </div>

      </div>

      <h2>Recent Applications</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Job Title</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {recent.length === 0 ? (
            <tr>
              <td colSpan="3">No Data</td>
            </tr>
          ) : (
            recent.map((item, index) => (
              <tr key={index}>
                <td>{item.Name}</td>
                <td>{item.job_title}</td>
                <td>{item.Status}</td>
              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;