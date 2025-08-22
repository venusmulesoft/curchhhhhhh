import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HageresibketSidebar from '../../components/hageresibket/HageresibketSidebar';
import HageresibketHeader from '../../components/hageresibket/HageresibketHeader';
import DashboardHome from './DashboardHome';
import WeredaManagement from './WeredaManagement';
import UserManagement from './UserManagement';
import SystemSettings from './SystemSettings';
import Reports from './Reports';

const HageresibketDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <HageresibketSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HageresibketHeader />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="wereda" element={<WeredaManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default HageresibketDashboard;
