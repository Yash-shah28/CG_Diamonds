/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DiamondIcon from '@mui/icons-material/Diamond';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { SellerContext } from '../../context/SellerContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(SellerContext);

  const handleLogout = () => {
    logout();
    navigate('/seller-login');
  };

  const menuItems = [
    { path: '/seller-dashboard', name: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { path: '/seller-stocks', name: 'Diamond Stocks', icon: <DiamondIcon className="w-5 h-5" /> },
    { path: '/seller-orders', name: 'Orders', icon: <ShoppingBagIcon className="w-5 h-5" /> },
    { path: '/seller-upload', name: 'Upload Stock', icon: <CloudUploadIcon className="w-5 h-5" /> },
    { path: '/seller-settings', name: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <aside 
      className={`
        fixed 
        left-0 
        top-16 
        h-[calc(100vh-4rem)] 
        bg-white 
        border-r 
        border-gray-200 
        transition-all 
        duration-300 
        transform 
        z-40
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}
      `}
    >
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'text-black bg-gray-100'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="w-5 h-5 mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}

        <div className="pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full"
          >
            <LogoutIcon className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default Sidebar;
