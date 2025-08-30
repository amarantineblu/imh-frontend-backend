import { useState } from 'react';

const TaxView = () => {
  const [formData, setFormData] = useState({
    tax1Name: '',
    tax1No: '',
    tax2Name: '',
    tax2No: '',
    enableInlineTax: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tax 1 Name */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Tax 1 Name:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <i className="fas fa-info-circle"></i>
            </span>
            <input
              type="text"
              value={formData.tax1Name}
              onChange={(e) => handleInputChange('tax1Name', e.target.value)}
              placeholder="GST / VAT / Other"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Tax 1 No. */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Tax 1 No.:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <i className="fas fa-info-circle"></i>
            </span>
            <input
              type="text"
              value={formData.tax1No}
              onChange={(e) => handleInputChange('tax1No', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Tax 2 Name */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Tax 2 Name:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <i className="fas fa-info-circle"></i>
            </span>
            <input
              type="text"
              value={formData.tax2Name}
              onChange={(e) => handleInputChange('tax2Name', e.target.value)}
              placeholder="GST / VAT / Other"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Tax 2 No. */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Tax 2 No.:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <i className="fas fa-info-circle"></i>
            </span>
            <input
              type="text"
              value={formData.tax2No}
              onChange={(e) => handleInputChange('tax2No', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Enable inline tax checkbox */}
      <div className="mt-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.enableInlineTax}
            onChange={(e) => handleInputChange('enableInlineTax', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-sm ">
            Enable inline tax in purchase and sell
          </span>
        </label>
      </div>
    </div>
  );
};

export default TaxView;
