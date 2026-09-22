import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UsersPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= TOGGLE ================= */
  const confirmToggle = (user) => {
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  const handleToggleConfirm = async () => {
    if (!selectedUser) return;

    const newStatus =
      selectedUser.status === "active" ? "blocked" : "active";

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/users/${selectedUser._id}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id ? { ...u, status: newStatus } : u
        )
      );

      setShowConfirmModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  /* ================= DELETE ================= */
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  /* ================= ADD USER ================= */
  const addUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/users",
        { ...newUser, status: "active" }, // default status
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) => [{ ...res.data, status: "active" }, ...prev]);

      setShowAddModal(false);
      setNewUser({ name: "", email: "", password: "" });
      setLoading(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="admin-users">
      <div className="users-header">
        <h1>Manage Users</h1>
        <button onClick={() => setShowAddModal(true)}>+ Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`status ${
                    user.status === "active" ? "active" : "blocked"
                  }`}
                >
                  {user.status || "active"}
                </span>
              </td>
              <td>
                <button
                  className="toggle-btn"
                  onClick={() => confirmToggle(user)}
                >
                  {user.status === "active" ? "Block" : "Unblock"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= ADD MODAL ================= */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add User</h2>

            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={addUser} disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </button>

              <button onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONFIRM MODAL ================= */}
      {showConfirmModal && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Action</h2>
            <p>
              Are you sure you want to{" "}
              {selectedUser.status === "active" ? "block" : "unblock"} this
              user?
            </p>

            <div className="modal-actions">
              <button onClick={handleToggleConfirm}>Yes</button>

              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;