import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import "./editjobcategory.css";

function EditJobCategory() {

  const location = useLocation();
  const Jobcat_id = location.state.Jobcat_id;

  const [categoryData, setCategoryData] = useState({
    Jobcat_name: "",
    Jobcat_description: ""
  });

  useEffect(() => {
    Axios.post("http://localhost:1337/api/editjobcategory", { Jobcat_id })
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Jobcat_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategoryData({
      ...categoryData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:1337/api/updatejobcategory", {
      Jobcat_id: Jobcat_id,
      Jobcat_name: categoryData.Jobcat_name,
      Jobcat_description: categoryData.Jobcat_description
    })
    .then((res) => {

      Swal.fire({
        icon: "success",
        title: "Updated Successfully"
      });

    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">

        <h3 className="mb-4">Edit Job Category</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Job Category Name</label>
            <input
              type="text"
              name="Jobcat_name"
              className="form-control"
              value={categoryData.Jobcat_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="Jobcat_description"
              className="form-control"
              rows="4"
              value={categoryData.Jobcat_description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success">
            Edit Category
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditJobCategory;