import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./browsejob.css";

function Browsejob() {

  const locationData = useLocation();
  const filters = locationData.state || {};

  const searchTitle = filters.title || "";
  const searchLocation = filters.location || "";
  const searchCategory = filters.category || "";

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("mydata"));

    // 🔹 GET JOBS
    Axios.get("http://localhost:1337/api/getjoblist")
      .then((response) => {

        const allJobs = response.data;
        setJobs(allJobs);

        // 🔥 FILTER WITH END DATE
        const result = allJobs.filter((job) => {

          // ✅ TODAY DATE (no time)
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // ✅ JOB END DATE
          const endDate = new Date(job.end_date);
          endDate.setHours(0, 0, 0, 0);

          return (
            // 🚫 HIDE EXPIRED JOBS
            endDate >= today &&

            // 🔍 Title filter
            (!searchTitle ||
              job.job_title.toLowerCase().includes(searchTitle.toLowerCase())) &&

            // 📍 Location filter
            (!searchLocation ||
              job.location === searchLocation) &&

            // 📂 Category filter
            (!searchCategory ||
              job.Jobcat_name === searchCategory)
          );
        });

        setFilteredJobs(result);
      })
      .catch(() => alert("Error loading jobs"));

    // 🔹 GET APPLIED JOBS
    if (user) {
      Axios.get(`http://localhost:1337/api/getappliedjobs/${user.User_id}`)
        .then((res) => {
          const appliedIds = res.data.map(item => item.Job_id);
          setAppliedJobs(appliedIds);
        })
        .catch(() => console.log("Error fetching applied jobs"));
    }

  }, [searchTitle, searchLocation, searchCategory]);



  // ✅ APPLY JOB FUNCTION
  const applyJob = (job) => {

    const user = JSON.parse(sessionStorage.getItem("mydata"));

    if (!user) {
      alert("Please login first");
      return;
    }

    const Company_id = job?.Company_id || 0;

    Axios.post("http://localhost:1337/api/applyjob", {
      Job_id: job.Job_id,
      User_id: user.User_id,
      Company_id
    })
    .then(() => {

      alert("Applied Successfully!");

      // 🔥 update UI instantly
      setAppliedJobs((prev) => [...prev, job.Job_id]);

    })
    .catch((err) => {
      console.log(err);
      alert("Error applying job");
    });
  };



  return (
    <div className="browsejob-page">

      {/* 🔥 FILTER INFO */}
      <h3 className="filter-title">
        Showing Jobs {searchLocation && `in ${searchLocation}`}
      </h3>

      <div className="job-cards">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => (
            <div className="job-card" key={job.Job_id}>

              <div className="job-card-left">
                <img src="/img/svg_icon/1.svg" alt="" />

                <div className="job-info">
                  <h4
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={() => navigate("/jobdetails", { state: job })}
                  >
                    {job.job_title}
                  </h4>

                  <p>
                    {job.Jobcat_name} • {job.location} • {job.jobtype}
                  </p>

                  {/* 🔥 OPTIONAL: SHOW END DATE */}
                  <small style={{ color: "#888" }}>
  Last Date: {new Date(job.end_date).toLocaleDateString("en-GB").replace(/\//g, "-")}
</small>
                </div>
              </div>

              <button
                className="btn-apply"
                onClick={() => applyJob(job)}
                disabled={appliedJobs.includes(job.Job_id)}
              >
                {appliedJobs.includes(job.Job_id) ? "Applied" : "Apply Now"}
              </button>

            </div>
          ))

        ) : (
          <p style={{ textAlign: "center" }}>No Jobs Found 😢</p>
        )}

      </div>
    </div>
  );
}

export default Browsejob;