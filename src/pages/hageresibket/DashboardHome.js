import React from 'react';
import { 
  Building2, 
  Users, 
  Droplets, 
  Heart, 
  Cross, 
  TrendingUp,
  MapPin,
  Activity,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockHageresibketStats } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Total WeredaBetekihinet',
      value: mockHageresibketStats.totalWeredaBetekihinet,
      icon: Building2,
      color: 'bg-blue-500',
      change: '+1',
      changeType: 'positive',
      description: 'Active church branches'
    },
    {
      title: 'Total Believers',
      value: mockHageresibketStats.totalBelievers,
      icon: Users,
      color: 'bg-green-500',
      change: '+45',
      changeType: 'positive',
      description: 'Across all wereda'
    },
    {
      title: 'Total Atbiya',
      value: mockHageresibketStats.totalAtbiya,
      icon: Shield,
      color: 'bg-purple-500',
      change: '+3',
      changeType: 'positive',
      description: 'Church workers'
    },
    {
      title: 'Total Baptisms',
      value: mockHageresibketStats.totalBaptisms,
      icon: Droplets,
      color: 'bg-cyan-500',
      change: '+8',
      changeType: 'positive',
      description: 'This year'
    },
    {
      title: 'Total Marriages',
      value: mockHageresibketStats.totalMarriages,
      icon: Heart,
      color: 'bg-pink-500',
      change: '+2',
      changeType: 'positive',
      description: 'This year'
    },
    {
      title: 'Total Deaths',
      value: mockHageresibketStats.totalDeaths,
      icon: Cross,
      color: 'bg-gray-500',
      change: '-1',
      changeType: 'negative',
      description: 'This year'
    }
  ];

  const weredaPerformance = mockHageresibketStats.weredaStats.map(wereda => ({
    ...wereda,
    performance: Math.round((wereda.believers / 200) * 100),
    status: wereda.believers > 150 ? 'Excellent' : wereda.believers > 100 ? 'Good' : 'Needs Attention'
  }));

  const recentActivities = [
    {
      id: 1,
      type: 'wereda',
      message: 'New WeredaBetekihinet registered: St. Gabriel Church',
      time: '1 hour ago',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'user',
      message: 'New admin user created for St. Mary Church',
      time: '3 hours ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'sync',
      message: 'Data synchronization completed for all wereda',
      time: '6 hours ago',
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'report',
      message: 'Monthly report generated for Addis Ababa Diocese',
      time: '1 day ago',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Good': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Needs Attention': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome, Super Admin! 👑
        </h1>
        <p className="text-blue-100">
          Managing {mockHageresibketStats.totalWeredaBetekihinet} WeredaBetekihinet across {user?.contactInfo?.address?.region || 'the diocese'}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <div className="card-content">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${card.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      card.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {card.change}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">vs last month</p>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wereda Performance */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">WeredaBetekihinet Performance</h2>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {weredaPerformance.map((wereda) => (
                  <div key={wereda.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{wereda.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{wereda.believers} believers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(wereda.status)}`}>
                        {wereda.status}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{wereda.performance}% capacity</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                  View detailed performance →
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Recent Activities</h2>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                      <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                  View all activities →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="card-title">System Health</h2>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Database Connection</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">API Services</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Data Sync</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Up to date</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Security</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Protected</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors duration-200 text-left">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Add New Wereda</p>
                    <p className="text-sm opacity-80">Register a new church branch</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors duration-200 text-left">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Manage Users</p>
                    <p className="text-sm opacity-80">Create and manage admin accounts</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors duration-200 text-left">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Generate Reports</p>
                    <p className="text-sm opacity-80">Create comprehensive reports</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;