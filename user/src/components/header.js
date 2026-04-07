import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {

  function Logout(){
    sessionStorage.clear();
    window.location = "/login";
  }

  const user1 = JSON.parse(sessionStorage.getItem("mydata"));

  return (
    <header className="header-area">

      <div className="header-container">

        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/img/logo2.png" alt="logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="main-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About Us</Link></li>
            <li><Link to="/browsejob">Browse Job</Link></li>
            <li><Link to="/Application">Applications</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Right Buttons */}
        <div className="header-buttons">

          {user1 === null ? (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          ) : (
            <>
              {/* ✅ FIXED */}
              <Link to="/resume" className="resume-btn">
                Resume
              </Link>

              <button className="logout-btn" onClick={Logout}>
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;