import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Shield,
  Building2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const HageresibketHeader = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search wereda, users, reports..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-700" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || user?.superAdminUsername}
                </p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mt-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <span className="text-sm text-gray-500">Hageresibket</span>
            </li>
            <li>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-sm text-gray-500">
                {user?.name || 'Super Admin Portal'}
              </span>
            </li>
            <li>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-sm font-medium text-gray-900">
                {user?.contactInfo?.address?.region || 'Diocese'}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-4 flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-primary-600" />
          <span className="text-gray-600">Wereda:</span>
          <span className="font-medium text-gray-900">3 Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-success-600" />
          <span className="text-gray-600">Status:</span>
          <span className="font-medium text-success-600">All Systems Operational</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Last Sync:</span>
          <span className="font-medium text-gray-900">2 minutes ago</span>
        </div>
      </div>
    </header>
  );
};

export default HageresibketHeader;
