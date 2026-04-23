import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import rajImage from "./raj.jpeg";

function Sidebar() {

  const toggleDropdown = (id) => {
    const menu = document.getElementById(id);
    menu.classList.toggle("show");
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src={rajImage}
          alt="profile"
          className="profile-img"
        />

        <div>
          <h3>Raj Patel</h3>
          <p>Web Designer</p>
        </div>
      </div>

      <p className="menu-title">MAIN</p>

      <ul className="menu">

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        {/* Manage Job Category */}
        <li>
          <div
            className="manage"
            onClick={() => toggleDropdown("jobCategoryMenu")}
          >
            Manage Job Category
          </div>

          <ul className="submenu" id="jobCategoryMenu">
            <li>
              <Link to="/addjobcategory">Add Job Category</Link>
            </li>
            <li>
              <Link to="/viewjobcategory">View Category</Link>
            </li>
          </ul>
        </li>

        {/* Manage Job List */}
        <li>
          <div
            className="managejob"
            onClick={() => toggleDropdown("jobListMenu")}
          >
            Manage Job List
          </div>

          <ul className="submenu" id="jobListMenu">
            <li>
              <Link to="/addjoblist">Add Job List</Link>
            </li>
            <li>
              <Link to="/viewjoblist">View Job</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/managecandidates">Manage Candidates</Link>
        </li>

        <li>
          <Link to="/scheduleinterview">Schedule Interview</Link>
        </li>

        <li>
          <Link to="/chatwithjobseeker">Chat With Job Seeker</Link>
        </li>

        <li>
          <Link to="/sendmessage">Send Message</Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
