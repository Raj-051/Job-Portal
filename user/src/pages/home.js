import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./home.css";

function Home() {

  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state;

  console.log("JOB DATA:", job);

  // 🔍 SEARCH STATES
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [filteredJobs, setFilteredJobs] = useState([]);

  // 📦 DATA STATES
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  // ✅ SINGLE API CALL (FIXED)
  useEffect(() => {

    // 🔹 GET ALL CATEGORIES (HOME PAGE)
    Axios.get("http://localhost:1337/api/getjobcategory")
  .then((res) => {
    console.log("CATEGORIES:", res.data); // 👈 CHECK THIS
    setCategories(res.data);
  });

    // 🔹 GET JOBS
    Axios.get("http://localhost:1337/api/getjoblist")
      .then((res) => setJobs(res.data))
      .catch((err) => console.log("Job Error:", err));

    // 🔹 GET COMPANIES
    Axios.get("http://localhost:1337/api/getemployers")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log("Company Error:", err));

  }, []);

  // 🔍 SEARCH FUNCTION
  const handleSearch = () => {

    const result = jobs.filter((job) => {

      return (
        (searchTitle === "" ||
          job.job_title.toLowerCase().includes(searchTitle.toLowerCase())) &&

        (searchLocation === "" ||
          job.location === searchLocation) &&

        (searchCategory === "" ||
          job.Jobcat_name === searchCategory)
      );
    });

    setFilteredJobs(result);
  };

  return (
    <>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">

          <div className="hero-text">
            <h5>{jobs.length}+ Jobs Available</h5>
            <h1>Find Your Dream Job Today</h1>

            <p>
              Discover thousands of job opportunities with all the information
              you need.
            </p>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/uploadresume")}
              >
                Upload Resume
              </button>

              <button
                className="btn-primary"
                onClick={() => navigate("/browsejob")}
              >
                Browse Job
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img src="/img/banner/illustration.png" alt="banner" />
          </div>

        </div>
      </section>


      {/* 🔍 SEARCH BAR */}
      <div className="bar">

        <input
          type="text"
          placeholder="Job title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <select onChange={(e) => setSearchLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option>Ahmedabad</option>
          <option>Vadodara</option>
          <option>Surat</option>
        </select>

        <select onChange={(e) => setSearchCategory(e.target.value)}>
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat.Jobcat_id} value={cat.Jobcat_name}>
              {cat.Jobcat_name}
            </option>
          ))}
        </select>

        <button className="btn-search" onClick={handleSearch}>
          Find Job
        </button>

      </div>


      {/* 📂 CATEGORIES */}
      <section className="categories-section">
        <div className="container">

          <h2 className="section-title">Popular Categories</h2>

          <div className="categories-grid">

            {categories.length > 0 ? (
              categories.map((cat, index) => {

                const icons = ["🎨","📈","💻","⚙️","📊","🛒","📞","🏥"];

                return (
                  <div className="category-card" key={cat.Jobcat_id}>
                    <div className="icon">
                      {icons[index % icons.length]}
                    </div>

                    <h4>{cat.Jobcat_name}</h4>
                    <p>{cat.Jobcat_description}</p>
                  </div>
                );
              })
            ) : (
              <p>No Categories Found</p>
            )}

          </div>
        </div>
      </section>


      {/* 💼 JOB LIST */}
      <section className="featured-jobs-section">
        <div className="container">

          <h2 className="section-title">Jobs Listing</h2>

          {(filteredJobs.length > 0 ? filteredJobs : jobs)
            .slice(0, 5)
            .map((job) => (

              <div className="job-card" key={job.Job_id}>

                <div className="job-left">
                  <img src="/img/svg_icon/1.svg" alt="" />

                  <div>
                    <h4>{job.job_title}</h4>
                    <p>
                      {job.Jobcat_name} • {job.location} • {job.jobtype}
                    </p>
                  </div>
                </div>

                <button
                  className="btn-apply"
                  onClick={() => navigate("/browsejob", { state: job })}
                >
                  Apply Now
                </button>

              </div>
            ))}

        </div>
      </section>


      {/* 🏢 COMPANIES */}
      <section className="companies-section">
        <div className="container">

          <h2 className="section-title">Top Companies</h2>

          <div className="companies-grid">

            {companies.length > 0 ? (
              companies.slice(0, 4).map((company) => (
                <div className="company-card" key={company.Company_id}>
                  <h4>{company.Company_name}</h4>
                  <p>{company.location}</p>
                </div>
              ))
            ) : (
              <p>No Companies Found</p>
            )}

          </div>
        </div>
      </section>

    </>
  );
}

export default Home;