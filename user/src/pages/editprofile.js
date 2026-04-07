import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // ✅ import
import "./signup.css";

function EditProfile() {

  const navigate = useNavigate(); // ✅ initialize navigate

  const user = JSON.parse(sessionStorage.getItem("mydata"));

  const [experience, setExperience] = useState(user.Experience || "0");

  function updateUser(e) {
    e.preventDefault();

    const Name = document.getElementById("Name").value;
    const Contact_no = document.getElementById("Contact_no").value;
    const email = document.getElementById("email").value;
    const Address = document.getElementById("Address").value;
    const Education = document.getElementById("Education").value;
    const Skills = document.getElementById("Skills").value;

    const Company_name = document.getElementById("Company_name")?.value;
    const Post = document.getElementById("Post")?.value;
    const Duration = document.getElementById("Duration")?.value;
    const Work_description = document.getElementById("Work_description")?.value;

    const Upload_photo = document.getElementById("Upload_photo").files[0];

    if (!Name || !Contact_no || !email) {
      Swal.fire("Error", "Please fill required fields", "error");
      return;
    }

    const formData = new FormData();

    formData.append("Name", Name);
    formData.append("Contact_no", Contact_no);
    formData.append("email", email);
    formData.append("Address", Address);
    formData.append("Education", Education);
    formData.append("Experience", experience);
    formData.append("skills", Skills);

    if (experience !== "0") {
      formData.append("company_name", Company_name);
      formData.append("post", Post);
      formData.append("Duration", Duration);
      formData.append("Work_description", Work_description);
    }

    if (Upload_photo) {
      formData.append("Upload_photo", Upload_photo);
    }

    Axios.put(
      `http://localhost:1337/api/updateProfile/${user.User_id}`,
      formData
    )
      .then((res) => {

        // 🔥 update session storage
        sessionStorage.setItem("mydata", JSON.stringify({
          ...user,
          Name,
          Contact_no,
          email,
          Address,
          Education,
          Experience: experience,
          skills: Skills,
          company_name: Company_name,
          post: Post,
          Duration,
          Work_description
        }));

        // ✅ success alert + redirect
        Swal.fire("Success", "Profile Updated", "success").then(() => {
          navigate("/resume"); // 🔥 redirect page
        });

      })
      .catch(err => {
        console.log(err);
        Swal.fire("Error", "Update failed", "error");
      });
  }

  return (
    <div className="signup-page">

      <h2>Edit Profile</h2>

      <form onSubmit={updateUser}>

        <div className="two-column">
          <div className="form-group">
            <label>Name</label>
            <input type="text" id="Name" defaultValue={user.Name} />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input type="tel" id="Contact_no" defaultValue={user.Contact_no} />
          </div>
        </div>

        <div className="two-column">
          <div className="form-group">
            <label>Email</label>
            <input type="email" id="email" defaultValue={user.email} />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea id="Address" defaultValue={user.Address}></textarea>
        </div>

        <div className="form-group">
          <label>Education</label>
          <textarea id="Education" defaultValue={user.Education}></textarea>
        </div>

        {/* EXPERIENCE */}
        <div className="form-group">
          <label>Experience</label>
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
              <label>Company</label>
              <input type="text" id="Company_name" defaultValue={user.company_name} />
            </div>

            <div className="form-group">
              <label>Post</label>
              <input type="text" id="Post" defaultValue={user.post} />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input type="text" id="Duration" defaultValue={user.Duration} />
            </div>

            <div className="form-group">
              <label>Work Description</label>
              <textarea id="Work_description" defaultValue={user.Work_description}></textarea>
            </div>
          </>
        )}

        <div className="form-group">
          <label>Skills</label>
          <textarea id="Skills" defaultValue={user.skills}></textarea>
        </div>

        <div className="form-group">
          <label>Update Photo</label>
          <input type="file" id="Upload_photo" />
        </div>

        <button type="submit">Update Profile</button>

      </form>
    </div>
  );
}

export default EditProfile;