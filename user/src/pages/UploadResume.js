import React from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./UploadResume.css";

function UploadResume() {

  function uploadResume() {

    const resume = document.getElementById("resume").files[0];

    if (!resume) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select resume file"
      });
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    Axios.post("http://localhost:5000/uploadresume", formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Resume uploaded successfully"
        });
      });

  }

  return (
    <div className="upload-wrapper">

      <div className="upload-box">

        <h2>Upload Resume</h2>

        <p className="upload-text">
          Upload your updated resume to apply for jobs quickly.
        </p>

        <input type="file" id="resume" className="resume-file" />

        <button className="upload-btn" onClick={uploadResume}>
          Upload Resume
        </button>

      </div>

    </div>
  );
}

export default UploadResume;