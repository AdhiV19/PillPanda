import React from "react";

function Shipment({ cart, setCart, pharmacy }) {
    console.log(cart.length);

    const groupedByPharmacy = cart.reduce((acc, item) => {
        const name = item.pharmacyname || "Unknown Pharmacy";
        if (!acc[name]) acc[name] = [];
        acc[name].push(item);
        return acc;
    }, {});

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Shipment is already empty.");
            return;
        }

        if (confirm("Proceed to checkout? This will clear your cart.")) {
            // 1. Copy cart to orders
            const existingOrders = JSON.parse(localStorage.getItem("pillpanda-delivery")) || [];

            const newOrders = cart.map((item) => ({
                ...item,
                orderedAt: new Date().toISOString() // Attach current date
            }));

            const updatedOrders = [...existingOrders, ...newOrders];
            localStorage.setItem("pillpanda-delivery", JSON.stringify(updatedOrders));

            // 2. Clear the cart
            setCart([]);
            localStorage.removeItem("pillpanda-ship");

            alert("Delivery processed. Cart cleared.");
        }
    };
    const totalMRP = cart.reduce((sum, item) => {
        const mrp = parseFloat(item.MRP) || 0; // Ensure MRP is numeric
        return sum + mrp * item.quantity;
    }, 0);



    return (
        <div className="p-6">
            {Object.entries(groupedByPharmacy).map(([pharmacyName, medicines]) => (
                <div key={pharmacyName} className="mb-6">
                    <h2 className="text-xl font-bold text-pandaRed dark:text-pandaBlue mb-2">
                        {pharmacyName}
                    </h2>
                    <ul className="space-y-2">
                        {medicines.map((med) => (
                            <li
                                key={med.Sno}
                                className="bg-white dark:bg-zinc-800 px-4 py-4 w-1/2 rounded shadow flex justify-between"
                            >
                                <span>{med.Name}</span>
                                <span>Rs. {med.MRP}/-</span>
                                <span className="text-sm text-gray-500">Qty: {med.quantity}</span>
                            </li>
                        ))}
                        <div className="mt-6 text-lg font-semibold text-left text-pandaBlack dark:text-pandaWhite">
                            Total MRP: ₹{totalMRP.toFixed(2)}
                        </div>
                    </ul>
                </div>
            ))}

            <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`mt-6 px-6 py-2 rounded transition 
    ${cart.length === 0
                        ? "text-2xl text-pandaWhite font-bold bg-pandaBlue dark:bg-pandaRed cursor-not-allowed -mt-3 -ml-10 "
                        : "bg-pandaRed hover:bg-red-600 text-white"}`}
            >
                {cart.length === 0 ? "OOPS!...Shipment is empty" : "Set to delivery"}
            </button>
        </div>
    );
}

export default Shipment;
