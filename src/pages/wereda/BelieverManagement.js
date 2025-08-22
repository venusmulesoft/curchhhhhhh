import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Download, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import * as mockData from '../../data/mockData';

const BelieverManagement = () => {
  const [believerList, setBelieverList] = useState(mockData.mockBelievers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAtbiya, setFilterAtbiya] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBeliever, setSelectedBeliever] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const filteredBelievers = believerList.filter(believer => {
    const matchesSearch = believer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         believer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         believer.idNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || believer.role === filterRole;
    const matchesStatus = filterStatus === 'all' || believer.status === filterStatus;
    const matchesAtbiya = filterAtbiya === 'all' || believer.atbiyaId === filterAtbiya;
    return matchesSearch && matchesRole && matchesStatus && matchesAtbiya;
  });

  const handleAddBeliever = (formData) => {
    const newBeliever = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setBelieverList([...believerList, newBeliever]);
    setShowAddModal(false);
  };

  const handleEditBeliever = (believer) => {
    setSelectedBeliever(believer);
    setShowAddModal(true);
  };

  const handleDeleteBeliever = (id) => {
    if (window.confirm('Are you sure you want to delete this Believer?')) {
      setBelieverList(believerList.filter(believer => believer.id !== id));
    }
  };

  const handleViewBeliever = (believer) => {
    setSelectedBeliever(believer);
    setShowViewModal(true);
  };

  const getAtbiyaName = (atbiyaId) => {
    const atbiya = mockData.mockAtbiya.find(a => a.id === atbiyaId);
    return atbiya ? atbiya.name : 'Unknown';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'elder': return 'bg-purple-100 text-purple-800';
      case 'youth': return 'bg-blue-100 text-blue-800';
      case 'child': return 'bg-green-100 text-green-800';
      case 'adult': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Believer Management</h1>
        <p className="text-gray-600">Manage church members and their information</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Believer
        </button>

        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </button>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search believers by name, phone, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-white p-4 rounded-lg shadow border mb-6">
          <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="elder">Elder</option>
                <option value="adult">Adult</option>
                <option value="youth">Youth</option>
                <option value="child">Child</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Atbiya</label>
              <select
                value={filterAtbiya}
                onChange={(e) => setFilterAtbiya(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Atbiya</option>
                {mockData.mockAtbiya.map(atbiya => (
                  <option key={atbiya.id} value={atbiya.id}>{atbiya.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-lg">👥</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Believers</p>
              <p className="text-xl font-semibold text-gray-900">{believerList.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-lg">✅</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-semibold text-gray-900">
                {believerList.filter(b => b.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-lg">👴</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Elders</p>
              <p className="text-xl font-semibold text-gray-900">
                {believerList.filter(b => b.role === 'elder').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-lg">👨‍🦱</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Youth</p>
              <p className="text-xl font-semibold text-gray-900">
                {believerList.filter(b => b.role === 'youth').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-orange-600 text-lg">👶</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Children</p>
              <p className="text-xl font-semibold text-gray-900">
                {believerList.filter(b => b.role === 'child').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Believers Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Believer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
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
              {filteredBelievers.map((believer) => (
                <tr key={believer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {believer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{believer.name}</div>
                        <div className="text-sm text-gray-500">ID: {believer.idNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(believer.role)}`}>
                      {believer.role.charAt(0).toUpperCase() + believer.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{believer.phone}</div>
                    <div className="text-sm text-gray-500">{believer.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getAtbiyaName(believer.atbiyaId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(believer.status)}`}>
                      {believer.status.charAt(0).toUpperCase() + believer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewBeliever(believer)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditBeliever(believer)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBeliever(believer.id)}
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
              {selectedBeliever ? 'Edit Believer' : 'Add New Believer'}
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = {
                name: formData.get('name'),
                role: formData.get('role'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                idNumber: formData.get('idNumber'),
                address: formData.get('address'),
                atbiyaId: formData.get('atbiyaId'),
                dateOfBirth: formData.get('dateOfBirth')
              };
              handleAddBeliever(data);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedBeliever?.name || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    defaultValue={selectedBeliever?.role || 'adult'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="elder">Elder</option>
                    <option value="adult">Adult</option>
                    <option value="youth">Youth</option>
                    <option value="child">Child</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={selectedBeliever?.phone || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedBeliever?.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                  <input
                    type="text"
                    name="idNumber"
                    defaultValue={selectedBeliever?.idNumber || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    defaultValue={selectedBeliever?.dateOfBirth || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={selectedBeliever?.address || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Atbiya</label>
                  <select
                    name="atbiyaId"
                    defaultValue={selectedBeliever?.atbiyaId || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Atbiya</option>
                    {mockData.mockAtbiya.map(atbiya => (
                      <option key={atbiya.id} value={atbiya.id}>{atbiya.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedBeliever(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedBeliever ? 'Update' : 'Add'} Believer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedBeliever && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Believer Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{selectedBeliever.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <p className="text-gray-900 capitalize">{selectedBeliever.role}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <p className="text-gray-900">{selectedBeliever.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedBeliever.email || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                <p className="text-gray-900">{selectedBeliever.idNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <p className="text-gray-900">{selectedBeliever.dateOfBirth}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <p className="text-gray-900">{selectedBeliever.address}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Atbiya</label>
                <p className="text-gray-900">{getAtbiyaName(selectedBeliever.atbiyaId)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <p className="text-gray-900 capitalize">{selectedBeliever.status}</p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedBeliever(null);
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

export default BelieverManagement;
