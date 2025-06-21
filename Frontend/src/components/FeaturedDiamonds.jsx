import React from "react";

export default function FeaturedDiamonds(){
    const diamonds = [
        {
          id: 1,
          name: "Round Brilliant Diamond",
          carat: "2.31 Carat | VS1 | F Color",
          price: "$18,750",
          image: "https://public.readdy.ai/ai/img_res/4fbdfe186912bdc9de8630c939be7484.jpg",
        },
        {
          id: 2,
          name: "Oval Cut Diamond",
          carat: "1.85 Carat | VVS2 | E Color",
          price: "$15,200",
          image: "https://public.readdy.ai/ai/img_res/90f9659063d32e62fd42cc088563667b.jpg",
        },
        {
          id: 3,
          name: "Cushion Cut Diamond",
          carat: "2.05 Carat | VS2 | G Color",
          price: "$16,900",
          image: "https://public.readdy.ai/ai/img_res/a9374f4fd39d8582831afbedf96ea2e3.jpg",
        },
      ];
    
      return (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900 mb-4">
                Featured Diamonds
              </h2>
              <p className="text-gray-600">Handpicked selection of exceptional stones</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {diamonds.map((diamond) => (
                <div
                  key={diamond.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full aspect-w-4 aspect-h-3">
                    <img src={diamond.image} alt={diamond.name} className="w-full h-full object-cover" />
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white">
                      <i className="ri-heart-line text-gray-700"></i>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{diamond.name}</h3>
                        <p className="text-sm text-gray-600">{diamond.carat}</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{diamond.price}</span>
                    </div>
                    <div className="flex space-x-4">
                      <button className="bg-[#1A237E] text-white w-full rounded">
                        View Details
                      </button>
                      <button className="rounded-lg w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                        <i className="ri-shopping-cart-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    };