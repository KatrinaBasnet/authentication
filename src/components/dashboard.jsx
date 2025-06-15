import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost/authentication/api/get_logins.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setMsg("Unauthorized. Redirecting...");
          setTimeout(() => navigate("/"), 2000);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMsg("Session expired. Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost/authentication/api/logout.php", {
        withCredentials: true,
      });

      sessionStorage.removeItem("session_id");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div class="container p-5 mt-5">
      <div className="d-flex justify-content-evenly align-items-center mb-3">
        <h2>User Login Logs</h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <div class="table-responsive scrollable-table">
        <table class="table table-bordered table-striped">
          <thead class="table-light">
            <tr>
              <th>Id</th>
              <th>User_Id</th>
              <th>Email</th>
              <th>Logged_in_at</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
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
    </div>
  );
}

export default Dashboard;
