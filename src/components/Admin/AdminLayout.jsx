import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  const { user } = useAuth(); // get logged-in user

  return (
    <div className="admin-container">
      
      <Sidebar user={user} />

      <div className="admin-main">
        <div className="admin-topbar">
          <div>
            <h2>Welcome, {user?.email}</h2>
            <span className="admin-role">Administrator</span>
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;