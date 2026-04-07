import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./viewjobcategory.css";

function ViewJobcategory() {

  const [list, setList] = useState([]);
  const [expanded, setExpanded] = useState({}); // 🔥 track open rows

  // FETCH DATA
  useEffect(() => {
    Axios.get("http://localhost:1337/api/getjobcategory")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // DELETE
  const deleteJobCategory = (id) => {
    Axios.delete(`http://localhost:1337/api/deletejobcategory/${id}`)
      .then(() => {
        alert("Deleted successfully");
        setList(list.filter(item => item.Jobcat_id !== id)); // 🔥 no reload
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TOGGLE DESCRIPTION
  const toggleDescription = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="job-container">

    
        <div className="job">View Job Categories</div>

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

              {list.length > 0 ? (
                list.map((val, index) => {

                  const isOpen = expanded[val.Jobcat_id];

                  return (
                    <tr key={val.Jobcat_id}>

                      <td>{index + 1}</td>

                      <td className="category-name">
                        {val.Jobcat_name}
                      </td>

                      {/* 🔥 DESCRIPTION */}
                      <td>
                        <div className="desc-box">

                          <p className={isOpen ? "full" : "short"}>
                            {val.Jobcat_description}
                          </p>

                          {val.Jobcat_description && val.Jobcat_description.length > 80 && (
                          <span
                            className="view-btn"
                            onClick={() => toggleDescription(val.Jobcat_id)}
                          >
                            {isOpen ? "▲" : "▼"}
                          </span>
                        )}

                        </div>
                      </td>

                      {/* ACTION */}
                      <td>
                        <div className="action-box">

                          <Link
                            to="/editjobcategory"
                            state={{ Jobcat_id: val.Jobcat_id }}
                            className="btn-edit"
                          >
                            Edit
                          </Link>

                          <button
                            className="btn-delete"
                            onClick={() => deleteJobCategory(val.Jobcat_id)}
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No Categories Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      

    </div>
  );
}

export default ViewJobcategory;