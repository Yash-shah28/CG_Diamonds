/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { 
    Box, 
    TextField, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Chip,
    OutlinedInput,
    Slider
} from '@mui/material';

const shapes = ['Round', 'Princess', 'Cushion', 'Oval', 'Emerald', 'Pear', 'Marquise', 'Radiant', 'Heart'];
const clarityGrades = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
const colorGrades = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

export default function SearchFilters({ filters, setFilters }) {
    const handleShapeChange = (event) => {
        setFilters(prev => ({
            ...prev,
            shapes: event.target.value
        }));
    };

    const handlePriceChange = (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            priceRange: newValue
        }));
    };

    return (
        <Box className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    placeholder="Search diamonds..."
                />

                {/* Shape Filter */}
                <FormControl fullWidth>
                    <InputLabel>Shape</InputLabel>
                    <Select
                        multiple
                        value={filters.shapes}
                        onChange={handleShapeChange}
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
                        value={filters.clarity}
                        onChange={(e) => setFilters(prev => ({ ...prev, clarity: e.target.value }))}
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
                        value={filters.color}
                        onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
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
            </div>

            {/* Price Range Slider */}
            <Box sx={{ mt: 3 }}>
                <p className="text-sm text-gray-600 mb-2">Price Range ($)</p>
                <Slider
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    step={1000}
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${filters.priceRange[0].toLocaleString()}</span>
                    <span>${filters.priceRange[1].toLocaleString()}</span>
                </div>
            </Box>
        </Box>
    );
}