import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);

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
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products &&
          products.map((product: Product) => (
            <div key={product.id} className="group">
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
                  {product.price} USD
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
