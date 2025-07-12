import React from "react";

function MedicineCart({ cart, setCart }) {
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is already empty.");
      return;
    }

    if (confirm("Proceed to checkout? This will clear your cart.")) {
      setCart([ ]);
      localStorage.removeItem("pillpanda-cart");
      alert("Checkout complete. Cart cleared.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-pandaBlue">🛒 Medicine Cart</h2>

      {cart.length === 0 ? (
        <p className="text-slateGray">Cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((med, index) => (
            <li
              key={`${med.Name}-${index}`}
              className="flex justify-between items-center bg-white dark:bg-pandaBlack rounded-lg shadow p-3"
            >
              <span className="font-medium text-pandaBlack dark:text-white">
                {med.Name}
              </span>
              <span className="text-sm text-gray-500">Qty: {med.quantity}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleCheckout}
        className="mt-6 bg-pandaRed text-white px-6 py-2 rounded hover:bg-red-600 transition"
      >
        Checkout
      </button>
    </div>
  );
}

export default MedicineCart;
