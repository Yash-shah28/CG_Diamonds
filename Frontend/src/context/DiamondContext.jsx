/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import axios from 'axios';

export const DiamondContext = createContext();

const DiamondContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [diamonds, setDiamonds] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const uploadDiamonds = async (file) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BASEURL}/sellers/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                return {
                    success: true,
                    message: response.data.message,
                    count: response.data.count
                };
            }
            return {
                success: false,
                message: 'Upload failed'
            };
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Please login again to continue');
            }
            throw new Error(error.response?.data?.message || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const fetchDiamonds = async (page = 1, limit = 20) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await axios.get(
                `${import.meta.env.VITE_BASEURL}/sellers/list`, // Updated endpoint
                {
                    params: { page, limit },
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            if (response.data.success) {
                setDiamonds(response.data.diamonds);
                setTotalPages(response.data.totalPages);
                setCurrentPage(page);
            } else {
                throw new Error('Failed to fetch diamonds');
            }
        } catch (error) {
            console.error('Error fetching diamonds:', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch diamonds');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async (filters) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await axios.get(
                `${import.meta.env.VITE_BASEURL}/sellers/diamonds/filter`,
                {
                    params: {
                        shapes: filters.shapes,
                        clarity: filters.clarity,
                        color: filters.color,
                        minPrice: filters.priceRange[0],
                        maxPrice: filters.priceRange[1],
                        sortBy: filters.sortBy
                    },
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            if (response.data.success) {
                setDiamonds(response.data.diamonds);
                setTotalPages(response.data.totalPages);
                return {
                    success: true,
                    message: 'Filters applied successfully'
                };
            }
            throw new Error('Failed to apply filters');
        } catch (error) {
            console.error('Error applying filters:', error);
            throw new Error(error.response?.data?.message || 'Failed to apply filters');
        } finally {
            setLoading(false);
        }
    };

    const fetchDiamondById = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await axios.get(
                `${import.meta.env.VITE_BASEURL}/sellers/diamonds/${id}`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            if (response.data.success) {
                return response.data.diamond;
            }
            throw new Error('Failed to fetch diamond details');
        } catch (error) {
            console.error('Error fetching diamond:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <DiamondContext.Provider value={{
            uploadDiamonds,
            loading,
            diamonds,
            totalPages,
            currentPage,
            fetchDiamonds,
            setCurrentPage,
            applyFilters, // Add the new function to the context
            fetchDiamondById
        }}>
            {children}
        </DiamondContext.Provider>
    );
};

export default DiamondContextProvider;