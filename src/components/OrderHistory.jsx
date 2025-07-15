import React, { useEffect, useState } from "react";

function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem("pillpanda-orders")) || [];
        const history = JSON.parse(localStorage.getItem("pillpanda-history")) || [];

        // Identify new orders not already in history (based on unique combo like Sno + orderedAt)
        const newEntries = orders.filter(order => {
            return !history.some(hist =>
                hist.Sno === order.Sno && hist.orderedAt === order.orderedAt
            );
        });

        const updatedHistory = [...history, ...newEntries];
        localStorage.setItem("pillpanda-history", JSON.stringify(updatedHistory));
        setOrders(updatedHistory); // display from complete history
    }, []);


    const formatDate = (iso) => {
        const d = new Date(iso);
        if (isNaN(d)) return "Unknown Date";
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        return {
            date: `${day}-${month}-${year}`,
            time: `${hours}:${minutes}`
        };
    };

    const groupedByDate = orders
        .slice() // clone to avoid mutating original
        .sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt)) // 🔁 latest first
        .reduce((acc, item) => {
            const { date, time } = formatDate(item.orderedAt);
            if (!acc[date]) acc[date] = [];
            acc[date].push({ ...item, time });
            return acc;
        }, {});


    return (
        <div className="p-6 w-1/3">
            {Object.entries(groupedByDate).map(([date, items]) => (
                <div key={date} className="mb-8">

                    <h2 className="text-3xl font-bold text-pandaBlue dark:text-pandaRed mb-6 underline">Order History</h2>
                    <h2 className="text-xl font-bold text-pandaRed dark:text-pandaBlue mb-4">Date: {date}</h2>
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <li
                                key={`${item.Sno}-${index}`}
                                className="bg-white dark:bg-zinc-800 px-4 py-3 rounded shadow flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium text-pandaBlack dark:text-pandaBlue">{item.Name}</p>
                                    <p className="text-sm text-gray-500">From: {item.pharmacyname}</p>
                                </div>
                                <span className="text-sm text-gray-400">Qty: {item.quantity}
                                    <p className="text-xs text-gray-500"> {item.time}</p>
                                </span>


                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default OrderHistory;
