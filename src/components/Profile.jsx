import React, { useEffect, useState } from "react";

function Profile({ user }) {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [showChange, setShowChange] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [success, setSuccess] = useState("");
    
    
  useEffect(() => {
    if (user) {
      setUsername(`${user.firstName} ${user.lastName}`);
      setPhone(`${user.phoneno}`);
    }
  }, [user]);

  const handleChangePassword = () => {
  if (!newPass || !confirmPass) {
    alert("Please enter both fields.");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Passwords do not match.");
    return;
  }

  const key = user.isPharmacist ? "pharmacists" : "patients";
  const allUsers = JSON.parse(localStorage.getItem(key)) || [];

  const updatedUsers = allUsers.map((u) => {
    const username = u.username || (u.firstName + u.lastName).toLowerCase();
    const currentUsername = user.username || (user.firstName + user.lastName).toLowerCase();

    if (username === currentUsername) {
      return { ...u, password: newPass };
    }
    return u;
  });

  localStorage.setItem(key, JSON.stringify(updatedUsers));
  alert("Password updated!");
  setNewPass("");
  setConfirmPass("");
};

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6 text-pandaRed dark:text-pandaBlue">👦🏻 Profile</h2>
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600 dark:text-white">
            Username
          </label>
          <input
            type="text"
            value={username}
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 dark:text-white">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-white"
          />
        </div>

        {showChange && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-white">
                New Password
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-4 py-2 border rounded bg-white dark:bg-zinc-700 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-4 py-2 border rounded bg-white dark:bg-zinc-700 text-gray-800 dark:text-white"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full bg-pandaBlue dark:bg-pandaRed text-white py-2 mt-4 rounded hover:bg-opacity-90"
            >
              Update Password
            </button>
          </>
        )}

        {!showChange && (
          <button
            onClick={() => setShowChange(true)}
            className="w-full bg-pandaBlue dark:bg-pandaRed text-white py-2 rounded hover:bg-opacity-90"
          >
            Change Password
          </button>
        )}

        {success && <p className="text-green-500 text-sm">{success}</p>}
      </div>
    </div>
  );
}

export default Profile;
