/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Box,
    OutlinedInput,
    Chip
} from '@mui/material';
import { DiamondContext } from '../../context/DiamondContext';

// Define constants for filter options
const shapes = ['Round', 'Princess', 'Cushion', 'Oval', 'Emerald', 'Pear', 'Marquise', 'Radiant', 'Heart'];
const clarityGrades = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
const colorGrades = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

export default function FilterModal({ open, onClose, filters, setFilters }) {
    const { applyFilters } = useContext(DiamondContext);
    const [tempFilters, setTempFilters] = useState(filters); // Add temporary filters state

    // Reset temporary filters when modal opens
    useEffect(() => {
        setTempFilters(filters);
    }, [filters, open]);

    const handleApplyFilters = async () => {
        try {
            await applyFilters(tempFilters);
            setFilters(tempFilters); // Update main filters only on apply
            onClose();
        } catch (error) {
            console.error('Error applying filters:', error);
            // Add error handling here (e.g., show an error message)
        }
    };

    const handleReset = () => {
        const resetFilters = {
            search: '',
            shapes: [],
            clarity: [],
            color: [],
            priceRange: [0, 100000],
            sortBy: 'latest'
        };
        setTempFilters(resetFilters);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '8px',
                }
            }}
        >
            <DialogTitle sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                Diamond Filters
            </DialogTitle>
            <DialogContent dividers>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    {/* Shape Filter */}
                    <FormControl fullWidth>
                        <InputLabel>Shape</InputLabel>
                        <Select
                            multiple
                            value={tempFilters.shapes}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, shapes: e.target.value }))}
                            input={<OutlinedInput label="Shape" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {shapes.map((shape) => (
                                <MenuItem key={shape} value={shape}>
                                    {shape}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Clarity Filter */}
                    <FormControl fullWidth>
                        <InputLabel>Clarity</InputLabel>
                        <Select
                            multiple
                            value={tempFilters.clarity}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, clarity: e.target.value }))}
                            input={<OutlinedInput label="Clarity" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {clarityGrades.map((clarity) => (
                                <MenuItem key={clarity} value={clarity}>
                                    {clarity}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Color Filter */}
                    <FormControl fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select
                            multiple
                            value={tempFilters.color}
                            onChange={(e) => setTempFilters(prev => ({ ...prev, color: e.target.value }))}
                            input={<OutlinedInput label="Color" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {colorGrades.map((color) => (
                                <MenuItem key={color} value={color}>
                                    {color}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Price Range */}
                    <Box sx={{ width: '100%', gridColumn: 'span 2' }}>
                        <p className="text-sm text-gray-600 mb-2">Price Range ($)</p>
                        <Slider
                            value={tempFilters.priceRange}
                            onChange={(e, newValue) => setTempFilters(prev => ({ ...prev, priceRange: newValue }))}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100000}
                            step={1000}
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>${tempFilters.priceRange[0].toLocaleString()}</span>
                            <span>${tempFilters.priceRange[1].toLocaleString()}</span>
                        </div>
                    </Box>
                </div>
            </DialogContent>
            <DialogActions sx={{ 
                padding: '16px 24px',
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                gap: '8px'
            }}>
                <Button 
                    onClick={handleReset}
                    variant="outlined"
                    color="error"
                >
                    Reset
                </Button>
                <Button 
                    onClick={onClose}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleApplyFilters}
                    variant="contained"
                    sx={{
                        bgcolor: '#1A237E',
                        '&:hover': {
                            bgcolor: '#1A237E/90'
                        }
                    }}
                >
                    Apply Filters
                </Button>
            </DialogActions>
        </Dialog>
    );
}