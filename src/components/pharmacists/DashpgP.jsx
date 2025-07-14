
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import OrderHistory from "../OrderHistory";
import Addprescription from "../Addprescription";
import Notification from "../Notification";
import Profile from "../Profile";
import MedicineCart from "../MedicineCart";
import Shipment from "./Shipment";
import HistoryP from "./HistoryP";

function DashpgP({ darkMode, sidebarOpen, setSelectedPharmacy, activePage, cart, setCart }) {
  const location = useLocation();
  const user = location.state?.user;
  const [pharmacies, setPharmacies] = useState([]);
  const [orders, setOrders] = useState([]);


  if (!user) {
    return (
      <div className="p-6 text-red-500">
        User not found. Please log in again.
      </div>
    );
  }


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pharmacists")) || [];
    setPharmacies(data);
  }, []);


  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("pillpanda-orders")) || [];
    setOrders(storedOrders);
  }, []);




  



  const handleProceedToPack = (index) => {
  const order = orders[index];

  // Move to pillpanda-pack
  const currentPack = JSON.parse(localStorage.getItem("pillpanda-pack")) || [];
  const updatedPack = [...currentPack, order];
  localStorage.setItem("pillpanda-pack", JSON.stringify(updatedPack));

  // Create/append to pillpanda-ship
  const currentShip = JSON.parse(localStorage.getItem("pillpanda-ship")) || [];
  const updatedShip = [...currentShip, order];
  localStorage.setItem("pillpanda-ship", JSON.stringify(updatedShip));

  // Remove from pillpanda-orders
  const updatedOrders = orders.filter((_, i) => i !== index);
  setOrders(updatedOrders);
  localStorage.setItem("pillpanda-orders", JSON.stringify(updatedOrders));
};



  useEffect(() => {
    const cpy = localStorage.getItem("pillpanda-orderscpy");
    localStorage.setItem("pillpanda-ship", cpy);
  }, [handleProceedToPack]);

  return (
    <>
      <main
        className={`transition-all duration-300 flex-1 p-10 ${sidebarOpen ? "ml-64" : "ml-20"
          }`}
      >
        {activePage === "home" && (
          <div>

            <h1 className="text-3xl font-bold text-pandaBlack dark:text-pandaWhite">
              <span className="text-pandaRed dark:text-pandaBlue">Welcome,</span>{" "}
              <span className="text-pandaBlack dark:text-pandaWhite">
                {user.firstName + " " + user.lastName + " of " + user.pharmacyname} 👋
              </span>
            </h1>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-pandaBlack dark:text-pandaWhite">
              Today's Orders
            </h2>

            {orders.length === 0 ? (
              <p className="text-slateGray">No orders for today.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-zinc-800 p-4 rounded shadow-md flex flex-col justify-between"
                  >
                    <div className="text-left">
                      <h4 className="font-semibold text-pandaBlack dark:text-white">{item.Name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Batch: {item.BatchNo}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">Send To:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.username}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.address}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">Ordered At:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.dateTime}</p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleProceedToPack(idx)}
                        className="bg-pandaBlue text-white px-3 py-2 rounded hover:bg-opacity-90 text-sm"
                      >
                        Proceed to Pack
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            )}

          </div>)}
        {activePage === "ship" && (
          <Shipment cart={cart} setCart={setCart} pharmacy={setSelectedPharmacy} />
        )}
        {activePage === "deliveryhist" && (
          <HistoryP />
        )}
        {activePage === "prescp" && (
          <Addprescription />
        )}
        {activePage === "notif" && (
          <Notification />
        )}
        {activePage === "profile" && (
          <Profile user={user} />
        )}

      </main>
    </>
  );
}

export default DashpgP;
