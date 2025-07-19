import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { userAuth, logout } = useContext(UserContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl md:text-3xl font-['Pacifico'] text-primary">
              CG Diamond
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/user/diamond" className="text-gray-700 hover:text-primary font-medium">
              Natural Diamonds
            </Link>
            <Link to="#" className="text-gray-700 hover:text-primary font-medium">
              Lab Grown Diamonds
            </Link>
            <Link to="#" className="text-gray-700 hover:text-primary font-medium">
              Contact Us
            </Link>
            <Link to="#" className="text-gray-700 hover:text-primary font-medium">
              About Us
            </Link>
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
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transform transition-all duration-200 origin-top ${isProfileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
              >
                {userAuth.isAuthenticated && userAuth.user.name ? (
                  <>
                    <p className="block px-4 py-2.5 text-gray-700 text-center">
                      {userAuth.user.name}
                    </p>
                    <p
                      onClick={handleLogout}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Logout
                    </p>
                    <Link
                      to="/user/Profile"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/user/orders"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Orders
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/user/login"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/user/signup"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/seller/login"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Sell with Us
                    </Link>
                  </>
                )}
              </div>
            </div>

            <Link to="/user/whishlist">
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
                <i className="ri-heart-line text-gray-700"></i>
              </button>
            </Link>

            <Link to="/user/cart">
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
                <i className="ri-shopping-bag-line text-gray-700"></i>
              </button>
            </Link>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex items-center lg:hidden space-x-4">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
            >
              <i className="ri-user-line text-gray-700"></i>
            </button>

            <div
              className={`absolute right-20 mt-50 w-48 bg-white rounded-lg shadow-lg py-2 transform transition-all duration-200 origin-top ${isProfileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
                }`}
            >
              {userAuth.isAuthenticated && userAuth.user.name ? (
                <>
                  <p className="block px-4 py-2.5 text-gray-700 text-center">
                    {userAuth.user.name}
                  </p>
                  <p
                    onClick={handleLogout}
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Logout
                  </p>
                  <Link
                    to="/user/Profile"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/user/orders"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/user/login"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/user/signup"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/seller/login"
                    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sell with Us
                  </Link>
                </>
              )}
            </div>

            <Link to="/user/whishlist">
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50">
                <i className="ri-heart-line text-gray-700"></i>
              </button>
            </Link>

            <Link to="/user/cart">
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50">
                <i className="ri-shopping-bag-line text-gray-700"></i>
              </button>
            </Link>

            <button
              className="p-2 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i
                className={`ri-${isMobileMenuOpen ? "close" : "menu"}-line text-2xl text-gray-700`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <nav className="py-4 space-y-2">
            <Link to="/user/diamond" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Natural Diamonds
            </Link>
            <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Lab Grown Diamonds
            </Link>
            <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Contact Us
            </Link>
            <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              About Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
