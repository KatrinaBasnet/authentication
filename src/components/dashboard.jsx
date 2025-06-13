import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  axios
    .get("http://localhost/authentication/api/get_logins.php")
    .then((response) => {
      if (response.data.success) {
        setUsers(response.data.data);  
      } else {
        setUsers([]);  
        console.warn(response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);


  return (
    <div>
      <h2 className="mb-4">User List</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Email</th>
            <th scope="col">Login Time</th> 
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.user_id}</td> 
                <td>{user.email}</td>
                <td>{user.login_time}</td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
