import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  UserCheck, 
  Droplets, 
  Heart, 
  Cross, 
  BarChart3, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Church
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const WeredaSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/wereda/dashboard',
      icon: Home,
      description: 'Overview and statistics'
    },
    {
      name: 'Atbiya',
      href: '/wereda/atbiya',
      icon: Users,
      description: 'Manage church workers'
    },
    {
      name: 'Believers',
      href: '/wereda/believers',
      icon: UserCheck,
      description: 'Manage church members'
    },
    {
      name: 'Baptisms',
      href: '/wereda/baptisms',
      icon: Droplets,
      description: 'Baptism records'
    },
    {
      name: 'Marriages',
      href: '/wereda/marriages',
      icon: Heart,
      description: 'Marriage records'
    },
    {
      name: 'Deaths',
      href: '/wereda/deaths',
      icon: Cross,
      description: 'Death records'
    },
    {
      name: 'Statistics',
      href: '/wereda/statistics',
      icon: BarChart3,
      description: 'Reports and analytics'
    },
    {
      name: 'Certificates',
      href: '/wereda/certificates',
      icon: FileText,
      description: 'Generate certificates'
    }
  ];

  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Church className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Wereda</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                {user.name?.charAt(0) || user.username?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.name || user.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
          {user.WeredaBetekihinet && (
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              <p className="font-medium">{user.WeredaBetekihinet.name}</p>
              <p>{user.WeredaBetekihinet.address.woreda}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }
              `}
              title={isCollapsed ? item.description : ''}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
              }`} />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">{item.name}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>Church Management</p>
            <p>System v2.0</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WeredaSidebar;