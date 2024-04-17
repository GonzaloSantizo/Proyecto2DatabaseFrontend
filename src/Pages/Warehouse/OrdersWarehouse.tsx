import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  status: string;
  placed_at: string;
  total: number;
  warehouses: string[];
}

interface Warehouse {
  id: string;
  name: string;
}

export default function OrdersWarehouse() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (selectedWarehouse) {
      fetchOrders(selectedWarehouse);
    }
  }, [selectedWarehouse]);

  async function fetchWarehouses() {
  try {
    const { data } = await axios.get('http://localhost:4000/warehouse');
    setWarehouses(data);
    if (data.length > 0) {
      setSelectedWarehouse(data[0].id);
    }
  } catch (error) {
    console.error(error);
  }
}


  async function fetchOrders(warehouseId: string) {
    try {
      const { data } = await axios.get('http://localhost:4000/warehouse/orders');
      setOrders(data);
      console.log('Orders:', data);
    } catch (error) {
      console.error(error);
    }
  }


  const handleRetailerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedWarehouse(event.target.value);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Order List</h1>
      <div className="mb-4">
        <label
          htmlFor="retailer-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Retailer:
        </label>
        <select
          id="retailer-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedWarehouse}
          onChange={handleRetailerChange}
        >
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                <Link to={`/retail/order/${order.id}`}>
                  ORD-{order.id.slice(0, 5).toUpperCase()}
                </Link>
              </h2>
              <span
                className={`px-2 py-1 text-sm  font-bold rounded ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              <strong>Placed At:</strong> {order.placed_at}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Total:</strong> {order.total.toFixed(2)} USD
            </p>
            <p className="text-gray-600 mb-2">
              
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20 text-yellow-800';
    case 'RECEIVED':
    case 'FULFILLED':
      return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20';
    case 'CANCELLED':
      return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10';
    default:
      return 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10';
  }
}
