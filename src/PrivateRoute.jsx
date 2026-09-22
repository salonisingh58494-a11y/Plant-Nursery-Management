// src/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token || token === "") {
      return <Navigate to="/login" replace />;
    }
    return children;

  } catch (error) {
    console.error("Error checking token in PrivateRoute:", error);
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;