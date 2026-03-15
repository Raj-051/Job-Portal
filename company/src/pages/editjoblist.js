import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./editjoblist.css";
import Swal from "sweetalert2";
import Axios from "axios";

function Editjoblist() {

const location = useLocation();
const Job_id = location.state.Job_id;

const [list,setList] = useState([]);

const [jobData,setJobData] = useState({
  job_title:"",
  Jobcat_id:"",
  skill:"",
  salary:"",
  location:"",
  end_date:"",
  description:"",
  jobtype:""
});

useEffect(()=>{

// load categories
Axios.get("http://localhost:1337/api/getjoblist")
.then((res)=>{
setList(res.data);
});

// load job data
Axios.post("http://localhost:1337/api/editjoblist",{Job_id})
.then((response)=>{
setJobData(response.data);
})
.catch((err)=>{
console.log(err);
});

},[Job_id]);

const handleChange = (e)=>{

const {name,value} = e.target;

setJobData({
...jobData,
[name]:value
});

};

const handleSubmit = (e)=>{

e.preventDefault();

Axios.post("http://localhost:1337/api/updatejoblist",{

Job_id:Job_id,
job_title:jobData.job_title,
Jobcat_id:jobData.Jobcat_id,
skill:jobData.skill,
salary:jobData.salary,
location:jobData.location,
end_date:jobData.end_date,
description:jobData.description,
jobtype:jobData.jobtype

})
.then(()=>{

Swal.fire({
icon:"success",
title:"Job Updated Successfully"
});

})
.catch((err)=>{
console.log(err);
});

};

return (

<div className="addjob-page">
<div className="form-card">

<div className="form-header">Edit Job</div>

<form onSubmit={handleSubmit}>

<div className="form-grid">

<div className="form-group">
<label>Job Title *</label>
<input
type="text"
name="job_title"
value={jobData.job_title}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Category *</label>
<select
name="Jobcat_id"
value={jobData.Jobcat_id}
onChange={handleChange}
>

{list.map((Val)=>(
<option key={Val.Jobcat_id} value={Val.Jobcat_id}>
{Val.Jobcat_name}
</option>
))}

</select>
</div>

<div className="form-group">
<label>Location *</label>
<input
type="text"
name="location"
value={jobData.location}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Skills</label>
<input
type="text"
name="skill"
value={jobData.skill}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>End Date</label>
<input
type="date"
name="end_date"
value={jobData.end_date}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Salary</label>
<input
type="text"
name="salary"
value={jobData.salary}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Job Type</label>
<select
name="jobtype"
value={jobData.jobtype}
onChange={handleChange}
>

<option value="fulltime">Full Time</option>
<option value="parttime">Part Time</option>
<option value="internship">Internship</option>

</select>
</div>

<div className="form-group full-width">
<label>Description</label>
<textarea
name="description"
rows="4"
value={jobData.description}
onChange={handleChange}
/>
</div>

</div>

<button type="submit" className="addsubmit">
Update Job
</button>

</form>

</div>
</div>

);

}

export default Editjoblist;