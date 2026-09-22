import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const EyeIcon = ({ onClick }) => (
  <svg className="toggle-password" onClick={onClick} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setServerError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setServerError("");

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      const finalUserId = data.userId || data.user?._id || data.user?.id || data.id;
      const finalRole = data.role || data.user?.role || "user";

      if (!finalUserId) {
        throw new Error("Login success but User ID missing from server response.");
      }

      const userData = {
        id: finalUserId,
        name: data.name || data.user?.name || "User",
        role: finalRole,
        email: email
      };

      login(userData, data.token);

      const fromCheckout = location.state?.fromCheckout;
      if (fromCheckout) {
        navigate("/checkout");
      } else if (finalRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Login Error:", error);
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="slider-section">
          <img src="/gallery-4.jpg" alt="Plant" className="floating-plant-image" />
          <h2 className="slider-title-new">Join the Paryavaran Community</h2>
          <Link to="/register" className="signup-btn-new">Create New Account</Link>
        </div>

        <form className="login-form-section" onSubmit={handleSubmit}>
          <h2 className="form-title">Creator Login</h2>
          
          {serverError && <div className="validation-message visible">{serverError}</div>}

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
                required 
              />
              <EyeIcon onClick={togglePasswordVisibility} />
            </div>
          </div>

          <div className="forgot-password-container">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}