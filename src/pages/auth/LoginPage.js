import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Church, Shield, Users, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LoginPage = () => {
  const [loginType, setLoginType] = useState('wereda');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(formData, loginType);
      
      if (result.success) {
        if (result.userType === 'super_admin') {
          navigate('/hageresibket/dashboard');
        } else {
          navigate('/wereda/dashboard');
        }
      }
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (type, demoUsername, demoPassword) => {
    setLoginType(type);
    setFormData({
      username: demoUsername,
      password: demoPassword,
    });
  };

  const loginTypeOptions = [
    {
      id: 'wereda',
      name: 'WeredaBetekihinet',
      icon: Users,
      description: 'Church administration portal',
    },
    {
      id: 'hageresibket',
      name: 'Hageresibket',
      icon: Shield,
      description: 'Diocese management portal',
    },
  ];

  const demoCredentials = {
    wereda: [
      { username: 'wereda_admin', password: 'password123', role: 'Wereda Admin' },
      { username: 'admin', password: 'admin123', role: 'Admin' },
    ],
    hageresibket: [
      { username: 'diocese_admin', password: 'diocese123', role: 'Super Admin' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Church className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Church Management System
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to access your account
          </p>
          
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </motion.div>

        {/* Login Type Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card"
        >
          <div className="card-content">
            <h3 className="text-lg font-semibold mb-4">Select Portal</h3>
            <div className="grid grid-cols-1 gap-3">
              {loginTypeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setLoginType(option.id)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                      loginType === option.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <div className="text-left">
                      <p className="font-medium">{option.name}</p>
                      <p className="text-sm opacity-75">{option.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="card-content">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="label">
                  {loginType === 'hageresibket' ? 'Super Admin Username' : 'Username'}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input mt-1"
                  placeholder={loginType === 'hageresibket' ? 'Enter super admin username' : 'Enter username'}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input pr-10"
                    placeholder="Enter password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.username.trim() || !formData.password.trim()}
                className="w-full btn btn-primary btn-md"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" text="Signing in..." />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <div className="card-content">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Demo Credentials:
            </h4>
            
            <div className="space-y-2">
              {demoCredentials[loginType].map((cred, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(loginType, cred.username, cred.password)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  disabled={isLoading}
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {cred.role}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Username: {cred.username} | Password: {cred.password}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>© 2024 Church Management System. All rights reserved.</p>
          <p className="mt-1">
            {loginType === 'hageresibket' 
              ? 'Super Admin Portal - Manage all WeredaBetekihinet'
              : 'WeredaBetekihinet Portal - Manage church operations'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;