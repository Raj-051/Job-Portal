import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./home.css";

function Home() {

  const navigate = useNavigate();
  const location = useLocation();

  // 🔍 SEARCH STATES
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  // 📦 DATA STATES
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {

    // 🔥 Categories
    Axios.get("http://localhost:1337/api/getjobcategory")
      .then((res) => setCategories(res.data));

    // 🔥 Jobs
    Axios.get("http://localhost:1337/api/getjoblist")
      .then((res) => setJobs(res.data));

    // 🔥 Companies
    Axios.get("http://localhost:1337/api/getemployers")
      .then((res) => setCompanies(res.data));

    const user = JSON.parse(sessionStorage.getItem("mydata"));

    // 🔥 Applied Jobs
    if (user) {
      Axios.get(`http://localhost:1337/api/getappliedjobs/${user.User_id}`)
        .then((res) => {
          const appliedIds = res.data.map(item => item.Job_id);
          setAppliedJobs(appliedIds);
        });

      // ⭐ Recommended Jobs
      Axios.get(`http://localhost:1337/api/recommendedJobs/${user.User_id}`)
  .then((res) => {
    setRecommendedJobs(res.data);
  })
  .catch((err) => {
    console.log("Recommended Jobs Error:", err);
    setRecommendedJobs([]);
  });
    }

  }, []);

  // 🔍 SEARCH
  const handleSearch = () => {
    navigate("/browsejob", {
      state: {
        title: searchTitle,
        location: searchLocation,
        category: searchCategory
      }
    });
  };

  return (
    <>

      {/* 🔥 HERO */}
      <section className="hero-section">
        <div className="container hero-container">

          <div className="hero-text">
            <h5>{jobs.length}+ Jobs Available</h5>
            <h1>Find Your Dream Job Today</h1>

            <button
              className="btn-primary"
              onClick={() => navigate("/browsejob")}
            >
              Browse Job
            </button>
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
          {[...new Set(jobs.map((job) => job.location))].map((loc, index) => (
            <option key={index}>{loc}</option>
          ))}
        </select>

        <select onChange={(e) => setSearchCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.Jobcat_id}>{cat.Jobcat_name}</option>
          ))}
        </select>

        <button className="btn-search" onClick={handleSearch}>
          Find Job
        </button>

      </div>

      {/* 🔥 CATEGORIES */}
      <section className="categories-section">
        <div className="container">

          <h2 className="section-title">Popular Categories</h2>

          <div className="categories-grid">

            {categories.length > 0 ? (
              (showAll ? categories : categories.slice(0, 4)).map((cat, index) => {

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

          {/* VIEW ALL */}
          <div className="view-btn-container">
            {!showAll ? (
              <span className="view-btn" onClick={() => setShowAll(true)}>
                View All →
              </span>
            ) : (
              <span className="view-btn" onClick={() => setShowAll(false)}>
                Show Less →
              </span>
            )}
          </div>

        </div>
      </section>
      
{/* ⭐ job listing */}

<section className="featured-jobs-section">
  <div className="container">

    <h2 className="section-title">Jobs Listing</h2>

    {jobs
      .filter((job) => {
        // ✅ remove expired jobs
        if (!job.end_date) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const endDate = new Date(job.end_date);
        endDate.setHours(0, 0, 0, 0);

        return endDate >= today;
      })
      .slice(0, 5)
      .map((job) => (
        <div className="job-card" key={job.Job_id}>

         <div className="job-card-left">
                <img src="/img/svg_icon/1.svg" alt="" />

                <div className="job-info">
                  <h4
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={() => navigate("/jobdetails", { state: job })}
                  >
                    {job.job_title}
                  </h4>

                  <p>
                    {job.Jobcat_name} • {job.location} • {job.jobtype}
                  </p>

                  {/* 🔥 OPTIONAL: SHOW END DATE */}
                  <small style={{ color: "#888" }}>
                    Last Date: {job.end_date}
                  </small>
                </div>
              </div>

          <button
            className="btn-apply"
            disabled={appliedJobs.includes(job.Job_id)}
            onClick={() => navigate("/browsejob", { state: job })}
          >
            {appliedJobs.includes(job.Job_id) ? "Applied" : "Apply Now"}
          </button>

        </div>
      ))}

  </div>
</section>

      {/* ⭐ RECOMMENDED JOBS */}
      <section className="featured-jobs-section">
        <div className="container">

          <h2 className="section-title">⭐ Recommended Jobs</h2>

          {recommendedJobs.length === 0 ? (
            <p>No matching jobs found</p>
          ) : (
            recommendedJobs.slice(0, 5).map((job) => (
              <div className="job-card" key={job.Job_id}>
              <div className="job-left">

                <h4 className="job-line">
                  {job.job_title} • {job.Jobcat_name} • {job.location} • Last Date:{" "}
                  {new Date(job.end_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </h4>

              </div>
                <button
                  className="btn-apply"
                  onClick={() => navigate("/browsejob", { state: job })}
                >
                  Apply Now
                </button>

              </div>
            ))
          )}

        </div>
      </section>

      {/* 🔥 COMPANIES */}
      <section className="companies-section">
        <div className="container">

          <h2 className="section-title">Top Companies</h2>

          <div className="companies-grid">
            {companies.slice(0, 4).map((company) => (
              <div className="company-card" key={company.Company_id}>
                <h4>{company.Company_name}</h4>
                <p>{company.location}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </>
  );
}

export default Home;