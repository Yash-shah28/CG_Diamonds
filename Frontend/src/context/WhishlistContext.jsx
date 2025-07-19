/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { createContext, useState } from "react";


export const CartContext = createContext();

const API_URL = import.meta.env.VITE_Wishlist_API_URL

axios.defaults.withCredentials = true

export const wishlistContext = createContext();

const wishlistContextProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState({
        diamonds: [],
        isLoading: false,
        error: null,
        message: ''
    });

    const addWishlist = async (diamondId, quantity) => {
        setWishlist(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.post(`${API_URL}/add`, { diamondId, quantity });
            setWishlist(prev => ({ ...prev, isLoading: false, message: response.data.message }));
        } catch (error) {
            setWishlist(prev => ({ ...prev, error: error.response.data.message || "Error Adding to Wishlist", isLoading: false }));
            throw error;
        }
    }
    const getWishlist = async () => {
        setWishlist(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.get(`${API_URL}/`);
            setWishlist(prev => ({ ...prev, diamonds: response.data.wishlist.diamonds, isLoading: false }));
        } catch (error) {
            setWishlist(prev => ({ ...prev, error: error.response.data.message || "Error Fetching Cart", isLoading: false }));
            throw error;
        }
    }
    const removeFromWishlist = async (id) => {
            setWishlist(prev => ({ ...prev, isLoading: true, error: null }));
            try {
                const response = await axios.delete(`${API_URL}/remove/${id}`);
                setWishlist(prev => ({ ...prev, isLoading: false, message: response.data.message }));
            } catch (error) {
                setWishlist(prev => ({ ...prev, error: error.response.data.message || "Error Removing from Cart", isLoading: false }));
                throw error;
            }
        }
    return (
        <wishlistContext.Provider value={{ wishlist, setWishlist, addWishlist, getWishlist, removeFromWishlist }}>
            {children}
        </wishlistContext.Provider>
    );
}

export default wishlistContextProvider