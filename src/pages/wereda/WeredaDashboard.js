import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WeredaSidebar from '../../components/wereda/WeredaSidebar';
import WeredaHeader from '../../components/wereda/WeredaHeader';
import DashboardHome from './DashboardHome';
import AtbiyaManagement from './AtbiyaManagement';
import BelieverManagement from './BelieverManagement';
import BaptismManagement from './BaptismManagement';
import MarriageManagement from './MarriageManagement';
import DeathManagement from './DeathManagement';
import Statistics from './Statistics';
import CertificateGeneration from './CertificateGeneration';

const WeredaDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <WeredaSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <WeredaHeader />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="atbiya" element={<AtbiyaManagement />} />
            <Route path="believers" element={<BelieverManagement />} />
            <Route path="baptisms" element={<BaptismManagement />} />
            <Route path="marriages" element={<MarriageManagement />} />
            <Route path="deaths" element={<DeathManagement />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="certificates" element={<CertificateGeneration />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default WeredaDashboard;
