import React, { useContext, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SellerContext } from "../context/SellerContext";
import { Link } from "react-router-dom";

export default function DiamondListRow({ diamond }) {
  const [expanded, setExpanded] = useState(false);
  const {sellerAuth} = useContext(SellerContext)

  const ratio = (measurementStr) => {
    const parts = measurementStr?.split(" x ").map(parseFloat);
    if (parts.length === 3 && parts[1] !== 0) {
      return (parts[0] / parts[1]).toFixed(2);
    }
    return "-";
  };

  return (
    <>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2">
              <button onClick={() => setExpanded(!expanded)}>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </td>
            <td className="p-2">
              <video
                src={diamond.videos?.[0] || "/sample.mp4"}
                className="w-10 h-10 object-cover rounded"
                autoPlay
                muted
                loop
              />
            </td>
            <td className="p-2">
              <span className="text-green-600 text-sm font-medium">Available</span>
            </td>
            <td className="p-2">{diamond.shape}</td>
            <td className="p-2">{diamond.weight}</td>
            <td className="p-2">{diamond.color}</td>
            <td className="p-2">{diamond.clarity}</td>
            <td className="p-2">{diamond.cutGrade}</td>
            <td className="p-2">{diamond.polish}</td>
            <td className="p-2">{diamond.symmetry}</td>
            <td className="p-2">{diamond.fluorescenceIntensity}</td>
            <td className="p-2">{diamond.tablePercent}%</td>
            <td className="p-2">{diamond.depthPercent}%</td>
            <td className="p-2">{ratio(diamond.measurements)}</td>
            <td className="p-2 font-semibold text-purple-600 text-sm">
              -{diamond.cashPriceDiscountPercent || 0}%<br />
              <span className="text-black font-bold text-base">
                ${Number(diamond.cashPrice).toLocaleString()}
              </span>
            </td>
          </tr>
      {/* Expanded Section */}
      {expanded && (
        <tr>
          <td colSpan="15" className="bg-gray-50 p-4 text-sm text-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <h3 className="font-semibold">Information</h3>
                <p>GIA: {diamond.reportNumber}</p>
                <p>Excellent luster</p>
                <p>{diamond.eyeClean === "No" ? "100% Eye Clean" : null}</p>
              </div>
              <div>
                <h3 className="font-semibold">Diamond Details</h3>
                <p>{diamond.shape} {diamond.weight}ct {diamond.color} {diamond.clarity}</p>
                <p>Measurement: {diamond.measurements || "Hidden"}</p>
                <p>Girdle: {diamond.girdle || "STK to THK"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Supplier</h3>
                <p>{diamond.owner?.company || "Other Supplier"}</p>
                <p>Location: {diamond.country || "India"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Price</h3>
                <p className="text-purple-600 font-bold">
                  -{diamond.cashPriceDiscountPercent || 0}%
                </p>
                <p>${Number(diamond.cashPrice).toLocaleString()}</p>
                <p>Price/Ct: ${(diamond.cashPrice / diamond.weight).toFixed(2)}/ct</p>
                <Link to={`/seller/stocks/${diamond._id}`}>
                <button className="mt-2 px-3 py-1 border  w-full rounded-lg mt-2 hover:bg-gray-100 transition">More details</button>
                </Link>
                 {sellerAuth.seller.firstname == diamond.owner.firstname ?
                    <button className="w-full bg-black text-white py-2 px- rounded-lg mt-2 hover:bg-gray-800 transition">
                        Change availability
                    </button>
                    : null
                }
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
