import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import "./login.css";

function Login() {

  function handleLogin(e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields",
      });
      return;
    }

    Axios.post("http://localhost:1337/api/userlogin", {
      email: email,
      password: password,
    }).then((response) => {

      if (response.data.status === "error") {

        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });

      } else {

        const data = {
          email: response.data.user.email,
          User_id: response.data.user.User_id
        };

        sessionStorage.setItem("mydata", JSON.stringify(data));

        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          text: `Welcome ${response.data.user.email}`,
        }).then(() => {
          window.location = "/";
        });

      }

    });

  }

  return (
    <div className="Login-page">
      <div className="Login-card">

        <h3>User Login</h3>

        <form onSubmit={handleLogin}>

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
              id="password"
            />
          </div>

          <button type="submit" className="Login-btn">
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