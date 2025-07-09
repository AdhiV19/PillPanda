import React, { useState } from "react";

function SignUp() {
  const [isPharmacist, setIsPharmacist] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Form submitted successfully!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pandaWhite dark:bg-pandaBlack text-pandaBlack dark:text-pandaWhite px-4 py-8">
      <img src="/logo_pillpanda_transp.png" alt="PillPanda Logo" className="h-24 mb-4" />

      <div className="w-full max-w-md bg-white dark:bg-pandaBlack shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

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
              <span className={`transition ${!isPharmacist ? "text-pandaBlue " : "text-white "}`}>Patient</span>
              <span className={`transition ${isPharmacist ? "text-pandaRed x-1" : "text-white"}`}>Pharmacist</span>
            </div>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isPharmacist ? (
            <>
              <div className="flex space-x-4">
                <input type="text" placeholder="First Name" className="input" required />
                <input type="text" placeholder="Last Name" className="input" required />
              </div>
              <input type="text" placeholder="Aadhaar No" className="input" required />
              <input type="tel" placeholder="Phone No." className="input" required />
              <input type="email" placeholder="Email" className="input" required />
              <input type="text" placeholder="Street / Area" className="input" required />
              <div className="flex gap-3">
                <input type="text" placeholder="City" className="input" required />
                <input type="text" placeholder="State" className="input" required />
              </div>
              <input type="text" placeholder="PIN Code" className="input" required />
            </>
          ) : (
            <>
              <div className="flex space-x-4">
                <input type="text" placeholder="Licensee First Name" className="input" required />
                <input type="text" placeholder="Licensee Last Name" className="input" required />
              </div>
              <input type="text" placeholder="Pharmacist License No" className="input" required />
              <input type="text" placeholder="GST No" className="input" required />
              <input type="tel" placeholder="Registered Phone No." className="input" required />
              <input type="email" placeholder="Email" className="input" required />
              <input type="text" placeholder="Street / Area" className="input" required />
              <div className="flex gap-3">
                <input type="text" placeholder="City" className="input" required />
                <input type="text" placeholder="State" className="input" required />
              </div>
              <input type="text" placeholder="PIN Code" className="input" required />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-pandaGreen text-pandaWhite dark:text-pandaBlack rounded-md hover:opacity-90 transition"
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
