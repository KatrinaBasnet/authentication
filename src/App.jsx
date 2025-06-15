// App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import './App.css';

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      {!isDashboard && (
        <>
          <h2 className="text-center mb-4">Authentication</h2>
          <div className="d-flex justify-content-center mb-3 gap-3">
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/signup" className="btn btn-outline-primary">Signup</Link>
            {/* <Link to="/dashboard" className="btn btn-outline-primary">Dashboard</Link> */}
          </div>
        </>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={
          <p className="text-center text-muted">Please select an option to continue.</p>
        } />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
