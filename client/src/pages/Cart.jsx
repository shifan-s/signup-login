import React, { useState } from 'react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';
const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 15, quantity: 1 },
  ]);

  const increaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBookNow = () => {
  toast.success("Sucessfully Booked",{duration:800});
    // Navigate to checkout or payment page here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4">
      <Helmet>
                      <title>My Cart</title>
                    </Helmet>
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="min-w-[20px] text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-3 text-red-500 hover:text-red-700 text-lg"
                    title="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right text-xl font-semibold text-gray-800 mt-4 border-t pt-4">
              Total: ₹{total}
            </div>

            {/* Book Now Button */}
            <div className="text-center mt-6">
              <button
                onClick={handleBookNow}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 shadow-md"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
