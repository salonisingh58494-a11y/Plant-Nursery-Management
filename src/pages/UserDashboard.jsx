import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import {
  FaBox,
  FaUser,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaEdit,
  FaLock,
} from "react-icons/fa";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(false);

  const token = localStorage.getItem("token");

  // Load user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      navigate("/login");
    } else {
      setUserData(user);
      setAddress(user.address || "");
    }
  }, [navigate]);

  // Load Orders
  useEffect(() => {
    if (activeTab === "orders") {
      setLoadingOrders(true);

      fetch("http://localhost:5000/api/order/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoadingOrders(false);
        })
        .catch(() => setLoadingOrders(false));
    }
  }, [activeTab, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleAddressUpdate = async () => {
    const res = await fetch("http://localhost:5000/api/user/address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ address }),
    });

    if (res.ok) {
      const updatedUser = { ...userData, address };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUserData(updatedUser);
      alert("Address Updated Successfully");
    }
  };

  const handleChangePassword = async () => {
    const res = await fetch(
      "http://localhost:5000/api/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      }
    );

    if (res.ok) {
      alert("Password Updated Successfully");
      setNewPassword("");
    }
  };

  if (!userData) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="content-card">
            <h3>Profile Details</h3>

            <div className="profile-grid">
              <div>
                <label>Full Name</label>
                <p>{userData.name}</p>
              </div>
              <div>
                <label>Email</label>
                <p>{userData.email}</p>
              </div>
              <div>
                <label>Role</label>
                <p>{userData.role}</p>
              </div>
            </div>

            <div className="change-pass">
              <h4>
                <FaLock /> Change Password
              </h4>
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handleChangePassword}>
                Update Password
              </button>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="content-card">
            <h3>My Orders</h3>

            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="order-card">
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Total:</strong> ₹{order.totalAmount}</p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        );

      case "address":
        return (
          <div className="content-card">
            <h3>My Address</h3>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />

            <button onClick={handleAddressUpdate}>
              <FaEdit /> Update Address
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dash-bg">
      <div className="dash-container">
        <aside className="dash-sidebar">
          <div className="sidebar-top">
            <img
              src={`https://ui-avatars.com/api/?name=${userData.name}&background=157347&color=fff`}
              alt="User"
            />
            <h4>{userData.name}</h4>
            <span>{userData.role}</span>
          </div>

          <nav className="dash-nav">
            <button
              className={activeTab === "profile" ? "nav-active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser /> Profile
            </button>

            <button
              className={activeTab === "orders" ? "nav-active" : ""}
              onClick={() => {
                setActiveTab("orders");
                navigate("/orders");
              }}
            >
              <FaBox /> Orders
            </button>

            <button
              className={activeTab === "address" ? "nav-active" : ""}
              onClick={() => setActiveTab("address")}
            >
              <FaMapMarkerAlt /> Address
            </button>

            <div className="nav-sep"></div>

            <button className="nav-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </aside>

        <main className="dash-main">{renderContent()}</main>
      </div>
    </div>
  );
}