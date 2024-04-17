import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'sonner';

function Cart() {
  const { cartItems, removeFromCart, onBehalfOf, setOnBehalfOf, clearCart } =
    useCart();
  const [retailers, setRetailers] = useState([]);

  useEffect(() => {
    fetchRetailers();
  }, []);

  const fetchRetailers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/retail');
      setRetailers(response.data);
    } catch (error) {
      console.error('Error fetching retailers:', error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!onBehalfOf) {
      toast.error('Please select a retailer', { duration: 2000 });
      return;
    }

    console.log('Placing order on behalf of:', onBehalfOf);

    try {
      const response = await axios.post('http://localhost:4000/retail/orders', {
        data: {
          retailerId: onBehalfOf,
          products: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            warehouseId: item.warehouse.id,
          })),
        },
      });

      if (response.status === 200) {
        toast.success('Order placed successfully');
        clearCart();
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing the order');
    }
  };

  const handleRetailerChange = (e) => {
    console.log('Selected retailer:', e.target.value);
    setOnBehalfOf(e.target.value);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg p-6 max-w-xl mx-auto mb-6">
        <label htmlFor="retailer" className="block font-semibold mb-2">
          On Behalf Of:
        </label>
        <select
          id="retailer"
          value={onBehalfOf || ''}
          onChange={handleRetailerChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a retailer</option>
          {retailers.map((retailer) => (
            <option key={retailer.id} value={retailer.id}>
              {retailer.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <FiShoppingCart className="mr-2" />
            Cart
          </h2>
          <span className="text-gray-600">{cartItems.length} items</span>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Warehouse: {item.warehouse.name}
                  </p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 transition duration-200"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))}

            <div className="border-t border-gray-300">
              <div className="flex justify-between mt-2">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
