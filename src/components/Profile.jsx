import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("currentUserEmail");
    const role = localStorage.getItem("currentUserRole") || "patients";

    if (!email || !role) {
      navigate("/login"); // force redirect if not logged in
      return;
    }

    const users = JSON.parse(localStorage.getItem(role)) || [];
    const user = users.find((u) => u.email === email);
    if (user) {
      setUserData(user);
    }
  }, [navigate]);

  const handleChangePassword = () => {
    if (newPassword.length < 8 || !/[^A-Za-z0-9]/.test(newPassword)) {
      alert("Password must be at least 8 characters and include 1 special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const email = localStorage.getItem("currentUserEmail");
    const role = localStorage.getItem("currentUserRole") || "patients";
    const users = JSON.parse(localStorage.getItem(role)) || [];

    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );

    localStorage.setItem(role, JSON.stringify(updatedUsers));
    alert("Password updated successfully. You can now log in using your new password.");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!userData) return <p className="p-8">Loading your profile...</p>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <p><strong>Name:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone:</strong> {userData["phoneno."]}</p>

      <h3 className="mt-6 font-semibold">Change Password</h3>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 w-full my-2"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 w-full my-2"
      />
      <button
        onClick={handleChangePassword}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Password
      </button>
    </div>
  );
}

export default Profile;
