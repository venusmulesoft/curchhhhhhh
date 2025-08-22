import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Church, Shield, Users, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [loginType, setLoginType] = useState('wereda'); // 'wereda' or 'hageresibket'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(username, password, loginType);
      
      if (result.success) {
        toast.success('Login successful!');
        
        if (result.userType === 'super_admin') {
          navigate('/hageresibket/dashboard');
        } else {
          navigate('/wereda/dashboard');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (type, demoUsername, demoPassword) => {
    setLoginType(type);
    setUsername(demoUsername);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-primary-600 rounded-full flex items-center justify-center mb-4">
            <Church className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Church Management System
          </h2>
          <p className="text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Login Type Selector */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => setLoginType('wereda')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
                loginType === 'wereda'
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="font-medium">WeredaBetekihinet</span>
            </button>
            <button
              onClick={() => setLoginType('hageresibket')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
                loginType === 'hageresibket'
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <Shield className="h-5 w-5" />
              <span className="font-medium">Hageresibket</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="form-label">
                {loginType === 'hageresibket' ? 'Super Admin Username' : 'Username'}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder={loginType === 'hageresibket' ? 'Enter super admin username' : 'Enter username'}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</h4>
            
            {loginType === 'wereda' ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleDemoLogin('wereda', 'wereda_admin', 'password123')}
                  className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="text-sm font-medium text-gray-900">Wereda Admin</div>
                  <div className="text-xs text-gray-600">Username: wereda_admin | Password: password123</div>
                </button>
                <button
                  onClick={() => handleDemoLogin('wereda', 'admin', 'admin123')}
                  className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="text-sm font-medium text-gray-900">Admin</div>
                  <div className="text-xs text-gray-600">Username: admin | Password: admin123</div>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleDemoLogin('hageresibket', 'diocese_admin', 'diocese123')}
                className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="text-sm font-medium text-gray-900">Hageresibket Super Admin</div>
                <div className="text-xs text-gray-600">Username: diocese_admin | Password: diocese123</div>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Church Management System. All rights reserved.</p>
          <p className="mt-1">
            {loginType === 'hageresibket' 
              ? 'Super Admin Portal - Manage all WeredaBetekihinet'
              : 'WeredaBetekihinet Portal - Manage church operations'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
