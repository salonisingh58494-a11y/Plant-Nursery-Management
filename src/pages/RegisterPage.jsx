import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const EyeIcon = ({ onClick, isVisible }) => (
  <svg 
    className="toggle-password" 
    onClick={onClick} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {isVisible ? (
      <path d="M12 4.5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
    ) : (
      <path d="M12 7c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 8c-1.93 0-3.5-1.57-3.5-3.5S10.07 8.5 12 8.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zM12 4C7 4 2.73 7.55 1 12c1.73 4.45 6 8 11 8s9.27-3.55 11-8c-1.73-4.45-6-8-11-8zm0 14c-4.41 0-8.08-2.61-9.76-6C3.92 8.61 7.59 6 12 6s8.08 2.61 9.76 6c-1.68 3.39-5.35 6-9.76 6z" />
    )}
  </svg>
);

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') setShowPassword((prev) => !prev);
    if (field === 'confirmPassword') setShowConfirmPassword((prev) => !prev);
  };

  const validateField = (name, value, allData) => {
    let error = '';
    if (!value.trim()) error = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
    else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email.';
    else if (name === 'password') {
      const req = [];
      if (value.length < 8) req.push('At least 8 chars');
      if (!/[A-Z]/.test(value)) req.push('Uppercase letter');
      if (!/[a-z]/.test(value)) req.push('Lowercase letter');
      if (!/[0-9]/.test(value)) req.push('Number');
      if (!/[!@#$%^&*]/.test(value)) req.push('Special char (!@#$%^&*)');
      if (req.length > 0) error = `Password must contain:<br>- ${req.join('<br>- ')}`;
    } else if (name === 'confirmPassword' && value !== allData.password) error = 'Passwords do not match.';
    return error;
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    ['fullName','email','password','confirmPassword'].forEach(field => {
      const err = validateField(field, formData[field], formData);
      if (err) { errors[field] = err; isValid = false; }
    });
    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: formData.fullName,   // <-- yaha fullName ko name me map karo
    email: formData.email,
    password: formData.password
  }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/profile"); // ✅ Register → ProfilePage
        } else {
          alert("Registration successful! Please login.");
          navigate("/login");
        }
      } else alert(data.message || "Registration failed");

    } catch (err) { console.error(err); alert("Server error"); }
  };

  return (
    <div className="register-page-wrapper">
      <div className="registration-container">
        <div className="slider-section-reg">
          <div className="floating-image-wrapper">
            <img src="\pot3.jpg" alt="Beautiful Plant" className="floating-plant-image" />
          </div>
          <h2 className="slider-title-reg">Cultivate Your Ideas!</h2>
          <p className="slider-text-reg">
            Join thousands of gardening enthusiasts and start sharing your green journey today.
          </p>
          <h3 className="slider-login-prompt">Already a Member?</h3>
          <Link to="/login" className="login-btn-reg">Login Now</Link>
        </div>

        <form className="registration-form-section" onSubmit={handleSubmit} noValidate>
          <h2 className="form-title">Create Your Account</h2>

          {/* Full Name */}
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName"
              placeholder="Your Full Name" value={formData.fullName}
              onChange={handleChange}
              className={validationErrors.fullName ? 'input-error' : ''} />
            <div className={`validation-message ${validationErrors.fullName ? 'visible' : ''}`}
                 dangerouslySetInnerHTML={{ __html: validationErrors.fullName }} />
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email"
              placeholder="you@example.com" value={formData.email}
              onChange={handleChange}
              className={validationErrors.email ? 'input-error' : ''} />
            <div className={`validation-message ${validationErrors.email ? 'visible' : ''}`}
                 dangerouslySetInnerHTML={{ __html: validationErrors.email }} />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input type={showPassword ? 'text' : 'password'} id="password" name="password"
                placeholder="Create a strong password" value={formData.password}
                onChange={handleChange} className={validationErrors.password ? 'input-error' : ''} />
              <EyeIcon onClick={() => togglePasswordVisibility('password')} isVisible={showPassword} />
            </div>
            <div className={`validation-message ${validationErrors.password ? 'visible' : ''}`}
                 dangerouslySetInnerHTML={{ __html: validationErrors.password }} />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword"
                placeholder="Repeat your password" value={formData.confirmPassword}
                onChange={handleChange} className={validationErrors.confirmPassword ? 'input-error' : ''} />
              <EyeIcon onClick={() => togglePasswordVisibility('confirmPassword')} isVisible={showConfirmPassword} />
            </div>
            <div className={`validation-message ${validationErrors.confirmPassword ? 'visible' : ''}`}
                 dangerouslySetInnerHTML={{ __html: validationErrors.confirmPassword }} />
          </div>

          <button type="submit" className="register-submit-btn">Register Account</button>
        </form>
      </div>
    </div>
  );
}