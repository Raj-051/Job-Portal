import React from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import "./managecandidates.css";


function ManageCandidates() {

  return (
    <div className="addjob-page">
      <div className="form-card">
        <h2>Add New Job</h2>

        
          
          <input type="text" id="job_title" placeholder="Job Title" />
          <input type="text" id="category" placeholder="Category" />
          <input type="text" id="location" placeholder="Location" />
          <input type="text" id="skills" placeholder="Skills" />
          <input type="date" id="post_date" />
          <input type="date" id="end_date" />
          <input type="text" id="salary" placeholder="Salary" />

          <select id="status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <textarea id="description" placeholder="Job Description"></textarea>

          <button type="submit">Add Job</button>
       

      </div>
    </div>
  );

}

export default ManageCandidates;
