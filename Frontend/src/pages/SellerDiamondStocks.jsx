/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import { DiamondContext } from '../context/DiamondContext';
import { Box, Pagination, CircularProgress, Typography, IconButton, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import Layout from '../components/admin/SellerLayout';
import { SellerContext } from '../context/SellerContext';
import FilterModal from '../components/admin/FilterModal';
import { Link } from 'react-router-dom';

export default function SellerDiamondStocks() {
    const [viewType, setViewType] = useState('grid');
    const [filters, setFilters] = useState({
        search: '',
        shapes: [],
        clarity: [],
        color: [],
        priceRange: [0, 100000],
        sortBy: 'latest'
    });
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const { diamonds, loading, totalPages, currentPage, fetchDiamonds, setCurrentPage } = useContext(DiamondContext);
    const { seller } = useContext(SellerContext);

    useEffect(() => {
        const loadDiamonds = async () => {
            try {
                if (!filterModalOpen) { // Only fetch if modal is closed
                    await fetchDiamonds(currentPage);
                }
            } catch (error) {
                console.error('Error loading diamonds:', error);
            }
        };
        loadDiamonds();
    }, [currentPage, filterModalOpen]);

    // Update the filtered diamonds logic
    const filteredDiamonds = diamonds?.filter(diamond => {
        // If no filters are active, return all diamonds
        const hasActiveFilters = filters.search || 
                               filters.shapes.length > 0 || 
                               filters.clarity.length > 0 || 
                               filters.color.length > 0 || 
                               filters.priceRange[0] > 0 || 
                               filters.priceRange[1] < 100000;

        if (!hasActiveFilters) {
            return true;
        }


        // Apply filters only if they are set
        const matchesSearch = !filters.search || 
            (diamond.stock?.toLowerCase().includes(filters.search.toLowerCase()) || 
             diamond.Report?.toLowerCase().includes(filters.search.toLowerCase()));

        const matchesShape = filters.shapes.length === 0 || 
            filters.shapes.includes(diamond.Shape);

        const matchesClarity = filters.clarity.length === 0 || 
            filters.clarity.includes(diamond.Clarity);

        const matchesColor = filters.color.length === 0 || 
            filters.color.includes(diamond.Color);

        const matchesPrice = !filters.priceRange || 
            (diamond.Price >= filters.priceRange[0] && diamond.Price <= filters.priceRange[1]);

        return matchesSearch && matchesShape && matchesClarity && matchesColor && matchesPrice;
    }) || [];

    console.log(filteredDiamonds)
    console.log(filteredDiamonds.length)


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <Link to={`/diamond/${diamond._id}`}>
            <button className="bg-[#1A237E] text-white w-full py-2 rounded-lg hover:bg-[#1A237E]/90 transition-colors">
                View Details
            </button>
        </Link>
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

    // Add no data state
    if (!loading && (!diamonds || diamonds.length === 0)) {
        return (
            <Layout>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Diamond Stocks
                    </Typography>
                    <div className="text-center py-12">
                        <Typography variant="h6" color="textSecondary">
                            No diamonds found. Start by uploading some diamonds.
                        </Typography>
                    </div>
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
                </div>

                {/* Search Bar and Controls */}
                <div className="flex gap-4 mb-6 items-center">
                    <TextField
                        className="flex-1"
                        placeholder="Search by Certificate No. or Stock No."
                        variant="outlined"
                        size="small"
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={() => setFilterModalOpen(true)}
                    >
                        Filters
                    </Button>
                    <div className="flex gap-2">
                        <IconButton 
                            onClick={() => setViewType('grid')}
                            color={viewType === 'grid' ? 'primary' : 'default'}
                        >
                            <GridViewIcon />
                        </IconButton>
                        <IconButton 
                            onClick={() => setViewType('list')}
                            color={viewType === 'list' ? 'primary' : 'default'}
                        >
                            <ViewListIcon />
                        </IconButton>
                    </div>
                </div>

                {/* Filter Modal */}
                <FilterModal 
                    open={filterModalOpen}
                    onClose={() => setFilterModalOpen(false)}
                    filters={filters}
                    setFilters={setFilters}
                />

                <section className="py-6">
                    <div className="max-w-7xl mx-auto">
                        {filteredDiamonds.length > 0 ? (
                            <div className={viewType === 'grid' 
                                ? "grid grid-cols-1 md:grid-cols-3 gap-8"
                                : "flex flex-col gap-4"
                            }>
                                {filteredDiamonds.map((diamond) => (
                                    <div key={diamond._id}>
                                        {viewType === 'grid' 
                                            ? renderDiamondCard(diamond)
                                            : renderDiamondList(diamond)
                                        }
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Typography variant="h6" align="center" color="textSecondary">
                                No diamonds match your filter criteria
                            </Typography>
                        )}
                        
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