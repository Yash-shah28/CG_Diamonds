/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import { DiamondContext } from '../context/DiamondContext';
import { Box, Pagination, CircularProgress, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import Layout from '../components/admin/SellerLayout';
import { SellerContext } from '../context/SellerContext';

export default function SellerDiamondStocks() {
    const [viewType, setViewType] = useState('grid');
    const { diamonds, loading, totalPages, currentPage, fetchDiamonds, setCurrentPage,  } = useContext(DiamondContext);
    const { seller } = useContext(SellerContext)

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
            {/* Image Container */}
            <div className="relative pt-[100%]">
                <img 
                    src={diamond.image || "https://public.readdy.ai/ai/img_res/4fbdfe186912bdc9de8630c939be7484.jpg"} 
                    alt={`${diamond.Shape} Diamond`} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                {/* Price Tag Overlay */}
                
            </div>

            {/* Content Section */}
            <div className="p-4">

                <div className='flex justify-between '>
                    <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {diamond.Shape} Diamond
                        </h3>
                        <p className="text-sm text-gray-600">
                            {diamond.Weight} Carat | {diamond.Clarity} | {diamond.Color}
                        </p>
                    </div>
                    <div className="bg-white px-3 py-1 ">
                        <span className="text-[#1A237E] font-bold">
                            ${Number(diamond.Price).toLocaleString()}
                        </span>
                    </div>
                </div>


                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                        <span className="text-gray-500">Cut Grade:</span>
                        <span className="ml-2 font-medium">{diamond.Cut_Grade}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Polish:</span>
                        <span className="ml-2 font-medium">{diamond.Polish}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Symmetry:</span>
                        <span className="ml-2 font-medium">{diamond.Symmetry}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Lab:</span>
                        <span className="ml-2 font-medium">{diamond.Lab}</span>
                    </div>
                </div>

                <div>
                <div className=' gap-2 mb-4 text-sm'>
                        <span className="text-gray-500">Owned by:</span>
                        <span className="ml-2 font-medium">{diamond.owner.fullname.firstname}{diamond.owner.fullname.lastname}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                    <button className="bg-[#1A237E] text-white w-full py-2 rounded-lg hover:bg-[#1A237E]/90 transition-colors">
                        View Details
                    </button>
                    {seller.email === diamond.owner.email && (
                <button className="border border-[#1A237E] text-[#1A237E] w-full py-2 rounded-lg hover:bg-[#1A237E]/10 transition-colors">
                    Edit Stock
                </button>
            )}
                </div>
            </div>
        </div>
    );

    const renderDiamondList = (diamond) => (
        <div
            key={diamond._id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4"
        >
            <div className="w-24 h-24 flex-shrink-0">
                <img 
                    src={diamond.image || "https://public.readdy.ai/ai/img_res/4fbdfe186912bdc9de8630c939be7484.jpg"} 
                    alt={`${diamond.Shape} Diamond`} 
                    className="w-full h-full object-cover rounded"
                />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">
                    {diamond.Shape} Diamond
                </h3>
                <p className="text-sm text-gray-600">
                    {diamond.Weight} Carat | {diamond.Clarity} | {diamond.Color} Color
                </p>
            </div>
            <div className="flex flex-col items-end gap-2">
                <span className="text-lg font-bold text-primary">
                    ${Number(diamond.Price).toLocaleString()}
                </span>
                <button className="bg-[#1A237E] text-white px-4 py-1 rounded hover:bg-[#1A237E]/90">
                    View Details
                </button>
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