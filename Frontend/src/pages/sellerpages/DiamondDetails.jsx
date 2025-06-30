/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Copy, Download } from "lucide-react";

import Layout from '../../components/SellerLayout';
import { DiamondContext } from '../../context/DiamondContext';

export default function DiamondDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { product, getDiamondById } = useContext(DiamondContext);

    useEffect(() => {
        const loadDiamond = async () => {
            try {
                await getDiamondById(id);
            } catch (error) {
                console.error('Error loading diamond:', error);
            }
        };
        loadDiamond();
    }, []);

    if (product.isLoading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    if (!product.diamond) {
        return (
            <Layout>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h5">Diamond not found</Typography>
                    <Button onClick={() => navigate('/seller/stocks')} sx={{ mt: 2 }}>Go Back</Button>
                </Box>
            </Layout>
        );
    }

    const rapNetPricePerCarat = product.diamond.rapNetPrice / product.diamond.weight

    return (
        <Layout>
            <div className="p-6 md:p-10 bg-white rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section - Video or Image */}
                    <div>
                        <div className="relative w-full pt-[100%] bg-gray-100 rounded-xl overflow-hidden">
                            {product.diamond.videos?.[0] ? (
                                <video
                                    src={product.diamond.videos[0]}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={product.diamond.images?.[0] || "/cg.jpg"}
                                    alt="Diamond"
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Action Buttons */}
                        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                            <button className="border px-2 py-1 rounded text-sm flex items-center gap-1">
                                <Copy size={14} /> Copy image link
                            </button>
                            <button className="border px-2 py-1 rounded text-sm flex items-center gap-1">
                                <Download size={14} /> Download image
                            </button>
                            <button className="border px-2 py-1 rounded text-sm flex items-center gap-1">
                                <Copy size={14} /> Copy video link
                            </button>
                            <button className="border px-2 py-1 rounded text-sm flex items-center gap-1">
                                <Download size={14} /> Download video
                            </button>
                        </div> */}

                        <button className="w-full bg-black text-white mt-4 py-2 rounded hover:bg-opacity-90">
                            Change availability
                        </button>
                    </div>

                    {/* Right Section - Details */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {product.diamond.shape} {product.diamond.weight}ct {product.diamond.color} {product.diamond.clarity} {product.diamond.cutGrade} {product.diamond.polish} {product.diamond.symmetry} {product.diamond.fluorescenceIntensity || "None"}
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Natural</span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Available</span>
                        </div>

                        <div className="flex gap-2 justify-between">
                            <div className="text-gray-600 text-sm">Lab {product.diamond.lab}: {product.diamond.reportNumber}</div>
                            <div className="text-gray-600 text-sm">Stock ID: {product.diamond.stockNumber}</div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center text-sm font-bold">CG</div>
                            <div>
                                <div className="font-semibold">Chintamani Gems_ND</div>
                                <div className="text-sm text-gray-500">{product.diamond.country}</div>
                            </div>
                        </div>

                        <div className="flex gap-2 text-sm mt-3 text-green-600">
                            {product.diamond.shade === "None" && <span>No shade</span>}
                            <span>•</span>
                            <span>Excellent luster</span>
                            {product.diamond.eyeClean == "No" && <span>•</span> && <span>100% Eye clean</span>}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mt-6">
                            <Detail label="Shape" value={product.diamond.shape} />
                            <Detail label="Cut" value={product.diamond.cutGrade} />
                            <Detail label="Polish" value={product.diamond.polish} />
                            <Detail label="Table" value={`${product.diamond.tablePercent}%`} />
                            <Detail label="Depth" value={`${product.diamond.depthPercent}%`} />
                            <Detail label="Crown angle" value={`${product.diamond.crownAngle || "-"}°`} />
                            <Detail label="Crown height" value={`${product.diamond.crownHeight || "-"}%`} />
                            <Detail label="Culet" value={product.diamond.culetSize || "NON"} />
                            <Detail label="Pavilion angle" value={`${product.diamond.pavilionAngle || "-"}°`} />
                            <Detail label="Pavilion depth" value={`${product.diamond.pavilionDepth || "-"}%`} />
                            <Detail label="Measurements" value={product.diamond.measurements} />
                            <Detail label="Girdle" value={`${product.diamond.girdleThin || "-"} - ${product.diamond.girdleThick || "-"}`} />
                            <Detail label="Carat" value={`${product.diamond.weight} ct`} />
                            <Detail label="Colour" value={product.diamond.color} />
                            <Detail label="Symmetry" value={product.diamond.symmetry} />
                            <Detail label="Fluorescence" value={product.diamond.fluorescenceIntensity || "None"} />
                            <Detail label="Ratio" value={product.diamond.ratio || "1.00"} />
                        </div>

                        <div className="mt-6">
                            <p className="text-sm text-gray-600">Diamond price</p>
                            <p className="text-3xl font-bold text-black">
                                ${product.diamond.rapNetPrice?.toFixed(2) || "162.00"}
                                <span className="text-purple-600 text-sm font-semibold ml-2">({product.diamond.rapNetDiscountPercent}% off)</span>
                            </p>
                            <p className="text-sm text-gray-600 mt-1">Price/Ct: ${rapNetPricePerCarat?.toFixed(2)}/ct</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

const Detail = ({ label, value }) => (
    <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="font-medium text-black">{value}</p>
    </div>
)

