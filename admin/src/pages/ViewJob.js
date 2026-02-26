import React from "react";

const ViewJob = () => {
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

      {/* Job Table Section */}
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
                      <tr>
                        <th scope="row">1</th>
                        <td>Frontend Developer</td>
                        <td>ABC Tech</td>
                        <td>Ahmedabad</td>
                        <td>Full-Time</td>
                        <td>
                          <span className="badge bg-success">Active</span>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">2</th>
                        <td>Backend Developer</td>
                        <td>XYZ Solutions</td>
                        <td>Surat</td>
                        <td>Part-Time</td>
                        <td>
                          <span className="badge bg-warning">Closed</span>
                        </td>
                      </tr>
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