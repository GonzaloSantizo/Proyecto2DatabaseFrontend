import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FaBoxOpen,
  FaMoneyBillAlt,
  FaShippingFast,
  FaWarehouse,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';

interface Product {
  price: number;
  name: string;
  id: string;
  sku: string;
}

interface ProductWithQuantity {
  product: Product;
  quantity: number | null;
}

interface Shipment {
  shipmentDate: string;
  estimatedDelivery: string | null;
  trackingNumber: string;
  shipmentId: string;
  status: string;
  carrier: string | null;
  shippingCost: number | null;
}

interface Order {
  id: string;
  status: string;
  total: number;
  warehouses: string[];
  products: ProductWithQuantity[];
  shipments: Shipment[] | null;
}

export default function Order() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/retail/orders/${orderId}`
      );

      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Order #{order?.id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center">
            <FaBoxOpen className="mr-2" /> Products
          </h2>
          {order?.products.map((productWithQuantity) => (
            <div key={productWithQuantity.product.id} className="mb-4">
              <p className="font-semibold">
                {productWithQuantity.product.name}
              </p>
              <p>SKU: {productWithQuantity.product.sku}</p>
              <p>Price: ${productWithQuantity.product.price.toFixed(2)}</p>
              <p>Quantity: {productWithQuantity.quantity ?? 'N/A'}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center">
            <FaWarehouse className="mr-2" /> Warehouses
          </h2>
          {order?.warehouses.map((warehouse) => (
            <p key={warehouse} className="mb-2">
              {warehouse}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaShippingFast className="mr-2" /> Shipments
        </h2>
        {order?.shipments && order?.shipments?.length > 0 ? (
          order.shipments.map((shipment) => (
            <div
              key={shipment.shipmentId}
              className="bg-gray-100 p-4 rounded-md shadow-md mb-4"
            >
              <p className="text-sm font-semibold">
                Shipment ID: {shipment.shipmentId}
              </p>
              <p className="text-sm">
                Tracking Number: {shipment.trackingNumber}
              </p>
              <p className="text-sm">Shipment Date: {shipment.shipmentDate}</p>
              <p className="text-sm">
                Estimated Delivery: {shipment.estimatedDelivery ?? 'N/A'}
              </p>
              <p className="text-sm">Status: {shipment.status}</p>
              <p className="text-sm">Carrier: {shipment.carrier ?? 'N/A'}</p>
              <p className="text-sm">
                Shipping Cost:{' '}
                {shipment.shippingCost
                  ? `$${shipment.shippingCost.toFixed(2)}`
                  : 'N/A'}
              </p>
            </div>
          ))
        ) : (
          <p>No shipments available</p>
        )}
      </div>
      <div className="mt-8 flex justify-end">
        <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center">
          <FaMoneyBillAlt className="mr-2 text-green-500" />
          <p className="text-xl font-bold">Total: ${order?.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
