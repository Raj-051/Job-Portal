import React, { useEffect, useState } from "react";
import Axios from "axios";

const ViewJob = () => {

  const [jobs, setJobs] = useState([]);

  // 🔥 FETCH JOBS
  useEffect(() => {

    Axios.get("http://localhost:1337/api/getAllJobs")
  .then((res) => {

    console.log("FRONTEND JOBS:", res.data);

    const data = Array.isArray(res.data) ? res.data : [];
    setJobs(data);

  })
  .catch((err) => console.log(err));

  }, []);

  return (
    <div className="page-content">

      <div className="page-header no-margin-bottom">
        <div className="container-fluid">
          <h2 className="h5 no-margin-bottom">Job Listings</h2>
        </div>
      </div>

      <div className="container-fluid">
        <ul className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active">Jobs</li>
        </ul>
      </div>

      <section className="no-padding-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="block margin-bottom-sm">

                <div className="title">
                  <strong>Posted Jobs</strong>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Job Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>

                      {jobs.length > 0 ? (
                        jobs.map((job, index) => {

                          const today = new Date();
                          const endDate = new Date(job.end_date);

                          const isActive = endDate >= today;

                          return (
                            <tr key={job.Job_id}>
                              <th>{index + 1}</th>
                              <td>{job.job_title}</td>
                              <td>{job.Company_name}</td>
                              <td>{job.location}</td>
                              <td>{job.jobtype}</td>
                              <td>{isActive ? "Active" : "Closed"}</td>

                              
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center" }}>
                            No jobs found
                          </td>
                        </tr>
                      )}

                    </tbody>

                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ViewJob;