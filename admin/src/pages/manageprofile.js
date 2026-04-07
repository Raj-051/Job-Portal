import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./manageprofile.css";

function Manageprofile () {

  const [admin, setAdmin] = useState({
    admin_id: "",
    admin_email: "",
    admin_password: ""
  });

  // Get admin data from session
  const storedAdmin = JSON.parse(sessionStorage.getItem("admin"));

useEffect(() => {
  if (storedAdmin) {
    Axios.get(`http://localhost:1337/api/admin/profile/${storedAdmin.admin_id}`)
      .then((res) => {
        if (res.data.success) {
          setAdmin({
            admin_id: storedAdmin.admin_id, // ✅ FORCE ID
            admin_email: res.data.data.admin_email,
            admin_password: res.data.data.admin_password
          });
        }
      });
  }
}, []);

  // Handle input change
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleUpdate = () => {
    Axios.put("http://localhost:1337/api/admin/update", admin)
  .then((res) => {
    if (res.data.success) {
      alert("Profile Updated Successfully");
    }
  })
  .catch((err) => {
    console.log("ERROR:", err.response?.data || err.message);
  });
  };

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>

      <label>Email:</label>
      <input
        type="email"
        name="admin_email"
        value={admin.admin_email}
        onChange={handleChange}
      />

      <label>Password:</label>
      <input
        type="text"
        name="admin_password"
        value={admin.admin_password}
        onChange={handleChange}
      />

      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
}

export default Manageprofile;