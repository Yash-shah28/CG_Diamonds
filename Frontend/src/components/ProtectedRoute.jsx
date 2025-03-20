/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { SellerContext } from '../context/SellerContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const { seller, loading } = useContext(SellerContext);
    
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    
    if (!seller.isAuthenticated) {
        return <Navigate to="/seller-login" />;
    }
    
    return children;
};

export default ProtectedRoute;
