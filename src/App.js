import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import WeredaDashboard from './pages/wereda/WeredaDashboard';
import HageresibketDashboard from './pages/hageresibket/HageresibketDashboard';
import NotFoundPage from './pages/NotFoundPage';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;