/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext';

export default function UserSignup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup, user } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user.isAuthenticated) {
            navigate('/');
        }
    }, [user.isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.firstname) {
            setError("Email, password and first name are required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);
        try {
            const success = await signup({
                email: formData.email,
                password: formData.password,
                fullname: {
                    firstname: formData.firstname,
                    lastname: formData.lastname
                }
            });
            if (success) {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Registration successful.");
                    navigate('/login');
                    return;
                }
                // If token exists, user is automatically logged in
                navigate('/');
            }
        } catch (err) {
            setError(err.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                    <h2 className="text-2xl font-semibold text-center mb-4">Create your account</h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 font-medium" htmlFor="firstname">
                                First Name*
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                                autoComplete="given-name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 font-medium" htmlFor="lastname">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                                value={formData.lastname}
                                onChange={handleChange}
                                autoComplete="family-name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 font-medium" htmlFor="email">
                                Email address*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                                Password*
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <Link 
                            to="/login" 
                            className="text-center block text-[#111] text-lg hover:underline"
                        >
                            Already have an account? Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}