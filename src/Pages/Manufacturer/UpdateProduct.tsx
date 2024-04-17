import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const UpdateProductForm = ({ productId, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sku: '',
  });
  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/manufacturer/product/${productId}`
      );
      const product = response.data;
      setFormData({
        name: product.name,
        price: product.price,
        sku: product.sku,
      });
      const additionalFields = Object.entries(product).filter(
        ([key]) => !['id', 'name', 'price', 'sku'].includes(key)
      );
      console.log('Product details:', product);
      console.log('Additional fields:', additionalFields);
      setCustomFields(additionalFields);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index][1] = value;
    setCustomFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        id: productId,
        ...formData,
        ...customFields.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}),
      };
      await axios.put(
        'http://localhost:4000/manufacturer/products',
        productData
      );
      toast.success('Product updated successfully');
      onUpdate();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="w-xl p-5  bg-white shadow-sm mb-4">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        {customFields.map(([key, value], index) => (
          <div key={key}>
            <label htmlFor={key} className="block font-medium">
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 mr-2"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
