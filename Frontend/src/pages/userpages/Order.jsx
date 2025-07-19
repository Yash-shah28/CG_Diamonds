import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/my-orders", { withCredentials: true });
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded p-4 bg-white shadow-sm">
                <div className="flex justify-between mb-2">
                  <div className="text-sm text-gray-600">Order ID: {order._id}</div>
                  <div className="text-sm text-green-700">Status: {order.status}</div>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="divide-y">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between text-sm text-gray-700">
                      <span>
                        {item.diamond.shape} {item.diamond.weight}ct - {item.diamond.color}, {item.diamond.clarity}
                      </span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right font-semibold text-gray-800">
                  Total: ${order.totalAmount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
