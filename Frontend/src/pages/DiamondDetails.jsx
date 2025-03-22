/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Grid, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../components/admin/SellerLayout';
import { DiamondContext } from '../context/DiamondContext';

export default function DiamondDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [diamond, setDiamond] = useState(null);
    const [loading, setLoading] = useState(true);
    const { fetchDiamondById } = useContext(DiamondContext);

    useEffect(() => {
        const loadDiamond = async () => {
            try {
                const data = await fetchDiamondById(id);
                console.log(data)
                setDiamond(data);
            } catch (error) {
                console.error('Error loading diamond:', error);
            } finally {
                setLoading(false);
            }
        };
        loadDiamond();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    if (!diamond) {
        return (
            <Layout>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h5">Diamond not found</Typography>
                    <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Go Back</Button>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ p: 3 }}>
                {/* Add Back Button */}
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ 
                        mb: 3,
                        color: '#1A237E',
                        '&:hover': {
                            bgcolor: 'rgba(26, 35, 126, 0.04)'
                        }
                    }}
                >
                    Back to Diamonds
                </Button>

                <Grid container spacing={4}>
                    {/* Image Section */}
                    <Grid item xs={12} md={5}>
                        <img
                            src={diamond.image || "https://public.readdy.ai/ai/img_res/4fbdfe186912bdc9de8630c939be7484.jpg"}
                            alt={`${diamond.Shape} Diamond`}
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                    </Grid>

                    {/* Details Section */}
                    <Grid item xs={12} md={7}>
                        {/* Title & Price */}
                        <Typography variant="h4" gutterBottom>
                            {`${diamond.Shape} ${diamond.Weight} Carat ${diamond.Color} ${diamond.Cut_Grade} ${diamond.Polish} ${diamond.Symmetry}`}
                        </Typography>
                        <Typography variant="h5" color="primary" gutterBottom>
                            ${Number(diamond.Price).toLocaleString()}
                        </Typography>
                        <Divider sx={{ my: 3 }} />

                        {/* Basic Details */}
                        <Typography variant="h6" gutterBottom>Basic Details</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <DetailItem label="Shape" value={diamond.Shape} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Clarity" value={diamond.Clarity} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Carat" value={diamond.Weight} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Color" value={diamond.Color} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Cut" value={diamond.Cut_Grade} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Polish" value={diamond.Polish} />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {/* Measurements */}
                        <Typography variant="h6" gutterBottom>Measurements</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <DetailItem label="Length" value={diamond.Length} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Width" value={diamond.Width} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Depth" value={diamond.Depth} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Table" value={`${diamond.Table}%`} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Depth %" value={`${diamond.Depth_Percentage}%`} />
                            </Grid>
                            <Grid item xs={4}>
                                <DetailItem label="Ratio" value={diamond.Ratio} />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<ShoppingCartIcon />}
                                sx={{ bgcolor: '#1A237E' }}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FavoriteIcon />}
                                sx={{ color: '#1A237E', borderColor: '#1A237E' }}
                            >
                                Add to Watchlist
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<CheckCircleIcon />}
                                sx={{ bgcolor: '#1A237E' }}
                            >
                                Confirm Stone
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

const DetailItem = ({ label, value }) => (
    <Box>
        <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
        <Typography variant="body1">{value}</Typography>
    </Box>
);