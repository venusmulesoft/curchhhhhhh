import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HageresibketSidebar from '../../components/hageresibket/HageresibketSidebar';
import HageresibketHeader from '../../components/hageresibket/HageresibketHeader';
import DashboardHome from './DashboardHome';

const HageresibketDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <HageresibketSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HageresibketHeader />
        
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

export default HageresibketDashboard;