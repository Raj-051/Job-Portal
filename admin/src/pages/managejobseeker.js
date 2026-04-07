import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./managejobseeker.css";

const ManageJobSeeker = () => {

  const [users, setUsers] = useState([]);

  // FETCH USERS
  const fetchUsers = () => {
    Axios.get("http://localhost:1337/api/jobseekers")
      .then((res) => {
        if (res.data.status === "success") {
          setUsers(res.data.data);
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 TOGGLE STATUS FUNCTION
  const toggleStatus = (id) => {

  console.log("Clicked ID:", id); // ✅ debug

  Axios.post("http://localhost:1337/api/toggleUserStatus", { id })
    .then((res) => {

      console.log(res.data); // ✅ debug

      if (res.data.status === "success") {
        Swal.fire("Updated", "Status changed successfully", "success");

        // 🔥 update UI without reload
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.User_id === id
              ? { ...user, status: user.status == 1 ? 0 : 1 }
              : user
          )
        );
      }

    })
    .catch((err) => {
      console.log(err);
      Swal.fire("Error", "Something went wrong", "error");
    });
};

  return (
    <div className="page-content">

      <div className="page-header">
        <h2>Manage Job Seeker</h2>
      </div>

      <div className="table-container">

        <table className="custom-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Skills</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {users.length > 0 ? (
              users.map((user, index) => {

                const isActive = Number(user.status) === 1;

                return (
                  <tr key={user.User_id}>
                    <td>{index + 1}</td>
                    <td>{user.Name}</td>
                    <td>{user.email}</td>
                    <td>{user.Contact_no}</td>
                    <td>{user.skills}</td>

                    <td>
  <div className="status-container">

    <span className={isActive ? "status active" : "status inactive"}>
      {isActive ? "Active" : "Blocked"}
    </span>

    <button
      className={isActive ? "btn-block" : "btn-unblock"}
      onClick={() => toggleStatus(user.User_id)}
    >
      {isActive ? "Block" : "Unblock"}
    </button>

  </div>
</td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No Job Seekers Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageJobSeeker;