import React from "react";

function UserDashboard(){

  function generateResume(){
    window.location = "/resume";
  }

  return(
    <div>

      <h2>User Dashboard</h2>

      <button onClick={generateResume}>
        View Resume
      </button>

    </div>
  )
}

export default UserDashboard;