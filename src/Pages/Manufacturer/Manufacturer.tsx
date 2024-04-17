import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Supplier = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
};

function Manufacturer() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const manufacturerId = 'id_yuya'; // Replace with actual manufacturer ID
    axios.get(`http://localhost:4000/manufacturer/${manufacturerId}/supplier`)
      .then(response => {
        
        setSuppliers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    const manufacturerId = 'id_yuya'; 
    axios.get(`http://localhost:4000/manufacturer/${manufacturerId}/products`)
      .then(response => {
        setProducts(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div>
        <h1>Suppliers for Makeup Manufacturer:</h1>
        {Array.isArray(suppliers) && suppliers.map((supplier, index) => (
          <div key={index}>
            {supplier.name}
          </div>
        ))}
      </div>

      <div>
        <h1>Products for Manufacturer:</h1>
        {Array.isArray(products) && products.map((product, index) => (
          <div key={index}>
            {product.name}
          </div>
        ))}
      </div>

    </div>


  );
}

export default Manufacturer;