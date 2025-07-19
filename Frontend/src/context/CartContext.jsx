/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useState } from "react";


export const CartContext = createContext();

const API_URL = import.meta.env.VITE_Cart_API_URL

axios.defaults.withCredentials = true


const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState({
        items: [],
        isLoading: false,
        error: null,
        message: ''
    });

    const addToCart = async (diamondId, quantity) => {
        setCart(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.post(`${API_URL}/add`, { diamondId, quantity });
            setCart(prev => ({ ...prev, items: response.data.items, isLoading: false, message: response.data.message }));
        } catch (error) {
            setCart(prev => ({ ...prev, error: error.response.data.message || "Error Adding to Cart", isLoading: false }));
            throw error;
        }
    }

    const getCart = async () => {
        setCart(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.get(`${API_URL}/`);
            setCart(prev => ({ ...prev, items: response.data.items, isLoading: false }));
        } catch (error) {
            setCart(prev => ({ ...prev, error: error.response.data.message || "Error Fetching Cart", isLoading: false }));
            throw error;
        }
    }

    const removeFromCart = async (id) => {
        setCart(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.delete(`${API_URL}/remove/${id}`);
            console.log(response.data.items)
            setCart(prev => ({ ...prev, items: response.data.items, isLoading: false, message: response.data.message }));
        } catch (error) {
            setCart(prev => ({ ...prev, error: error.response.data.message || "Error Removing from Cart", isLoading: false }));
            throw error;
        }
    }

    const updateQuantity = async (id, quantity) => {
        setCart(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.put(`${API_URL}/update/${id}`, { quantity });
            setCart(prev => ({ ...prev, items: response.data.items, isLoading: false, message: response.data.message }));
            console.log(response.data.items)
        } catch (error) {
            setCart(prev => ({ ...prev, error: error.response.data.message || "Error Updating Quantity", isLoading: false }));
            throw error;
        }
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, getCart,removeFromCart,updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider