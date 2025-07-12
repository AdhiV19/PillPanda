// Dashpg.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Dashpg({ darkMode, sidebarOpen }) {
  const location = useLocation();
  const user = location.state?.user;
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pharmacists")) || [];

    const enriched = data.map((pharmacy) => ({
      ...pharmacy,
      imageIndex: Math.floor(Math.random() * 5) + 1,
    }));

    setPharmacies(enriched);
  }, []);

  if (!user) {
    return (
      <div className="p-6 text-red-500">
        User not found. Please log in again.
      </div>
    );
  }

  return (
    <>
      <main
        className={`transition-all duration-300 flex-1 p-10 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <h1 className="text-3xl font-bold text-pandaBlack dark:text-pandaWhite">
          <span className="text-pandaRed dark:text-pandaBlue">Welcome,</span>{" "}
          <span className="text-pandaBlack dark:text-pandaWhite">
            {user.firstName + " " + user.lastName} 👋
          </span>
        </h1>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-pandaBlack dark:text-pandaWhite">
          Registered Pharmacies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy, idx) => {
            const imagePath = darkMode
              ? `/pharma/Pharmacist${pharmacy.imageIndex}Bk.svg`
              : `/pharma/Pharmacist${pharmacy.imageIndex}.svg`;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-pandaBlack shadow-lg rounded-lg p-4 border border-pandaGreen"
              >
                <img
                  src={imagePath}
                  alt="Pharmacy"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-pandaRed dark:text-pandaGreen">
                  {pharmacy.pharmacyname}
                </h3>
                <p className="text-sm text-slateGray mt-2">{pharmacy.street}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Dashpg;
