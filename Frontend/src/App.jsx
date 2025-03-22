/* eslint-disable no-unused-vars */
import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import SellerLogin from './pages/SellerLogin';
import SellerSignup from './pages/SellerSignup';
import SellerDashboard from './pages/SellerDashboard';
import UploadStocks from './pages/UploadStocks';
import ProtectedRoute from './components/ProtectedRoute';
import SellerDiamondStocks from './pages/SellerDiamondStocks';
import DiamondDetails from './pages/DiamondDetails';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/seller-login" element={<SellerLogin/>}/>
        <Route path="/seller-signup" element={<SellerSignup/>}/>
        <Route path="/seller-dashboard" element={ 
          <ProtectedRoute>
            <SellerDashboard/> 
          </ProtectedRoute>
        }/>
        <Route path="/seller-upload" element={
          <ProtectedRoute>
            <UploadStocks/>  
          </ProtectedRoute>
        }/>
        <Route path="/seller-stocks" element={
          <ProtectedRoute>
            <SellerDiamondStocks/>
          </ProtectedRoute>  
        }/>
        <Route path="/diamond/:id" element={
        <ProtectedRoute>
          <DiamondDetails />
        </ProtectedRoute>
      } />
      </Routes>
    </>
  )
}

export default App
