/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState } from "react";
import axios from "axios";

export const SellerContext = createContext()

const API_URL = import.meta.env.VITE_Seller_API_URL

axios.defaults.withCredentials = true;

const  sellerContextProvider = ({ children }) => {
    const [sellerAuth, setSellerAuth] = useState({
        seller: null,
        isAuthenticated: false,
        error: '',
        isLoading: false,
        ischeckingAuth: true,
        message: ''
    });

    const signup = async(firstname, lastname, email, pnumber, password, company, address) => {
        setSellerAuth(prev => ({...prev, isLoading: true, error: null}));
        try {
            const response = await axios.post(`${API_URL}/register`,{firstname, lastname, email, pnumber, password, company, address} );
            setSellerAuth(prev => ({...prev, seller: response.data.seller, isAuthenticated:true, isLoading:false}))
        } catch (error) {
            setSellerAuth(prev => ({...prev,error: error.response.data.message || "Error Signing up", isLoading: false}))
            throw error;
        }

    }

    const login = async(email,password) =>{
        setSellerAuth(prev => ({...prev, isLoading: true, error: null}));
        try {
            const response = await axios.post(`${API_URL}/login`,{email,password});
            setSellerAuth(prev => ({...prev,seller: response.data.seller, isAuthenticated: true, isLoading: false}));
        } catch (error) {
            setSellerAuth(prev => ({...prev,error: error.response.data.message || "Error Logging up", isLoading: false}))
            throw error;
        }
    }

    const logout = async() =>{
        setSellerAuth(prev =>({...prev, isloading: true,error: null}));
        try {
            await axios.post(`${API_URL}/logout`);
            setSellerAuth(prev => ({...prev, seller: null, isAuthenticated: false, error: null, isloading: false}))
        } catch (error) {
            setSellerAuth(prev => ({...prev,error: "Error Logging out", isLoading: false}))
            throw error;
        }
    }

    const verifyEmail = async(code) => {
        setSellerAuth(prev => ({...prev, isLoading:true, error: null}))

        try{
            const response = await axios.post(`${API_URL}/verify-email`,{code});
            setSellerAuth(prev => ({...prev, seller: response.data.seller, isAuthenticated:true, isLoading:false}))
            return response.data
        } catch (error){
            setSellerAuth(prev => ({...prev, error: error.response.data.message|| "Error verifying Email", isLoading: false}))
            throw error
        }

    }

    const checkSellerAuth = async() => {
        setSellerAuth(prev =>({...prev, ischeckingAuth:true, error:null}))
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            setSellerAuth(prev => ({...prev, seller: response.data.seller, isAuthenticated:true,ischeckingAuth: false}))
        } catch (error){
            setSellerAuth(prev => ({...prev, error: null,ischeckingAuth: false, isAuthenticated: false}))
            throw error
        }
    }

    const forgotPassowrd = async(email) => {
        setSellerAuth(prev =>({...prev, isLoading:true, error:null, message: null}))
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, {email});
            setSellerAuth(prev => ({...prev,message: response.data.message , isLoading: false }))
        } catch (error){
            setSellerAuth(prev => ({...prev, error: error.response.data.message || "Error Sending reset password email",isLoading: false, }))
            throw error
        }
    }

    const resetPassword = async(token,password) => {
        setSellerAuth(prev =>({...prev, isLoading:true, error:null}))   
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, {password});
            setSellerAuth(prev => ({...prev,message: response.data.message , isLoading: false }))
        } catch (error){
            setSellerAuth(prev => ({...prev, error: error.response.data.message || "Error reseting Password",isLoading: false, }))
            throw error
        }
    }

    const updateSeller = async(firstname, lastname, email, pnumber, company, address) => {
        setSellerAuth(prev => ({...prev, isLoading: true, error:null}))
        try {
            const response = await axios.put(`${API_URL}/update`,{firstname, lastname, email, pnumber, company, address})
            setSellerAuth(prev => ({...prev, seller: response.data.updatedSeller, isLoading: false}))
        } catch (error) {
            setSellerAuth(prev => ({...prev, error: error.response.data.message || "Error Updating the profile",isLoading: false }))
            throw error
        }
    }
    const updateSellerPassword = async(password,newpassword) => {
        setSellerAuth(prev => ({...prev, isLoading: true, error:null}))
        try {
            const response = await axios.patch(`${API_URL}/change-password`,{password,newpassword})
            setSellerAuth(prev => ({...prev, message: response.data.message , isLoading: false}))
        } catch (error) {
            setSellerAuth(prev => ({...prev, error: error.response.data.message || "Error Updating the Password",isLoading: false }))
            throw error
        }
    }


    


  return (
        <SellerContext.Provider value={{ sellerAuth, setSellerAuth, signup, login, logout, verifyEmail, forgotPassowrd, resetPassword, checkSellerAuth, updateSeller, updateSellerPassword}}>
            {children}
        </SellerContext.Provider>
    )
}

export default sellerContextProvider;
