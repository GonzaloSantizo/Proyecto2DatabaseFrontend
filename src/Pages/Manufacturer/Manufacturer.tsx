import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Manufacturer = {
  id: string;
  name: string;
};

type Supplier = {
  id: string;
  name: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

function Manufacturer() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);

  const handleManufacturerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedManufacturer(event.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:4000/manufacturers')
      .then(response => {
        setManufacturers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (

    <div>
      <div className="mb-4">
        <label
          htmlFor="manufacturer-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Manufacturer:
        </label>
        <select
          id="manufacturer-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedManufacturer || ''}
          onChange={handleManufacturerChange}
        >
          <option value="">All Manufacturers</option>
          {manufacturers &&
            manufacturers.map((manufacturer: Manufacturer) => (
              <option key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.name || 'Unknown'}
              </option>
            ))}
        </select>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-4">
          <h1 className="block text-sm font-medium text-gray-700">
            Suppliers for current Makeup Manufacturer:
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

      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {Array.isArray(products) && products.map((product, index) => (
            <div key={index} className="group w-1/2 h-1/2">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={
                    'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
                  }
                  alt={product}
                  className="w-full h-[10rem] object-center object-cover"
                />
              </div>
              <div>
                <h3 className="mt-4 text-sm text-gray-700">
                  {product}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Manufacturer;