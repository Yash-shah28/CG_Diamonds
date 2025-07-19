/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';

export default function CartPage() {
    const { getCart, cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const location = useLocation();


    useEffect(() => {
        if (location.pathname === '/user/cart') {
            getCart();
        }
    }, [location.pathname]);

    const calculateTotal = () => {
        return cart.items.reduce((acc, item) => acc + item.diamond.cashPrice * item.quantity, 0);
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

                {cart.items.length === 0 ? (
                    <div className="text-center text-gray-500">
                        Your cart is empty.
                        <Link to="/user/diamond" className="text-blue-600 ml-1 hover:underline">Browse Diamonds</Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded border">
                                <thead className="bg-gray-100 text-left text-sm text-gray-700">
                                    <tr>
                                        <th className="py-3 px-4">Product</th>
                                        <th className="py-3 px-4">Price</th>
                                        <th className="py-3 px-4">Quantity</th>
                                        <th className="py-3 px-4">Total</th>
                                        <th className="py-3 px-4 text-center">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item) => (
                                        <tr key={item.diamond._id} className="border-t text-sm">
                                            <td className="py-4 px-4 flex items-center gap-3">
                                                <video
                                                    src={item.diamond.videos?.[0] || "/sample.mp4"}
                                                    className="w-12 h-12 object-cover rounded border"
                                                    autoPlay
                                                    muted
                                                    loop

                                                />
                                                <div>
                                                    <Link to={`/user/diamond/${item._id}`} className="font-semibold text-gray-800 hover:text-blue-600">
                                                        {item.diamond.shape} {item.diamond.weight}ct {item.diamond.color} {item.diamond.clarity}
                                                    </Link>
                                                    <div className="text-xs text-gray-500">Stock ID: {item.diamond.stockNumber}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">${item.diamond.cashPrice?.toFixed(2)}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={async () => {
                                                            updateQuantity(item.diamond._id, Math.max(1, item.quantity - 1));
                                                        }}
                                                        className="px-2 py-1 border rounded hover:bg-gray-100"
                                                    >
                                                        <i className="ri-subtract-line text-gray-700 text-sm"></i>
                                                    </button>
                                                    <span className="px-3">{item.quantity}</span>
                                                    <button
                                                        onClick={async () => {
                                                            updateQuantity(item.diamond._id, Math.max(1, item.quantity + 1));
                                                        }}
                                                        className="px-2 py-1 border rounded hover:bg-gray-100"
                                                    >
                                                        <i className="ri-add-line text-gray-700 text-sm"></i>
                                                    </button>
                                                </div>
                                            </td>

                                            <td className="py-4 px-4">${(item.diamond.cashPrice * item.quantity).toFixed(2)}</td>
                                            <td className="py-4 px-4 text-center">
                                                <button
                                                    onClick={async () => {
                                                        removeFromCart(item.diamond._id)
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                    title="Remove"
                                                >
                                                    <i className="ri-delete-bin-line text-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mt-6">
                            <div className="w-full max-w-sm bg-gray-100 p-4 rounded">
                                <div className="flex justify-between font-medium text-lg mb-2">
                                    <span>Subtotal</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="text-right mt-4">
                                    <button onClick={async () => {
                                        try {
                                            await axios.post("http://localhost:5000/api/orders/place", {}, { withCredentials: true });
                                            alert("Order placed successfully!");
                                            window.location.href = "/user/orders";
                                        } catch (error) {
                                            alert("Failed to place order");
                                            console.error(error);
                                        }
                                    }}
                                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                        Confirm Stone
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
