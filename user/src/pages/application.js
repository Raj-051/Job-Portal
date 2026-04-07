import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./application.css";

function Application() {

  const [applications, setApplications] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("mydata"));

  useEffect(() => {

    if (!user) return;

    Axios.get(`http://localhost:1337/api/getUserApplications/${user.User_id}`)
      .then((res) => {
        setApplications(res.data);
      })
      .catch(() => alert("Error loading data"));

  }, [user]);

  return (
    <div className="application-page">

      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        applications.map((item) => (
          <div key={item.Apply_id} className="app-card">

            <h3>{item.job_title}</h3>

            <p><b>Company:</b> {item.Company_name}</p>
            <p><b>Location:</b> {item.location}</p>
            <p><b>Status:</b> {item.application_status}</p>

            {/* 🔥 INTERVIEW SECTION */}
            {item.Interview_id ? (
              <div className="interview-box">

                <h4>Interview Scheduled</h4>

                <p><b>Date:</b> {item.interview_date}</p>
                <p><b>Time:</b> {item.interview_time}</p>
                <p><b>Mode:</b> {item.interview_mode}</p>

                {item.interview_mode === "Online" ? (
                  <p>
                    <b>Link:</b>{" "}
                    <a href={item.interview_link} target="_blank" rel="noreferrer">
                      Join Interview
                    </a>
                  </p>
                ) : (
                  <p><b>Location:</b> {item.interview_location}</p>
                )}

                <p><b>Status:</b> {item.interview_status}</p>

              </div>
            ) : (
              <p style={{ color: "gray" }}>No interview scheduled</p>
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default Application;