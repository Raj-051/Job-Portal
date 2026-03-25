import React from "react";
import "./contact.css";
import Swal from "sweetalert2";

function Contact() {

  function sendMessage(e){
    e.preventDefault();

    Swal.fire({
      icon:"success",
      title:"Message Sent",
      text:"Thank you for contacting us!"
    });
  }

  return (
    <div className="contact-page">

      {/* PAGE TITLE */}
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>We would love to hear from you</p>
      </section>

      <div className="container contact-container">

        {/* CONTACT INFO */}
        <div className="contact-info">

          <h3>Contact Information</h3>

          <p><strong>Address:</strong> Vadodara, Gujarat, India</p>
          <p><strong>Email:</strong> support@jobportal.com</p>
          <p><strong>Phone:</strong> +91 6359014242</p>

        </div>

        {/* CONTACT FORM */}
        <div className="contact-form">

          <h3>Send Message</h3>

          <form onSubmit={sendMessage}>

            <input type="text" placeholder="Your Name" required />

            <input type="email" placeholder="Your Email" required />

            <textarea placeholder="Your Message" rows="5" required></textarea>

            <button type="submit" className="btn-send">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;