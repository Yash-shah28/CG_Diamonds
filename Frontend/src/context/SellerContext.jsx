/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const SellerContext = createContext();

const SellerContextProvider = ({children}) => {
    const [seller, setSeller] = useState({
        email: '',
        fullname: {
            firstname: '',
            lastname: ''
        },
        pnumber: '',
        isAuthenticated: false
    });
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;

    // Check for existing token on mount and verify it
    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASEURL}/sellers/verify-token`, 
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Cache-Control': 'no-cache'
                        }
                    }
                );

                if (response.status === 200) {
                    setSeller({
                        ...response.data.seller,
                        isAuthenticated: true
                    });
                    setRetryCount(0); // Reset retry count on success
                }
            } catch (error) {
                console.error('Token verification error:', error);
                
                if (error.response?.status === 401 && retryCount < MAX_RETRIES) {
                    // Retry verification
                    setRetryCount(prev => prev + 1);
                    return;
                }

                // Clear authentication if max retries reached or other error
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

        verifyAuth();
    }, [retryCount]); // Add retryCount as dependency

    // Add axios interceptor with retry logic
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                    // Add cache control to prevent caching
                    config.headers['Cache-Control'] = 'no-cache';
                }
                return config;
            },
            error => Promise.reject(error)
        );

        // Add response interceptor to handle token expiration
        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            async (error) => {
                if (error.response?.status === 401 && retryCount < MAX_RETRIES) {
                    setRetryCount(prev => prev + 1);
                    return axios.request(error.config);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [retryCount]);

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

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASEURL}/sellers/logout`);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setSeller({
                email: '',
                fullname: { firstname: '', lastname: '' },
                pnumber: '',
                isAuthenticated: false
            });
        }
    };

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

    const updateSellerProfile = async (profileData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication required');

            const response = await axios.put(
                `${import.meta.env.VITE_BASEURL}/sellers/profile`,
                profileData,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.data.success) {
                setSeller(response.data.seller);
                return response.data;
            }
            throw new Error('Failed to update profile');
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error updating profile');
        }
    };

    const updateSellerPassword = async (passwordData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication required');

            const response = await axios.put(
                `${import.meta.env.VITE_BASEURL}/sellers/password`,
                passwordData,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.data.success) {
                return response.data;
            }
            throw new Error('Failed to update password');
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error updating password');
        }
    };

    const showSellerProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication required');

            const response = await axios.get(
                `${import.meta.env.VITE_BASEURL}/sellers/profile`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Cache-Control': 'no-cache'
                    }
                }
            );
            console.log(response.data.seller)

            if (response.data.success) {
                setSeller(prevSeller => ({
                    ...prevSeller,
                    ...response.data.seller,
                    isAuthenticated: true
                }));
                return response.data.seller;
            }
            throw new Error('Failed to fetch profile');
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw new Error(error.response?.data?.message || 'Error fetching profile');
        }
    };

    return (
        <SellerContext.Provider value={{
            seller,
            setSeller,
            login,
            logout,
            signup,
            loading,
            updateSellerProfile,
            updateSellerPassword,
            showSellerProfile // Add the new function to the context
        }}>
            {children}
        </SellerContext.Provider>
    );
};

export default SellerContextProvider