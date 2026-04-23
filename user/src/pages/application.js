import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./application.css";

function Application() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(sessionStorage.getItem("mydata"));

  useEffect(() => {

    if (!user) return;

    Axios.get(`http://localhost:1337/api/getUserApplications/${user.User_id}`)
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Error loading data");
        setLoading(false);
      });

  }, [user]);

  return (
    <div className="premium-application-page">
      <div className="application-container">
        <div className="page-header">
          <h2 className="premium-title">My Applications</h2>
          <p className="premium-subtitle">Track your job applications and upcoming interviews</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <p>You haven't applied to any jobs yet.</p>
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map((item) => (
              <div key={item.Apply_id} className="premium-app-card">
                <div className="card-header">
                  <div className="company-logo-placeholder">
                    {item.Company_name ? item.Company_name.charAt(0).toUpperCase() : "C"}
                  </div>
                  <div>
                    <h3 className="job-title">{item.job_title}</h3>
                    <p className="company-name">{item.Company_name}</p>
                  </div>
                  <div className={`status-badge ${String(item.application_status || 'applied').toLowerCase()}`}>
                    {item.application_status || 'Applied'}
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <i className="fa-solid fa-location-dot icon"></i>
                    <span>{item.location}</span>
                  </div>
                  <div className="info-row">
                    <i className="fa-solid fa-briefcase icon"></i>
                    <span>Application #{item.Apply_id}</span>
                  </div>
                </div>

                {/* 🔥 INTERVIEW SECTION */}
                {item.Interview_id ? (
                  <div className="premium-interview-box">
                    <div className="interview-header">
                      <i className="fa-solid fa-calendar-check text-emerald-500"></i>
                      <h4>Interview Scheduled</h4>
                    </div>

                    <div className="interview-details-grid">
                      <div className="detail-item">
                        <i className="fa-regular fa-calendar icon"></i>
                        <span>{new Date(item.interview_date).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fa-regular fa-clock icon"></i>
                        <span>{item.interview_time || "TBD"}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fa-solid fa-globe icon"></i>
                        <span>{item.interview_mode || "TBD"}</span>
                      </div>
                      <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                        <i className="fa-solid fa-circle-info icon"></i>
                        <span>{item.interview_status || "Scheduled"}</span>
                      </div>
                    </div>

                    {item.interview_mode === "Online" ? (
                      <a href={item.interview_link} target="_blank" rel="noreferrer" className="btn-join-meeting">
                        <i className="fa-solid fa-video"></i> Join Interview
                      </a>
                    ) : (
                      <div className="interview-location">
                        <i className="fa-solid fa-map-pin"></i> {item.interview_location || "Location pending"}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-interview">
                    <i className="fa-regular fa-clock"></i> No interview scheduled yet
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Application;