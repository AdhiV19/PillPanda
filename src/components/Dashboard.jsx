import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard({ darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return (
      <div className="p-6 text-red-500">
        User not found. Please log in again.
      </div>
    );
  }

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

      <div className="min-h-screen flex bg-gray-100 dark:bg-pandaBlack ">
        {/* Sidebar */}

        <aside
          className={`fixed top-0 left-0 h-screen bg-white dark:bg-pandaBlack shadow-lg dark:shadow-zinc-950 transition-all duration-300 z-50
    ${sidebarOpen ? "w-64" : "w-24"}`}
        >
          {/* Logo and Toggle Button */}
          <div className="flex items-start  justify-between p-4">
            <img
              src={
                darkMode
                  ? "/logo_pillpanda_transp_bk.png"
                  : "/logo_pillpanda_transp.png"
              }
              alt="Logo"
              className={`transition-all duration-150 ${
                sidebarOpen ? "w-48" : "w-16"
              }`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto top-1 text-sm text-pandaBlue focus:outline-none"
              title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              {sidebarOpen ? (
                <img
                  src={darkMode ? "/sidebarW.svg" : "/sidebarB.svg"}
                  alt="Logo"
                />
              ) : (
                <img src={" "} />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="mt-8 space-y-5 text-sm font-semibold">
            <SidebarItem icon="💊" label="Medicine Cart" open={sidebarOpen} />
            <SidebarItem icon="📦" label="Order History" open={sidebarOpen} />
            <SidebarItem
              icon="📝"
              label="Add Prescription"
              open={sidebarOpen}
            />
            <SidebarItem icon="🔔" label="Notifications" open={sidebarOpen} />
            <SidebarItem icon="🧑" label="Profile" open={sidebarOpen} />
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`transition-all duration-300 flex-1 p-10 ${
            sidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-pandaRed dark:text-pandaBlue">
                Welcome,
              </span>{" "}
              <span className="text-pandaBlack dark:text-pandaWhite">
                {user.firstName + " " + user.lastName} 👋
              </span>
            </h1>
          </div>

          <div className="text-pandaBlack dark:text-pandaWhite">hiiiiii</div>
          <div className="mt-10 text-pandaBlack dark:text-pandaWhite">
            <p>Select an option from the sidebar to get started.</p>
          </div>
        </main>
      </div>
    </>
  );

  function SidebarItem({ icon, label, open }) {
    return (
      <div
        className="flex items-center gap-3 px-6 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-pandaWhite/10"
        title={!open ? label : ""}
      >
        <span className="text-lg">{icon}</span>
        {open && (
          <span className="text-pandaBlack dark:text-pandaWhite">{label}</span>
        )}
      </div>
    );
  }
}

export default Dashboard;
