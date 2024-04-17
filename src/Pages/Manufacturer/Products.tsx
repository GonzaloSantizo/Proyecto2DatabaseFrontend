import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { DialogComponent as Dialog } from '../../Components/Dialog';
import { Link } from 'react-router-dom';
import UpdateProductForm from './UpdateProduct';
import { toast } from 'sonner';

function Products() {
  const [products, setProducts] = useState();
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [newProductDialogOpen, setNewProductDialogOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchManufacturers();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedManufacturer, selectedPrice, selectedOrder]);

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/manufacturer/all'
      );
      console.log('Manufacturers:', response.data);
      setManufacturers(response.data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      console.log('Deleting product with ID:', productId);
      await axios.delete(
        `http://localhost:4000/manufacturer/product/${productId}`
      );

      fetchProducts();
      toast.success('Product deleted successfully', {
        position: 'bottom-right',
        duration: 1000,
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const params = {
        manufacturerId: selectedManufacturer || undefined,
        price: selectedPrice || undefined,
        order: selectedOrder || undefined,
      };
      console.log('Fetching products with params:', params);
      const response = await axios.get(
        'http://localhost:4000/manufacturer/filteredProducts',
        { params }
      );
      console.log('Products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleManufacturerChange = (event) => {
    setSelectedManufacturer(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdateCancel = () => {
    setSelectedProduct(null);
  };

  const handleUpdateSuccess = () => {
    setSelectedProduct(null);
    fetchProducts();
  };

  return (
    <div className="container mx-auto  py-2">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      {/* Filters */}
      <div className="mb-8 flex items-center justify-between w-1/2 mx-auto bg-white p-3 rounded-full shadow-sm border-t border-white border-b-2 border-r-2 border-l-2">
        <div className="flex ml-3">
          <div className="mr-4 flex gap-3 items-center justify-center">
            <select
              id="manufacturer"
              className="block border border-gray-300 px-4 py-2 rounded-full pr-8"
              value={selectedManufacturer}
              onChange={handleManufacturerChange}
            >
              <option value="">All Manufacturers</option>
              {loading! &&
                manufacturers?.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mr-4 flex gap-3 items-center justify-center">
            <select
              id="price"
              className="border border-gray-300 rounded px-4 py-2 rounded-full"
              value={selectedPrice}
              onChange={handlePriceChange}
            >
              <option value="">All Prices</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        <Link
          to="/manufacturer/products/new"
          className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-2 rounded-full shadow-md transition-colors duration-200 transform hover:ring-1 ring-pink-500 ring-offset-2 ring-opacity-50 hover:cursor-pointer hover:shadow-lg"
        >
          <Plus />
        </Link>
      </div>
      {/* Product Cards */}
      <div className="grid grid-cols-1 mx-auto max-w-screen-md">
        {selectedProduct && (
          <UpdateProductForm
            productId={selectedProduct.id}
            onUpdate={handleUpdateSuccess}
            onCancel={handleUpdateCancel}
          />
        )}
        {loading! &&
          products?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm p-6 flex"
            >
              <div className="mr-6">
                <img
                  src={
                    product.image_url ||
                    'https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png'
                  }
                  alt={product.name}
                  className="w-40 aspect-square rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">Price: ${product.price}</p>
                <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
                {
                  // If theres a property not in name, price, or sku, image_url or id, it will be displayed here,
                  // as Additional Info: {key}: {value}
                  Object.keys(product)
                    .filter(
                      (key) =>
                        !['name', 'price', 'sku', 'image_url', 'id'].includes(
                          key
                        )
                    )
                    .map((key) => (
                      <p key={key} className="text-gray-600 mb-2">
                        {key}: {product[key]}
                      </p>
                    ))
                }
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleUpdateClick(product)}
                  >
                    Select
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export { Products };
