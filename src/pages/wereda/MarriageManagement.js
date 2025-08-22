import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Calendar, User, Heart } from 'lucide-react';
import * as mockData from '../../data/mockData';

const MarriageManagement = () => {
  const [marriageList, setMarriageList] = useState(mockData.marriages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAtbiya, setFilterAtbiya] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMarriage, setSelectedMarriage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const filteredMarriages = marriageList.filter(marriage => {
    const matchesSearch = marriage.groomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         marriage.brideName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         marriage.marriageNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || marriage.status === filterStatus;
    const matchesAtbiya = filterAtbiya === 'all' || marriage.atbiyaId === filterAtbiya;
    return matchesSearch && matchesStatus && matchesAtbiya;
  });

  const handleAddMarriage = (formData) => {
    const newMarriage = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    setMarriageList([...marriageList, newMarriage]);
    setShowAddModal(false);
  };

  const handleEditMarriage = (marriage) => {
    setSelectedMarriage(marriage);
    setShowAddModal(true);
  };

  const handleDeleteMarriage = (id) => {
    if (window.confirm('Are you sure you want to delete this Marriage record?')) {
      setMarriageList(marriageList.filter(marriage => marriage.id !== id));
    }
  };

  const handleViewMarriage = (marriage) => {
    setSelectedMarriage(marriage);
    setShowViewModal(true);
  };

  const getAtbiyaName = (atbiyaId) => {
    const atbiya = mockData.atbiya.find(a => a.id === atbiyaId);
    return atbiya ? atbiya.name : 'Unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'annulled': return 'bg-yellow-100 text-yellow-800';
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Marriage Management</h1>
        <p className="text-gray-600">Manage marriage records and ceremonies</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Marriage
        </button>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by names or marriage number..."
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
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
            <option value="annulled">Annulled</option>
          </select>

          <select
            value={filterAtbiya}
            onChange={(e) => setFilterAtbiya(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Atbiya</option>
            {mockData.atbiya.map(atbiya => (
              <option key={atbiya.id} value={atbiya.id}>{atbiya.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-pink-100 rounded-lg">
              <span className="text-pink-600 text-lg">💒</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Marriages</p>
              <p className="text-xl font-semibold text-gray-900">{marriageList.length}</p>
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
                {marriageList.filter(m => m.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-lg">📅</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-xl font-semibold text-gray-900">
                {marriageList.filter(m => m.status === 'scheduled').length}
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
                {marriageList.filter(m => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(m.marriageDate) > monthAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marriages Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Couple
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marriage Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marriage Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atbiya
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
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
              {filteredMarriages.map((marriage) => (
                <tr key={marriage.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {marriage.groomName} & {marriage.brideName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Ages: {marriage.groomAge} & {marriage.brideAge}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {marriage.marriageNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(marriage.marriageDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getAtbiyaName(marriage.atbiyaId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {marriage.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(marriage.status)}`}>
                      {marriage.status.charAt(0).toUpperCase() + marriage.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewMarriage(marriage)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditMarriage(marriage)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMarriage(marriage.id)}
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
              {selectedMarriage ? 'Edit Marriage' : 'Add New Marriage'}
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = {
                groomName: formData.get('groomName'),
                groomAge: formData.get('groomAge'),
                brideName: formData.get('brideName'),
                brideAge: formData.get('brideAge'),
                marriageNumber: formData.get('marriageNumber'),
                marriageDate: formData.get('marriageDate'),
                location: formData.get('location'),
                atbiyaId: formData.get('atbiyaId'),
                notes: formData.get('notes')
              };
              handleAddMarriage(data);
            }}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Groom Name</label>
                    <input
                      type="text"
                      name="groomName"
                      defaultValue={selectedMarriage?.groomName || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Groom Age</label>
                    <input
                      type="number"
                      name="groomAge"
                      defaultValue={selectedMarriage?.groomAge || ''}
                      required
                      min="18"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bride Name</label>
                    <input
                      type="text"
                      name="brideName"
                      defaultValue={selectedMarriage?.brideName || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bride Age</label>
                    <input
                      type="number"
                      name="brideAge"
                      defaultValue={selectedMarriage?.brideAge || ''}
                      required
                      min="18"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Number</label>
                  <input
                    type="text"
                    name="marriageNumber"
                    defaultValue={selectedMarriage?.marriageNumber || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Date</label>
                  <input
                    type="date"
                    name="marriageDate"
                    defaultValue={selectedMarriage?.marriageDate || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedMarriage?.location || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Atbiya</label>
                  <select
                    name="atbiyaId"
                    defaultValue={selectedMarriage?.atbiyaId || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Atbiya</option>
                    {mockData.atbiya.map(atbiya => (
                      <option key={atbiya.id} value={atbiya.id}>{atbiya.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    defaultValue={selectedMarriage?.notes || ''}
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
                    setSelectedMarriage(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedMarriage ? 'Update' : 'Add'} Marriage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedMarriage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Marriage Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Groom</label>
                <p className="text-gray-900">{selectedMarriage.groomName} (Age: {selectedMarriage.groomAge})</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bride</label>
                <p className="text-gray-900">{selectedMarriage.brideName} (Age: {selectedMarriage.brideAge})</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Number</label>
                <p className="text-gray-900">{selectedMarriage.marriageNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Date</label>
                <p className="text-gray-900">{formatDate(selectedMarriage.marriageDate)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-gray-900">{selectedMarriage.location}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Atbiya</label>
                <p className="text-gray-900">{getAtbiyaName(selectedMarriage.atbiyaId)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <p className="text-gray-900 capitalize">{selectedMarriage.status}</p>
              </div>

              {selectedMarriage.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <p className="text-gray-900">{selectedMarriage.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedMarriage(null);
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

export default MarriageManagement;
