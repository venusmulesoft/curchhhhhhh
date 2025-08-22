import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Users, MapPin, Phone, Mail, Shield, CheckCircle, XCircle } from 'lucide-react';
import * as mockData from '../../data/mockData';

const WeredaManagement = () => {
  const [weredaList, setWeredaList] = useState(mockData.weredaBetekihinet);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWereda, setSelectedWereda] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const filteredWereda = weredaList.filter(wereda => {
    const matchesSearch = wereda.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wereda.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wereda.location.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || wereda.isActive === (filterStatus === 'active');
    return matchesSearch && matchesStatus;
  });

  const handleAddWereda = (formData) => {
    const newWereda = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    setWeredaList([...weredaList, newWereda]);
    setShowAddModal(false);
  };

  const handleEditWereda = (wereda) => {
    setSelectedWereda(wereda);
    setShowAddModal(true);
  };

  const handleDeleteWereda = (id) => {
    if (window.confirm('Are you sure you want to delete this Wereda?')) {
      setWeredaList(weredaList.filter(wereda => wereda.id !== id));
    }
  };

  const handleViewWereda = (wereda) => {
    setSelectedWereda(wereda);
    setShowViewModal(true);
  };

  const toggleWeredaStatus = (id) => {
    setWeredaList(weredaList.map(wereda => 
      wereda.id === id ? { ...wereda, isActive: !wereda.isActive } : wereda
    ));
  };

  const getWeredaStats = (weredaId) => {
    const atbiya = mockData.atbiya.filter(a => a.weredaId === weredaId);
    const believers = mockData.believers.filter(b => atbiya.some(a => a.id === b.atbiyaId));
    const baptisms = mockData.baptisms.filter(b => atbiya.some(a => a.id === b.atbiyaId));
    const marriages = mockData.marriages.filter(m => atbiya.some(a => a.id === m.atbiyaId));
    const deaths = mockData.deaths.filter(d => atbiya.some(a => a.id === d.atbiyaId));
    
    return { atbiya: atbiya.length, believers: believers.length, baptisms: baptisms.length, marriages: marriages.length, deaths: deaths.length };
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Wereda Management</h1>
        <p className="text-gray-600">Manage and control WeredaBetekihinet across all regions</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Wereda
        </button>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Wereda by name, phone, or zone..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Wereda</p>
              <p className="text-xl font-semibold text-gray-900">{weredaList.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-semibold text-gray-900">
                {weredaList.filter(w => w.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-xl font-semibold text-gray-900">
                {weredaList.filter(w => !w.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-semibold text-gray-900">
                {weredaList.filter(w => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(w.createdAt) > monthAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wereda Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wereda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistics
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
              {filteredWereda.map((wereda) => {
                const stats = getWeredaStats(wereda.id);
                return (
                  <tr key={wereda.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {wereda.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{wereda.name}</div>
                          <div className="text-sm text-gray-500">ID: {wereda.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                          {wereda.location.zone}, {wereda.location.woreda}
                        </div>
                        <div className="text-sm text-gray-500">{wereda.location.kebele}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-1" />
                          {wereda.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-1" />
                          {wereda.email || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-blue-50 px-2 py-1 rounded">
                            <span className="font-medium">{stats.atbiya}</span> Atbiya
                          </div>
                          <div className="bg-green-50 px-2 py-1 rounded">
                            <span className="font-medium">{stats.believers}</span> Believers
                          </div>
                          <div className="bg-purple-50 px-2 py-1 rounded">
                            <span className="font-medium">{stats.baptisms}</span> Baptisms
                          </div>
                          <div className="bg-pink-50 px-2 py-1 rounded">
                            <span className="font-medium">{stats.marriages}</span> Marriages
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleWeredaStatus(wereda.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                          wereda.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {wereda.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewWereda(wereda)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditWereda(wereda)}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteWereda(wereda.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedWereda ? 'Edit Wereda' : 'Add New Wereda'}
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                location: {
                  zone: formData.get('zone'),
                  woreda: formData.get('woreda'),
                  kebele: formData.get('kebele')
                }
              };
              handleAddWereda(data);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedWereda?.name || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={selectedWereda?.phone || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedWereda?.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                  <input
                    type="text"
                    name="zone"
                    defaultValue={selectedWereda?.location?.zone || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Woreda</label>
                  <input
                    type="text"
                    name="woreda"
                    defaultValue={selectedWereda?.location?.woreda || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kebele</label>
                  <input
                    type="text"
                    name="kebele"
                    defaultValue={selectedWereda?.location?.kebele || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedWereda(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedWereda ? 'Update' : 'Add'} Wereda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedWereda && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Wereda Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{selectedWereda.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{selectedWereda.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedWereda.email || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                <p className="text-gray-900">{selectedWereda.location.zone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Woreda</label>
                <p className="text-gray-900">{selectedWereda.location.woreda}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kebele</label>
                <p className="text-gray-900">{selectedWereda.location.kebele}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <p className="text-gray-900 capitalize">{selectedWereda.isActive ? 'Active' : 'Inactive'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                <p className="text-gray-900">{new Date(selectedWereda.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedWereda(null);
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

export default WeredaManagement;

