import axios from 'axios';
import { ShoppingCartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import { toast } from 'sonner';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  sku: string;
  warehouse: {
    name: string;
    location: string;
    id: string;
    capacity: number;
  };
};

function NumericInput({ value, setValue }) {
  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-full border border-gray-200 rounded">
      <button
        onClick={decrement}
        className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-10 w-10  cursor-pointer"
      >
        -
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="text-center w-full border-none px-2 py-2"
      />
      <button
        onClick={increment}
        className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-10 w-10  cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default function Product() {
  const { productId, warehouseId } = useParams<{
    productId: string;
    warehouseId: string;
  }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    toast.success('Added to cart', {
      position: 'bottom-right',
      duration: 1000,
    });
    console.log('Adding to cart:', product);
    console.log('Quantity:', quantity);
    addToCart({
      id: product.id,
      name: product.name,
      quantity: quantity,
      price: product.price,
      warehouse: product.warehouse,
    });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/retail/products/${productId}?warehouseId=${warehouseId}` // Add warehouseId to the URL
      )
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [productId, warehouseId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row p-6 md:w-3/4 mx-auto bg-white shadow-md rounded-md">
      <div className="w-full md:w-1/2">
        <img
          className="w-full h-auto"
          src={
            product.image_url ||
            'https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png'
          }
          alt={product.name}
        />
      </div>
      <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-2xl text-gray-600 mb-2">{product.price} USD</p>
          <p className="text-base text-gray-600 mb-2">SKU: {product.sku}</p>
          <p className="text-base text-gray-600 mb-2">
            Warehouse: {product.warehouse.name}
          </p>
          <p className="text-base text-gray-600 mb-2">
            Location: {product.warehouse.location}
          </p>
          <p className="text-base text-green-600 mt-4">
            In Stock. {product.warehouse.capacity} units remaining
          </p>
        </div>

        <div className="flex w-full justify-end space-x-3 items-center">
          <div className="w-32">
            <NumericInput value={quantity} setValue={setQuantity} />
          </div>

          <button
            className="flex flex-1  justify-center gap-2 items-center h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded transition-colors"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCartIcon size={15} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
