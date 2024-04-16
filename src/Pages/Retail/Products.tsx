import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

type Warehouse = {
  id: string;
  name: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[] | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(
    null
  );

  async function fetchWarehouses() {
    try {
      const { data } = await axios.get('http://localhost:4000/warehouse');
      setWarehouses(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProducts(warehouseId: string | null = null) {
    try {
      const url = warehouseId
        ? `http://localhost:4000/retail/products?warehouseId=${warehouseId}`
        : 'http://localhost:4000/retail/products';

      const { data } = await axios.get(url);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (warehouses && warehouses.length > 0) {
      const defaultWarehouseId = warehouses[0].id;
      fetchProducts(defaultWarehouseId);
      setSelectedWarehouse(defaultWarehouseId);
    }
  }, [warehouses]);

  const handleWarehouseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const warehouseId = event.target.value;
    setSelectedWarehouse(warehouseId);
    fetchProducts(warehouseId);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="mb-4">
        <label
          htmlFor="warehouse-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Warehouse:
        </label>
        <select
          id="warehouse-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedWarehouse || ''}
          onChange={handleWarehouseChange}
        >
          <option value="">All Warehouses</option>
          {warehouses &&
            warehouses.map((warehouse: Warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products &&
          products.map((product: Product, index) => (
            <div key={index} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={
                    product.image_url ||
                    'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
                  }
                  alt={product.name}
                  className="w-full h-[20rem] object-center object-cover"
                />
              </div>
              <div>
                <h3 className="mt-4 text-sm text-gray-700">
                  <Link to={`/retail/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price.toFixed(2)} USD
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
