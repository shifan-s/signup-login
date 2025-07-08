import React, { useEffect, useState } from 'react';

// Mock user order data
const mockOrders = [
  {
    id: 'ORD123',
    date: '2025-06-25',
    total: '$150.00',
    status: 'Shipped',
    items: [
      { name: 'Wireless Headphones', qty: 1 },
      { name: 'USB-C Charger', qty: 2 },
    ],
  },
  {
    id: 'ORD124',
    date: '2025-06-20',
    total: '$89.99',
    status: 'Delivered',
    items: [
      { name: 'Smart Watch', qty: 1 },
    ],
  },
];

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Your Orders</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">You have no orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <ul className="space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      • {item.name} (x{item.qty})
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right font-medium text-gray-800">
                  Total: {order.total}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
