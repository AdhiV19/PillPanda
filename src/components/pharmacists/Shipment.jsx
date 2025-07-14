import React, { useEffect, useState } from "react";

function Shipment() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pillpanda-pack")) || [];
    setShipments(data);
  }, []);

  const groupByPincode = shipments.reduce((acc, item) => {
    const pin = item.pincode;
    if (!acc[pin]) acc[pin] = { state: item.state, items: [] };
    acc[pin].items.push(item);
    return acc;
  }, {});

  const handleGroupCheckout = (pincode) => {
    const groupItems = groupByPincode[pincode].items;

    if (groupItems.length === 0) return;

    if (confirm(`Proceed to deliver shipment to ${groupByPincode[pincode].state}, ${pincode}?`)) {
      const existingDelivery = JSON.parse(localStorage.getItem("pillpanda-delivery")) || [];
      const withTimestamp = groupItems.map(item => ({
        ...item,
        deliveredAt: new Date().toISOString()
      }));

      // 1. Update delivery store
      const updatedDelivery = [...existingDelivery, ...withTimestamp];
      localStorage.setItem("pillpanda-delivery", JSON.stringify(updatedDelivery));

      // 2. Remove shipped items from pillpanda-ship
      const remaining = shipments.filter(item => item.pincode !== pincode);
      setShipments(remaining);
      localStorage.setItem("pillpanda-ship", JSON.stringify(remaining));

      localStorage.removeItem("pillpanda-pack");

    }
  };

  return (
    <div className="p-6 w-1/3">
      {Object.entries(groupByPincode).map(([pincode, { state, items }]) => {
            const address = items[0]?.address || "";
          const totalMRP = items.reduce((sum, item) => {
              const mrp = parseFloat(item.MRP) || 0;
              return sum + mrp * item.quantity;
            }, 0);
            
            return (
                <div key={pincode} className="mb-10 border p-4 rounded shadow dark:bg-zinc-800 bg-white">
            <h2 className="text-xl font-bold text-pandaRed dark:text-pandaBlue mb-4">
              To: {state}, {pincode}
            </h2>
            <ul className="space-y-2">
              {items.map((item, idx) => (
                  <li
                  key={`${item.Sno}-${idx}`}
                  className="flex justify-between items-center bg-gray-100 dark:bg-zinc-700 px-4 py-3 rounded"
                  >

                  <span className="font-medium text-pandaBlack dark:text-white">{item.Name}</span>
                  <span className="text-md font-semibold  text-pandaBlack dark:text-white">Qty: {item.quantity}</span>
                  </li>
              ))}
            </ul>
            <div className="mt-2 w-1/2 text-lg text-gray-600 dark:text-gray-300 italic">
          <div>Delivery Address:</div>
           {address}
        </div>

            <div className="mt-4 text-pandaBlack dark:text-white font-semibold">
              Cash to be Collected: ₹{totalMRP.toFixed(2)}
            </div>

            <button
              onClick={() => handleGroupCheckout(pincode)}
              className="mt-4 bg-pandaRed text-white px-5 py-2 rounded hover:bg-red-600 transition"
            >
              Set to delivery
            </button>
          </div>
        );
      })}

      {shipments.length === 0 && (
        <p className="text-start text-pandaBlue dark:text-pandaRed text-xl mt-20">📦 No shipments pending</p>
      )}
    </div>
  );
}

export default Shipment;
