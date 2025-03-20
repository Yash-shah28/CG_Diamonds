/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/client/Navbar";
import { SellerContext } from '../context/SellerContext';
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from '@mui/material';

export default function SellerSignup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        pnumber: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const { signup, seller } = useContext(SellerContext);
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (seller.isAuthenticated) {
            navigate('/seller-dashboard');
        }
    }, [seller.isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.firstname || !formData.pnumber) {
            setError("Email, password, phone number and first name are required");
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
        // Phone number validation
        if (!/^\d{10,15}$/.test(formData.pnumber)) {
            setError("Phone number must be between 10 and 15 digits");
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
                },
                pnumber: formData.pnumber
            });
            if (success) {
                setSnackbarMessage('Account created successfully! Redirecting to login...');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/seller-login');
                }, 2000);
            }
        } catch (err) {
            setError(err.message);
            setSnackbarMessage(err.message);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="bg-white min-h-screen">
            <div>
            <Navbar />
            </div>
            <div className=" pt-25 flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                    <h2 className="text-2xl font-semibold text-center mb-4">Create Seller Account</h2>
                    <p className="text-gray-600 text-center mb-6">
                        Join our marketplace and start selling diamonds
                    </p>
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
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 font-medium" htmlFor="pnumber">
                                Phone Number*
                            </label>
                            <input
                                type="number"
                                id="pnumber"
                                name="pnumber"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                                value={formData.pnumber}
                                onChange={handleChange}
                                required
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
                            to="/seller-login" 
                            className="text-center block text-[#111] text-lg hover:underline"
                        >
                            Already have a seller account? Log in
                        </Link>
                    </div>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}