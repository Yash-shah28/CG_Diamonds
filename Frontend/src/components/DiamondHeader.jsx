import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react'; // grid and list icons

export default function DiamondHeader({ result, onViewChange }) {
  const [selectDiamond, setSelectDiamond] = useState('Natural diamonds');
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'

  const tabs = ['Natural diamonds', 'Lab grown diamonds', 'Gemstones'];

  const toggleView = () => {
    const newType = viewType === 'grid' ? 'list' : 'grid';
    setViewType(newType);
    onViewChange(newType);
  };

  return (
    <div className="bg-white p-4">
      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectDiamond(tab)}
            className={`relative pb-2 text-sm font-medium ${
              selectDiamond === tab ? 'text-black' : 'text-[#5C5C5C]'
            } hover:text-black`}
          >
            {tab}
            {selectDiamond === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></span>
            )}
          </button>
        ))}
      </div>

      {/* Header + View Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {selectDiamond}{' '}
          <span className="text-gray-500">{result} results</span>
        </h1>

        <button
          onClick={toggleView}
          className="p-2 border rounded-lg hover:bg-gray-100 transition"
        >
          {viewType === 'grid' ? (
            <LayoutGrid className="w-5 h-5 text-gray-700" />
          ) : (
            <List className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}
