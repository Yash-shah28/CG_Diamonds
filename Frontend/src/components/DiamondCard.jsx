import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SellerContext } from "../context/SellerContext";
import { DiamondContext } from "../context/DiamondContext";

export default function DiamondCard({ diamond }) {
    const { sellerAuth } = useContext(SellerContext);
    const { changeAvailability} = useContext(DiamondContext);
    const pricePerCarat = diamond.cashPrice / diamond.weight;

    const [showModal, setShowModal] = useState(false);
    const [availability, setAvailability] = useState("");

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            await changeAvailability(availability, diamond._id);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full max-w-sm mx-auto">
            {/* Image */}
            <div className="relative pt-[100%]">
                <video
                    src={diamond.videos?.[0] || "/sample.mp4"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay muted loop playsInline
                />
            </div>

            {/* Info */}
            <div className="p-4 space-y-3 text-sm text-gray-700">
                {/* Stock Info */}
                <div className="flex justify-between text-xs text-gray-500">
                    <div>GIA: {diamond.reportNumber}</div>
                    <div>Stock ID: {diamond.stockNumber}</div>
                </div>

                {/* Title */}
                <Link to={`/seller/stocks/${diamond._id}`}>
                    <div className="font-semibold text-base text-black hover:text-blue-600">
                        {diamond.shape} {diamond.weight}ct {diamond.color} {diamond.clarity} {diamond.cutGrade} {diamond.polish} {diamond.symmetry} {diamond.fluorescenceIntensity}
                    </div>
                </Link>

                {/* Measurements */}
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                    <div><b>T:</b> {diamond.tablePercent}%</div>
                    <div><b>D:</b> {diamond.depthPercent}%</div>
                    <div><b>R:</b> {(diamond.measurements && ratio(diamond.measurements)) || "-"}</div>
                    <div><b>M:</b> {diamond.measurements}</div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 text-xs text-green-700 font-medium">
                    {diamond.shade === "None" && <span>No shade</span>}
                    {diamond.eyeClean === "No" && <span>100% Eye clean</span>}
                    <span>Excellent luster</span>
                </div>

                {/* Owner */}
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">CG</div>
                    <div className="text-sm font-semibold text-black">{diamond.owner.company}</div>
                    <div className="ml-auto text-xs text-gray-500">Location: {diamond.country}</div>
                </div>

                {/* Price */}
                <div className="mt-2">
                    <div className="text-xs text-gray-500">Diamond price</div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700 font-semibold">-{(diamond.cashPriceDiscountPercent || 0)}%</span>
                        <span className="text-lg font-bold text-black">${Number(diamond.cashPrice || 0).toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-600">Price/Ct: ${Number(pricePerCarat || 0).toFixed(2)}/ct</div>
                </div>

                {/* Change Availability Button */}
                {sellerAuth.seller.firstname === diamond.owner.firstname && (
                    <>
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-800 transition"
                        >
                            Change availability
                        </button>

                        {/* Modal */}
                        {showModal && (
                            <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50 ">
                                <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
                                    <h2 className="text-lg font-semibold mb-4">Change availability</h2>

                                    <form onSubmit={handleConfirm}>
                                        <div className="space-y-2 text-sm">
                                            {["Out on Memo", "On hold for another customer", "Sold out"].map((option) => (
                                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="availability"
                                                        value={option}
                                                        checked={availability === option}
                                                        onChange={(e) => setAvailability(e.target.value)}
                                                        className="accent-purple-600"
                                                    />
                                                    <span>{option}</span>
                                                </label>
                                            ))}
                                        </div>

                                        <div className="flex justify-end space-x-2 mt-6">
                                            <button
                                                onClick={() => setShowModal(false)}
                                                className="text-sm px-4 py-2 rounded hover:underline"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!availability}
                                                className={`text-sm px-4 py-2 rounded ${availability ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

// Ratio helper
const ratio = (measurementStr) => {
    const parts = measurementStr?.split(" x ").map(parseFloat);
    if (parts.length === 3 && parts[1] !== 0) {
        return (parts[0] / parts[1]).toFixed(2);
    }
    return "-";
};
