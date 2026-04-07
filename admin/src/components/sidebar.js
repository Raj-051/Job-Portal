import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [openEmployer, setOpenEmployer] = useState(false);
  const [openJob, setOpenJob] = useState(false);

  return (
    <nav id="sidebar">
      {/* ===== Sidebar Header ===== */}
      <div className="profile-img">
        <div className="avatar">
          <img
            src="img/avatar-6.jpg"
            alt="profile"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="title ms-2">
          <h1 className="h5 mb-0">Raj Patel</h1>
          <p className="mb-0 text-muted">Web Designer</p>
        </div>
      </div>

      <span className="heading">Main</span>

      <ul className="list-unstyled">
        {/* ===== Dashboard ===== */}
        <li>
          <Link to="/dashboard">
            <i className="icon-home"></i> Dashboard
          </Link>
        </li>

        {/* ===== Manage Employer ===== */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpenEmployer(!openEmployer);
            }}
          >
            <i className="icon-windows"></i> Manage Employer
          </a>

          {openEmployer && (
            <ul className="xyz">
              <li>
                <Link to="/employers">View Employer</Link>
              </li>
            </ul>
          )}
        </li>

        {/* ===== Manage JobPost ===== */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpenJob(!openJob);
            }}
          >
            <i className="icon-windows"></i> Manage JobPost
          </a>

          {openJob && (
            <ul className="xyz">
              <li>
                <Link to="/jobs">View Job</Link>
              </li>
            </ul>
          )}
        </li>

        {/* ===== Monitoring Job Seeker ===== */}
        <li>
          <Link to="/seekers">
            <i className="icon-user"></i> Monitoring Job Seeker
          </Link>
        </li>

       
       
      </ul>
    </nav>
  );
}

export default Sidebar;
 