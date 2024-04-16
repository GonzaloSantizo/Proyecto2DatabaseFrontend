import axios from 'axios';
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Products() {
  const [products, setProducts] = useState(null);

  async function fetchProducts() {
    try {
      const { data } = await axios.get('http://localhost:4000/retail/products');

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products && (
        <ul>
          {products.map((product) => (
            <div key={product.product.id}>
              {product.product.name} - ${product.product.price}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
