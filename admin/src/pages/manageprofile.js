import React, { useState } from "react";

const ManageProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    company: "",
    location: "",
    about: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully ✅");
    console.log(profile);
  };

  return (
    <div className="page-content">
      {/* ===== Page Header ===== */}
      <div className="page-header no-margin-bottom">
        <div className="container-fluid">
          <h2 className="h5 no-margin-bottom">Manage Profile</h2>
        </div>
      </div>

      {/* ===== Breadcrumb ===== */}
      <div className="container-fluid">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Manage Profile</li>
        </ul>
      </div>

      {/* ===== Profile Form ===== */}
      <section className="no-padding-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="block">
                <div className="title">
                  <strong>Profile Information</strong>
                </div>

                <div className="block-body">
                  <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter full name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter mobile number"
                        value={profile.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Role */}
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        name="role"
                        className="form-control"
                        value={profile.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Role --</option>
                        <option value="Employer">Employer</option>
                        <option value="Job Seeker">Job Seeker</option>
                      </select>
                    </div>

                    {/* Company (Only Employer) */}
                    {profile.role === "Employer" && (
                      <div className="form-group">
                        <label>Company Name</label>
                        <input
                          type="text"
                          name="company"
                          className="form-control"
                          placeholder="Enter company name"
                          value={profile.company}
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    {/* Location */}
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        placeholder="Enter location"
                        value={profile.location}
                        onChange={handleChange}
                      />
                    </div>

                    {/* About */}
                    <div className="form-group">
                      <label>About</label>
                      <textarea
                        name="about"
                        className="form-control"
                        rows="4"
                        placeholder="Write something about yourself / company"
                        value={profile.about}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group mt-4">
                      <button type="submit" className="btn btn-primary">
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageProfile;
