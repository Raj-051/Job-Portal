import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Swal from "sweetalert2";
import Axios from "axios";

function Login() {

  function handlelogin(e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const Password = document.getElementById("Password").value;

    if (!email || !Password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields",
      });
      return;
    }

    Axios.post("http://localhost:1337/api/companylogin", {
      email: email,
      Password: Password,
    }).then((response) => {

      if (response.data.status === "error") {

  Swal.fire({
    icon: "error",
    title: "Error",
    text: response.data.message,
  });

} else {

  const data = {
    Company_id: response.data.company.Company_id,
    email: response.data.company.email,
    Company_name: response.data.company.Company_name,
  };
        sessionStorage.setItem("mydata", JSON.stringify(data));

        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          text: `Welcome ${email}`,
        }).then(() => {
          window.location = "/dashboard";
        });

      }

    });

  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h3>Company Login</h3>

        <form onSubmit={handlelogin}>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              id="email"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              id="Password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;