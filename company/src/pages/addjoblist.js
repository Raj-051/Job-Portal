import React, { useEffect, useState } from "react";
import "./addjoblist.css";
import Swal from "sweetalert2";
import Axios from "axios";

function Addjoblist() {

  const [list, setList] = useState([]);

  // ✅ GET COMPANY-WISE CATEGORY
  useEffect(() => {

    const company = JSON.parse(sessionStorage.getItem("mydata"));

    if (!company || !company.Company_id) {
      console.log("Company not logged in");
      return;
    }

    Axios.get("http://localhost:1337/api/getjobcategory")
  .then((response) => {
    console.log("CATEGORY:", response.data); // debug
    setList(response.data);
  });
  }, []);


  function addjob() {

    const job_title = document.querySelector("#job_title").value;
    const skill = document.querySelector("#skill").value;
    const salary = document.querySelector("#salary").value;
    const location = document.querySelector("#location").value;
    const end_date = document.querySelector("#end_date").value;
    const description = document.querySelector("#description").value;
    const jobtype = document.querySelector("#jobtype").value;
    const Jobcat_id = document.querySelector("#Jobcat_id").value;

    const company = JSON.parse(sessionStorage.getItem("mydata"));
    const Company_id = company?.Company_id;

    // ✅ VALIDATION
    if (!job_title || !Jobcat_id || !skill || !salary || !location || !end_date || !description || !jobtype) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required!",
      });
      return;
    }

    if (!Company_id) {
      Swal.fire({
        icon: "error",
        title: "Company not logged in",
        text: "Please login again",
      });
      return;
    }

    // ✅ API CALL
    Axios.post("http://localhost:1337/api/joblist", {
      job_title,
      Jobcat_id,
      skill,
      salary,
      location,
      end_date,
      description,
      jobtype,
      Company_id
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Job Added Successfully!",
      });

      // ✅ CLEAR FORM
      document.querySelector("#job_title").value = "";
      document.querySelector("#skill").value = "";
      document.querySelector("#salary").value = "";
      document.querySelector("#location").value = "";
      document.querySelector("#end_date").value = "";
      document.querySelector("#description").value = "";
      document.querySelector("#Jobcat_id").value = "";
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Error Adding Job",
      });
    });
  }


  return (
    <div className="addjob-page">
      <div className="form-card">
        <div className="form-header">Add New Job</div>

        <div className="form-grid">

          <div className="form-group">
            <label>Job Title *</label>
            <input type="text" id="job_title" />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select id="Jobcat_id">
              <option value="">Select Category</option>

              {list.length > 0 ? (
                list.map((Val) => (
                  <option key={Val.Jobcat_id} value={Val.Jobcat_id}>
                    {Val.Jobcat_name}
                  </option>
                ))
              ) : (
                <option disabled>No Category Found</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input type="text" id="location" />
          </div>

          <div className="form-group">
            <label>Skills *</label>
            <input type="text" id="skill" />
          </div>

          <div className="form-group">
            <label>End Date *</label>
            <input type="date" id="end_date" />
          </div>

          <div className="form-group">
            <label>Salary *</label>
            <input type="text" id="salary" />
          </div>

          <div className="form-group">
            <label>Job Type *</label>
            <select id="jobtype">
              <option value="">Select Job Type</option>
              <option value="fulltime">Full-Time</option>
              <option value="parttime">Part-Time</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Job Description *</label>
            <textarea id="description" rows="4"></textarea>
          </div>

        </div>

        <button className="addsubmit" onClick={addjob}>
          Add Job
        </button>

      </div>
    </div>
  );
}

export default Addjoblist;