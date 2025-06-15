import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup.php`, {
        email,
        password,
      });

      setMsg(res.data.message);
      setSuccess(res.data.success);

      if (res.data.success) {
        setTimeout(() => navigate("/"), 1000); 
      }
    } catch (err) {
      setMsg("Server error");
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 border rounded shadow-sm bg-white">
      <h4 className="mb-4 text-center">Signup</h4>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
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
        <label htmlFor="password" className="form-label">Password</label>
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
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </div>

      {msg && (
        <div className={`mt-3 text-center ${success ? "text-success" : "text-danger"}`}>
          {msg}
        </div>
      )}
    </form>
  );
}
