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
            <img src="/img/logo.png" alt="logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="main-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About Us</Link></li>
            <li><Link to="/browsejob">Browse Job</Link></li>
            <li><Link to="/candidates">Candidates</Link></li>
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
              <a
                href={`http://localhost:1337/api/generate-resume/${user1.User_id}`}
                target="_blank"
                rel="noreferrer"
                className="resume-btn"
              >
                Resume
              </a>

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