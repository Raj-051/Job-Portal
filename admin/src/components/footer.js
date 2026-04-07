import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="admin-footer">
      <div className="footer-left">
        © {new Date().getFullYear()} JobPortal Admin
      </div>

      {/* <div className="footer-right">
        Developed by <strong>Raj Patel</strong>
      </div> */}
    </footer>
  );
}

export default Footer;