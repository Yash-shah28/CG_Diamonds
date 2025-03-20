/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Navbar from "../components/client/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { SellerContext } from '../context/SellerContext'
import { Snackbar, Alert } from '@mui/material';
import Slide from '@mui/material/Slide';


export default function SellerLogin(){
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    function SlideTransition(props) {
        return <Slide {...props} direction="right" />;
      }

    const { login } = useContext(SellerContext);
    const navigate = useNavigate()

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        setError("");
        setLoading(true);

        try {
            const success = await login({ email, password });
            if (success) {
                setSnackbarMessage('Login successful! Redirecting...');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/seller-dashboard');
                }, 1000);
            }
        } catch (err) {
            setError(err.message);
            setSnackbarMessage(err.message);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };

    return(
        <div className="bg-white min-h-screen">
            <Navbar/>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-125">
                <h2 className="text-2xl font-semibold text-center mb-4">Seller Login</h2>
                <p className="text-gray-600 text-center mb-8 text-lg">
                        Access your seller dashboard
                    </p>
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
                <Link to='/seller-signup' className="text-center block text-[#111] text-lg">Don&apos;t have an account? Signup</Link>
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
    )
}