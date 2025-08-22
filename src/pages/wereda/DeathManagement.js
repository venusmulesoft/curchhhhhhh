import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Calendar, User, Cross } from 'lucide-react';
import * as mockData from '../../data/mockData';

const DeathManagement = () => {
  const [deathList, setDeathList] = useState(mockData.mockDeaths);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAtbiya, setFilterAtbiya] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDeath, setSelectedDeath] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const filteredDeaths = deathList.filter(death => {
    const matchesSearch = death.believerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         death.deathNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || death.status === filterStatus;
    const matchesAtbiya = filterAtbiya === 'all' || death.atbiyaId === filterAtbiya;
    return matchesSearch && matchesStatus && matchesAtbiya;
  });

  const handleAddDeath = (formData) => {
    const newDeath = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    setDeathList([...deathList, newDeath]);
    setShowAddModal(false);
  };

  const handleEditDeath = (death) => {
    setSelectedDeath(death);
    setShowAddModal(true);
  };

  const handleDeleteDeath = (id) => {
    if (window.confirm('Are you sure you want to delete this Death record?')) {
      setDeathList(deathList.filter(death => death.id !== id));
    }
  };

  const handleViewDeath = (death) => {
    setSelectedDeath(death);
    setShowViewModal(true);
  };

  const getAtbiyaName = (atbiyaId) => {
    const atbiya = mockData.mockAtbiya.find(a => a.id === atbiyaId);
    return atbiya ? atbiya.name : 'Unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Death Management</h1>
        <p className="text-gray-600">Manage death records and funeral arrangements</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Death Record
        </button>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by believer name or death number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filterAtbiya}
            onChange={(e) => setFilterAtbiya(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Atbiya</option>
            {mockData.mockAtbiya.map(atbiya => (
              <option key={atbiya.id} value={atbiya.id}>{atbiya.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <span className="text-gray-600 text-lg">⚰️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Deaths</p>
              <p className="text-xl font-semibold text-gray-900">{deathList.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-lg">✅</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-semibold text-gray-900">
                {deathList.filter(d => d.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-lg">⏳</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-semibold text-gray-900">
                {deathList.filter(d => d.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-lg">📊</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-semibold text-gray-900">
                {deathList.filter(d => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(d.deathDate) > monthAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deaths Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Believer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Death Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Death Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funeral Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atbiya
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeaths.map((death) => (
                <tr key={death.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold text-sm">
                          {death.believerName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{death.believerName}</div>
                        <div className="text-sm text-gray-500">Age: {death.believerAge}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {death.deathNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(death.deathDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {death.funeralDate ? formatDate(death.funeralDate) : 'Not set'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getAtbiyaName(death.atbiyaId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(death.status)}`}>
                      {death.status.charAt(0).toUpperCase() + death.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDeath(death)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditDeath(death)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDeath(death.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedDeath ? 'Edit Death Record' : 'Add New Death Record'}
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = {
                believerName: formData.get('believerName'),
                believerAge: formData.get('believerAge'),
                deathNumber: formData.get('deathNumber'),
                deathDate: formData.get('deathDate'),
                funeralDate: formData.get('funeralDate'),
                causeOfDeath: formData.get('causeOfDeath'),
                location: formData.get('location'),
                atbiyaId: formData.get('atbiyaId'),
                notes: formData.get('notes')
              };
              handleAddDeath(data);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Believer Name</label>
                  <input
                    type="text"
                    name="believerName"
                    defaultValue={selectedDeath?.believerName || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Believer Age</label>
                  <input
                    type="number"
                    name="believerAge"
                    defaultValue={selectedDeath?.believerAge || ''}
                    required
                    min="0"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Death Number</label>
                  <input
                    type="text"
                    name="deathNumber"
                    defaultValue={selectedDeath?.deathNumber || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Death Date</label>
                  <input
                    type="date"
                    name="deathDate"
                    defaultValue={selectedDeath?.deathDate || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Funeral Date</label>
                  <input
                    type="date"
                    name="funeralDate"
                    defaultValue={selectedDeath?.funeralDate || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cause of Death</label>
                  <input
                    type="text"
                    name="causeOfDeath"
                    defaultValue={selectedDeath?.causeOfDeath || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedDeath?.location || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Atbiya</label>
                  <select
                    name="atbiyaId"
                    defaultValue={selectedDeath?.atbiyaId || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Atbiya</option>
                    {mockData.mockAtbiya.map(atbiya => (
                      <option key={atbiya.id} value={atbiya.id}>{atbiya.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    defaultValue={selectedDeath?.notes || ''}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedDeath(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedDeath ? 'Update' : 'Add'} Death Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedDeath && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Death Record Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Believer Name</label>
                <p className="text-gray-900">{selectedDeath.believerName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Believer Age</label>
                <p className="text-gray-900">{selectedDeath.believerAge}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Death Number</label>
                <p className="text-gray-900">{selectedDeath.deathNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Death Date</label>
                <p className="text-gray-900">{formatDate(selectedDeath.deathDate)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Funeral Date</label>
                <p className="text-gray-900">
                  {selectedDeath.funeralDate ? formatDate(selectedDeath.funeralDate) : 'Not set'}
                </p>
              </div>

              {selectedDeath.causeOfDeath && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cause of Death</label>
                  <p className="text-gray-900">{selectedDeath.causeOfDeath}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-gray-900">{selectedDeath.location}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Atbiya</label>
                <p className="text-gray-900">{getAtbiyaName(selectedDeath.atbiyaId)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <p className="text-gray-900 capitalize">{selectedDeath.status}</p>
              </div>

              {selectedDeath.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <p className="text-gray-900">{selectedDeath.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedDeath(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeathManagement;
