import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./viewjoblist.css";
import { Link } from "react-router-dom";

function Viewjoblist() {

  const [jobs, setJobs] = useState([]);
  const [expanded, setExpanded] = useState({});

  const company = JSON.parse(sessionStorage.getItem("mydata"));

  // ✅ FETCH ONLY COMPANY JOBS
  useEffect(() => {
    if (!company) return;

    Axios.post("http://localhost:1337/api/getjoblist", {
      Company_id: company.Company_id,
    })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ✅ DELETE WITHOUT RELOAD
  const deleteJob = (id) => {
    Axios.delete(`http://localhost:1337/api/deletejob/${id}`)
      .then(() => {
        alert("Job deleted successfully");
        setJobs(jobs.filter((job) => job.Job_id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ✅ TOGGLE DESCRIPTION
  const toggleDescription = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="job-container">

      {/* ✅ TOP TITLE */}
      <h2 className="page-title">Job List</h2>

      <div className="job-card">

        <div className="job-table-wrapper">

          <table className="job-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Skill</th>
                <th>End Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {jobs.length > 0 ? (
                jobs.map((job, index) => {

                  const isOpen = expanded[job.Job_id];

                  return (
                    <tr key={job.Job_id}>

                      <td>{index + 1}</td>
                      <td>{job.job_title}</td>
                      <td>{job.Jobcat_name}</td>
                      <td>{job.location}</td>
                      <td>{job.salary}</td>
                      <td>{job.skill}</td>
                      <td>{job.end_date}</td>
                      <td>{job.jobtype}</td>

                      {/* ✅ DESCRIPTION */}
                      <td>
                        <div className="desc-box">

                          <p className={isOpen ? "full" : "short"}>
                            {job.description}
                          </p>

                          {job.description && job.description.length > 80 && (
                            <span
                              className="view-btn"
                              onClick={() => toggleDescription(job.Job_id)}
                            >
                              {isOpen ? "▲" : " ▼"}
                            </span>
                          )}

                        </div>
                      </td>

                      {/* ✅ ACTION */}
                      <td>
                        <div className="action-box">

                          <Link
                            to="/editjoblist"
                            state={{ Job_id: job.Job_id }}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            className="delete-btn"
                            onClick={() => deleteJob(job.Job_id)}
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No Jobs Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Viewjoblist;