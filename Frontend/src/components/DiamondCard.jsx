import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import { SellerContext } from "../context/SellerContext";

export default function DiamondCard({ diamond }) {
    const { sellerAuth } = useContext(SellerContext);
    const pricePerCarat = diamond.cashPrice / diamond.weight
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full max-w-sm mx-auto">
            {/* Image */}
            <div className="relative pt-[100%] ">
                <video
                    src={diamond.videos?.[0] || "/sample.mp4"} // fallback if no video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

            </div>

            {/* Info */}
            <div className="p-4 space-y-3 text-sm text-gray-700">
                {/* GIA and Stock ID */}
                <div className="flex justify-between text-xs text-gray-500">
                    <div>GIA: {diamond.reportNumber}</div>
                    <div>Stock ID: {diamond.stockNumber}</div>
                </div>

                {/* Title */}
                <Link to={`/seller/stocks/${diamond._id}`}>
                    <div className="font-semibold text-base text-black hover:text-blue-600 transition-colors duration-200">
                        {diamond.shape} {diamond.weight}ct {diamond.color} {diamond.clarity} {diamond.cutGrade} {diamond.polish} {diamond.symmetry} {diamond.fluorescenceIntensity}
                    </div>
                </Link>



                {/* T, D, R, M */}
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                    <div>
                        <span className="font-semibold">T:</span> {diamond.tablePercent}%
                    </div>
                    <div>
                        <span className="font-semibold">D:</span> {diamond.depthPercent}%
                    </div>
                    <div>
                        <span className="font-semibold">R:</span>{" "}
                        {(diamond.measurements && ratio(diamond.measurements)) || "-"}
                    </div>
                    <div>
                        <span className="font-semibold">M:</span> {diamond.measurements}
                    </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 text-xs text-green-700 font-medium">
                    {diamond.shade === "None" && <span>No shade</span>}
                    {diamond.eyeClean == "No" && <span>100% Eye clean</span>}
                    <span>Excellent luster</span>
                </div>

                {/* Owner */}
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                        CG
                    </div>
                    <div className="text-sm font-semibold text-black">{diamond.owner.company}</div>
                    <div className="ml-auto text-xs text-gray-500">Location : {diamond.country}</div>
                </div>

                {/* Price */}
                <div className="mt-2">
                    <div className="text-xs text-gray-500">Diamond price</div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700 font-semibold">
                            -{(diamond.cashPriceDiscountPercent || 0)}%
                        </span>
                        <span className="text-lg font-bold text-black">
                            ${Number(diamond.cashPrice || 0).toLocaleString()}
                        </span>
                    </div>
                    <div className="text-xs text-gray-600">
                        Price/Ct: ${Number(pricePerCarat || 0).toFixed(2)}/ct
                    </div>
                </div>
                {sellerAuth.seller.firstname == diamond.owner.firstname ?
                    <button className="w-full bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-800 transition">
                        Change availability
                    </button>
                    : null
                }

            </div>
        </div>
    );
}

// Helper function for ratio
const ratio = (measurementStr) => {
    const parts = measurementStr?.split(" x ").map(parseFloat);
    if (parts.length === 3 && parts[1] !== 0) {
        return (parts[0] / parts[1]).toFixed(2);
    }
    return "-";
};
