import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./browsejob.css";

function Browsejob() {

  const [jobs, setJobs] = useState([]); // ✅ define state
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
  const user = JSON.parse(sessionStorage.getItem("mydata"));

  // get jobs
  Axios.get("http://localhost:1337/api/getjoblist")
    .then((response) => {
      setJobs(response.data);
    });

  // get applied jobs
  if (user) {
    Axios.get(`http://localhost:1337/api/getappliedjobs/${user.User_id}`)
      .then((res) => {
        const appliedIds = res.data.map(item => item.Job_id);
        setAppliedJobs(appliedIds);
      });
  }

}, []);

  const applyJob = (job) => {

    const user = JSON.parse(sessionStorage.getItem("mydata"));

    if (!user) {
      alert("Please login first");
      return;
    }

    // If backend/job table has Company_id, it will be used.
    // Otherwise we still send 0 and let backend resolve it from the job row.
    const Company_id = job?.Company_id || 0;

    Axios.post("http://localhost:1337/api/applyjob", {
      Job_id: job.Job_id,
      User_id: user.User_id,
      Company_id
    })
    .then((res) => {
  alert("Applied Successfully!");
      console.log("JOB DATA:", job);
      
  // ✅ update UI instantly
  setAppliedJobs((prev) => [...prev, job.Job_id]);

      
    })
    .catch((err) => {
      console.log(err);
      alert("Error applying job");
    });
  };

  return (
    <div className="browsejob-page">
      <div className="job-cards">

        {jobs.map((job) => (   // ✅ correct variable
          <div className="job-card" key={job.Job_id}>

            <div className="job-card-left">
              <img src="/img/svg_icon/1.svg" alt="" />

              <div className="job-info">
                <h4>{job.job_title}</h4>
                <p>
                  {job.Jobcat_name} • {job.location} • {job.jobtype}
                </p>
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
        ))}

      </div>
    </div>
  );
}

export default Browsejob;