import React,{useEffect,useState} from "react";

import "./addjoblist.css";
import Swal from "sweetalert2";
import Axios from "axios";

function Addjoblist() {
    const [list, setList] = useState([]);
      useEffect(() => {
        Axios.get("http://localhost:1337/api/getjobcategory")
          .then((response) => {
            setList(response.data);
            alert(response.data);
          })
          .catch((err) => {
            console.log(err);
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
    
    if(!job_title || !Jobcat_id|| !skill || !salary || !location || !end_date ||  !description || !jobtype) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required!",
      });
      return;
    }

    Axios.post("http://localhost:1337/api/joblist", {
      job_title: job_title,
      Jobcat_id: Jobcat_id,
      skill: skill,
      salary: salary,
      location: location,
      end_date: end_date,
      description: description,
      jobtype: jobtype
    })
    .then(response => {
      Swal.fire({
        icon: "success",
        title: "Job Added Successfully!",
        text: "The job has been added to the system.",
      });
    })
    .catch(error => {
      Swal.fire({
        icon: "error",
        title: "Error Adding Job",
        text: "There was an error adding the job.",
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
              <input type="text" name="title" id="job_title"/>
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select name="category" id="Jobcat_id">
                              {list.map((Val, index) => (

                <option value={Val.Jobcat_id}>{Val.Jobcat_name}</option>
                              ))}

                
              </select>
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input type="text" name="location" id="location"/>
            </div>

            <div className="form-group">
              <label>Skills</label>
              <input type="text" name="skills" id="skill"/>
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input type="date" name="end_date" id="end_date" />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input type="text" name="salary" id="salary"/>
            </div>


             

           

            <div className="form-group">
              <label>Job Type</label>
              <select name="jobtype" id="jobtype">
                <option value="fulltime">Full-Time</option>
                <option value="parttime">Part-Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Job Description</label>
              <textarea name="description" id="description" rows="4"></textarea>
            </div>

           

          </div>

          <div>
            <button type="button" className="addsubmit" onClick={addjob}>
              Add Job
            </button>
          </div>

       

      </div>
    </div>
  );
}

export default Addjoblist;
