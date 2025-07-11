import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function DiamondCard({ diamond }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const pricePerCarat = diamond.cashPrice / diamond.weight;

  const { addToCart, cart, updateQuantity, getCart } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);


  const handleAddToWishlist = async () => {
    try {
      await axios.post("http://localhost:5000/api/wishlist/add", { diamondId: diamond._id });
      setIsWishlisted(true);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      await addToCart(diamond._id, 1);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full max-w-sm mx-auto">
      {/* Image */}
      <div className="relative pt-[100%] w-full">
        <video
          src={diamond.videos?.[0] || "/sample.mp4"}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition ${isWishlisted ? "text-red-600" : "text-gray-700"
            }`}
        >
          <i className={`ri-heart-${isWishlisted ? "fill" : "line"}`}></i>
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between text-xs text-gray-500">
          <div>GIA: {diamond.reportNumber}</div>
          <div>Stock ID: {diamond.stockNumber}</div>
        </div>

        <Link to={`/seller/stocks/${diamond._id}`}>
          <div className="font-semibold text-base text-black hover:text-blue-600">
            {diamond.shape} {diamond.weight}ct {diamond.color} {diamond.clarity}{" "}
            {diamond.cutGrade} {diamond.polish} {diamond.symmetry}{" "}
            {diamond.fluorescenceIntensity}
          </div>
        </Link>

        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          <div>
            <b>T:</b> {diamond.tablePercent}%
          </div>
          <div>
            <b>D:</b> {diamond.depthPercent}%
          </div>
          <div>
            <b>R:</b> {(diamond.measurements && ratio(diamond.measurements)) || "-"}
          </div>
          <div>
            <b>M:</b> {diamond.measurements}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-green-700 font-medium">
          {diamond.shade === "None" && <span>No shade</span>}
          {diamond.eyeClean === "No" && <span>100% Eye clean</span>}
          <span>Excellent luster</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
            CG
          </div>
          <div className="text-sm font-semibold text-black">{diamond.owner.company}</div>
          <div className="ml-auto text-xs text-gray-500">Location: {diamond.country}</div>
        </div>

        <div className="mt-2">
          <div className="text-xs text-gray-500">Diamond price</div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-700 font-semibold">
              -{diamond.cashPriceDiscountPercent || 0}%
            </span>
            <span className="text-lg font-bold text-black">
              ${Number(diamond.cashPrice || 0).toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-gray-600">
            Price/Ct: ${Number(pricePerCarat || 0).toFixed(2)}/ct
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link to={`/user/diamond/${diamond._id}`} className="w-full">
            <button className="bg-[#1A237E] text-white w-full rounded text-center mt-2 py-2">
              View Details
            </button>
          </Link>
          {cart?.items?.some((item) => item.diamond._id === diamond._id) ? (
            <div className="px-3 py-2 mt-2 border border-gray-200 rounded text-center text-sm font-semibold text-gray-700">
               {cart.items.find((i) => i.diamond._id === diamond._id)?.quantity || 1}
            </div>
          ) : (

            < button
              className="rounded-lg w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
            >
          <i className="ri-shopping-cart-line"></i>
        </button>
          )}

      </div>
    </div>
    </div >
  );
}

// Helper
const ratio = (measurementStr) => {
  const parts = measurementStr?.split(" x ").map(parseFloat);
  if (parts.length === 3 && parts[1] !== 0) {
    return (parts[0] / parts[1]).toFixed(2);
  }
  return "-";
};
