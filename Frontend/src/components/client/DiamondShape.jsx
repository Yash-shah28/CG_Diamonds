/* eslint-disable no-unused-vars */
import React from "react";

export default function DiamondShape(){
    const shapes = [
        { name: "Round", icon: "ri-diamond-line" },
        { name: "Princess", icon: "ri-shape-2-line" },
        { name: "Pear", icon: "ri-drop-line" },
        { name: "Heart", icon: "ri-heart-line" },
        { name: "Emerald", icon: "ri-rectangle-line" },
        { name: "Oval", icon: "ri-oval-line" },
        { name: "Marquise", icon: "ri-shape-line" },
        { name: "Radiant", icon: "ri-pentagon-line" },
      ];
    
  return (
    <section className="bg-white py-20">
        <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold mb-4">Shop by Diamond Shape</h2>
            <p className="text-gray-600">Select your preferred diamond cut to begin your journey</p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
          {shapes.map((shape) => (
            <button
              key={shape.name}
              className="group aspect-square rounded-lg border border-gray-100 hover:border-primary p-4 transition-all"
            >
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <i className={`${shape.icon} text-2xl text-gray-400 group-hover:text-primary transition `}></i>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-primary transition">
                  {shape.name}
                </span>
              </div>
            </button>
          ))}
        </div>

    </section>
  )
};
