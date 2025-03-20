/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export default function Navbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl md:text-3xl font-['Pacifico'] text-primary">CG Diamond</a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <a href="#" className="text-gray-700 hover:text-primary font-medium">Natural Diamonds</a>
                        <a href="#" className="text-gray-700 hover:text-primary font-medium">Lab Grown Diamonds</a>
                        <a href="#" className="text-gray-700 hover:text-primary font-medium">Contact Us</a>
                        <a href="#" className="text-gray-700 hover:text-primary font-medium">About Us</a>
                    </nav>

                    {/* Desktop Right Icons */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <div className="relative">
                            <button 
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                            >
                                <i className="ri-user-line text-gray-700"></i>
                            </button>
                            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transform transition-all duration-200 origin-top ${
                                isProfileOpen 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-2 pointer-events-none'
                            }`}>
                                <a href="/login" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">Login</a>
                                <a href="/signup" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">Sign Up</a>
                                <a href="/seller-login" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">Sell with Us</a>
                            </div>
                        </div>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
                            <i className="ri-heart-line text-gray-700"></i>
                        </button>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
                            <i className="ri-shopping-bag-line text-gray-700"></i>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden">
                        <button 
                            className="p-2 rounded-lg hover:bg-gray-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl text-gray-700`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <nav className="py-4 space-y-2">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Natural Diamonds</a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Lab Grown Diamonds</a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Contact Us</a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">About Us</a>
                        
                        <div className="border-t border-gray-100 mt-4 pt-4">
                            <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Login</a>
                            <a href="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Sign Up</a>
                            <a href="/seller-login" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors">Sell with Us</a>
                        </div>
                        
                        <div className="flex items-center space-x-4 px-4 pt-4">
                            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
                                <i className="ri-heart-line text-gray-700"></i>
                            </button>
                            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
                                <i className="ri-shopping-bag-line text-gray-700"></i>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}





// <span
//                 class="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary text-white text-xs rounded-full"
//                 >3</span