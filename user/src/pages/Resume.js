import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./resume.css";

function Resume() {
  const navigate = useNavigate();
  const sessionUser = JSON.parse(sessionStorage.getItem("mydata"));

  const [user, setUser] = useState({});

  // 🔥 FETCH LATEST DATA FROM DB
  useEffect(() => {
    if (!sessionUser) return;

    Axios.get(`http://localhost:1337/api/getuser/${sessionUser.User_id}`)
      .then((res) => {
        setUser(res.data);

        // 🔥 UPDATE SESSION ALSO
        sessionStorage.setItem("mydata", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const downloadResume = () => {
    window.open(`http://localhost:1337/api/generate-resume/${sessionUser.User_id}`);
  };

  return (
    <div className="resume-container">

      <div className="resume-header">
        <img
          src={
            user?.Upload_photo
              ? `http://localhost:1337/public/${user.Upload_photo}`
              : "/img/default-user.png"
          }
          className="resume-pho"
          alt="profile"
        />

        <div>
          <h3>{user?.Name || "Your Name"}</h3>
          <p><b>Email:</b> {user?.email || "-"}</p>
          <p><b>Phone:</b> {user?.Contact_no || "-"}</p>
          <p><b>Address:</b> {user?.Address || "-"}</p>
        </div>
      </div>

      <hr/>

      <div className="resume-section">
        <h2>PROFILE</h2>
        <p>{user?.Address || "-"}</p>
      </div>

      <div className="resume-section">
        <h2>EDUCATION</h2>
        <p>{user?.Education || "-"}</p>
      </div>

      <div className="resume-section">
        <h2>SKILLS</h2>
        <p>{user?.skills || "-"}</p>
      </div>

      {user?.Experience > 0 && (
        <div className="resume-section">
          <h2>EXPERIENCE</h2>
          <p><b>Company:</b> {user?.company_name || "-"}</p>
          <p><b>Post:</b> {user?.post || "-"}</p>
          <p><b>Duration:</b> {user?.Duration || "-"}</p>
          <p>{user?.Work_description || "-"}</p>
        </div>
      )}

      <div className="download-btn">
        <button onClick={downloadResume}>
          Download PDF Resume
        </button>

        <button
          className="edit-btn"
          onClick={() => navigate("/editprofile")}
        >
          Edit Resume
        </button>
      </div>

    </div>
  );
}

export default Resume;