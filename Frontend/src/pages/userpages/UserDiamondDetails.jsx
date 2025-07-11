/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';


import { DiamondContext } from '../../context/DiamondContext';
import Navbar from '../../components/Navbar';

export default function UserDiamondDetails() {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const { product, getDiamondById } = useContext(DiamondContext);
    console.log(id)

    useEffect(() => {
        const loadDiamond = async () => {
            try {
                await getDiamondById(id);
            } catch (error) {
                console.error('Error loading diamond:', error);
            }
        };
        loadDiamond();
    }, [id,]);


    const cashPricePerCarat = product.diamond.cashPrice / product.diamond.weight

    return (
        <>
            <Navbar />
            <div className="h-16" />

            <div className="p-6 md:p-10 bg-white rounded-xl ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section - Video or Image */}
                    <div>
                        <div className="relative w-full pt-[75%] bg-gray-100 rounded-xl overflow-hidden">
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

                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            {/* Add to Cart */}
                            <button
                                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-4 py-2 rounded-md text-sm"
                                aria-label="Add to Cart"
                            >
                                <i className="ri-shopping-cart-2-line"></i>
                                <span>Add to Cart</span>
                            </button>

                            {/* Add to Wishlist */}
                            <button
                                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-blue-600 hover:bg-blue-50 transition-all duration-200 px-4 py-2 rounded-md text-sm"
                                aria-label="Add to Wishlist"
                            >
                                <i className="ri-heart-line"></i>
                                <span>Add to Wishlist</span>
                            </button>
                        </div>




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
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{product.diamond.availability}</span>
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
                                ${product.diamond.cashPrice?.toFixed(2)}
                                <span className="text-purple-600 text-sm font-semibold ml-2">(-{product.diamond.cashPriceDiscountPercent}% off)</span>
                            </p>
                            <p className="text-sm text-gray-600 mt-1">Price/Ct: ${cashPricePerCarat?.toFixed(2)}/ct</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

const Detail = ({ label, value }) => (
    <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="font-medium text-black">{value}</p>
    </div>
)

