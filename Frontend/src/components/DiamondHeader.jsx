import React, { useState } from 'react';


export default function DiamondHeader({result}) {

    const [selectDiamond, setSelectDiamond] = useState('Natural diamonds');

    const tabs = [
        'Natural diamonds',
        'Lab grown diamonds',
        'Gemstones'
    ];

    return (
        <div className="bg-white p-4 ">
            {/* Tabs */}
            <div className="flex space-x-6 border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectDiamond(tab)}
                        className={`relative pb-2 text-sm font-medium ${selectDiamond === tab ? 'text-black' : 'text-[#5C5C5C]'
                            } hover:text-black`}
                    >
                        {tab}
                        {selectDiamond === tab && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></span>
                        )}
                    </button>
                ))}
            </div>

            <div className="flex space-x-6  mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    {selectDiamond} <span className="text-gray-500">{result} results</span>
                </h1>

            </div>
        </div>


    );
}
