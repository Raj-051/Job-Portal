import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./managecandidates.css";

function ManageCandidates() {

  const [candidates, setCandidates] = useState([]);

  const company = JSON.parse(sessionStorage.getItem("mydata"));

  // 🔥 GET CANDIDATES
  useEffect(() => {

    if (!company) {
      alert("Please login as company");
      return;
    }

    Axios.get(`http://localhost:1337/api/getcandidates/${company.Company_id}`)
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.log("Error fetching candidates:", err);
      });

  }, []);




  // ✅ UPDATE STATUS (Shortlist / Reject)
  const updateStatus = (Apply_id, status) => {

    let statusValue = 0;

    if (status === "Shortlisted") statusValue = 1;
    if (status === "Rejected") statusValue = 2;

    Axios.post("http://localhost:1337/api/updateStatus", {
      Apply_id,
      status: statusValue
    })
    .then(() => {

      Swal.fire("Success", `Candidate ${status}`, "success");

      // 🔥 UPDATE UI INSTANTLY
      setCandidates((prev) =>
        prev.map((c) =>
          c.Apply_id === Apply_id
            ? { ...c, Status: status }
            : c
        )
      );

    })
    .catch((err) => {
      console.log(err);
      Swal.fire("Error", "Something went wrong", "error");
    });

  };




  return (
    <div className="browsejob-page">

      <h2 className="section-title">Manage Candidates</h2>

      {candidates.length > 0 ? (

        <table className="candidate-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Job</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c, index) => (
              <tr key={c.Apply_id}>
                <td>{index + 1}</td>
                <td>{c.Name}</td>
                <td>{c.email}</td>
                <td>{c.Contact_no}</td>
                <td>{c.job_title}</td>
                <td>{c.location}</td>

                <td>
                  <span className={
                    c.Status === "Shortlisted"
                      ? "status-shortlisted"
                      : c.Status === "Rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }>
                    {c.Status || "Pending"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn-shortlist"
                    onClick={() => updateStatus(c.Apply_id, "Shortlisted")}
                    disabled={c.Status === "Shortlisted"}
                  >
                    Shortlist
                  </button>

                  <button
                    className="btn-reject"
                    onClick={() => updateStatus(c.Apply_id, "Rejected")}
                    disabled={c.Status === "Rejected"}
                  >
                    Reject
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      ) : (
        <p style={{ textAlign: "center" }}>No Candidates Found 😢</p>
      )}

    </div>
  );
}

export default ManageCandidates;