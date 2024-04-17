import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Supplier = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
};

function Manufacturer() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const manufacturerId = 'id_yuya'; // Replace with actual manufacturer ID
    axios.get(`http://localhost:4000/manufacturer/${manufacturerId}/supplier`)
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const manufacturerId = 'id_yuya'; // Replace with actual manufacturer ID
    axios.get(`http://localhost:4000/manufacturer/${manufacturerId}/products`)
      .then(response => {
        setProducts(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (

    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-4">
          <h1 className="block text-sm font-medium text-gray-700">
            Suppliers for Makeup Manufacturer:
          </h1>
          <div className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {Array.isArray(suppliers) && suppliers.map((supplier, index) => (
              <div key={index} className="group">
                <div>
                  <h3 className="mt-4 text-sm text-gray-700">
                      {supplier.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h1>Products for Manufacturer:</h1>
        {Array.isArray(products) && (
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Manufacturer;