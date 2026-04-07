import React from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    Axios.post("http://localhost:1337/api/adminlogin", {
      email,
      password
    })
      .then((res) => {

        if (res.data.status === "success") {

          // Save admin session
          sessionStorage.setItem("admin", JSON.stringify(res.data.admin));

          Swal.fire("Success", "Admin Login Successful", "success")
            .then(() => {
              navigate("/dashboard"); // ✅ redirect
            });

        } else {
          Swal.fire("Error", res.data.message, "error");
        }

      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Server Error", "error");
      });
  };

  return (
    <div className="login-page">
  <div className="login-card">

    {/* LEFT */}
    <div className="left-panel">
      <h1>Admin Panel</h1>
      <p>Login to manage system</p>
    </div>

    {/* RIGHT */}
    <div className="right-panel">

      <form onSubmit={handleLogin}>

        <input
          id="login-email"
          type="email"
          placeholder="Email"
        />

        <input
          id="login-password"
          type="password"
          placeholder="Password"
        />

        <button>Login</button>

      </form>

    </div>

  </div>
</div>
  );
}

export default Login;