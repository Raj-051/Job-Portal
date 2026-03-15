import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {

  function Logout(){
    sessionStorage.clear();
    window.location = "/login";
  }

  let user1 = JSON.parse(sessionStorage.getItem("mydata"));
  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo">
            <span className="logo-primary">Job</span>Portal
          </Link>
        </div>

        

        {/* Right Menu */}
        <div className="header-menu">
          {user1 === null? (
            <>
             <Link to="/signup" className="header-link">
            Sign Up
          </Link>

          <Link to="/login" className="header-link">
            Login
          </Link>
            </>
          ) : (
            <>
            <button className="header-link logout-btn" onClick={Logout}>
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
