/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import UserDiamondCard from '../../components/UserDiamondCard';
import DiamondHeader from '../../components/DiamondHeader';
import Navbar from '../../components/Navbar';
import { DiamondContext } from '../../context/DiamondContext';
import DiamondList from '../../components/DiamondList';
import Footer from '../../components/Footer';

function UserDiamond() {
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [shape, setShape] = useState("");
    const [color, setColor] = useState("");


    const { product, getDiamonds } = useContext(DiamondContext);

    useEffect(() => {
        getDiamonds(page);
    }, [page]);

    const handleSearch = async (e) => {
        e.preventDefault();
        await getDiamonds(page, search, sort);
    };

    const handleFilters = async (e) => {
        e.preventDefault();
        await getDiamonds(page, search, sort, { shape, color });
    };

    const handleSortChange = async (e) => {
        const value = e.target.value;
        setSort(value);
        await getDiamonds(page, search, value);
    };

    return (
        <>
            <Navbar />
            <div className="pt-24 px-4 max-w-7xl mx-auto mb-4"> 
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Browse Diamonds</h1>
                <div className="flex flex-wrap items-center gap-2 justify-between mb-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-white border rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <span>🔧</span> Filters
                    </button>

                    <form onSubmit={handleSearch} className="flex border rounded overflow-hidden">
                        <input
                            type="text"
                            placeholder="Certificate No or Stock"
                            className="px-4 py-2 text-sm outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 px-4 text-white hover:bg-blue-700">
                            <SearchIcon />
                        </button>
                    </form>

                    <select
                        onChange={handleSortChange}
                        className="border px-4 py-2 text-sm rounded bg-white"
                    >
                        <option value="">Sort by</option>
                        <option value="cashPriceDiscountPercent-desc">Discount: high to low</option>
                        <option value="cashPriceDiscountPercent-asc">Discount: low to high</option>
                        <option disabled>────────────</option>
                        <option value="cashPrice-asc">Price: low to high</option>
                        <option value="cashPrice-desc">Price: high to low</option>
                        <option disabled>────────────</option>
                        <option value="weight-desc">Carat: high to low</option>
                        <option value="weight-asc">Carat: low to high</option>
                    </select>
                </div>

                {showFilters && (
                    <div className="p-4 mb-6 bg-gray-50 border rounded-lg">
                        <form onSubmit={handleFilters} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select
                                className="border p-2 rounded"
                                onChange={(e) => setShape(e.target.value)}
                            >
                                <option value="">Shape</option>
                                <option value="Round">Round</option>
                                <option value="Princess">Princess</option>
                                <option value="Emerald">Emerald</option>
                            </select>

                            <select
                                onChange={(e) => setColor(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="">Color</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </select>

                            <select className="border p-2 rounded">
                                <option value="">Clarity</option>
                                <option value="IF">IF</option>
                                <option value="VVS1">VVS1</option>
                                <option value="VS1">VS1</option>
                            </select>

                            <button
                                type="submit"
                                className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>
                        </form>
                    </div>
                )}


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {product.diamond?.map((diamond) => (
                        <UserDiamondCard key={diamond._id} diamond={diamond} />
                    ))}
                </div>


                {/* Pagination */}
                <div className="mt-8 flex justify-center items-center space-x-4 text-sm">
                    <button
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="font-medium text-gray-700">
                        Page {page} of {product.totalPages}
                    </span>
                    <button
                        onClick={() => setPage((prev) => Math.min(product.totalPages, prev + 1))}
                        disabled={page === product.totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default UserDiamond;
