import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WeredaSidebar from '../../components/wereda/WeredaSidebar';
import WeredaHeader from '../../components/wereda/WeredaHeader';
import DashboardHome from './DashboardHome';

const WeredaDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <WeredaSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <WeredaHeader />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default WeredaDashboard;