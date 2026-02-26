import React from "react";
import "./scheduleinterview.css";

function ScheduleInterview() {

  const scheduleInterview = (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const job = document.getElementById("job").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const mode = document.getElementById("mode").value;
    const location = document.getElementById("location").value;

    if (!name || !job || !date || !time || !location) {
      alert("Please fill all fields");
      return;
    }

    const tableBody = document.getElementById("interviewTable");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${tableBody.rows.length + 1}</td>
      <td>${name}</td>
      <td>${job}</td>
      <td>${date}</td>
      <td>${time}</td>
      <td>${mode}</td>
      <td>${location}</td>
      <td><span class="status-active">Scheduled</span></td>
      <td>
        <button onclick="this.parentElement.parentElement.remove()">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(newRow);

    e.target.reset();
  };

  return (
    <div className="interview-page">

      <div className="form-card">
        <div className="form-header">Schedule Interview</div>

        <form onSubmit={scheduleInterview}>

          <div className="form-grid">

            <div className="form-group">
              <label>Candidate Name</label>
              <input type="text" id="name" required />
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input type="text" id="job" required />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input type="date" id="date" required />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input type="time" id="time" required />
            </div>

            <div className="form-group">
              <label>Mode</label>
              <select id="mode">
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Meeting Link / Office Address</label>
              <input type="text" id="location" required />
            </div>

          </div>

          <button type="submit" className="submit-btn">
            Schedule Interview
          </button>

        </form>
      </div>

      {/* Interview Table */}
      <div className="job-card">
        <div className="job-header">Scheduled Interviews</div>

        <table className="job-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Candidate</th>
              <th>Job</th>
              <th>Date</th>
              <th>Time</th>
              <th>Mode</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody id="interviewTable">
            <tr>
              <td colSpan="9" className="no-data">
                No interviews scheduled
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ScheduleInterview;
