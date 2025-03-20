/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import { DiamondContext } from '../context/DiamondContext';
import { Box, Pagination, CircularProgress, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import Layout from '../components/admin/SellerLayout';

export default function SellerDiamondStocks() {
    const [viewType, setViewType] = useState('grid');
    const { diamonds, loading, totalPages, currentPage, fetchDiamonds, setCurrentPage } = useContext(DiamondContext);

    useEffect(() => {
        fetchDiamonds(currentPage);
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewType(newView);
        }
    };

    const renderDiamondCard = (diamond) => (
        <div
            key={diamond._id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="relative w-full aspect-w-4 aspect-h-3">
                <img 
                    src={diamond.image || "https://public.readdy.ai/ai/img_res/4fbdfe186912bdc9de8630c939be7484.jpg"} 
                    alt={`${diamond.Shape} Diamond`} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {diamond.Shape} Diamond
                        </h3>
                        <p className="text-sm text-gray-600">
                            {diamond.Weight} Carat | {diamond.Clarity} | {diamond.Color} Color
                        </p>
                    </div>
                    <span className="text-lg font-bold text-primary">
                        ${Number(diamond.Price).toLocaleString()}
                    </span>
                </div>
                <div className="space-y-2">
                    <button className="bg-[#1A237E] text-white w-full py-2 rounded hover:bg-[#1A237E]/90">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );

    const renderDiamondList = (diamond) => (
        <div
            key={diamond._id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4"
        >
            <div className="flex flex-col md:flex-row gap-4">
                {/* Image column */}
                <div className="w-full md:w-48 h-48 flex-shrink-0">
                    <img 
                        src={diamond.image || "https://public.readdy.ai/ai/img_res/4fbdfe186912bdc9de8630c939be7484.jpg"} 
                        alt={`${diamond.Shape} Diamond`} 
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Details column */}
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {diamond.Shape} Diamond
                            </h3>
                            <p className="text-md text-gray-600 mt-1">
                                {diamond.Weight} Carat | {diamond.Clarity} | {diamond.Color} Color
                            </p>
                        </div>
                        <span className="text-xl font-bold text-[#1A237E]">
                            ${Number(diamond.Price).toLocaleString()}
                        </span>
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Cut Grade</p>
                            <p className="font-medium">{diamond.Cut_Grade}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Polish</p>
                            <p className="font-medium">{diamond.Polish}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Symmetry</p>
                            <p className="font-medium">{diamond.Symmetry}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Lab</p>
                            <p className="font-medium">{diamond.Lab}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button className="bg-[#1A237E] text-white px-6 py-2 rounded-lg hover:bg-[#1A237E]/90 transition-colors">
                            View Details
                        </button>
                        <button className="border border-[#1A237E] text-[#1A237E] px-6 py-2 rounded-lg hover:bg-[#1A237E]/10 transition-colors">
                            Edit Stock
                        </button>
                        <button className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ p: 3 }}>
                <div className="flex justify-between items-center mb-6">
                    <Typography variant="h4" gutterBottom>
                        Diamond Stocks
                    </Typography>
                    <ToggleButtonGroup
                        value={viewType}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="view type"
                    >
                        <ToggleButton value="grid" aria-label="grid view">
                            <GridViewIcon />
                        </ToggleButton>
                        <ToggleButton value="list" aria-label="list view">
                            <ViewListIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <section className="py-6">
                    <div className="max-w-7xl mx-auto">
                        <div className={viewType === 'grid' 
                            ? "grid grid-cols-1 md:grid-cols-3 gap-8"
                            : "flex flex-col gap-4"
                        }>
                            {diamonds.map((diamond) => (
                                viewType === 'grid' 
                                    ? renderDiamondCard(diamond)
                                    : renderDiamondList(diamond)
                            ))}
                        </div>
                        
                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination 
                                    count={totalPages} 
                                    page={currentPage} 
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                />
                            </Box>
                        )}
                    </div>
                </section>
            </Box>
        </Layout>
    );
}