import axios from 'axios';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
const NewProduct = () => {
  const [formData, setFormData] = useState({
    image_url: '',
    name: '',
    price: '',
    sku: '',
  });
  const [customFields, setCustomFields] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomFieldChange = (index, field, value) => {
    const updatedFields = [...customFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setCustomFields(updatedFields);
  };

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        ...customFields.reduce((acc, field) => {
          acc[field.key] = field.value;
          return acc;
        }, {}),
      };
      console.log('Product data:', productData);

      if (selectedManufacturer) {
        productData.manufacturerId = selectedManufacturer;
      }

      await axios.post(
        'http://localhost:4000/manufacturer/products',
        productData
      );

      // Clear form fields after successful submission
      setFormData({
        image_url: '',
        name: '',
        price: '',
        sku: '',
      });
      setCustomFields([]);

      toast.success('Product added successfully', {
        position: 'bottom-right',
        duration: 1000,
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [manufacturers, setManufacturers] = useState([]);

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/manufacturer/all'
      );
      console.log('Manufacturers:', response.data);
      setManufacturers(response.data);
      setSelectedManufacturer(response.data[0].id);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  const handleManufacturerChange = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mr-4 flex gap-3 items-center justify-center">
          <select
            id="manufacturer"
            className="block border border-gray-300 px-4 py-2 pr-8 w-full rounded-md"
            value={selectedManufacturer}
            onChange={handleManufacturerChange}
          >
            <option value="">All Manufacturers</option>
            {manufacturers?.map((manufacturer) => (
              <option key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image_url" className="block font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="sku" className="block font-medium">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {customFields.map((field, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              placeholder="Key"
              value={field.key}
              onChange={(e) =>
                handleCustomFieldChange(index, 'key', e.target.value)
              }
              className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Value"
              value={field.value}
              onChange={(e) =>
                handleCustomFieldChange(index, 'value', e.target.value)
              }
              className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddCustomField}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 flex items-center gap-2"
          >
            <Plus />
            Add Custom Field
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
