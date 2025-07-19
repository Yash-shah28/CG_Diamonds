import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { CartContext } from '../../context/CartContext';
import { wishlistContext } from '../../context/WhishlistContext';

export default function WishlistPage() {
    const { addToCart } = useContext(CartContext);
    const { wishlist, getWishlist,removeFromWishlist } = useContext(wishlistContext)

    const fetchWishlist = async () => {
        try {
            await getWishlist();
        } catch (err) {
            console.error('Failed to fetch wishlist:', err);
        }
    };

    const deleteFromWishlist = async (diamondId) => {
        try {
            await removeFromWishlist(diamondId)
        } catch (error) {
            console.error('Failed to remove  wishlist:', error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Wishlist</h1>

                {wishlist.isLoading ? (
                    <div className="text-gray-500">Loading wishlist...</div>
                ) : wishlist.length === 0 ? (
                    <div className="text-gray-500 text-center">
                        Your wishlist is empty.
                        <Link to="/user/diamond" className="text-blue-600 ml-1 hover:underline">Browse Diamonds</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.diamonds.map(diamond => (
                            <div key={diamond._id} className="bg-white p-4 rounded shadow-md space-y-2 text-sm">
                                <video
                                    src={diamond.videos?.[0] || "/sample.mp4"}
                                    className="w-full h-48 object-cover rounded"
                                    autoPlay
                                    muted
                                    loop
                                />
                                <Link to={`/user/diamond/${diamond._id}`} className="text-lg font-semibold text-black hover:text-blue-600">
                                    {diamond.shape} {diamond.weight}ct {diamond.color} {diamond.clarity}
                                </Link>
                                <div className="text-gray-600 text-xs">
                                    GIA: {diamond.reportNumber} | Stock ID: {diamond.stockNumber}
                                </div>
                                <div className="text-green-700 font-medium text-sm">
                                    ${Number(diamond.cashPrice).toLocaleString()} &nbsp;
                                    <span className="text-xs text-gray-500">({Number(diamond.cashPrice / diamond.weight).toFixed(2)}/ct)</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <button
                                        onClick={() => deleteFromWishlist(diamond._id)}
                                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                        title="Remove"
                                    >
                                        <i className="ri-delete-bin-line text-lg"></i> Remove
                                    </button>
                                    <button
                                        onClick={() => addToCart(diamond._id, 1)}
                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                    >
                                        <i className="ri-shopping-cart-line"></i> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
