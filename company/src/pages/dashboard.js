import React from "react";
import "./dashboard.css";
function Dashboard() {
  return (
    <div className="container">
      <h1>Company Dashboard</h1>

      <div className="row">

        <div className="card">
          <h3>Total Jobs</h3>
          <p>10</p>
        </div>

        <div className="card">
          <h3>Total Applications</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Approved</h3>
          <p>12</p>
        </div>

        <div className="card">
          <h3>Rejected</h3>
          <p>5</p>
        </div>

      </div>

      <h2>Recent Applications</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Rahul</td>
            <td>Web Development</td>
            <td>Approved</td>
          </tr>

          <tr>
            <td>Neha</td>
            <td>React</td>
            <td>Pending</td>
          </tr>

          <tr>
            <td>Jay</td>
            <td>Node.js</td>
            <td>Rejected</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;