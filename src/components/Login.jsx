import React, { useEffect, useState } from 'react'

function Login() {
    const [isPharmacist, setIsPharmacist] = useState(false);
      const [loading, setLoading] = useState(false);
      const [darkMode, setDarkMode] = useState(false);
    
      useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
      }, [darkMode]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          alert("Form submitted successfully!");
          setLoading(false);
        }, 1500);
      };

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

      <div className="min-h-screen flex flex-col items-center justify-start bg-no-repeat bg-cover bg-[url('/wh-bg.jpeg')] dark:bg-[url('/blueGradient.jpeg')] text-pandaBlack dark:text-pandaWhite px-4 py-8">
        <img
          src={darkMode ? "/logo_pillpanda_transp_bk.png" : "/logo_pillpanda_transp.png"}
          alt="PillPanda Logo"
          className="h-32 mb-4"
        />

        <div className="w-full max-w-md bg-white dark:bg-pandaBlack shadow-lg rounded-xl p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center underline">Log In</h2>

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
                    placeholder="UserName"
                    className="input"
                    required
                  />
                  
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  required
                />
                
                
              </>
            ) : (
              <>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Licensee Name"
                    className="input"
                    required
                  />
                  
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  required
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="  w-1/3 py-2   bg-pandaBlue text-white dark:text-pandaBlack rounded-md hover:opacity-90 transition"
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;