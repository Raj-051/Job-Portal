import React from "react";
import "./resume.css";

function Resume() {

  const user = JSON.parse(sessionStorage.getItem("mydata"));

  const downloadResume = () => {
    window.open(`http://localhost:1337/api/generate-resume/${user.User_id}`);
  };

  return (
    <div className="resume-container">

      <div className="resume-header">
        <img
          src={`http://localhost:1337/public/${user.Upload_photo}`}
          className="resume-photo"
          alt="profile"
        />

        <div>
          <p><b>Address:</b> {user.Address}</p>
          <p><b>Phone:</b> {user.Contact_no}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>
      </div>

      <hr/>

      {/* PROFILE */}
      <div className="resume-section">
        <h2>PROFILE</h2>
        <p>{user.Address}</p>
      </div>

      {/* EDUCATION */}
      <div className="resume-section">
        <h2>EDUCATION</h2>
        <p>{user.Education}</p>
      </div>

      {/* SKILLS */}
      <div className="resume-section">
        <h2>SKILLS</h2>
        <p>{user.skills}</p>
      </div>

      {/* EXPERIENCE */}
      {user.Experience > 0 && (
        <div className="resume-section">
          <h2>EXPERIENCE</h2>
          <p><b>Company:</b> {user.company_name}</p>
          <p><b>Post:</b> {user.post}</p>
          <p><b>Duration:</b> {user.Duration}</p>
          <p>{user.Work_description}</p>
        </div>
      )}

      <div className="download-btn">
        <button onClick={downloadResume}>
          Download PDF Resume
        </button>
      </div>

    </div>
  );
}

export default Resume;