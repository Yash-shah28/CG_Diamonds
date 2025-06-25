import axios from "axios";
import { createContext, useState } from "react";


const API_URL = "http://localhost:5000/api/diamond";

axios.defaults.withCredentials = true;

export const DiamondContext = createContext();

const DiamondContextProvider = ({children}) => {

    const [product,setProduct] = useState({
        diamond: null,
        isLoading: false,
        error: '',
        message: '',
        totalPages: '',
        totalDiamonds: ''
    })

    const upload = async(file) => {
        const formData = new FormData();
        formData.append('file', file);
        setProduct(prev => ({...prev, isLoading: true, error:null}));
        try {
            const response = await axios.post(`${API_URL}/upload`,formData);
            setProduct(prev => ({...prev, isLoading: false, message: response.data.message}))
        } catch (error) {
            setProduct(prev => ({...prev, error: error.response.data.message || "Error Uploading the File", isLoading: false}));
            throw error;
        }
    }

    const getDiamonds = async(page,search) => {
        setProduct(prev => ({...prev, isLoading: true, error: null}))
        try {
            const response = await axios.post(`${API_URL}/get`,{page, search});
            setProduct(prev => ({...prev, diamond:response.data.diamonds, totalPages: response.data.totalPages, totalDiamonds: response.data.totalDiamonds}));
        } catch (error) {
            setProduct(prev => ({...prev, error: error.response.data.message || "Error Fectching Diamonds", isLoading: false}));
            throw error;
        }
    } 

    const getDiamondById = async(id) => {
        setProduct(prev => ({...prev, isLoading: true, error: null}))
        try{
            const response = await axios.post(`${API_URL}/get/${id}`);
            setProduct(prev => ({...prev, diamond: response.data.diamond, isLoading: false}))
        }catch (error) {
            setProduct(prev => ({...prev, error: error.response.data.message || "Error Fectching Diamonds", isLoading: false}));
            throw error;
        }
    }



    return (
        <DiamondContext.Provider value={{product, setProduct, upload, getDiamonds, getDiamondById}} >
            {children}
        </DiamondContext.Provider>
    )
}

export default DiamondContextProvider