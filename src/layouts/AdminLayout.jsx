import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const AdminLayout = ({ user, handleLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-sans text-gray-900 selection:bg-primary/20 antialiased overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        handleLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-500 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        {/* Header content */}
        <Header user={user} />

        {/* Dashboard Content - Render specific page based on route */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 pt-8 space-y-10 scrollbar-hide">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
