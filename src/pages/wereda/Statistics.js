import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Download, Filter, Calendar, Users, TrendingUp, TrendingDown } from 'lucide-react';
import * as mockData from '../../data/mockData';

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedAtbiya, setSelectedAtbiya] = useState('all');

  // Calculate statistics
  const totalBelievers = mockData.mockBelievers.length;
  const totalAtbiya = mockData.mockAtbiya.length;
  const totalBaptisms = mockData.mockBaptisms.length;
  const totalMarriages = mockData.mockMarriages.length;
  const totalDeaths = mockData.mockDeaths.length;

  // Role distribution
  const roleDistribution = [
    { name: 'Elders', value: mockData.mockBelievers.filter(b => b.role === 'elder').length, color: '#8B5CF6' },
    { name: 'Adults', value: mockData.mockBelievers.filter(b => b.role === 'adult').length, color: '#F59E0B' },
    { name: 'Youth', value: mockData.mockBelievers.filter(b => b.role === 'youth').length, color: '#3B82F6' },
    { name: 'Children', value: mockData.mockBelievers.filter(b => b.role === 'child').length, color: '#10B981' },
  ];

  // Monthly trends
  const monthlyTrends = [
    { month: 'Jan', believers: 45, baptisms: 8, marriages: 3, deaths: 1 },
    { month: 'Feb', believers: 52, baptisms: 12, marriages: 5, deaths: 2 },
    { month: 'Mar', believers: 58, baptisms: 15, marriages: 4, deaths: 1 },
    { month: 'Apr', believers: 65, baptisms: 18, marriages: 6, deaths: 3 },
    { month: 'May', believers: 72, baptisms: 22, marriages: 8, deaths: 2 },
    { month: 'Jun', believers: 78, baptisms: 25, marriages: 10, deaths: 4 },
  ];

  // Atbiya performance
  const atbiyaPerformance = mockData.mockAtbiya.map(atbiya => {
    const believers = mockData.mockBelievers.filter(b => b.atbiyaId === atbiya.id).length;
    const baptisms = mockData.mockBaptisms.filter(b => b.atbiyaId === atbiya.id).length;
    const marriages = mockData.mockMarriages.filter(m => m.atbiyaId === atbiya.id).length;
    const deaths = mockData.mockDeaths.filter(d => d.atbiyaId === atbiya.id).length;
    
    return {
      name: atbiya.name,
      believers,
      baptisms,
      marriages,
      deaths,
      total: believers + baptisms + marriages + deaths
    };
  });

  // Age distribution
  const ageDistribution = [
    { range: '0-17', count: mockData.mockBelievers.filter(b => b.role === 'child').length, color: '#10B981' },
    { range: '18-25', count: mockData.mockBelievers.filter(b => b.role === 'youth').length, color: '#3B82F6' },
    { range: '26-59', count: mockData.mockBelievers.filter(b => b.role === 'adult').length, color: '#F59E0B' },
    { range: '60+', count: mockData.mockBelievers.filter(b => b.role === 'elder').length, color: '#8B5CF6' },
  ];

  // Recent activities
  const recentActivities = [
    ...mockData.mockBaptisms.slice(0, 3).map(b => ({ type: 'Baptism', name: b.believerName, date: b.baptismDate, atbiya: mockData.mockAtbiya.find(a => a.id === b.atbiyaId)?.name })),
    ...mockData.mockMarriages.slice(0, 3).map(m => ({ type: 'Marriage', name: `${m.groomName} & ${m.brideName}`, date: m.marriageDate, atbiya: mockData.mockAtbiya.find(a => a.id === m.atbiyaId)?.name })),
    ...mockData.mockDeaths.slice(0, 3).map(d => ({ type: 'Death', name: d.believerName, date: d.deathDate, atbiya: mockData.mockAtbiya.find(a => a.id === d.atbiyaId)?.name }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getGrowthRate = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Statistics Dashboard</h1>
        <p className="text-gray-600">Comprehensive overview of church activities and member statistics</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <select
            value={selectedAtbiya}
            onChange={(e) => setSelectedAtbiya(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Atbiya</option>
            {mockData.mockAtbiya.map(atbiya => (
              <option key={atbiya.id} value={atbiya.id}>{atbiya.name}</option>
            ))}
          </select>
        </div>

        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Believers</p>
              <p className="text-2xl font-bold text-gray-900">{totalBelievers}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+{getGrowthRate(78, 72)}%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Atbiya</p>
              <p className="text-2xl font-bold text-gray-900">{totalAtbiya}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-lg">👥</span>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-500">Active clergy members</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Baptisms</p>
              <p className="text-2xl font-bold text-gray-900">{totalBaptisms}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-lg">💧</span>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+{getGrowthRate(25, 18)}%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Marriages</p>
              <p className="text-2xl font-bold text-gray-900">{totalMarriages}</p>
            </div>
            <div className="p-2 bg-pink-100 rounded-lg">
              <span className="text-pink-600 text-lg">💒</span>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+{getGrowthRate(10, 6)}%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deaths</p>
              <p className="text-2xl font-bold text-gray-900">{totalDeaths}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <span className="text-gray-600 text-lg">⚰️</span>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-600">-{getGrowthRate(4, 3)}%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="believers" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="baptisms" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="marriages" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="deaths" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Role Distribution */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Believer Role Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Atbiya Performance */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Atbiya Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={atbiyaPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="believers" fill="#3B82F6" />
              <Bar dataKey="baptisms" fill="#10B981" />
              <Bar dataKey="marriages" fill="#F59E0B" />
              <Bar dataKey="deaths" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Age Distribution */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'Baptism' ? 'bg-green-500' :
                  activity.type === 'Marriage' ? 'bg-pink-500' :
                  'bg-gray-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.type} • {activity.atbiya}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{formatDate(activity.date)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-lg font-semibold mb-4">Growth Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Believer Growth</span>
              <span className="font-semibold text-green-600">+{getGrowthRate(78, 72)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Baptism Rate</span>
              <span className="font-semibold text-green-600">+{getGrowthRate(25, 18)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Marriage Rate</span>
              <span className="font-semibold text-green-600">+{getGrowthRate(10, 6)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-lg font-semibold mb-4">Demographics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Average Age</span>
              <span className="font-semibold">32.5 years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gender Ratio</span>
              <span className="font-semibold">52% F, 48% M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Family Units</span>
              <span className="font-semibold">45 families</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-lg font-semibold mb-4">Activity Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Weekly Attendance</span>
              <span className="font-semibold">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Volunteer Rate</span>
              <span className="font-semibold">23%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Community Events</span>
              <span className="font-semibold">12/month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
