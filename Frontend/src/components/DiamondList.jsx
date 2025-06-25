
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow, Paper } from '@mui/material';

const DiamondList = ({ diamond }) => {
    const details = [
        { label: 'Stock #', value: diamond.stock },
        { label: 'Shape', value: diamond.Shape },
        { label: 'Weight', value: `${diamond.Weight} ct` },
        { label: 'Color', value: diamond.Color },
        { label: 'Clarity', value: diamond.Clarity },
        { label: 'Cut Grade', value: diamond.Cut_Grade },
        { label: 'Polish', value: diamond.Polish },
        { label: 'Symmetry', value: diamond.Symmetry },
        { label: 'Lab', value: diamond.Lab },
        { label: 'Report #', value: diamond.Report },
        { label: 'Price', value: `$${Number(diamond.CashPrice).toLocaleString()}` }
    ];

    return (
        <Paper className="overflow-hidden">
            <div className="flex p-4 gap-4 border-b">
                <div className="w-24 h-24 flex-shrink-0">
                    <img 
                        src={diamond.Image1 || "https://public.readdy.ai/ai/img_res/4fbdfe186912bdc9de8630c939be7484.jpg"} 
                        alt={`${diamond.Shape} Diamond`} 
                        className="w-full h-full object-cover rounded"
                    />
                </div>
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {diamond.Shape} Diamond {diamond.Weight}ct
                    </h3>
                    <p className="text-sm text-gray-600">
                        Stock #: {diamond.stock} | Report #: {diamond.Report}
                    </p>
                </div>
                <div>
                    <Link to={`/diamond/${diamond._id}`}>
                        <button className="bg-[#1A237E] text-white px-4 py-2 rounded hover:bg-[#1A237E]/90">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>

            <Table size="small">
                <TableBody>
                    <TableRow>
                        {details.slice(0, 6).map((detail, index) => (
                            <TableCell key={index} align="center">
                                <div className="text-xs text-gray-500">{detail.label}</div>
                                <div className="font-medium">{detail.value || 'N/A'}</div>
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {details.slice(6).map((detail, index) => (
                            <TableCell key={index} align="center">
                                <div className="text-xs text-gray-500">{detail.label}</div>
                                <div className="font-medium">{detail.value || 'N/A'}</div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default DiamondList;