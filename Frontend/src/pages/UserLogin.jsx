/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Navbar from "../components/client/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext.jsx'
import { Snackbar, Alert } from '@mui/material';

export default function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const success = await login({ email, password });
            if (success) {
                setSnackbar({
                    open: true,
                    message: 'Login successful!',
                    severity: 'success'
                });
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.message || "Login failed. Please try again.",
                severity: 'error'
            });
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-125">
                    <h2 className="text-2xl font-semibold text-center mb-4">Welcome back to CG Diamond</h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {error}
                        </div>
                    )}
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <Link to='/signup' className="text-center block text-[#111] text-lg">
                            Don&apos;t have an account? Signup
                        </Link>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}