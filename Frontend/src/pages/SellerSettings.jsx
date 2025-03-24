/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Grid, 
    TextField, 
    Button, 
    Paper, 
    Alert,
    IconButton,
    InputAdornment
} from '@mui/material';
import Layout from '../components/admin/SellerLayout';
import { SellerContext } from '../context/SellerContext';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SellerSettings() {
    const { seller, updateSellerProfile, updateSellerPassword } = useContext(SellerContext);
    const [editing, setEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        firstname: seller?.fullname?.firstname || '',
        lastname: seller?.fullname?.lastname || '',
        email: seller?.email || '',
        pnumber: seller?.pnumber || '',
        company: seller?.company || '',
        address: seller?.address || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (seller) {
            setFormData({
                firstname: seller.fullname?.firstname || '',
                lastname: seller.fullname?.lastname || '',
                email: seller.email || '',
                pnumber: seller.pnumber || '',
                company: seller.company || '',
                address: seller.address || ''
            });
        }
    }, [seller]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileUpdate = async () => {
        try {
            const response = await updateSellerProfile(formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditing(false);
            
            // Update local form data with the response
            if (response.seller) {
                setFormData({
                    firstname: response.seller.fullname.firstname,
                    lastname: response.seller.fullname.lastname,
                    email: response.seller.email,
                    pnumber: response.seller.pnumber,
                    company: response.seller.company,
                    address: response.seller.address
                });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const handlePasswordUpdate = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match!' });
            return;
        }

        try {
            await updateSellerPassword(passwordData);
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    return (
        <Layout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Account Settings
                </Typography>

                {message.text && (
                    <Alert 
                        severity={message.type} 
                        sx={{ mb: 3 }}
                        onClose={() => setMessage({ type: '', text: '' })}
                    >
                        {message.text}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {/* Profile Section */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6">Profile Information</Typography>
                                <IconButton 
                                    onClick={() => setEditing(!editing)}
                                    color={editing ? 'primary' : 'default'}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        disabled={!editing}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        disabled={!editing}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="pnumber"
                                        value={formData.pnumber}
                                        onChange={handleInputChange}
                                        disabled={!editing}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        disabled={!editing}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        multiline
                                        rows={3}
                                        disabled={!editing}
                                    />
                                </Grid>
                            </Grid>

                            {editing && (
                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        onClick={handleProfileUpdate}
                                        sx={{ bgcolor: '#1A237E' }}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* Password Section */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Change Password
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Current Password"
                                        name="currentPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        name="newPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    onClick={handlePasswordUpdate}
                                    sx={{ bgcolor: '#1A237E' }}
                                >
                                    Update Password
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}