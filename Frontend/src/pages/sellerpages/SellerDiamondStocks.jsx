import { useEffect, useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';


import DiamondCard from '../../components/DiamondCard'
import DiamondHeader from '../../components/DiamondHeader';
import Layout from '../../components/SellerLayout'
import { DiamondContext } from '../../context/DiamondContext'
import DiamondList from '../../components/DiamondList';


function SellerDiamondStocks() {
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [shape, setShape] = useState("");
  const [color, setColor] = useState("");
  const [viewType, setViewType] = useState('grid'); // centralized control

  const handleViewChange = (type) => {
    setViewType(type);
  };



  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await getDiamonds(page, search, sort)
    } catch (error) {
      console.log(error)
    }
  };

  const handleFilters = async (e) => {
    e.preventDefault();
    try {
      console.log(shape)
      await getDiamonds(page, search, sort, { shape, color });
    } catch (error) {
      console.log(error)
    }
  }

  const handleSortChange = async (e) => {
    const value = e.target.value
    setSort(value)
    try {
      await getDiamonds(page, search, value)
    } catch (error) {
      console.log(error)
    }

  }

  const { product, getDiamonds } = useContext(DiamondContext);

  useEffect(() => {
    const loadDiamonds = async () => {
      try {
        await getDiamonds(page);
      } catch (error) {
        console.error('Error loading diamonds:', error);
      }
    };
    loadDiamonds();
  }, [page]);



  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Diamond Products</h1>
        <DiamondHeader result={product.totalDiamonds} onViewChange={handleViewChange}  />
        <div className="flex flex-wrap items-center justify-between mb-5">
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0 justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 border rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
              <span>🔧</span> All filters
            </button>

            <form onSubmit={handleSearch} className="flex border rounded overflow-hidden">
              <input
                type="text"
                placeholder="Enter certificate No or Stock"
                className="border rounded px-3 py-1 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 flex items-center justify-center hover:bg-blue-700"
              >
                <SearchIcon />
              </button>
            </form>

            <select className="border rounded px-3 py-1 text-sm">
              <option>Price</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>

            <button className="border rounded px-3 py-1 text-sm">Has image</button>
            <button className="border rounded px-3 py-1 text-sm">Has video</button>
            <button className="border rounded px-3 py-1 text-sm">My stock only</button>


            <select onChange={handleSortChange} className="border rounded px-3 py-1 text-sm">
              <option value="">Select Sorting</option>
              <option value="cashPriceDiscountPercent-desc">Discount: high to low</option>
              <option value="cashPriceDiscountPercent-asc">Discount: low to high</option>
              <option disabled>─── Sort by Price ───</option>
              <option value="cashPrice-asc">Price: low to high</option>
              <option value="cashPrice-desc">Price: high to low</option>
              <option disabled>─── Sort by Carat ───</option>
              <option value="weight-desc">Carat: high to low</option>
              <option value="weight-asc">Carat: low to high</option>
            </select>



          </div>
        </div>
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 bg-opacity-70 rounded border">
            <form onSubmit={handleFilters}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="border rounded p-2" onChange={(e) => setShape(e.target.value)}>
                  <option value="">Select Shape</option>
                  <option value="Round">Round</option>
                  <option value="Princess">Princess</option>
                  <option value="Emerald">Emerald</option>
                </select>

                <select onChange={(e) => setColor(e.target.value)} className="border rounded p-2">
                  <option value="">Select Color</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>

                <select className="border rounded p-2">
                  <option value="">Select Clarity</option>
                  <option value="IF">IF</option>
                  <option value="VVS1">VVS1</option>
                  <option value="VS1">VS1</option>
                </select>
              </div>

              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Apply Filters
              </button>
            </form>
          </div>
        )}
         {viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {product.diamond?.map((diamond) => (
            <DiamondCard key={diamond._id} diamond={diamond} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
            <DiamondList key={product.diamond._id} diamonds={product.diamond} />
        </div>
      )}
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page} of {product.totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(product.totalPages, prev + 1))}
            disabled={page === product.totalPages}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

    </Layout>
  )
}

export default SellerDiamondStocks