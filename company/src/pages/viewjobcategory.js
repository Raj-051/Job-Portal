import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./viewjobcategory.css";
import { Link } from "react-router-dom";

function ViewJobcategory() {
  function deleteJobCategory(id) {
    Axios.delete(`http://localhost:1337/api/deletejobcategory/${id}`)
      .then((res) => {
        alert("Job category deleted successfully");
        window.location.reload(); // refresh page
      })
      .catch((err) => {
        console.log(err);
      }); 
  };
  const [list, setList] = useState([]);

  // GET DATA
  useEffect(() => {
    Axios.get("http://localhost:1337/api/getjobcategory")
      .then((response) => {
        setList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);   // IMPORTANT

  return (
    <div className="job-container">
      <div className="job-card">
        <div className="job-header">View Job Categories</div>

        <div className="job-table-wrapper">
          <table className="job-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map((Val, index) => (
               <tr key={Val["Jobcat_id"]}>
                  <td>{index + 1}</td>
                  <td>{Val.Jobcat_name}</td>
                  <td>{Val.Jobcat_description}</td>
                  <td>
                    <button className="edit-btn">Edit</button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteJobCategory(Val.Jobcat_id)}
                    >
                      Delete
                    </button>
                  </td>
                  
                </tr>
              ))}

              {list.length === 0 && (
                <tr>
                  <td colSpan="4">No Categories Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewJobcategory;