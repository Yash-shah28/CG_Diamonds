/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { createContext, useState } from "react";


export const UserContext = createContext();

const API_URL = "http://localhost:5000/api/user"

axios.defaults.withCredentials = true

const  userContextProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState({
        user: null,
        isAuthenticated: false,
        error: '',
        isLoading: false,
        ischeckingAuth: true,
        message: ''
    });

    const signup = async(name,email, password) => {
        setUserAuth(prev => ({...prev,isLoading: true, error: null}))
        try {
            const response = await axios.post(`${API_URL}/register`, {name,email,password});
            setUserAuth(prev => ({...prev, user:response.data.user ,isLoading: false, isAuthenticated: true, message: response.data.message }))
        } catch (error) {
            setUserAuth(prev => ({...prev, error: error.response.data.message || "Error Signing up", isLoading: false}))
            throw error;
        }
    }


    const login = async(email, password) => {
        setUserAuth(prev => ({...prev,isLoading: true, error: null}))
        try {
            const response = await axios.post(`${API_URL}/login`, {email,password});
            setUserAuth(prev => ({...prev, user:response.data.user ,isLoading: false, isAuthenticated: true, message: response.data.message }))
        } catch (error) {
            setUserAuth(prev => ({...prev, error: error.response.data.message || "Error Logging up", isLoading: false}))
            throw error;
        }

    }

    const verifyEmail = async(code) => {
        setUserAuth(prev => ({...prev,isLoading: true, error: null}))
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code});
            setUserAuth(prev => ({...prev, user:response.data.user ,isLoading: false, isAuthenticated: true, message: response.data.message }))
        } catch (error) {
            setUserAuth(prev => ({...prev, error: error.response.data.message || "Error Logging up", isLoading: false}))
            throw error;
        }

    }

    const logout = async() =>{
        setUserAuth(prev =>({...prev, isloading: true,error: null}));
        try {
            await axios.post(`${API_URL}/logout`);
            setUserAuth(prev => ({...prev, user: null, isAuthenticated: false, error: null, isloading: false}))
        } catch (error) {
            setUserAuth(prev => ({...prev,error: "Error Logging out", isLoading: false}))
            throw error;
        }
    }

    const checkUserAuth = async() => {
        setUserAuth(prev =>({...prev, ischeckingAuth:true, error:null}))
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            setUserAuth(prev => ({...prev, user: response.data.user, isAuthenticated:true,ischeckingAuth: false}))
        } catch (error){
            setUserAuth(prev => ({...prev, error: null,ischeckingAuth: false, isAuthenticated: false}))
            throw error
        }
    }

    const forgotPassowrd = async(email) => {
        setUserAuth(prev =>({...prev, isLoading:true, error:null, message: null}))
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, {email});
            setUserAuth(prev => ({...prev,message: response.data.message , isLoading: false }))
        } catch (error){
            setUserAuth(prev => ({...prev, error: error.response.data.message || "Error Sending reset password email",isLoading: false, }))
            throw error
        }
    }

    const resetPassword = async(token,password) => {
        setUserAuth(prev =>({...prev, isLoading:true, error:null}))   
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, {password});
            setUserAuth(prev => ({...prev,message: response.data.message , isLoading: false }))
        } catch (error){
            setUserAuth(prev => ({...prev, error: error.response.data.message || "Error reseting Password",isLoading: false, }))
            throw error
        }
    }


    return (
            <UserContext.Provider value={{ userAuth, setUserAuth, login, signup, logout, checkUserAuth, verifyEmail, resetPassword, forgotPassowrd}}>
                {children}
            </UserContext.Provider>
        )

}

export default userContextProvider;