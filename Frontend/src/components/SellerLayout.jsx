
import React, { useState } from 'react';
import Header from './SellerHeader';
import Sidebar from './SellerSidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
      />
      <Sidebar isOpen={isSidebarOpen} />
      <main 
        className={`
          pt-16 
          transition-all 
          duration-300 
          ${isSidebarOpen ? 'ml-64' : 'ml-0'}
        `}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
