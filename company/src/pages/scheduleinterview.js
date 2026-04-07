import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./scheduleinterview.css";

function ScheduleInterview() {

  const [shortlisted, setShortlisted] = useState([]);
  const [selected, setSelected] = useState(null);
  const [interviews, setInterviews] = useState([]);

  const company = JSON.parse(sessionStorage.getItem("mydata"));

  // 🔥 LOAD DATA
  useEffect(() => {

    if (!company) return;

    Axios.get(`http://localhost:1337/api/getShortlisted/${company.Company_id}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setShortlisted(data);
      });

    Axios.get(`http://localhost:1337/api/getinterviews/${company.Company_id}`)
      .then((res) => {
        setInterviews(Array.isArray(res.data) ? res.data : []);
      });

  }, [company]);

  // ✅ SCHEDULE INTERVIEW
  const scheduleInterview = (e) => {
    e.preventDefault();

    const date = e.target.date.value;
    const time = e.target.time.value;
    const mode = e.target.mode.value;
    const location = e.target.location.value;

    if (!selected || !date || !time || !location) {
      alert("Please fill all fields");
      return;
    }

    if (interviews.some(i => i.Apply_id === selected.Apply_id)) {
      alert("Interview already scheduled");
      return;
    }

    Axios.post("http://localhost:1337/api/scheduleInterview", {
      Apply_id: selected.Apply_id,
      Job_id: selected.Job_id,
      User_id: selected.User_id,
      Company_id: company.Company_id,
      interview_date: date,
      interview_time: time,
      interview_mode: mode,
      interview_link: mode === "Online" ? location : null,
      interview_location: mode === "Offline" ? location : null
    })
    .then((res) => {

      alert("Interview Scheduled");

      const newInterview = {
        Interview_id: res.data.insertId,
        ...selected,
        interview_date: date,
        interview_time: time,
        interview_mode: mode,
        interview_link: mode === "Online" ? location : null,
        interview_location: mode === "Offline" ? location : null,
        status: "Scheduled"
      };

      setInterviews(prev => [...prev, newInterview]);

    })
    .catch(() => alert("Error scheduling"));

    e.target.reset();
    setSelected(null);
  };

  return (
    <div className="interview-page">

      <div className="form-card">
        <h2>Schedule Interview</h2>

        <form onSubmit={scheduleInterview}>
          
          {/* 👤 Candidate Dropdown */}
          <label>Candidate</label>
          <select
            required
            onChange={(e) => {
              const item = shortlisted.find(
                (d) => d.Apply_id == e.target.value
              );
              setSelected(item);
            }}
          >
            <option value="">Select Candidate</option>

            {shortlisted.map((item) => (
              <option key={item.Apply_id} value={item.Apply_id}>
                {item.Name}
              </option>
            ))}
          </select>

          {/* 💼 Job Title Dropdown (FIXED) */}
          <label>Job Title</label>
          <select value={selected?.job_title || ""} disabled>
            <option value="">
              {selected ? selected.job_title : "Select Candidate First"}
            </option>
          </select>

          {/* 📅 Date */}
          <label>Date</label>
          <input type="date" name="date" required />

          {/* ⏰ Time */}
          <label>Time</label>
          <input type="time" name="time" required />

          {/* 📍 Mode */}
          <label>Mode</label>
          <select name="mode">
            <option>Online</option>
            <option>Offline</option>
          </select>

          {/* 📌 Location */}
          <label>Meeting Link / Address</label>
          <input type="text" name="location" required />

          <button type="submit">Schedule</button>

        </form>
      </div>

    </div>
  );
}

export default ScheduleInterview;