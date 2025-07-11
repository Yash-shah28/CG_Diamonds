/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useState } from "react";


const API_URL = import.meta.env.VITE_Diamond_API_URL

axios.defaults.withCredentials = true;

export const DiamondContext = createContext();

const DiamondContextProvider = ({ children }) => {

    const [product, setProduct] = useState({
        diamond: null,
        isLoading: false,
        error: '',
        message: '',
        totalPages: '',
        totalDiamonds: ''
    })

    const upload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        setProduct(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.post(`${API_URL}/upload`, formData);
            setProduct(prev => ({ ...prev, isLoading: false, message: response.data.message }))
        } catch (error) {
            setProduct(prev => ({ ...prev, error: error.response.data.message || "Error Uploading the File", isLoading: false }));
            throw error;
        }
    }

    const getDiamonds = async (page, search, sort, filter = {}) => {
        setProduct(prev => ({ ...prev, isLoading: true, error: null }))
        try {
            const params = {
                page,
                search,
                sort,
                ...filter
            };
            const response = await axios.get(`${API_URL}/get`, { params });
            setProduct(prev => ({ ...prev, diamond: response.data.diamonds, totalPages: response.data.totalPages, totalDiamonds: response.data.totalDiamonds, isLoading: false}));
        } catch (error) {
            setProduct(prev => ({ ...prev, error: error.response.data.message || "Error Fectching Diamonds", isLoading: false }));
            throw error;
        }
    }

    const getDiamondById = async (id) => {
        setProduct(prev => ({ ...prev, isLoading: true, error: null }))
        try {
            const response = await axios.post(`${API_URL}/get/${id}`);
            setProduct(prev => ({ ...prev, diamond: response.data.diamond, isLoading: false }))
        } catch (error) {
            setProduct(prev => ({ ...prev, error: error.response.data.message || "Error Fectching Diamonds", isLoading: false }));
            throw error;
        }
    }

    const changeAvailability = async (availability, id) => {
        setProduct(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.patch(`${API_URL}/update-availability`, {availability, id});
            setProduct(prev => ({ ...prev, isLoading: false, message: response.data.message }))
        } catch (error) {
            setProduct(prev => ({ ...prev, error: error.response.data.message || "Error Uploading the File", isLoading: false }));
            throw error;
        }
    }



    return (
        <DiamondContext.Provider value={{ product, setProduct, upload, getDiamonds, getDiamondById, changeAvailability }} >
            {children}
        </DiamondContext.Provider>
    )
}

export default DiamondContextProvider