import React, { useState } from 'react';
import { Download, FileText, BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import * as mockData from '../../data/mockData';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [selectedWereda, setSelectedWereda] = useState('all');

  const reportTypes = [
    { id: 'overview', name: 'System Overview', icon: BarChart3, description: 'General system statistics and performance metrics' },
    { id: 'wereda', name: 'Wereda Performance', icon: Users, description: 'Detailed performance analysis by Wereda' },
    { id: 'activities', name: 'Activity Reports', icon: TrendingUp, description: 'Baptism, marriage, and death activity reports' },
    { id: 'financial', name: 'Financial Reports', icon: FileText, description: 'Revenue, expenses, and financial summaries' },
    { id: 'audit', name: 'Audit Reports', icon: FileText, description: 'System access logs and security audit trails' }
  ];

  const generateReport = (type) => {
    // Mock report generation
    alert(`${type} report generated successfully!`);
  };

  const downloadReport = (type) => {
    // Mock download functionality
    alert(`${type} report downloaded successfully!`);
  };

  const getSystemStats = () => {
    const totalWereda = mockData.weredaBetekihinet.length;
    const totalAtbiya = mockData.atbiya.length;
    const totalBelievers = mockData.believers.length;
    const totalBaptisms = mockData.baptisms.length;
    const totalMarriages = mockData.marriages.length;
    const totalDeaths = mockData.deaths.length;

    return {
      totalWereda,
      totalAtbiya,
      totalBelievers,
      totalBaptisms,
      totalMarriages,
      totalDeaths
    };
  };

  const getWeredaPerformance = () => {
    return mockData.weredaBetekihinet.map(wereda => {
      const atbiya = mockData.atbiya.filter(a => a.weredaId === wereda.id);
      const believers = mockData.believers.filter(b => atbiya.some(a => a.id === b.atbiyaId));
      const baptisms = mockData.baptisms.filter(b => atbiya.some(a => a.id === b.atbiyaId));
      const marriages = mockData.marriages.filter(m => atbiya.some(a => a.id === m.atbiyaId));
      const deaths = mockData.deaths.filter(d => atbiya.some(a => a.id === d.atbiyaId));
      
      return {
        name: wereda.name,
        location: `${wereda.location.zone}, ${wereda.location.woreda}`,
        atbiya: atbiya.length,
        believers: believers.length,
        baptisms: baptisms.length,
        marriages: marriages.length,
        deaths: deaths.length,
        status: wereda.isActive ? 'Active' : 'Inactive'
      };
    });
  };

  const getActivityTrends = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      baptisms: Math.floor(Math.random() * 20) + 10,
      marriages: Math.floor(Math.random() * 8) + 3,
      deaths: Math.floor(Math.random() * 5) + 1,
      newBelievers: Math.floor(Math.random() * 15) + 8
    }));
  };

  const renderOverviewReport = () => {
    const stats = getSystemStats();
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Wereda</span>
                <span className="font-semibold">{stats.totalWereda}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Atbiya</span>
                <span className="font-semibold">{stats.totalAtbiya}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Believers</span>
                <span className="font-semibold">{stats.totalBelievers}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Baptisms</span>
                <span className="font-semibold text-green-600">{stats.totalBaptisms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Marriages</span>
                <span className="font-semibold text-blue-600">{stats.totalMarriages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deaths</span>
                <span className="font-semibold text-gray-600">{stats.totalDeaths}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Growth</span>
                <span className="font-semibold text-green-600">+12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Users</span>
                <span className="font-semibold text-blue-600">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">System Uptime</span>
                <span className="font-semibold text-green-600">99.9%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Trends</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baptisms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marriages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deaths</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Believers</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getActivityTrends().map((trend) => (
                  <tr key={trend.month} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trend.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trend.baptisms}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trend.marriages}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trend.deaths}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trend.newBelievers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderWeredaPerformanceReport = () => {
    const performance = getWeredaPerformance();
    
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wereda Performance Overview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wereda</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atbiya</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Believers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baptisms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marriages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performance.map((wereda) => (
                  <tr key={wereda.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wereda.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{wereda.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{wereda.atbiya}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{wereda.believers}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{wereda.baptisms}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{wereda.marriages}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        wereda.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {wereda.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderActivityReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Baptism Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">This Month</span>
              <span className="font-semibold text-green-600">+25</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Month</span>
              <span className="font-semibold">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth Rate</span>
              <span className="font-semibold text-green-600">+38.9%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Marriage Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">This Month</span>
              <span className="font-semibold text-blue-600">+10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Month</span>
              <span className="font-semibold">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth Rate</span>
              <span className="font-semibold text-blue-600">+66.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancialReports = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
        <p className="text-gray-500">Financial reports are not available in the demo version.</p>
      </div>
    </div>
  );

  const renderAuditReports = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Audit Log</h3>
        <p className="text-gray-500">Audit reports are not available in the demo version.</p>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverviewReport();
      case 'wereda':
        return renderWeredaPerformanceReport();
      case 'activities':
        return renderActivityReports();
      case 'financial':
        return renderFinancialReports();
      case 'audit':
        return renderAuditReports();
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate comprehensive reports and view system analytics</p>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <h3 className="text-lg font-semibold mb-4">Select Report Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedReport === report.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <Icon className="w-8 h-8 mb-2" />
                <h4 className="font-medium mb-1">{report.name}</h4>
                <p className="text-sm opacity-75">{report.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wereda Filter</label>
              <select
                value={selectedWereda}
                onChange={(e) => setSelectedWereda(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Wereda</option>
                {mockData.weredaBetekihinet.map(wereda => (
                  <option key={wereda.id} value={wereda.id}>{wereda.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => generateReport(selectedReport)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              Generate Report
            </button>
            <button
              onClick={() => downloadReport(selectedReport)}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6">
          {renderReportContent()}
        </div>
      </div>
    </div>
  );
};

export default Reports;

