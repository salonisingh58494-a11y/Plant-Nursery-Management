import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingBag,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">

      {/* Admin Profile Section */}
      <div className="admin-profile">
        <FaUserCircle className="profile-icon" />
        <div>
          <h3>Admin Panel</h3>
          <p>{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <NavLink to="/admin" end>
        <FaTachometerAlt /> <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="orders"
        className={({ isActive }) => isActive ? "active-link" : ""}
      >
        <FaShoppingBag />
        <span>Orders</span>
      </NavLink>

      <NavLink to="/admin/users">
        <FaUsers /> <span>Users</span>
      </NavLink>

      <NavLink to="/admin/products">
        <FaBox /> <span>Products</span>
      </NavLink>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> <span>Logout</span>
      </button>

    </div>
  );
};

export default Sidebar;