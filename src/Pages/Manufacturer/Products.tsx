import { Plus } from 'lucide-react';

function Products() {
  const products = [
    {
      id: '00a5b4de-c060-40fb-bcc7-f99ea2ce1ce2',
      image_url:
        'https://www.rarebeauty.com/cdn/shop/products/pdp-sku-Liquid-Blush-Dewy-Hope.jpg?v=1645133400',
      name: 'Soft Pinch Liquid Blush',
      price: 42.02726751607322,
      sku: 'axhjb',
    },
    // Add more product objects as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Filters */}
      <div
        className="mb-8 flex items-center justify-between w-1/2 mx-auto bg-white p-3 rounded-full shadow-sm border-t 
      border-white border-b-2 border-r-2 border-l-2 
      "
      >
        <div className="flex ml-3">
          <div className="mr-4 flex gap-3 items-center justify-center ">
            <select
              id="category"
              className="border border-gray-300 px-4 py-2 rounded-full"
            >
              <option value="">Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>
          <div className="mr-4 flex gap-3 items-center justify-center">
            <select
              id="price"
              className="border border-gray-300 rounded px-4 py-2 rounded-full"
            >
              <option value="">All Prices</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        <button
          className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-2 rounded-full shadow-md
        transition-colors duration-200 transform  hover:ring-1 ring-pink-500 ring-offset-2  ring-opacity-50
        hover:cursor-pointer  hover:shadow-lg
        "
        >
          <Plus />
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 mx-auto max-w-screen-md">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm p-6 flex"
          >
            <div className=" mr-6">
              <img
                src={product.image_url}
                alt={product.name}
                className=" w-40 aspect-square rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">Price: ${product.price}</p>
              <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
              <div className="flex justify-end">
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mr-2">
                  Update
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
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
