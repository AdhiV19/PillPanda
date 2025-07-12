

import React, { useEffect, useState } from "react";
import axios from "axios";

function PharmacyProfile({ pharmacy, darkMode, onBack, sidebarOpen, cart, setCart }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [matchedMedicines, setMatchedMedicines] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [typingTimeout, setTypingTimeout] = useState(null);

    const imagePath = darkMode
        ? `/pharma/Pharmacist${pharmacy.imageIndex}Bk.svg`
        : `/pharma/Pharmacist${pharmacy.imageIndex}.svg`;


    const fetchSuggestions = async (query) => {
        try {
            const [res1, res2] = await Promise.all([
                axios.get("https://68724b0c76a5723aacd4392a.mockapi.io/pillpanda/medicines"),
                axios.get("https://68724b0c76a5723aacd4392a.mockapi.io/pillpanda/medicines1")
            ]);


            const all = [...res1.data, ...res2.data];
            const matches = all.filter(
                (med) =>
                    med.Name &&
                    med.Name.toLowerCase().includes(query.toLowerCase())
            );


            setMatchedMedicines(matches);
        } catch (err) {
            console.error("Error fetching suggestions:", err);
        }
    };

    useEffect(() => {
        if (!searchQuery) {
            setMatchedMedicines([]);
            return;
        }

        if (typingTimeout) clearTimeout(typingTimeout);

        const timeout = setTimeout(() => {
            fetchSuggestions(searchQuery);
        }, 300); // 300ms debounce

        setTypingTimeout(timeout);
    }, [searchQuery]);

    const handleAddToCart = (medicine) => {
  const qty = quantities[medicine.Sno] || 1;

  const existingCart = JSON.parse(localStorage.getItem("pillpanda-cart")) || [];

  const exists = existingCart.find((item) => item.Sno === medicine.Sno);
  let updatedCart;

  if (exists) {
    updatedCart = existingCart.map((item) =>
      item.Sno === medicine.Sno ? { ...item, quantity: item.quantity + qty } : item
    );
  } else {
    updatedCart = [...existingCart, { ...medicine, quantity: qty }];
  }

  localStorage.setItem("pillpanda-cart", JSON.stringify(updatedCart));
  setCart(updatedCart);

  setQuantities((prev) => ({ ...prev, [medicine.Sno]: 1 }));
  setSearchQuery("");
  setMatchedMedicines([]);
};
useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("pillpanda-cart")) || [];
  const qtyMap = {};
  storedCart.forEach(item => {
    qtyMap[item.Sno] = item.quantity;
  });
  setQuantities(qtyMap);
  setCart(storedCart);
}, []);


    return (
        <main
            className={`transition-all duration-300 flex-1 p-10 ${sidebarOpen ? "ml-64" : "ml-20"
                }`}
        >
            <button onClick={onBack} className="mb-4 text-pandaBlue underline">
                ← Back
            </button>

            <div className="bg-white dark:bg-pandaBlack rounded-lg w-11/12 p-6">
                <h1 className="text-5xl font-bold text-pandaBlack dark:text-pandaWhite">
                    {pharmacy.pharmacyname}
                </h1>
                <p className="text-sm text-slateGray mt-2">{pharmacy.street}</p>

                <img
                    src={imagePath}
                    className="w-1/4 h-64 object-contain rounded mb-6"
                    alt="Pharmacy"
                />

                {/* 🔍 Search Input */}
                <input
                    type="text"
                    placeholder="Search medicine..."
                    className="w-full px-4 py-2 mb-4 border border-lightGray rounded focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />

                {matchedMedicines.length > 0 && (
                    <div className="backdrop-blur-sm bg-white/70 dark:bg-pandaBlack/70 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-4 space-y-3 max-h-60 overflow-y-auto">
                        {matchedMedicines.map((med) => (
                            <div
                                key={med.Sno}
                                className="flex justify-between items-center px-4 py-3 rounded-lg bg-white dark:bg-zinc-800 hover:shadow transition duration-200"
                            >
                                {/* Medicine Name */}
                                <div className="text-base font-medium text-pandaBlack dark:text-white truncate w-1/2">
                                    {med.Name}
                                </div>

                                {/* Quantity & Add Button */}
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="number"
                                        min={1}
                                        value={quantities[med.Sno] || 1}
                                        onChange={(e) => {
                                            const newQty = parseInt(e.target.value);
                                            setQuantities({
                                                ...quantities,
                                                [med.Sno]: newQty,
                                            });
                                            const currentCart = JSON.parse(localStorage.getItem("pillpanda-cart")) || [];
                                            const updatedCart = currentCart.map(item =>
                                                item.Sno === med.Sno ? { ...item, quantity: newQty } : item
                                            );
                                            localStorage.setItem("pillpanda-cart", JSON.stringify(updatedCart));

                                        }}
                                        className="w-16 text-center px-2 py-1 bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pandaBlue text-sm"
                                    />

                                    <button
                                        onClick={() => handleAddToCart(med)}
                                        className="bg-pandaBlue hover:bg-pandaBlue/80 text-white px-4 py-1.5 rounded-md text-sm transition font-semibold"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </main>
    );
}

export default PharmacyProfile;
