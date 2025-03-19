/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function SellerLogin(){
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [sellerData,setSellerData]  = useState({})


    const handleSubmit = (e) => {
        e.preventDefault();
        setSellerData({
            email:email,
            password:password
        })
        console.log(sellerData);
        setEmail("");
        setPassword("");
    };

    return(
        <div className="bg-white min-h-screen">
            <Navbar/>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-125">
                <h2 className="text-2xl font-semibold text-center mb-4">Welcome back to CG Diamond</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-medium" htmlFor="email">Your email address</label>
                        <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">Your password</label>
                        <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    {/* <div className="text-right mb-4">
                        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                    </div> */}
                    <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90">Log In
                    </button>
                </form>
                <div className="text-center mt-4">
                <Link to='/seller-signup' className="text-center block text-[#111] text-lg">Don&apos;t have an account? Signup</Link>
                </div>
            </div>
            </div>
        </div>
    )
}