import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SellerContext } from '../context/SellerContext';

const Header = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { sellerAuth, logout } = useContext(SellerContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/seller/login');
  };

  // Add this helper function to safely get the user's name
  const getUserName = () => {
    if (sellerAuth ) {
      return {
        firstName: sellerAuth.seller.firstname || 'User',
        lastName: sellerAuth.seller.lastname || ''
      };
    }
    return { firstName: 'User', lastName: '' };
  };

  const { firstName, lastName } = getUserName();

  return (
    <header className="fixed w-full bg-white z-50 border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button 
            onClick={onMenuClick}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="/" className="font-['Poppins'] text-xl text-black ml-4">CG Diamonds</a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={toggleDropdown} 
              className="flex items-center space-x-3 hover:bg-gray-100 rounded-full py-2 px-3 transition"
            >
              <img 
                src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`} 
                className="w-8 h-8 rounded-full object-cover" 
                alt="Profile" 
              />
              <span className="text-sm font-medium text-gray-700">
                {`${firstName} ${lastName}`.trim()}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a href="/seller/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </a>
               
                <hr className="my-2 border-gray-200"/>
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    
  );
};
Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;


