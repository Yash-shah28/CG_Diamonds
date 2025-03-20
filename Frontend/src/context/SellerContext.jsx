/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const SellerContext = createContext();

const SellerContextProvider = ({children}) => {

    let [seller, setSeller] = useState({
        email: '',
        fullname: {
            firstname: '',
            lastname: ''
        },
        pnumber: '',
        isAuthenticated: false
    });

    const [loading, setLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASEURL}/sellers/verify`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 201) {
                setSeller({
                    ...response.data.user,
                    isAuthenticated: true
                });
            }
        } catch (error) {
            localStorage.removeItem('token');
            setSeller({
                email: '',
                fullname: { firstname: '', lastname: '' },
                pnumber: '',
                isAuthenticated: false
            });
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASEURL}/sellers/login`,
                userData
            );
            if (response.status === 201) {
                const { user: userData, token } = response.data;
                setSeller({ ...userData, isAuthenticated: true });
                localStorage.setItem('token', token);
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(error.response.data.errors||error.response?.data?.message || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setSeller({
            email: '',
            fullname: { firstname: '', lastname: '' },
            pnumber: '',
            isAuthenticated: false
        });
    };

    // First, add the signup method to userContext.jsx
// Add this before the return statement

const signup = async (userData) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASEURL}/sellers/register`,
            userData
        );
        if (response.status === 201) {
            const { user: userData } = response.data;
            setSeller({ ...userData });
            return true;
        }
        return false;
    } catch (error) {
        console.log(error.response.data)
        throw new Error(error.response.data.errors|| error.response?.data?.message || 'Signup failed');
    }
};

    return (
        <SellerContext.Provider value={{
            seller,
            setSeller,
            login,
            logout,
            signup,
            loading
        }}>
            {children}
        </SellerContext.Provider>
    );
};

export default SellerContextProvider