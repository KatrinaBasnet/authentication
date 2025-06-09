import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login.php`,
        {
          email,
          password,
        }
      );
      setMsg(res.data.message);
    } catch (err) {
      console.error(err);
      setMsg("Server error");
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
          placeholder="Enter your email"
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
          placeholder="Enter your password"
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

      {msg && <div className="mt-3 text-center text-danger">{msg}</div>}
    </form>
  );
};

export default Login;
