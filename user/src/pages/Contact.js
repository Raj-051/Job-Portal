import React, { useState } from "react";
import Axios from "axios";
import "./contact.css";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    Axios.post("http://localhost:1337/api/contact", form)
      .then(() => {
        alert("Message Sent Successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => alert("Error sending message"));
  };

  return (
    <div className="contact-container">

      <h2>Contact Us</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Send Message</button>

    </div>
  );
}

export default Contact;