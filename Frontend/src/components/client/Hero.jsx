/* eslint-disable no-unused-vars */
import React from "react";

export default function Hero(){
    return(
        <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://public.readdy.ai/ai/img_res/2edd0641e166646c0c948076c6e29a2f.jpg')" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
                <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
                    <div className="max-w-xl text-white">
                        <h1 className="font-playfair text-5xl font-bold mb-6">Discover Rare Natural Diamonds</h1>
                        <p className="text-lg mb-8">Experience the brilliance of ethically sourced diamonds.</p>
                        <button className="bg-[#1A237E] font-semibold text-white text-fff mb-3 px-8 py-3 rounded hover:bg-primary/90 transition">Explore Collection</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
