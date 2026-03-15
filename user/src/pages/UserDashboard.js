import React from "react";

function UserDashboard(){

  function generateResume(){

    const user = JSON.parse(sessionStorage.getItem("mydata"));

    window.open(`http://localhost:1337/api/generate-resume/${user.User_id}`);

  }

  return(
    <div>

      <h2>User Dashboard</h2>

      <button onClick={generateResume}>
        Generate Resume
      </button>

    </div>
  )
}

export default UserDashboard;