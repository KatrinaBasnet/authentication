import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost/authentication/api/login.php",
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setMsgColor("text-success");
        setMsg("Login successful!");
        sessionStorage.setItem("session_id", res.data.session_id);
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMsgColor("text-danger");
        setMsg(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      setMsgColor("text-danger");
      setMsg("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-4 border rounded shadow-sm bg-white"
    >
      <h4 className="mb-4 text-center">Login</h4>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>

      {msg && (
        <div className={`mt-3 text-center ${msgColor}`}>
          {msg}
        </div>
      )}
    </form>
  );
};

export default Login;
