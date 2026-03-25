import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./signup.css";

function UserSignup() {

  const [experience, setExperience] = useState("0");

  function registerUser(e) {
    e.preventDefault();

    const Name = document.getElementById("Name").value;
    const Contact_no = document.getElementById("Contact_no").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const Address = document.getElementById("Address").value;
    const Education = document.getElementById("Education").value;
    const Skills = document.getElementById("Skills").value;
    const Company_name = document.getElementById("Company_name")?.value;
    const Post = document.getElementById("Post")?.value;
    const Upload_photo = document.getElementById("Upload_photo").files[0];
    const Duration = document.getElementById("Duration")?.value;
    const Work_description = document.getElementById("Work_description")?.value;

    


    if (!Name || !Contact_no || !email || !password) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    const formData = new FormData();

    formData.append("Name", Name);
    formData.append("Contact_no", Contact_no);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("Address", Address);
    formData.append("Education", Education);
    formData.append("Experience", experience);
    formData.append("Skills", Skills);

    if (experience !== "0") {
      formData.append("Company_name", Company_name);
      formData.append("Post", Post);
      formData.append("Duration", Duration);
      formData.append("Work_description", Work_description);

      

    }

    formData.append("Upload_photo", Upload_photo);

    Axios.post("http://localhost:1337/api/usersignup", formData)
      .then((response) => {
        if (response.data.status === "error") {
          Swal.fire("Error", response.data.message, "error");
        } else {
          Swal.fire("Success", "User Registered Successfully", "success")
            .then(() => {
              window.location = "/login";
            });
        }
      });
  }

  return (
    <div className="signup-page">
      <h2>User Signup</h2>

      <form onSubmit={registerUser}>

        <div className="two-column">
          <div className="form-group">
            <label>Name</label>
            <input type="text" id="Name" />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input type="tel" id="Contact_no" />
          </div>
        </div>

        <div className="two-column">
          <div className="form-group">
            <label>Email</label>
            <input type="email" id="email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" id="password" />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea id="Address"></textarea>
        </div>

        <div className="form-group">
          <label>Education</label>
          <textarea id="Education"></textarea>
        </div>

        {/* Experience Dropdown */}
        <div className="form-group">
          <label>Experience (Years)</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="5+">5+</option>
          </select>
        </div>

       {experience !== "0" && (
  <>
    <div className="form-group">
      <label>Company Name</label>
      <input type="text" id="Company_name" placeholder="Enter company name" />
    </div>

    <div className="form-group">
      <label>Post</label>
      <input type="text" id="Post" placeholder="Enter your role" />
    </div>

    <div className="form-group">
      <label>Duration</label>
      <input type="text" id="Duration" placeholder="e.g. Jan 2023 - Dec 2024" />
    </div>

    <div className="form-group">
      <label>Work Description</label>
      <textarea 
        id="Work_description" 
        placeholder="Describe your work, responsibilities, technologies used..."
      ></textarea>
    </div>
  </>
)}

        {/* Skills */}
        <div className="form-group">
          <label>Skills</label>
          <textarea id="Skills" placeholder="e.g. React, Node, MongoDB"></textarea>
        </div>

        <div className="form-group">
          <label>Upload Photo</label>
          <input type="file" id="Upload_photo" />
        </div>

        <button type="submit">Signup</button>

      </form>
    </div>
  );
}

export default UserSignup;