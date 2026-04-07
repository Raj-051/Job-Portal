import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./jobdetails.css";

function JobDetails() {

  const location = useLocation();
  const navigate = useNavigate();

  const { Job_id } = location.state || {};

  const [job, setJob] = useState(null);

  useEffect(() => {

    if (!Job_id) return;

    Axios.get(`http://localhost:1337/api/getjobdetails/${Job_id}`)
      .then((res) => {
        console.log("API DATA:", res.data[0]); // 🔥 DEBUG
        setJob(res.data[0]);
      })
      .catch((err) => console.log(err));

  }, [Job_id]);

  if (!job) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <div className="job-details-page">

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="job-details-card">

        <h2>{job.job_title}</h2>

        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Job Type:</strong> {job.jobtype}</p>

        <hr />

        <h3>Company Details</h3>
        <p><strong>Company:</strong> {job.Company_name}</p>
        <p><strong>Email:</strong> {job.email}</p>
        <p><strong>Contact:</strong> {job.Contact_no}</p>

        <hr />

        <h3>Requirements</h3>
        <p>{job.skill}</p>

        <hr />

        <h3>Job Description</h3>
        <p>{job.description}</p>

        <hr />

        <h3>Salary</h3>
        <p>{job.salary}</p>

      </div>

    </div>
  );
}

export default JobDetails;