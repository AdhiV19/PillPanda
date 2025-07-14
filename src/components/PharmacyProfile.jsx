

import React, { useEffect, useState } from "react";
import axios from "axios";

function PharmacyProfile({ pharmacy, darkMode, onBack, sidebarOpen, cart, setCart, user }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [matchedMedicines, setMatchedMedicines] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [orders, setOrders] = useState([]);
    
        useEffect(() => {
            const stored = JSON.parse(localStorage.getItem("pillpanda-orders")) || [];
            setOrders(stored);
        }, []);


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

    const handleAddAllToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("pillpanda-cart")) || [];
        let updatedCart = [...existingCart];

        matchedMedicines.forEach((med) => {
            const qty = quantities[med.Sno];

            if (!qty || qty <= 0) return;

            const exists = updatedCart.find((item) => item.Sno === med.Sno);

            const patientData = {
                username: user?.username || "",
                phone: user?.phoneno || "",
                address: `${user?.street || ""}, ${user?.state || ""}, ${user?.pincode || ""}`,
                pharmacyname: pharmacy?.pharmacyname || "",
                pincode: user?.pincode || "",
                state: user?.state || ""
            };

            
                
        

            if (exists) {
                exists.quantity = qty;
                exists.username = patientData.username;
                exists.phoneno = patientData.phoneno;
                exists.address = patientData.address;
            } else {
                updatedCart.push({
                    ...med,
                    quantity: qty,
                    ...patientData
                });
            }
        });

        localStorage.setItem("pillpanda-cart", JSON.stringify(updatedCart));
        setCart(updatedCart);

        setSearchQuery("");
        setMatchedMedicines([]);
    };






    return (
        <main
            className={`transition-all duration-300 flex-1 p-10 ${sidebarOpen ? "ml-64" : "ml-20"
                }`}
        >


            <div className="bg-white dark:bg-pandaBlack rounded w-11/12 p-6">
                <h1 className="text-5xl font-bold text-pandaBlack dark:text-pandaWhite">
                    {pharmacy.pharmacyname}
                </h1>
                <p className="text-sm text-slateGray mt-2">{pharmacy.street}</p>


                <img
                    src={imagePath}
                    className="w-1/4 h-48 object-contain rounded mb-6 mt-4"
                    alt="Pharmacy"
                />


                {/* 🔍 Search Input */}
                <input
                    type="text"
                    placeholder="Search medicine..."
                    className="w-1/3 px-4 py-2 mb-4 border border-lightGray rounded-full focus:outline-none bg-white dark:bg-zinc-700 text-pandaRed dark:text-pandaBlue"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />

                {matchedMedicines.length > 0 && (
                    <div className="w-10/12">
                        {/* Scrollable List */}
                        <div className="backdrop-blur-sm bg-white/70 dark:bg-pandaBlack/70 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-4 space-y-3 max-h-72 overflow-y-auto">
                            {matchedMedicines.map((med) => (
                                <div
                                    key={med.Sno}
                                    className="flex justify-between items-center px-4 py-3 rounded-lg bg-white dark:bg-zinc-800 hover:shadow transition duration-200"
                                >
                                    <div className="text-base font-medium text-pandaBlack dark:text-white truncate w-1/2">
                                        {med.Name}
                                    </div>
                                    <div className="text-base font-medium text-pandaBlack dark:text-white truncate w-1/2">
                                        Rs. {med.MRP}/-
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center border border-gray-300 dark:border-zinc-600 rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-700">
                                            <button
                                                type="button"
                                                className="px-2 text-lg font-semibold text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-600"
                                                onClick={() => {
                                                    const current = quantities[med.Sno] || 0;
                                                    const newQty = Math.max(current - 1, 0);
                                                    setQuantities({ ...quantities, [med.Sno]: newQty });

                                                    // Optional: update cart in storage as they change
                                                    const cart = JSON.parse(localStorage.getItem("pillpanda-cart")) || [];
                                                    const updatedCart = cart.map((item) =>
                                                        item.Sno === med.Sno ? { ...item, quantity: newQty } : item
                                                    );
                                                    localStorage.setItem("pillpanda-cart", JSON.stringify(updatedCart));
                                                }}
                                            >
                                                −
                                            </button>

                                            <input
                                                type="text"
                                                min={0}
                                                value={quantities[med.Sno] || ""}
                                                onChange={(e) => {
                                                    const newQty = parseInt(e.target.value);
                                                    setQuantities({ ...quantities, [med.Sno]: newQty });

                                                    const cart = JSON.parse(localStorage.getItem("pillpanda-cart")) || [];
                                                    const updatedCart = cart.map((item) =>
                                                        item.Sno === med.Sno ? { ...item, quantity: newQty } : item
                                                    );
                                                    localStorage.setItem("pillpanda-cart", JSON.stringify(updatedCart));
                                                }}
                                                className="w-8 text-center bg-transparent text-sm text-black dark:text-white outline-none"
                                            />

                                            <button
                                                type="button"
                                                className="px-2 text-lg font-semibold text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-600"
                                                onClick={() => {
                                                    const current = quantities[med.Sno] || 0;
                                                    const newQty = current + 1;
                                                    setQuantities({ ...quantities, [med.Sno]: newQty });

                                                    const cart = JSON.parse(localStorage.getItem("pillpanda-cart")) || [];
                                                    const updatedCart = cart.map((item) =>
                                                        item.Sno === med.Sno ? { ...item, quantity: newQty } : item
                                                    );
                                                    localStorage.setItem("pillpanda-cart", JSON.stringify(updatedCart));
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Button Outside List */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleAddAllToCart}
                                className="bg-pandaBlue dark:bg-pandaRed hover:bg-pandaBlue/80 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
                            >
                                Add to Cart +
                            </button>
                        </div>
                    </div>
                )}



            </div>
        </main>
    );
}

export default PharmacyProfile;
