import React from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./signup.css";

function UserSignup() {

  function registerUser(e) {

    e.preventDefault();

    const Name = document.getElementById("Name").value;
    const Contact_no = document.getElementById("Contact_no").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const Address = document.getElementById("Address").value;
    const Education = document.getElementById("Education").value;
    const Experience = document.getElementById("Experience").value;
    const Projects = document.getElementById("Projects").value;

    const Upload_photo = document.getElementById("Upload_photo").files[0];

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
    formData.append("Experience", Experience);
    formData.append("Projects", Projects);
    formData.append("Upload_photo", Upload_photo);

    Axios.post("http://localhost:1337/api/usersignup", formData)
.then((response)=>{

  if(response.data.status === "error"){

    Swal.fire("Error",response.data.message,"error");

  }else{

    const id = response.data.User_id;

    Swal.fire("Success","User Registered Successfully","success")
    .then(()=>{
      window.location = "/login";
    });

  }

});
  }

  return (
    <div className="signup-page">

      <h2>User Signup</h2>

      <form onSubmit={registerUser}>

        <input type="text" placeholder="Name" id="Name" />

        <input type="tel" placeholder="Contact Number" id="Contact_no" />

        <input type="email" placeholder="Email" id="email" />

        <input type="password" placeholder="Password" id="password" />

        <textarea placeholder="Address" id="Address"></textarea>

        <textarea placeholder="Education" id="Education"></textarea>

        <textarea placeholder="Experience" id="Experience"></textarea>

        <textarea placeholder="Projects" id="Projects"></textarea>

        <label>Upload Photo</label>
        <input type="file" id="Upload_photo" />

        <button type="submit">Signup</button>

      </form>

    </div>
  );
}

export default UserSignup;