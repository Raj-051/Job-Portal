import React from "react";

const ManageJobSeeker = () => {
  return (
    <div className="page-content">
      {/* ===== Page Header ===== */}
      <div className="page-header no-margin-bottom">
        <div className="container-fluid">
          <h2 className="h5 no-margin-bottom">Manage Job Seeker</h2>
        </div>
      </div>

      {/* ===== Breadcrumb ===== */}
      <div className="container-fluid">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Job Seeker</li>
        </ul>
      </div>

      {/* ===== Table Section ===== */}
      <section className="no-padding-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="block margin-bottom-sm">
                <div className="title">
                  <strong>Registered Job Seekers</strong>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Skills</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Amit Patel</td>
                        <td>amit@gmail.com</td>
                        <td>9876543210</td>
                        <td>React, Node.js</td>
                        <td>
                          <span className="badge badge-success">
                            Active
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">2</th>
                        <td>Neha Shah</td>
                        <td>neha@gmail.com</td>
                        <td>9123456780</td>
                        <td>Java, Spring</td>
                        <td>
                          <span className="badge badge-warning">
                            Pending
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">3</th>
                        <td>Rahul Mehta</td>
                        <td>rahul@gmail.com</td>
                        <td>9988776655</td>
                        <td>Python, Django</td>
                        <td>
                          <span className="badge badge-secondary">
                            Inactive
                          </span>
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

export default ManageJobSeeker;
