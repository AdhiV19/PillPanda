import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ darkMode, setDarkMode }) {
  const [isPharmacist, setIsPharmacist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validate password rules
    if (!isValidPassword) {
      alert(
        "Password must be at least 8 characters and include a special character."
      );
      return;
    }

    // 2. Check match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // 3. Collect data
    const form = new FormData(e.target);
    const userData = {};
    form.forEach((value, key) => {
      userData[key] = value;
    });

    userData.password = password; // explicitly include password
    userData.role = isPharmacist ? "pharmacist" : "patient";
    userData.firstName = form.get("firstName");
    userData.lastName = form.get("lastName");
    userData.username = userData.firstName + " " + userData.lastName;

    // 4. Determine localStorage key
    const storageKey = isPharmacist ? "pharmacists" : "patients";

    // 5. Get existing users
    const existing = JSON.parse(localStorage.getItem(storageKey)) || [];

    // 6. Prevent duplicate emails
    const exists = existing.some((u) => u.email === userData.email);
    if (exists) {
      alert("An account with this email already exists.");
      return;
    }

    // 7. Save new user
    existing.push(userData);
    localStorage.setItem(storageKey, JSON.stringify(existing));

    // 8. Success
    setLoading(true);
    setTimeout(() => {
      alert("Sign up successful!");
      e.target.reset();
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  const isValidPassword = password.length >= 8 && /[^A-Za-z0-9]/.test(password);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  return (
    <>
      <div className="absolute top-6 right-6">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="sr-only peer"
          />
          <div className="shadow w-11 h-6 bg-pandaWhite peer-focus:outline-none rounded-full peer dark:bg-pandaWhite peer-checked:bg-blue-600 transition-colors"></div>
          <div className="absolute self-center left-1 top-1 w-4 h-4 bg-pandaRed rounded-full transition-transform peer-checked:translate-x-5  peer-checked:bg-pandaBlue  duration-150 ease-out"></div>
          <img
            src={darkMode ? "/moon.png" : "/sun.png"}
            className={darkMode ? " left-3 h-5 w-5" : "ms-1 h-4 w-4"}
          />
        </label>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover bg-[url('/wh-bg.jpeg')] dark:bg-[url('/blueGradient.jpeg')] text-pandaBlack dark:text-pandaWhite px-4 py-8">
        <img
          onClick={() => navigate("/")}
          src={
            darkMode
              ? "/logo_pillpanda_transp_bk.png"
              : "/logo_pillpanda_transp.png"
          }
          alt="PillPanda Logo"
          className="h-32 mb-4"
        />

        <div className="w-full max-w-md bg-white dark:bg-pandaBlack shadow-lg rounded-xl p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center underline">Sign Up</h2>

          {/* Toggle Switch */}
          <div className="relative flex items-center justify-center">
            <label className="relative inline-flex items-center cursor-pointer w-44 h-10">
              <input
                type="checkbox"
                checked={isPharmacist}
                onChange={() => setIsPharmacist(!isPharmacist)}
                className="sr-only peer"
              />
              <div className="absolute w-full h-full rounded-3xl bg-red-400 peer-checked:bg-blue-500 transition-colors"></div>
              <div className="absolute left-1 top-1 w-16 h-8 bg-white rounded-full transition-transform peer-checked:translate-x-20 peer-checked:w-3/6 peer-checked:left-0 z-10"></div>
              <div className="flex justify-between w-full px-3 text-sm font-bold z-20">
                <span
                  className={`transition ${
                    !isPharmacist ? "text-pandaBlue " : "text-white "
                  }`}
                >
                  Patient
                </span>
                <span
                  className={`transition ${
                    isPharmacist ? "text-pandaRed x-1" : "text-white"
                  }`}
                >
                  Pharmacist
                </span>
              </div>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isPharmacist ? (
              <>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input"
                    name="firstName"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="input"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Aadhaar No"
                  minLength={12}
                  maxLength={12}
                  name="aadhaar"
                  className="input"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone No."
                  name="phoneno"
                  className="input"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input"
                  required
                />

                <input
                  type="text"
                  placeholder="Create password"
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input "
                  required
                />
                {password && (
                  <p
                    className={`text-xs ${
                      isValidPassword ? "text-green-500 " : "text-red-500 "
                    }`}
                  >
                    {isValidPassword
                      ? "✓ Password is valid"
                      : "✘ Minimum 8 characters and 1 special character required"}
                  </p>
                )}
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    minLength={8}
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input pr-10"
                    required
                  />
                  {confirmPassword.length > 0 && (
                    <span className="absolute right-3 top-2 text-lg">
                      {passwordsMatch ? (
                        <span className="text-green-500 text-sm">
                          matched ✔
                        </span>
                      ) : (
                        <span className="text-red-500">✘</span>
                      )}
                    </span>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Street / Area"
                  name="street"
                  className="input"
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="input"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="PIN Code"
                  name="pincode"
                  className="input"
                  required
                />
                <div className="items-center">
                  <input
                    type="checkbox"
                    className="accent-green-300"
                    required
                  />
                  <span className="text-xs">
                    You agree to our Terms, Privacy Policy and Cookies Policy.
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Licensee First Name"
                    name="firstName"
                    className="input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Licensee Last Name"
                    name="lastName"
                    className="input"
                    required
                    />
                </div>
                <input
                  type="text"
                  placeholder="Pharmacy Name"
                  name="pharmacyname"
                  className="input"
                  required
                />
                <input
                  type="text"
                  placeholder="Pharmacist License No"
                  name="licenseno."
                  className="input"
                  required
                />
                <input
                  type="text"
                  placeholder="GST No"
                  minLength={15}
                  maxLength={15}
                  name="gstno."
                  className="input"
                  required
                />
                <input
                  type="tel"
                  placeholder="Registered Phone No."
                  name="phoneno"
                  className="input"
                  required
                  />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input"
                  required
                  />

                <input
                  type="text"
                  placeholder="Create password"
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input "
                  required
                />
                {password && (
                  <p
                    className={`text-xs ${
                      isValidPassword ? "text-green-500 " : "text-red-500 "
                    }`}
                  >
                    {isValidPassword
                      ? "✓ Password is valid"
                      : "✘ Minimum 8 characters and 1 special character required"}
                  </p>
                )}
                <div className="relative">
                  <input
                    type="password"
                    
                    placeholder="Confirm password"
                    minLength="8"
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input pr-10"
                    required
                  />
                  {confirmPassword.length > 0 && (
                    <span className="absolute right-3 top-2 text-lg">
                      {passwordsMatch ? (
                        <span className="text-green-500 text-sm">
                          matched ✔
                        </span>
                      ) : (
                        <span className="text-red-500">✘</span>
                      )}
                    </span>
                  )}
                </div>



                <input
                  type="text"
                  placeholder="Street / Area"
                  name="street"
                  className="input"
                  required
                  />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="input"
                    required
                    />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="input"
                    required
                    />
                </div>
                <input
                  type="text"
                  placeholder="PIN Code"
                  name="pincode"
                  className="input"
                  required
                />
                <div className="inline-block align-middle">
                  <input
                    type="checkbox"
                    className="accent-green-300"
                    required
                  />
                  <span className="text-xs">
                    You agree to our Terms, Privacy Policy and Cookies Policy.
                  </span>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-1/3 py-2 bg-pandaBlue text-white dark:text-pandaBlack rounded-md hover:opacity-90 transition"
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
