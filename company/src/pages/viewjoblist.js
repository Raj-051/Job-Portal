
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./viewjoblist.css";
import {Link} from "react-router-dom";

function Viewjoblist() {
  const deleteJob = (id) => {
    Axios.delete(`http://localhost:1337/api/deletejob/${id}`)
        .then((res) => {
            alert("Job deleted successfully");
            window.location.reload(); // refresh page
        })
        .catch((err) => {
            console.log(err);
        });
};
const [jobs, setJobs] = useState([]);

useEffect(() => {
  Axios.get("http://localhost:1337/api/getjoblist")
    .then((response) => {
      setJobs(response.data);
    });
  });
  return (
    <div className="job-container">
      <div className="job-card">
        <div className="job-header">Job List</div>

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
              
              </tr>
            </thead>
            <tbody>
              {jobs.map((job,index) => (

                <tr key={job.id}>
                  <td>{index + 1}</td>
                  <td>{job.job_title}</td>
                  <td>{job.Jobcat_name}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                  <td>{job.skill}</td> 
                  <td>{job.end_date}</td>
                  
                  <td>{job.jobtype}</td>
                  <td>{job.description}</td>

                  <td>
                    <Link
to="/editjoblist"
state={{Job_id:job.Job_id}}
className="edit-btn"
>
Edit
</Link>

                    <button className="delete-btn" onClick={() => deleteJob(job.Job_id)}>Delete</button>
                  </td>
                  {/* <td>
                    <span
                      className={
                        job.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }
                      onClick={() => toggleStatus(job.id)}
                    >
                      {job.status}
                    </span>
                  </td> */}

                  {/* <td>
                    <button
                      className="btn-edit"
                      onClick={() => alert("Edit functionality here")}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => deleteJob(job.id)}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
                
              ))}

              {jobs.length === 0 && (
                <tr>
                  <td colSpan="9" className="no-data">
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
