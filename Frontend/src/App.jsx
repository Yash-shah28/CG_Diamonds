/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { SellerContext } from './context/SellerContext'
import { UserContext } from './context/UserContext'


//Components
import LoadingSpinner from './components/LoadingSpinner'

//User pages
import Home from './pages/userpages/Home'
import UserLogin from './pages/userpages/UserLogin'
import UserSignup from './pages/userpages/UserSignup'
import UserEmailVerification from './pages/userpages/UserEmailVerification'
import UserForgotPassword from './pages/userpages/UserForgotPassword'
import UserResetPassword from './pages/userpages/UserResetPassword'


//Seller pages
import SellerLogin from './pages/sellerpages/SellerLogin'
import SellerSignup from './pages/sellerpages/SellerSignup'
import SellerEmailVerification from './pages/sellerpages/SellerEmailVerification'
import Dashboard from './pages/sellerpages/Dashboard'
import SellerForgotPassword from './pages/sellerpages/SellerForgotPassword'
import SellerResetPassword from './pages/sellerpages/SellerResetPassword'
import SellerDiamondStocks from './pages/sellerpages/SellerDiamondStocks'
import UploadStocks from './pages/sellerpages/UploadStocks'
import DiamondDetails from './pages/sellerpages/DiamondDetails'



const SellerProtectedRoute = ({ children }) => {
  const { sellerAuth } = useContext(SellerContext);

  if (!sellerAuth.isAuthenticated) {
    return <Navigate to="/seller/login" replace />
  }


  if (!sellerAuth.seller.isVerified) {
    return <Navigate to="/seller/verify-email" replace />
  }

  return children
}



const RedirectAuthenticatedSeller = ({ children }) => {
  const { sellerAuth } = useContext(SellerContext)

  if (sellerAuth.isAuthenticated && sellerAuth.seller.isVerified) {
    return <Navigate to="/seller/dashboard" replace />
  }
  return children
}


const UserProtectedRoute = ({ children }) => {
  const { userAuth } = useContext(UserContext);

  if (!userAuth.isAuthenticated) {
    return <Navigate to="/user/login" replace />
  }


  if (!userAuth.user.isVerified) {
    return <Navigate to="/user/verify-email" replace />
  }

  return children
}



const RedirectAuthenticatedUser = ({ children }) => {
  const { userAuth } = useContext(UserContext)

  if (userAuth.isAuthenticated && userAuth.user.isVerified) {
    return <Navigate to="/" replace />
  }
  return children
}


function App() {

  const { checkSellerAuth, sellerAuth } = useContext(SellerContext)
  const { checkUserAuth, userAuth } = useContext(UserContext)

  useEffect(() => {
    checkSellerAuth();
    checkUserAuth();
  }, [])

  if (sellerAuth.ischeckingAuth) return <LoadingSpinner />
  if (userAuth.ischeckingAuth) return <LoadingSpinner />

  return (
    <>
      <Routes>
        {/* User Route */}

        <Route path="/" element={<Home />} />
        <Route path='/user/login' element={
          <RedirectAuthenticatedUser>
            <UserLogin />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/user/signup' element={
          <RedirectAuthenticatedUser>
            <UserSignup />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/user/verify-email' element={<UserEmailVerification />} />
        <Route path='/user/forgot-password' element={
          <RedirectAuthenticatedUser>
            <UserForgotPassword />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/user/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <UserResetPassword />
          </RedirectAuthenticatedUser>
        } />


        {/* Seller Routes */}

        <Route path="/seller/login" element={
          <RedirectAuthenticatedSeller>
            <SellerLogin />
          </RedirectAuthenticatedSeller>
        } />

        <Route path="/seller/signup" element={
          <RedirectAuthenticatedSeller>
            <SellerSignup />
          </RedirectAuthenticatedSeller>
        } />

        <Route path="/seller/verify-email" element={<SellerEmailVerification />} />

        <Route path="/seller/forgot-password" element={
          <RedirectAuthenticatedSeller>
            <SellerForgotPassword />
          </RedirectAuthenticatedSeller>
        } />

        <Route path="/seller/reset-password/:token" element={
          <RedirectAuthenticatedSeller>
            <SellerResetPassword />
          </RedirectAuthenticatedSeller>
        } />

        <Route path="/seller/dashboard" element={
          <SellerProtectedRoute>
            <Dashboard />
          </SellerProtectedRoute>
        } />

        <Route path="/seller/stocks" element={
          <SellerProtectedRoute>
            <SellerDiamondStocks />
          </SellerProtectedRoute>
        } />

        <Route path="/seller/stocks/:id" element={
          <SellerProtectedRoute>
            <DiamondDetails />
          </SellerProtectedRoute>
        } />

        <Route path="/seller/upload" element={
          <SellerProtectedRoute>
            <UploadStocks />
          </SellerProtectedRoute>
        } />

      </Routes>
      <Toaster />

    </>
  )
}

export default App
