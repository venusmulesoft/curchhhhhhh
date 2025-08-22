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

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Church className="h-8 w-8 text-primary-600" />
            <span className="text-lg font-semibold text-gray-900">Wereda</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-700 font-semibold text-sm">
                {user.name?.charAt(0) || user.username?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || user.username}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
          {user.WeredaBetekihinet && (
            <div className="mt-2 text-xs text-gray-600">
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
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
              title={isCollapsed ? item.description : ''}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${
                isActive(item.href) ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'
              }`} />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">{item.name}</span>
                  {!isCollapsed && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Church Management</p>
            <p>System v1.0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeredaSidebar;
