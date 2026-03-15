import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./ViewEmployer.css";

const ViewEmployer = () => {
  const [employers, setEmployers] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    Axios.get("http://localhost:1337/api/getemployers")
    
      .then((res) => {
        console.log(res.data);
        setEmployers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleApprove = (Company_id) => {
    if (Company_id) {
      Axios.post('http://localhost:1337/api/approveemployer', {
        Company_id: Company_id
      })
      .then((response)=>{
        if (response.data.message){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message || 'Employer approved successfully',
            comfirmButtonText: 'OK'
          }).then(() => {
            window.location = "/employers"; // Refresh the page after approval
          });
        }
        else {
          Swal.fire({
            icon: 'Success',
            title: 'User is blocked',
        
      }).then(() => {
        window.location = "/employers"; // Refresh the page after approval
      });
    }
    })
  }
}

const handleReject = (Company_id) => {
  //alert(Company_id);
  if (Company_id) {
    Axios.post('http://localhost:1337/api/rejectemployer', {
      Company_id: Company_id
    })
    .then((response)=>{
      if (response.data.message){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message || 'Employer rejected successfully',
          comfirmButtonText: 'OK'
        }).then(() => {
          window.location = "/employers"; // Refresh the page after rejection
        });
      }
    
      else {
        Swal.fire({
          icon: 'Success',
          title: 'User is blocked',
      
    }).then(() => {
      window.location = "/employers"; // Refresh the page after rejection
       });
      }
    })
  }
}

  return (
    <div className="page-content">
      <div className="page-header no-margin-bottom">
        <div className="container-fluid">
          <h2 className="h5 no-margin-bottom">View Employers</h2>
        </div>
      </div>

      <div className="container-fluid">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active">Employers</li>
        </ul>
      </div>

      <section className="no-padding-top">
        <div className="container-fluid">
          <div className="block margin-bottom-sm">
            <div className="title">
              <strong>Employer List</strong>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Company Name</th>
                    <th>Contact No</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>ID Proof</th>
                    <th>Action</th>
                  </tr>
                </thead>

               <tbody>
  {employers.map((item, index) => (
    <tr key={item.Company_id}>
      <td>{index + 1}</td>
      <td>{item.Company_name}</td>
      <td>{item.Contact_no}</td>
      <td>{item.email}</td>
      <td>{item.location}</td>
      

      {/* ID Proof Image */}
     <td>
  {item.Id_proof ? (
    <img
      src={`http://localhost:1337/public/${item.Id_proof}`}
      alt="ID Proof"
      width="60"
      height="60"
      style={{ objectFit: "cover", borderRadius: "6px" }}
    />
  ) : (
    <span>No Image</span>
  )}
</td>
<td>
  {item.status === 0 ? (
    <>
      <button
        onClick={() => handleApprove(item.Company_id)}
        className="btn btn-success"
      >
        Approve
      </button>

      <button
        onClick={() => handleReject(item.Company_id)}
        className="btn btn-danger"
        style={{ marginLeft: "10px" }}
      >
        Reject
      </button>
    </>
  ) : item.status === 1 ? (
    <span className="text-success">Approved</span>
  ) : item.status === 2 ? (
    <span className="text-danger">Rejected</span>
  ) : null}
</td>

    
    </tr>
  ))}
</tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewEmployer;