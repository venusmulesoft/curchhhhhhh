import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import WeredaDashboard from './pages/wereda/WeredaDashboard';
import HageresibketDashboard from './pages/hageresibket/HageresibketDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* WeredaBetekihinet routes */}
          <Route 
            path="/wereda/*" 
            element={
              <ProtectedRoute allowedRoles={['wereda_admin', 'Admin']}>
                <WeredaDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Hageresibket routes */}
          <Route 
            path="/hageresibket/*" 
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <HageresibketDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
