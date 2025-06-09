import { useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import './App.css'; 

const App = () => {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="auth-box shadow p-4 rounded">
        <h2 className="text-center mb-4">Authentication</h2>
        <div className="d-flex justify-content-center mb-3 gap-3">
          <button className="btn btn-outline-primary" onClick={() => setActiveForm("login")}>
            Login
          </button>
          <button className="btn btn-outline-primary" onClick={() => setActiveForm("signup")}>
            Signup
          </button>
        </div>

        {activeForm === "login" && <Login />}
        {activeForm === "signup" && <Signup />}
        {!activeForm && (
          <p className="text-center text-muted">Please select an option to continue.</p>
        )}
      </div>
    </div>
  );
};

export default App;
