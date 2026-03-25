import React from "react";
import "./about.css";

function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="container">
          <h1>About JobPortal</h1>
          <p>
            JobPortal is a platform that connects job seekers with companies.
            Our goal is to help people find the right job opportunities and help
            companies hire the best talent.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-section">
        <div className="container about-grid">

          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to simplify the hiring process by providing an easy
              and powerful platform where job seekers can explore opportunities
              and companies can find skilled professionals.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li>Browse thousands of job opportunities</li>
              <li>Upload or generate professional resumes</li>
              <li>Apply for jobs easily</li>
              <li>Companies can post and manage jobs</li>
            </ul>
          </div>

          <div className="about-image">
            <img src="/img/banner/illustration.png" alt="about" />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="about-features">
        <div className="container">

          <h2 className="section-title">Why Choose JobPortal</h2>

          <div className="feature-grid">

            <div className="feature-card">
              <h3>Smart Job Search</h3>
              <p>Find jobs based on skills, category and location.</p>
            </div>

            <div className="feature-card">
              <h3>Resume Builder</h3>
              <p>Create professional resumes quickly and easily.</p>
            </div>

            <div className="feature-card">
              <h3>Verified Companies</h3>
              <p>Connect with trusted companies offering real jobs.</p>
            </div>

            <div className="feature-card">
              <h3>Easy Applications</h3>
              <p>Apply to jobs with just a few clicks.</p>
            </div>

          </div>

        </div>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <div className="container">

          <h2 className="section-title">Developer</h2>

          <div className="team-card">
            <img src="/img/testmonial/author.png" alt="developer"/>
            <h3>Raj Patel</h3>
            <p>B.Tech IT Student</p>
            <p>MERN Stack Developer</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default About;