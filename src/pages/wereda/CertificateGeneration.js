import React, { useState } from 'react';
import { Download, Search, Eye, Droplets, Heart, Cross, CreditCard } from 'lucide-react';
import * as mockData from '../../data/mockData';

const CertificateGeneration = () => {
  const [selectedType, setSelectedType] = useState('baptism');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const getRecordsByType = () => {
    switch (selectedType) {
      case 'baptism': return mockData.baptisms;
      case 'marriage': return mockData.marriages;
      case 'death': return mockData.deaths;
      case 'id': return mockData.believers;
      default: return [];
    }
  };

  const filteredRecords = getRecordsByType().filter(record => {
    if (selectedType === 'baptism') {
      return record.believerName.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (selectedType === 'marriage') {
      return record.groomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             record.brideName.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (selectedType === 'death') {
      return record.believerName.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (selectedType === 'id') {
      return record.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  const getAtbiyaName = (atbiyaId) => {
    const atbiya = mockData.atbiya.find(a => a.id === atbiyaId);
    return atbiya ? atbiya.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = (type, record) => {
    // Mock PDF generation - in real app, this would generate actual PDF
    alert(`${type} certificate for ${record.name || record.believerName} downloaded successfully!`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificate Generation</h1>
        <p className="text-gray-600">Generate certificates and ID cards for church members</p>
      </div>

      {/* Certificate Type Selection */}
      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <h3 className="text-lg font-semibold mb-4">Select Certificate Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setSelectedType('baptism')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedType === 'baptism'
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Droplets className="w-8 h-8 mx-auto mb-2" />
            <span className="block font-medium">Baptism</span>
          </button>

          <button
            onClick={() => setSelectedType('marriage')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedType === 'marriage'
                ? 'border-pink-600 bg-pink-50 text-pink-700'
                : 'border-gray-200 hover:border-pink-300'
            }`}
          >
            <Heart className="w-8 h-8 mx-auto mb-2" />
            <span className="block font-medium">Marriage</span>
          </button>

          <button
            onClick={() => setSelectedType('death')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedType === 'death'
                ? 'border-gray-600 bg-gray-50 text-gray-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Cross className="w-8 h-8 mx-auto mb-2" />
            <span className="block font-medium">Death</span>
          </button>

          <button
            onClick={() => setSelectedType('id')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedType === 'id'
                ? 'border-green-600 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <CreditCard className="w-8 h-8 mx-auto mb-2" />
            <span className="block font-medium">ID Card</span>
          </button>
        </div>
      </div>

      {/* Search and Records */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${selectedType} records...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {selectedType === 'baptism' ? 'Believer' : selectedType === 'marriage' ? 'Couple' : selectedType === 'death' ? 'Believer' : 'Member'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {selectedType === 'baptism' ? 'Baptism Number' : selectedType === 'marriage' ? 'Marriage Number' : selectedType === 'death' ? 'Death Number' : 'ID Number'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {selectedType === 'baptism' ? 'Baptism Date' : selectedType === 'marriage' ? 'Marriage Date' : selectedType === 'death' ? 'Death Date' : 'Date of Birth'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atbiya
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {selectedType === 'baptism' || selectedType === 'death' ? (
                          <span className="text-blue-600 font-semibold text-sm">
                            {record.believerName.charAt(0).toUpperCase()}
                          </span>
                        ) : selectedType === 'marriage' ? (
                          <Heart className="w-5 h-5 text-pink-600" />
                        ) : (
                          <span className="text-blue-600 font-semibold text-sm">
                            {record.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {selectedType === 'baptism' || selectedType === 'death' ? record.believerName :
                           selectedType === 'marriage' ? `${record.groomName} & ${record.brideName}` :
                           record.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedType === 'baptism' ? `Age: ${record.believerAge}` :
                           selectedType === 'marriage' ? `Ages: ${record.groomAge} & ${record.brideAge}` :
                           selectedType === 'death' ? `Age: ${record.believerAge}` :
                           `Role: ${record.role}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {selectedType === 'baptism' ? record.baptismNumber :
                     selectedType === 'marriage' ? record.marriageNumber :
                     selectedType === 'death' ? record.deathNumber :
                     record.idNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(selectedType === 'baptism' ? record.baptismDate :
                               selectedType === 'marriage' ? record.marriageDate :
                               selectedType === 'death' ? record.deathDate :
                               record.dateOfBirth)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getAtbiyaName(record.atbiyaId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(selectedType, record)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
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

export default CertificateGeneration;
