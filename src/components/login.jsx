import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login.php`, {
        email,
        password,
      });

      setMsg(res.data.message);

      if (res.data.success) {
        // Redirect to dashboard
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      setMsg("Server error");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 border rounded shadow-sm bg-white">
      <h4 className="mb-4 text-center">Login</h4>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">Login</button>
      {msg && (
        <div className={`mt-3 text-center ${msg.includes("successful") ? "text-success" : "text-danger"}`}>
          {msg}
        </div>
      )}
    </form>
  );
};

export default Login;
