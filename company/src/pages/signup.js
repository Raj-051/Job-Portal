import React from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./signup.css";

function Company() {
  function registerCompany() {

  const Company_name = document.querySelector("#Company_name").value;
  const Contact_no = document.querySelector("#Contact_no").value;
  const Id_proof = document.querySelector("#Id_proof").files[0];
  const email = document.querySelector("#email").value;
  const location = document.querySelector("#location").value;
  const website_URL = document.querySelector("#website_URL").value;
  const Password = document.querySelector("#Password").value;
  const description = document.querySelector("#description").value;
  const company_person_name = document.querySelector("#company_person_name").value;
  const company_person_contact = document.querySelector("#company_person_contact").value;

  if (!Company_name || !Contact_no || !Id_proof || !email || !Password || !location || !website_URL || !description || !company_person_name || !company_person_contact) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all required fields!",
    });
    return;
  }

  // 🔥 Create FormData
  const formData = new FormData();

  formData.append("Company_name", Company_name);
  formData.append("Contact_no", Contact_no);
  formData.append("email", email);
  formData.append("Password", Password);
  formData.append("location", location);
  formData.append("website_URL", website_URL);
  formData.append("description", description);
  formData.append("Id_proof", Id_proof);
  formData.append("company_person_name", company_person_name);
  formData.append("company_person_contact", company_person_contact);
    // must match backend multer name

  // 🔥 Send FormData
  Axios.post("http://localhost:1337/api/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  .then((response) => {
    Swal.fire({
      icon: "success",
      title: "Company Registered Successfully!",
      text: response.data.message,
    }).then(() => {
      window.location.href = "/login"; // Redirect to login page after successful registration
    });
  })
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Registration Failed!",
      text: error.response?.data?.message || "An error occurred.",
    });
  });
}
  return (
    <div className="form-page">
      <div className="form-card">

        <div className="form-header">
          Company Registration
        </div>

        

          <div className="form-grid">

            <div className="form-group">
              <label>Company Name</label>
              <input type="text" id="Company_name" required />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input type="number" id="Contact_no" required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" id="email" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" id="Password" required />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" id="location" required />
            </div>

            <div className="form-group">
              <label>Website URL</label>
              <input type="text" id="website_URL" required />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea id="description" rows="3"></textarea>
            </div>

            

            <div className="form-group">
              <label>ID Proof</label>
              <input
                type="file"
                placeholder="GST / PAN / License"
                id="Id_proof"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Company Person Name</label>
              <input type="text" id="company_person_name" required />
            </div>

            <div className="form-group full-width">
              <label>Company Person Contact</label>
              <input type="number" id="company_person_contact" required />
            </div>
          </div>

          <button type="button" className="submit-btn" onClick={registerCompany}>
            Register Company
          </button>

    

      </div>
    </div>
  );
}

export default Company;
